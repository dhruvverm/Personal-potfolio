# Portfolio Website

A modern, responsive portfolio website showcasing my work as a full-stack developer. Built with vanilla HTML, CSS, and JavaScript for optimal performance and easy customization.

## Features

✨ **Modern Design**
- Clean, minimalist interface with gradient accents
- Smooth animations and transitions
- Fully responsive across all devices

🎨 **Interactive Elements**
- Animated navigation bar
- Smooth scroll behavior
- Hover effects on project cards
- Intersection Observer animations

📱 **Responsive Layout**
- Mobile-first design approach
- Works seamlessly on desktop, tablet, and mobile
- Touch-friendly navigation menu

## Projects Showcased

1. **POS System** - Comprehensive Point of Sale system with real-time features
2. **Voyage Eyewear** - Complete e-commerce solution with mobile app
3. **GoEye** - Shopify-powered platform with Flutter integration

## Getting Started

### Option 1: Open Directly
Simply open `index.html` in your web browser.

### Option 2: Local Server (Recommended)

Using Python:
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Using Node.js (with http-server):
```bash
npx http-server -p 8000
```

Then visit: `http://localhost:8000`

### Option 3: Live Server (VS Code Extension)
If you're using VS Code, install the "Live Server" extension and click "Go Live" in the status bar.

## Contact Form & Backend

The portfolio includes a contact form that sends submissions to your backend dashboard.

### Setting Up the Backend

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

The server will run on `http://localhost:3000`

3. View submissions:
- Visit `http://localhost:3000/dashboard` to see all contact form submissions
- The dashboard shows total submissions, unread count, and today's submissions
- You can mark submissions as read or delete them

### Contact Features

- **WhatsApp Button**: Direct link to WhatsApp (+91 8076616747)
- **Email**: dhruvverma5704@gmail.com
- **Contact Form**: 
  - **Local**: Submissions saved to `contact-submissions.json` and viewable in dashboard
  - **Vercel**: Submissions stored in Vercel KV and viewable in dashboard at `/dashboard`

### Vercel KV Setup (Required for Dashboard on Vercel)

To enable the dashboard on your Vercel deployment:

1. **Create Vercel KV Database**:
   - Go to your Vercel project dashboard
   - Navigate to "Storage" tab
   - Click "Create Database" → Select "KV"
   - Give it a name (e.g., "portfolio-kv")
   - Click "Create"

2. **Get Environment Variables**:
   - After creating KV, Vercel automatically provides:
     - `KV_REST_API_URL`
     - `KV_REST_API_TOKEN`
   - These are automatically added to your project

3. **Redeploy**:
   - Vercel will automatically redeploy with the new environment variables
   - Or manually trigger a redeploy from the dashboard

4. **Access Dashboard**:
   - Visit: `https://your-site.vercel.app/dashboard`
   - All form submissions will be stored and visible here

### Email Notifications (Optional)

To also receive email notifications when someone submits the form:

1. **Sign up for Resend** (free tier available): https://resend.com
2. **Get your API key** from the Resend dashboard
3. **Add to Vercel Environment Variables**:
   - Go to your Vercel project settings
   - Navigate to "Environment Variables"
   - Add: `RESEND_API_KEY` = `your_api_key_here`
   - Redeploy your site

After setup, all form submissions will be:
- Stored in Vercel KV (visible in dashboard)
- Emailed to `dhruvverma5704@gmail.com` (if Resend is configured)

### API Endpoints

- `POST /api/contact` - Submit contact form
- `GET /api/submissions` - Get all submissions (for dashboard)
- `PUT /api/submissions/:id/read` - Mark submission as read
- `DELETE /api/submissions/:id` - Delete submission

## File Structure

```
Portfolio/
├── index.html              # Main HTML structure
├── styles.css              # All styling and animations
├── script.js               # Interactive functionality
├── server.js               # Backend API server
├── dashboard.html          # Admin dashboard for submissions
├── package.json            # Node.js dependencies
├── contact-submissions.json # Form submissions data (auto-generated)
└── README.md               # This file
```

## Customization

### Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #8b5cf6;
    --accent-color: #ec4899;
    /* ... more variables */
}
```

### Content
- Update personal information in `index.html`
- Modify project details in the projects section
- Adjust skills in the about section

### Social Links
Add your social media links in the footer or contact section.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Lightweight frontend (~50KB total)
- Optimized animations using CSS transforms
- Debounced scroll events for smooth performance
- Backend uses Express.js for fast API responses

## Requirements

### Frontend Only
- Just a web browser (no dependencies needed)
- Works with any static file server

### Backend (for contact form)
- Node.js 14+ 
- npm or yarn

## License

Personal portfolio - feel free to use as inspiration for your own portfolio!
