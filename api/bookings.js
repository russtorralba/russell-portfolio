import { neon } from '@neondatabase/serverless'

const textLimits = {
  name: 120,
  email: 254,
  project_type: 100,
  description: 5000,
}

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
    !name.trim() ||
    name.length > textLimits.name ||
    typeof email !== 'string' ||
    !email.trim() ||
    email.length > textLimits.email ||
    !isValidEmail(email.trim()) ||
    typeof projectType !== 'string' ||
    !projectType.trim() ||
    projectType.length > textLimits.project_type ||
    typeof description !== 'string' ||
    !description.trim() ||
    description.length > textLimits.description ||
    !isValidTimestamp(startsAt)
  ) {
    return res.status(400).json({ error: 'Invalid booking details' })
  }

  const databaseUrl = process.env.DATABASE_URL
  if (!databaseUrl) {
    return res.status(503).json({ error: 'Booking service unavailable' })
  }

  try {
    const sql = neon(databaseUrl)
    const [booking] = await sql`
      SELECT starts_at, ends_at, status
      FROM public.create_project_call_booking(
        ${name.trim()}::text,
        ${email.trim()}::text,
        ${projectType.trim()}::text,
        ${description.trim()}::text,
        ${startsAt}::timestamptz
      )
    `

    if (!booking) {
      return res.status(500).json({ error: 'Unable to create booking' })
    }

    return res.status(201).json({
      starts_at: booking.starts_at,
      ends_at: booking.ends_at,
      status: booking.status,
    })
  } catch {
    return res.status(500).json({ error: 'Unable to create booking' })
  }
}
