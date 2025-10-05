# Hostinger Static Deployment Guide

## 🚀 Beats Medical Website - Static Export for Shared Hosting

This guide will help you deploy your Beats Medical website to Hostinger shared hosting using static export.

## ✅ Pre-Deployment Checklist

- [x] Next.js configured for static export (`output: 'export'`)
- [x] Contact form updated to use Formspree (no server-side code)
- [x] API routes removed (not compatible with static hosting)
- [x] Images configured as unoptimized for static export
- [x] Static build tested and deployment package created

## 📦 Deployment Package

Your website has been built and packaged as: `beatsmed-static.zip`

This contains all the static files needed for deployment.

## 🔧 Step-by-Step Deployment

### Step 1: Set Up Formspree (Contact Form)

1. Go to [Formspree.io](https://formspree.io) and create a free account
2. Create a new form and get your form endpoint URL
3. Update the contact form with your Formspree endpoint:
   - Open `src/app/contact/page.tsx`
   - Replace `YOUR_FORMSPREE_ENDPOINT` with your actual endpoint
   - Example: `https://formspree.io/f/xpzgkqyw`

### Step 2: Upload to Hostinger

#### Option A: Using hPanel File Manager (Recommended)

1. **Login to Hostinger hPanel**
   - Go to your Hostinger control panel
   - Navigate to **Websites** → **Files** → **File Manager**

2. **Navigate to public_html**
   - Open the `public_html` folder
   - Delete any existing files if this is a fresh installation

3. **Upload the ZIP file**
   - Click **Upload** button
   - Select `beatsmed-static.zip` from your computer
   - Wait for upload to complete

4. **Extract the files**
   - Right-click on `beatsmed-static.zip`
   - Select **Extract**
   - Extract to current directory (`public_html`)
   - Delete the ZIP file after extraction

#### Option B: Using FTP Client

1. **FTP Credentials**
   - Get FTP details from hPanel → Websites → FTP Accounts
   - Use any FTP client (FileZilla, WinSCP, etc.)

2. **Upload Files**
   - Connect to your hosting account
   - Navigate to `public_html` folder
   - Upload all contents from the `out/` folder
   - Ensure `index.html` is in the root of `public_html`

### Step 3: Domain Configuration

1. **Point Domain to Hostinger**
   - Update your domain's nameservers to Hostinger's:
     - `ns1.dns-parking.com`
     - `ns2.dns-parking.com`
   - Or update A records to point to your hosting IP

2. **SSL Certificate**
   - In hPanel, go to **SSL** section
   - Enable **Let's Encrypt SSL** for your domain
   - Include both `beatsmed.ae` and `www.beatsmed.ae`

### Step 4: Force HTTPS (Optional but Recommended)

Create a `.htaccess` file in `public_html` with the following content:

```apache
RewriteEngine On
RewriteCond %{HTTPS} !=on
RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Optional: Redirect www to non-www (or vice versa)
RewriteCond %{HTTP_HOST} ^www\.(.*)$ [NC]
RewriteRule ^(.*)$ https://%1/$1 [R=301,L]
```

## 🔄 Future Updates

To update your website:

1. **Make changes locally**
2. **Rebuild the static export:**
   ```bash
   rm -rf .next out
   npm run build
   ```
3. **Create new deployment package:**
   ```bash
   cd out && zip -r ../beatsmed-static-updated.zip .
   ```
4. **Upload and extract** the new ZIP file to `public_html`

## 📋 Build Commands Reference

```bash
# Clean previous builds
rm -rf .next out

# Install dependencies (if needed)
npm ci

# Build static export
npm run build

# Create deployment package
cd out && zip -r ../beatsmed-static.zip .
```

## 🌟 Features Included

- ✅ **Professional Homepage** with hero section and company overview
- ✅ **Product Catalog** with detailed product information
- ✅ **Contact Form** with Formspree integration
- ✅ **WhatsApp Integration** for direct customer communication
- ✅ **All Business Pages** (About, Services, Brands, etc.)
- ✅ **Mobile Responsive Design**
- ✅ **SEO Optimized** with proper meta tags
- ✅ **Fast Loading** static files
- ✅ **Professional UI/UX** with modern design

## 🔍 Testing Your Deployment

After deployment, test these features:

1. **Homepage Loading** - Check if the site loads correctly
2. **Navigation** - Test all menu links
3. **Contact Form** - Submit a test message via Formspree
4. **WhatsApp Links** - Verify WhatsApp integration works
5. **Mobile Responsiveness** - Test on different devices
6. **SSL Certificate** - Ensure HTTPS is working

## 🆘 Troubleshooting

### Common Issues:

1. **404 Errors on Page Refresh**
   - Add this to `.htaccess`:
   ```apache
   RewriteEngine On
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteCond %{REQUEST_FILENAME} !-d
   RewriteRule ^(.*)$ /$1.html [L]
   ```

2. **Images Not Loading**
   - Check if all image files are uploaded
   - Verify file paths are correct

3. **Contact Form Not Working**
   - Verify Formspree endpoint is correct
   - Check Formspree dashboard for submissions

4. **Slow Loading**
   - Enable Gzip compression in `.htaccess`:
   ```apache
   <IfModule mod_deflate.c>
   AddOutputFilterByType DEFLATE text/plain
   AddOutputFilterByType DEFLATE text/html
   AddOutputFilterByType DEFLATE text/xml
   AddOutputFilterByType DEFLATE text/css
   AddOutputFilterByType DEFLATE application/xml
   AddOutputFilterByType DEFLATE application/xhtml+xml
   AddOutputFilterByType DEFLATE application/rss+xml
   AddOutputFilterByType DEFLATE application/javascript
   AddOutputFilterByType DEFLATE application/x-javascript
   </IfModule>
   ```

## 📞 Support

- **Hostinger Support**: Available 24/7 via live chat
- **Formspree Support**: Check their documentation at formspree.io/help
- **Website Issues**: Check browser console for errors

## 🎉 Deployment Complete!

Your Beats Medical website is now ready for production on Hostinger shared hosting!

**Next Steps:**
1. Set up your Formspree account and update the contact form
2. Upload the files to Hostinger
3. Configure your domain and SSL
4. Test all functionality
5. Go live! 🚀

---

**Build Information:**
- Build Date: $(date)
- Next.js Version: 15.5.4
- Export Type: Static
- Total Pages: 10
- Deployment Package: beatsmed-static.zip