# Deployment Guide for beatsmed.ae

## Overview
This guide covers deploying the Beats Medical website to the domain `beatsmed.ae`.

## Prerequisites
- Domain `beatsmed.ae` registered and accessible
- Email credentials for contact form functionality
- Hosting platform account

## Deployment Options

### Option 1: Hostinger (Static Export)
Hostinger supports static websites, so we'll export the Next.js app as static files.

#### Step 1: Configure Next.js for Static Export
1. **Update next.config.ts** to enable static export:
   ```typescript
   const nextConfig = {
     output: 'export',
     trailingSlash: true,
     images: {
       unoptimized: true
     }
   };
   ```

2. **Build and export**:
   ```bash
   npm run build
   npm run export
   ```

#### Step 2: Upload to Hostinger
1. **Access Hostinger File Manager** or use FTP
2. **Navigate to public_html** directory
3. **Upload all files** from the `out` folder to public_html
4. **Set up domain** to point to beatsmed.ae

#### Step 3: Configure EmailJS for Contact Form
Since Hostinger doesn't support server-side APIs, we use EmailJS for the contact form:

1. **Sign up for EmailJS** at https://www.emailjs.com/
2. **Create an email service** (Gmail, Outlook, etc.)
3. **Create an email template** with these variables:
   - `{{from_name}}`, `{{from_email}}`, `{{phone}}`, `{{company}}`
   - `{{subject}}`, `{{message}}`, `{{preferred_contact}}`
4. **Get your credentials**:
   - Service ID
   - Template ID  
   - Public Key
5. **Update environment variables** in `.env.hostinger`

#### Step 4: Build for Hostinger
```bash
# Copy environment variables
cp .env.hostinger .env.local

# Build and export for static hosting
npm run export:hostinger
```

#### Step 5: Upload to Hostinger
1. **Access Hostinger File Manager** or use FTP client
2. **Navigate to public_html** directory  
3. **Upload all files** from the `out/` folder to public_html
4. **Configure domain** to point to beatsmed.ae
5. **Test the website** at https://beatsmed.ae

#### Alternative Contact Form Solutions
If you prefer not to use EmailJS:
- **Formspree**: https://formspree.io/ (easy setup)
- **Netlify Forms**: If you switch to Netlify hosting
- **External form service**: Any third-party form handler

### Option 2: Vercel (Recommended for Next.js)
1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel --prod
   ```

4. **Configure Custom Domain**:
   - Go to Vercel dashboard
   - Add custom domain: `beatsmed.ae`
   - Configure DNS records as instructed

### Option 2: Netlify
1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**:
   - Connect GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `.next`
   - Configure custom domain

### Option 3: Traditional Hosting (cPanel/VPS)
1. **Build and export**:
   ```bash
   npm run build
   npm run export  # If static export is needed
   ```

2. **Upload files** to hosting server
3. **Configure web server** (Apache/Nginx)

## Environment Variables Setup

### Required Variables
```env
EMAIL_USER=your-production-email@gmail.com
EMAIL_PASS=your-app-specific-password
NEXT_PUBLIC_SITE_URL=https://beatsmed.ae
NEXT_PUBLIC_API_URL=https://beatsmed.ae/api
```

### Platform-Specific Configuration

#### Vercel
- Add environment variables in Vercel dashboard
- Go to Project Settings > Environment Variables

#### Netlify
- Add environment variables in Netlify dashboard
- Go to Site Settings > Environment Variables

## DNS Configuration

### Required DNS Records
```
Type    Name    Value                   TTL
A       @       [hosting-ip-address]    3600
CNAME   www     beatsmed.ae             3600
```

### For Vercel
```
Type    Name    Value                   TTL
A       @       76.76.19.61             3600
CNAME   www     cname.vercel-dns.com    3600
```

## Post-Deployment Checklist
- [ ] Verify website loads at https://beatsmed.ae
- [ ] Test contact form functionality
- [ ] Check all pages load correctly
- [ ] Verify WhatsApp integration works
- [ ] Test responsive design on mobile
- [ ] Check SSL certificate is active
- [ ] Verify email notifications are working

## Troubleshooting

### Common Issues
1. **Contact form not working**: Check EMAIL_USER and EMAIL_PASS environment variables
2. **404 errors**: Ensure proper routing configuration
3. **SSL issues**: Verify domain DNS configuration
4. **Build failures**: Check for any remaining ESLint errors

### Support
For deployment issues, contact your hosting provider or check the platform documentation.