// Vercel Serverless Function to delete a submission

export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Only allow DELETE
    if (req.method !== 'DELETE') {
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

        // Remove submission
        submissions = submissions.filter(s => s.id !== id);

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
    } catch (error) {
        console.error('Error deleting submission:', error);
        return res.status(500).json({ error: 'Failed to delete submission' });
    }
}
