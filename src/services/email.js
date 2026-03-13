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
                from: 'Famtribute <onboarding@resend.dev>', // Update with verified domain in production
                to: Array.isArray(to) ? to : [to],
                subject,
                html,
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
    withdrawalRequest: (name, amount, cause) => ({
        subject: `New Withdrawal Request: ₦${amount.toLocaleString()}`,
        html: `
      <h2>New Withdrawal Request</h2>
      <p><strong>Contributor:</strong> ${name}</p>
      <p><strong>Amount:</strong> ₦${amount.toLocaleString()}</p>
      <p><strong>Cause:</strong> ${cause}</p>
      <p>Please log in to the Famtribute admin panel to approve or disapprove this request.</p>
    `
    }),
    paymentConfirmed: (name, amount) => ({
        subject: 'Payment Confirmed',
        html: `
      <h2>Payment Received</h2>
      <p>Hello ${name}, your contribution of ₦${amount.toLocaleString()} has been confirmed. Thank you!</p>
    `
    })
}
