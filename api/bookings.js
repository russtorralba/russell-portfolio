import { randomBytes, randomUUID, createHash } from 'node:crypto'
import { neon } from '@neondatabase/serverless'
import {
  EmailConfigurationError,
  getEmailConfiguration,
  getVerificationUrl,
  sendEmail,
} from '../server/resend.js'

const projectTypes = [
  'Business Website',
  'Web Application',
  'Custom Business Tool',
  'Booking / Scheduling System',
  'Dashboard / Management System',
  'Other',
]

function isValidTimestamp(value) {
  if (
    typeof value !== 'string' ||
    !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,9})?(?:Z|[+-]\d{2}:\d{2})$/i.test(value)
  ) {
    return false
  }

  const date = new Date(`${value.slice(0, 10)}T00:00:00.000Z`)
  if (
    Number.isNaN(date.getTime()) ||
    date.toISOString().slice(0, 10) !== value.slice(0, 10)
  ) {
    return false
  }

  const time = value.match(/T(\d{2}):(\d{2}):(\d{2})/)
  if (Number(time[1]) > 23 || Number(time[2]) > 59 || Number(time[3]) > 59) {
    return false
  }

  return Number.isFinite(Date.parse(value))
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[character])
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
    return res.status(400).json({ error: 'Invalid booking details' })
  }

  const { name, email, project_type: projectType, description, starts_at: startsAt } = body
  if (
    typeof name !== 'string' ||
    name.trim().length < 2 ||
    name.trim().length > 100 ||
    typeof email !== 'string' ||
    email.trim().length < 3 ||
    email.trim().length > 320 ||
    !isValidEmail(email.trim()) ||
    typeof projectType !== 'string' ||
    !projectTypes.includes(projectType.trim()) ||
    typeof description !== 'string' ||
    description.trim().length < 20 ||
    description.trim().length > 2000 ||
    !isValidTimestamp(startsAt)
  ) {
    return res.status(400).json({ error: 'Invalid booking details' })
  }

  const databaseUrl = process.env.DATABASE_URL
  if (!databaseUrl) {
    return res.status(503).json({ error: 'Booking service unavailable' })
  }

  let emailConfig
  try {
    emailConfig = getEmailConfiguration()
  } catch (error) {
    if (error instanceof EmailConfigurationError) {
      console.error('Booking email service configuration is unavailable')
      return res.status(503).json({ error: 'Booking email service is unavailable.' })
    }
    return res.status(503).json({ error: 'Booking email is not configured.' })
  }

  const verificationToken = randomBytes(32).toString('base64url')
  const verificationTokenHash = createHash('sha256')
    .update(verificationToken, 'utf8')
    .digest('hex')
  const idempotencyKey = randomUUID()

  try {
    const sql = neon(databaseUrl)
    const [booking] = await sql`
      SELECT
        booking_id,
        starts_at,
        ends_at,
        status,
        verification_expires_at,
        verification_email_needed
      FROM public.create_project_call_booking(
        ${name.trim()}::text,
        ${email.trim().toLowerCase()}::text,
        ${projectType.trim()}::text,
        ${description.trim()}::text,
        ${startsAt}::timestamptz,
        pg_catalog.decode(${verificationTokenHash}, 'hex'),
        ${idempotencyKey}::uuid
      )
    `

    if (!booking || booking.status !== 'pending') {
      return res.status(500).json({ error: 'Unable to create booking request' })
    }

    if (booking.verification_email_needed) {
      try {
        const verificationUrl = getVerificationUrl(emailConfig.siteUrl, verificationToken)
        await sendEmail(emailConfig, {
          to: email.trim().toLowerCase(),
          subject: 'Verify your project call booking',
          text: [
            'Please confirm your project call booking by opening this link:',
            verificationUrl,
            '',
            'Your selected time is held for 15 minutes. If you do not verify within that time, the hold expires.',
          ].join('\n'),
          html: [
            '<p>Please confirm your project call booking by clicking the link below.</p>',
            `<p><a href="${escapeHtml(verificationUrl)}">Confirm your booking</a></p>`,
            '<p>Your selected time is held for 15 minutes. If you do not verify within that time, the hold expires.</p>',
          ].join(''),
        })
      } catch {
        console.error('Booking verification email delivery failed')
        return res.status(502).json({
          code: 'verification_email_failed',
          error: 'Unable to send the verification email. The temporary hold will expire automatically after 15 minutes.',
        })
      }
    }

    return res.status(201).json({
      status: 'pending',
      message: 'Check your email to verify your booking. Your selected time is held for 15 minutes.',
      starts_at: booking.starts_at,
      ends_at: booking.ends_at,
      verification_expires_at: booking.verification_expires_at,
    })
  } catch {
    console.error('Unable to create booking request')
    return res.status(500).json({ error: 'Unable to create booking request' })
  }
}
