// Vercel Serverless Function to get all submissions from Vercel KV

export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Only allow GET
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        let submissions = [];

        // Fetch from Vercel KV
        if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
            const kvResponse = await fetch(`${process.env.KV_REST_API_URL}/get/submissions`, {
                headers: {
                    'Authorization': `Bearer ${process.env.KV_REST_API_TOKEN}`
                }
            });

            if (kvResponse.ok) {
                const data = await kvResponse.json();
                if (data.result !== null) {
                    submissions = JSON.parse(data.result);
                }
            }
        }

        // Return submissions in reverse order (latest first)
        return res.status(200).json(submissions.reverse());
    } catch (error) {
        console.error('Error fetching submissions:', error);
        return res.status(500).json({ error: 'Failed to fetch submissions' });
    }
}
