import { Resend } from 'resend'

export class EmailConfigurationError extends Error {
  constructor(missing) {
    super('Server email configuration is incomplete')
    this.missing = missing
  }
}

export function getEmailConfiguration({ requireSiteUrl = true } = {}) {
  const missing = []
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.RESEND_FROM_EMAIL
  const siteUrl = process.env.SITE_URL

  if (!apiKey) missing.push('RESEND_API_KEY')
  if (!from) missing.push('RESEND_FROM_EMAIL')
  if (requireSiteUrl && !siteUrl) missing.push('SITE_URL')
  if (missing.length) throw new EmailConfigurationError(missing)

  let parsedSiteUrl = null
  if (siteUrl) {
    try {
      parsedSiteUrl = new URL(siteUrl)
    } catch {
      throw new EmailConfigurationError(['SITE_URL (must be a valid absolute URL)'])
    }

    if (
      parsedSiteUrl.protocol !== 'https:' &&
      !(parsedSiteUrl.protocol === 'http:' && ['localhost', '127.0.0.1'].includes(parsedSiteUrl.hostname))
    ) {
      throw new EmailConfigurationError(['SITE_URL (must use HTTPS)'])
    }
  }

  return { client: new Resend(apiKey), from, siteUrl: parsedSiteUrl?.origin }
}

export function getVerificationUrl(siteUrl, token) {
  const url = new URL('/', siteUrl)
  url.hash = new URLSearchParams({ verify: token }).toString()
  return url.toString()
}

export async function sendEmail(configuration, message) {
  const { error } = await configuration.client.emails.send({
    from: configuration.from,
    ...message,
  })

  if (error) throw new Error('Email provider rejected the message')
}
