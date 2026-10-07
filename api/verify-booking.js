import { createHash } from 'node:crypto'
import { neon } from '@neondatabase/serverless'
import {
  getEmailConfiguration,
  sendEmail,
} from '../server/resend.js'

function isVerificationToken(value) {
  if (typeof value !== 'string' || !/^[A-Za-z0-9_-]{43}$/.test(value)) {
    return false
  }

  const decoded = Buffer.from(value, 'base64url')
  return decoded.length === 32 && decoded.toString('base64url') === value
}

function formatManilaDateTime(value) {
  return new Intl.DateTimeFormat('en-PH', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'Asia/Manila',
  }).format(new Date(value))
}

async function notifyOwner(booking) {
  const recipient = process.env.BOOKING_NOTIFICATION_EMAIL
  if (!recipient) throw new Error('Owner notification recipient is not configured')

  let emailConfig
  try {
    emailConfig = getEmailConfiguration({ requireSiteUrl: false })
  } catch {
    throw new Error('Owner notification email configuration is incomplete')
  }

  await sendEmail(emailConfig, {
    to: recipient,
    subject: 'Project call booking verified',
    text: [
      'A project call booking has been verified.',
      `Booking ID: ${booking.booking_id}`,
      `Starts: ${formatManilaDateTime(booking.starts_at)} (Asia/Manila)`,
      `Ends: ${formatManilaDateTime(booking.ends_at)} (Asia/Manila)`,
      '',
      'Visitor details are not available through the current database API.',
    ].join('\n'),
    html: [
      '<p>A project call booking has been verified.</p>',
      `<p>Booking ID: ${booking.booking_id}</p>`,
      `<p>Starts: ${formatManilaDateTime(booking.starts_at)} (Asia/Manila)</p>`,
      `<p>Ends: ${formatManilaDateTime(booking.ends_at)} (Asia/Manila)</p>`,
      '<p>Visitor details are not available through the current database API.</p>',
    ].join(''),
  })
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const contentType = req.headers?.['content-type']
  if (
    typeof contentType !== 'string' ||
    contentType.split(';', 1)[0].trim().toLowerCase() !== 'application/json'
  ) {
    return res.status(415).json({ error: 'Content-Type must be application/json' })
  }

  let body = req.body
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body)
    } catch {
      return res.status(400).json({ error: 'Invalid JSON body' })
    }
  }

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return res.status(400).json({ error: 'Invalid verification request' })
  }

  const { token } = body
  if (!isVerificationToken(token)) {
    return res.status(400).json({ outcome: 'invalid' })
  }

  const databaseUrl = process.env.DATABASE_URL
  if (!databaseUrl) {
    return res.status(503).json({ error: 'Booking service unavailable' })
  }

  const tokenHash = createHash('sha256').update(token, 'utf8').digest('hex')

  try {
    const sql = neon(databaseUrl)
    const [verification] = await sql`
      SELECT booking_id, starts_at, ends_at, outcome
      FROM public.verify_project_call_booking(
        pg_catalog.decode(${tokenHash}, 'hex')
      )
    `

    if (!verification) {
      return res.status(500).json({ error: 'Unable to verify booking' })
    }

    if (verification.outcome === 'verified') {
      try {
        await notifyOwner(verification)
      } catch {
        console.error('Booking verified, but owner notification delivery failed')
      }

      return res.status(200).json({
        outcome: 'verified',
        booking_id: verification.booking_id,
        starts_at: verification.starts_at,
        ends_at: verification.ends_at,
      })
    }

    if (['expired', 'invalid', 'unavailable'].includes(verification.outcome)) {
      return res.status(200).json({ outcome: verification.outcome })
    }

    console.error('Booking verification returned an unexpected outcome')
    return res.status(500).json({ error: 'Unable to verify booking' })
  } catch {
    console.error('Unable to verify booking')
    return res.status(500).json({ error: 'Unable to verify booking' })
  }
}
