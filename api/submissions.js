// Vercel Serverless Function to get all submissions
// This requires Vercel KV or a database to work properly

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
        // TODO: Replace with actual database/KV storage
        // For now, return empty array since we need persistent storage
        // To fix this, you can:
        // 1. Use Vercel KV: https://vercel.com/docs/storage/vercel-kv
        // 2. Use a database like MongoDB, PostgreSQL, or Supabase
        // 3. Use an external API service
        
        return res.status(200).json([]);
    } catch (error) {
        console.error('Error fetching submissions:', error);
        return res.status(500).json({ error: 'Failed to fetch submissions' });
    }
}
