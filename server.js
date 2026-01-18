const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'contact-submissions.json');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.')); // Serve static files

// Initialize data file if it doesn't exist
async function initializeDataFile() {
    try {
        await fs.access(DATA_FILE);
    } catch {
        await fs.writeFile(DATA_FILE, JSON.stringify([], null, 2));
    }
}

// Get all submissions
app.get('/api/submissions', async (req, res) => {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        const submissions = JSON.parse(data);
        res.json(submissions.reverse()); // Latest first
    } catch (error) {
        console.error('Error reading submissions:', error);
        res.status(500).json({ error: 'Failed to fetch submissions' });
    }
});

// Submit contact form
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, subject, message, timestamp } = req.body;

        // Validate required fields
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ 
                error: 'Missing required fields',
                message: 'Please fill in all fields'
            });
        }

        // Read existing submissions
        const data = await fs.readFile(DATA_FILE, 'utf8');
        const submissions = JSON.parse(data);

        // Create new submission
        const newSubmission = {
            id: Date.now().toString(),
            name,
            email,
            subject,
            message,
            timestamp: timestamp || new Date().toISOString(),
            read: false
        };

        // Add to submissions
        submissions.push(newSubmission);

        // Save to file
        await fs.writeFile(DATA_FILE, JSON.stringify(submissions, null, 2));

        console.log('New contact form submission:', newSubmission);

        res.json({ 
            success: true, 
            message: 'Form submitted successfully',
            id: newSubmission.id
        });
    } catch (error) {
        console.error('Error saving submission:', error);
        res.status(500).json({ 
            error: 'Failed to save submission',
            message: 'Please try again later'
        });
    }
});

// Mark submission as read
app.put('/api/submissions/:id/read', async (req, res) => {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        const submissions = JSON.parse(data);
        
        const submission = submissions.find(s => s.id === req.params.id);
        if (submission) {
            submission.read = true;
            await fs.writeFile(DATA_FILE, JSON.stringify(submissions, null, 2));
            res.json({ success: true });
        } else {
            res.status(404).json({ error: 'Submission not found' });
        }
    } catch (error) {
        console.error('Error updating submission:', error);
        res.status(500).json({ error: 'Failed to update submission' });
    }
});

// Delete submission
app.delete('/api/submissions/:id', async (req, res) => {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        let submissions = JSON.parse(data);
        
        submissions = submissions.filter(s => s.id !== req.params.id);
        await fs.writeFile(DATA_FILE, JSON.stringify(submissions, null, 2));
        
        res.json({ success: true });
    } catch (error) {
        console.error('Error deleting submission:', error);
        res.status(500).json({ error: 'Failed to delete submission' });
    }
});

// Dashboard route
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'dashboard.html'));
});

// Start server
async function startServer() {
    await initializeDataFile();
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
        console.log(`Dashboard available at http://localhost:${PORT}/dashboard`);
    });
}

startServer();
