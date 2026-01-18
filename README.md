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

## File Structure

```
Portfolio/
├── index.html      # Main HTML structure
├── styles.css      # All styling and animations
├── script.js       # Interactive functionality
└── README.md       # This file
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

- Lightweight (~50KB total)
- No external dependencies (except Google Fonts and Font Awesome)
- Optimized animations using CSS transforms
- Debounced scroll events for smooth performance

## License

Personal portfolio - feel free to use as inspiration for your own portfolio!
