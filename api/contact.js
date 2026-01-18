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
            timestamp: timestamp || new Date().toISOString()
        };

        // Log submission (in production, send email or store in database)
        console.log('New contact form submission:', submission);

        // TODO: Add email sending service here
        // Example with Resend:
        // await fetch('https://api.resend.com/emails', {
        //     method: 'POST',
        //     headers: {
        //         'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         from: 'portfolio@yourdomain.com',
        //         to: 'dhruvverma5704@gmail.com',
        //         subject: `New Contact: ${subject}`,
        //         html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Subject:</strong> ${subject}</p><p><strong>Message:</strong> ${message}</p>`
        //     })
        // });

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
