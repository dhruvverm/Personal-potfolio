// Vercel Serverless Function to mark submission as read

export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'PUT, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Only allow PUT
    if (req.method !== 'PUT') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { id } = req.query;

        if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
            return res.status(500).json({ error: 'Vercel KV not configured' });
        }

        // Get existing submissions
        const kvResponse = await fetch(`${process.env.KV_REST_API_URL}/get/submissions`, {
            headers: {
                'Authorization': `Bearer ${process.env.KV_REST_API_TOKEN}`
            }
        });

        if (!kvResponse.ok) {
            return res.status(500).json({ error: 'Failed to fetch submissions' });
        }

        const data = await kvResponse.json();
        let submissions = [];
        if (data.result !== null) {
            submissions = JSON.parse(data.result);
        }

        // Find and update submission
        const submission = submissions.find(s => s.id === id);
        if (submission) {
            submission.read = true;

            // Save back to KV
            await fetch(`${process.env.KV_REST_API_URL}/set/submissions`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${process.env.KV_REST_API_TOKEN}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(submissions)
            });

            return res.status(200).json({ success: true });
        } else {
            return res.status(404).json({ error: 'Submission not found' });
        }
    } catch (error) {
        console.error('Error updating submission:', error);
        return res.status(500).json({ error: 'Failed to update submission' });
    }
}
