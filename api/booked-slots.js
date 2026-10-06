import { neon } from '@neondatabase/serverless'

function isDate(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false
  }

  const date = new Date(`${value}T00:00:00.000Z`)
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { from, to } = req.query ?? {}
  if (!isDate(from) || !isDate(to) || from > to) {
    return res.status(400).json({ error: 'Valid from and to dates are required' })
  }

  const databaseUrl = process.env.DATABASE_URL
  if (!databaseUrl) {
    return res.status(503).json({ error: 'Booking service unavailable' })
  }

  try {
    const sql = neon(databaseUrl)
    const slots = await sql`
      SELECT starts_at, ends_at, status
      FROM public.get_project_call_booked_slots(${from}::date, ${to}::date)
    `

    return res.status(200).json(
      slots.map(({ starts_at, ends_at, status }) => ({
        starts_at,
        ends_at,
        status,
      })),
    )
  } catch {
    return res.status(500).json({ error: 'Unable to retrieve booked slots' })
  }
}
