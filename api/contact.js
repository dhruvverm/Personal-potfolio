// Vercel Serverless Function for Contact Form
export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Only allow POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { name, email, subject, message, timestamp } = req.body;

        // Validate required fields
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ 
                error: 'Missing required fields',
                message: 'Please fill in all fields'
            });
        }

        // Send email notification using your email
        // For now, we'll just log it. You can integrate with:
        // - Resend API
        // - SendGrid
        // - Nodemailer with Gmail
        // - Or store in a database like MongoDB/Vercel KV
        
        const submission = {
            id: Date.now().toString(),
            name,
            email,
            subject,
            message,
            timestamp: timestamp || new Date().toISOString(),
            read: false
        };

        // Log submission
        console.log('New contact form submission:', submission);

        // Store submission in Vercel KV using REST API
        if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
            try {
                // Get existing submissions using KV REST API
                const getResponse = await fetch(`${process.env.KV_REST_API_URL}/get/submissions`, {
                    headers: {
                        'Authorization': `Bearer ${process.env.KV_REST_API_TOKEN}`
                    }
                });

                let submissions = [];
                if (getResponse.ok) {
                    const data = await getResponse.json();
                    if (data.result !== null) {
                        submissions = JSON.parse(data.result);
                    }
                }

                // Add new submission
                submissions.push(submission);

                // Save back to KV
                const setResponse = await fetch(`${process.env.KV_REST_API_URL}/set/submissions`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${process.env.KV_REST_API_TOKEN}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(submissions)
                });

                if (setResponse.ok) {
                    console.log('Submission stored in Vercel KV');
                } else {
                    console.error('Failed to store in KV:', await setResponse.text());
                }
            } catch (kvError) {
                console.error('Error storing in Vercel KV:', kvError);
                // Don't fail the request if KV fails
            }
        } else {
            console.log('Vercel KV not configured - skipping storage');
        }

        // Send email notification using Resend API
        // Get API key from environment variable: RESEND_API_KEY
        if (process.env.RESEND_API_KEY) {
            try {
                const emailResponse = await fetch('https://api.resend.com/emails', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        from: 'Portfolio Contact <onboarding@resend.dev>', // Update this with your verified domain
                        to: 'dhruvverma5704@gmail.com',
                        reply_to: email,
                        subject: `New Contact Form Submission: ${subject}`,
                        html: `
                            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                                <h2 style="color: #6366f1;">New Contact Form Submission</h2>
                                <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                                    <p><strong>Name:</strong> ${name}</p>
                                    <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                                    <p><strong>Subject:</strong> ${subject}</p>
                                    <p><strong>Submitted:</strong> ${new Date(submission.timestamp).toLocaleString()}</p>
                                </div>
                                <div style="background: #ffffff; padding: 20px; border-left: 4px solid #6366f1; margin: 20px 0;">
                                    <h3 style="margin-top: 0;">Message:</h3>
                                    <p style="white-space: pre-wrap;">${message}</p>
                                </div>
                                <p style="color: #666; font-size: 12px; margin-top: 30px;">
                                    This email was sent from your portfolio contact form.
                                </p>
                            </div>
                        `
                    })
                });

                if (!emailResponse.ok) {
                    const errorData = await emailResponse.json();
                    console.error('Resend API error:', errorData);
                } else {
                    console.log('Email notification sent successfully');
                }
            } catch (emailError) {
                console.error('Error sending email:', emailError);
                // Don't fail the request if email fails
            }
        } else {
            console.log('RESEND_API_KEY not set - skipping email notification');
        }

        return res.status(200).json({ 
            success: true, 
            message: 'Form submitted successfully',
            id: submission.id
        });
    } catch (error) {
        console.error('Error processing submission:', error);
        return res.status(500).json({ 
            error: 'Failed to process submission',
            message: 'Please try again later'
        });
    }
}
