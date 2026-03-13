import axios from 'axios'

const RESEND_API_KEY = import.meta.env.VITE_RESEND_API_KEY
const API_URL = 'https://api.resend.com/emails'

/**
 * Sends a transactional email using Resend.
 * NOTE: For production, this should be moved to a Supabase Edge Function 
 * to keep the API Key secure.
 */
export const sendEmail = async ({ to, subject, html }) => {
    if (!RESEND_API_KEY || RESEND_API_KEY === 'your_resend_api_key') {
        console.warn('Resend API key missing. Email not sent.')
        return { error: 'API key not configured' }
    }

    try {
        const response = await axios.post(
            API_URL,
            {
                from: 'Famtribute <notifications@resend.dev>', // Update with verified domain in production
                to: Array.isArray(to) ? to : [to],
                subject,
                html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a; background: #f9fafb; padding: 20px;">
            <div style="background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%); padding: 40px 20px; border-radius: 20px 20px 0 0; text-align: center; color: white;">
              <h1 style="margin: 0; font-size: 32px; font-weight: 800; letter-spacing: -1px;">Famtribute</h1>
              <p style="margin: 10px 0 0; opacity: 0.9; font-size: 16px;">Building a Family Legacy</p>
            </div>
            <div style="background: #ffffff; padding: 40px 30px; border-radius: 0 0 20px 20px; border: 1px solid #e5e7eb; border-top: none; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
              ${html}
              <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 12px; line-height: 1.5;">
                <p>This is a secure family notification. If you did not expect this, please notify the administrator.</p>
                <p>© 2026 Famtribute. Private & Confidential.</p>
              </div>
            </div>
          </div>
        `,
            },
            {
                headers: {
                    'Authorization': `Bearer ${RESEND_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        )

        return { data: response.data }
    } catch (error) {
        console.error('Email service error:', error.response?.data || error.message)
        return { error: error.response?.data || error.message }
    }
}

// Predefined Templates
export const templates = {
    otp: (code) => ({
        subject: `🔐 Your Access Code: ${code}`,
        html: `
      <h2 style="margin: 0 0 20px; color: #111827; font-size: 22px; font-weight: 700;">Security Verification</h2>
      <p style="font-size: 16px; line-height: 1.6; color: #4b5563;">To continue, please enter the seguinte secure code on the Famtribute platform.</p>
      <div style="background: #f3f4f6; border-radius: 12px; padding: 24px; text-align: center; margin: 30px 0; border: 1px solid #e5e7eb;">
        <span style="font-size: 36px; font-weight: 800; letter-spacing: 8px; color: #4f46e5; font-family: 'Courier New', Courier, monospace;">${code}</span>
      </div>
      <p style="font-size: 14px; color: #9ca3af; text-align: center;">This code will expire in 10 minutes for your security.</p>
    `
    }),
    withdrawalRequest: (name, amount, cause) => ({
        subject: `🔔 New Approval Needed: ₦${amount.toLocaleString()}`,
        html: `
      <h2 style="margin: 0 0 20px; color: #111827; font-size: 22px; font-weight: 700;">Action Required</h2>
      <p style="font-size: 16px; line-height: 1.6; color: #4b5563;">A family member has initiated a withdrawal request that requires your review.</p>
      <div style="background: #f9fafb; border-radius: 12px; padding: 24px; margin: 30px 0; border: 1px solid #e5e7eb;">
        <div style="margin-bottom: 20px;">
          <div style="font-size: 12px; color: #6b7280; text-transform: uppercase; font-weight: 700; margin-bottom: 4px;">Requested By</div>
          <div style="font-size: 16px; font-weight: 600;">${name}</div>
        </div>
        <div style="margin-bottom: 20px;">
          <div style="font-size: 12px; color: #6b7280; text-transform: uppercase; font-weight: 700; margin-bottom: 4px;">Amount</div>
          <div style="font-size: 28px; font-weight: 800; color: #ef4444;">₦${amount.toLocaleString()}</div>
        </div>
        <div>
          <div style="font-size: 12px; color: #6b7280; text-transform: uppercase; font-weight: 700; margin-bottom: 4px;">Reason</div>
          <div style="font-size: 16px; color: #374151;">${cause}</div>
        </div>
      </div>
      <a href="#" style="display: block; width: 100%; box-sizing: border-box; padding: 16px; background: #6366f1; color: white; text-align: center; border-radius: 12px; text-decoration: none; font-weight: 700; font-size: 16px;">View & Approve in Dashboard</a>
    `
    }),
    paymentConfirmed: (name, amount) => ({
        subject: '✅ Contribution Verified',
        html: `
      <h2 style="margin: 0 0 20px; color: #111827; font-size: 22px; font-weight: 700;">Payment Confirmed</h2>
      <p style="font-size: 16px; line-height: 1.6; color: #4b5563;">Hello ${name}, your contribution has been successfully confirmed and added to the ledger.</p>
      <div style="background: #ecfdf5; border-radius: 12px; padding: 30px; text-align: center; margin: 30px 0; border: 1px solid #10b981;">
        <div style="font-size: 32px; font-weight: 800; color: #059669;">₦${amount.toLocaleString()}</div>
        <div style="font-size: 14px; color: #059669; margin-top: 4px; opacity: 0.8;">Total Contribution Added</div>
      </div>
      <p style="font-size: 14px; color: #6b7280; text-align: center;">Thank you for your transparency and support! 🚀</p>
    `
    })
}
