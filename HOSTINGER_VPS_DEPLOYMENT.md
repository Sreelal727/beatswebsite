# Beats Medical Website - Hostinger VPS Deployment Guide

This guide provides step-by-step instructions for deploying the Beats Medical Next.js website on Hostinger VPS with full dynamic functionality.

## 📋 Prerequisites

### Hostinger VPS Requirements
- **VPS Plan**: Minimum VPS 1 (1 vCPU, 1GB RAM, 20GB SSD)
- **Operating System**: Ubuntu 22.04 LTS (recommended)
- **Domain**: Registered domain pointing to your VPS IP
- **SSH Access**: Root or sudo user access

### Local Requirements
- Git installed on your local machine
- SSH client (Terminal on macOS/Linux, PuTTY on Windows)
- FTP/SFTP client (optional, for file transfers)

## 🚀 Quick Start

### Option 1: Automated Deployment (Recommended)

1. **Connect to your VPS via SSH:**
   ```bash
   ssh root@your-vps-ip
   # or
   ssh username@your-vps-ip
   ```

2. **Clone the repository:**
   ```bash
   cd /var/www
   git clone https://github.com/yourusername/beatsmed.git
   cd beatsmed
   ```

3. **Update deployment configuration:**
   ```bash
   # Edit the deployment script with your domain
   nano deploy.sh
   # Change DOMAIN="your-domain.com" to your actual domain
   ```

4. **Run the automated deployment:**
   ```bash
   chmod +x deploy.sh
   ./deploy.sh
   ```

5. **Setup SSL certificate:**
   ```bash
   ./deploy.sh ssl
   ```

### Option 2: Manual Deployment

Follow the detailed steps below for manual deployment.

## 🔧 Detailed Manual Deployment

### Step 1: Initial VPS Setup

1. **Connect to your VPS:**
   ```bash
   ssh root@your-vps-ip
   ```

2. **Update the system:**
   ```bash
   apt update && apt upgrade -y
   ```

3. **Create a non-root user (recommended):**
   ```bash
   adduser beatsmed
   usermod -aG sudo beatsmed
   su - beatsmed
   ```

### Step 2: Install Required Software

1. **Install Node.js 18:**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

2. **Install PM2 globally:**
   ```bash
   sudo npm install -g pm2
   ```

3. **Install Nginx:**
   ```bash
   sudo apt install -y nginx
   ```

4. **Install Git:**
   ```bash
   sudo apt install -y git
   ```

### Step 3: Deploy the Application

1. **Clone the repository:**
   ```bash
   cd /var/www
   sudo git clone https://github.com/yourusername/beatsmed.git
   sudo chown -R beatsmed:beatsmed beatsmed
   cd beatsmed
   ```

2. **Install dependencies:**
   ```bash
   npm ci --production
   ```

3. **Create environment file:**
   ```bash
   cp .env.example .env.production
   nano .env.production
   ```
   
   Update with your production values:
   ```env
   NODE_ENV=production
   PORT=3000
   DOMAIN=your-domain.com
   NEXT_PUBLIC_SITE_URL=https://your-domain.com
   ```

4. **Build the application:**
   ```bash
   npm run build
   ```

### Step 4: Configure PM2

1. **Start the application with PM2:**
   ```bash
   pm2 start ecosystem.config.js --env production
   ```

2. **Save PM2 configuration:**
   ```bash
   pm2 save
   pm2 startup
   # Follow the instructions provided by the startup command
   ```

3. **Verify the application is running:**
   ```bash
   pm2 status
   pm2 logs beatsmed
   ```

### Step 5: Configure Nginx

1. **Create Nginx configuration:**
   ```bash
   sudo nano /etc/nginx/sites-available/beatsmed
   ```

2. **Add the following configuration:**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com www.your-domain.com;
       
       # Security headers
       add_header X-Frame-Options "SAMEORIGIN" always;
       add_header X-XSS-Protection "1; mode=block" always;
       add_header X-Content-Type-Options "nosniff" always;
       add_header Referrer-Policy "no-referrer-when-downgrade" always;
       
       # Gzip compression
       gzip on;
       gzip_vary on;
       gzip_min_length 1024;
       gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
           proxy_cache_bypass $http_upgrade;
       }
       
       # Static files caching
       location /_next/static {
           proxy_pass http://localhost:3000;
           add_header Cache-Control "public, max-age=31536000, immutable";
       }
       
       # API routes
       location /api {
           proxy_pass http://localhost:3000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }
   }
   ```

3. **Enable the site:**
   ```bash
   sudo ln -s /etc/nginx/sites-available/beatsmed /etc/nginx/sites-enabled/
   sudo rm /etc/nginx/sites-enabled/default
   ```

4. **Test and restart Nginx:**
   ```bash
   sudo nginx -t
   sudo systemctl restart nginx
   sudo systemctl enable nginx
   ```

### Step 6: Setup SSL with Let's Encrypt

1. **Install Certbot:**
   ```bash
   sudo apt install -y certbot python3-certbot-nginx
   ```

2. **Obtain SSL certificate:**
   ```bash
   sudo certbot --nginx -d your-domain.com -d www.your-domain.com
   ```

3. **Verify auto-renewal:**
   ```bash
   sudo certbot renew --dry-run
   ```

### Step 7: Configure Firewall

1. **Enable UFW firewall:**
   ```bash
   sudo ufw enable
   ```

2. **Allow necessary ports:**
   ```bash
   sudo ufw allow ssh
   sudo ufw allow 'Nginx Full'
   ```

3. **Check firewall status:**
   ```bash
   sudo ufw status
   ```

## 🐳 Docker Deployment (Alternative)

If you prefer containerized deployment:

1. **Install Docker:**
   ```bash
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   sudo usermod -aG docker $USER
   ```

2. **Install Docker Compose:**
   ```bash
   sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   ```

3. **Deploy with Docker Compose:**
   ```bash
   cd /var/www/beatsmed
   docker-compose up -d
   ```

## 📊 Monitoring and Maintenance

### Health Checks

1. **Application health:**
   ```bash
   curl http://localhost:3000/api/health
   ```

2. **PM2 monitoring:**
   ```bash
   pm2 monit
   pm2 logs beatsmed
   ```

3. **Nginx status:**
   ```bash
   sudo systemctl status nginx
   ```

### Log Management

1. **Application logs:**
   ```bash
   pm2 logs beatsmed --lines 100
   ```

2. **Nginx logs:**
   ```bash
   sudo tail -f /var/log/nginx/access.log
   sudo tail -f /var/log/nginx/error.log
   ```

### Performance Optimization

1. **Enable Nginx caching:**
   ```nginx
   # Add to your Nginx config
   proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=my_cache:10m max_size=10g inactive=60m;
   
   location / {
       proxy_cache my_cache;
       proxy_cache_valid 200 302 10m;
       proxy_cache_valid 404 1m;
       # ... other proxy settings
   }
   ```

2. **PM2 cluster mode:**
   ```bash
   pm2 start ecosystem.config.js --env production
   # The ecosystem.config.js is already configured for cluster mode
   ```

## 🔄 Updates and Maintenance

### Updating the Application

1. **Using the deployment script:**
   ```bash
   cd /var/www/beatsmed
   ./deploy.sh update
   ```

2. **Manual update:**
   ```bash
   cd /var/www/beatsmed
   git pull origin main
   npm ci --production
   npm run build
   pm2 restart beatsmed
   ```

### Backup Strategy

1. **Create backup script:**
   ```bash
   #!/bin/bash
   # backup.sh
   DATE=$(date +%Y%m%d_%H%M%S)
   tar -czf /backups/beatsmed_$DATE.tar.gz /var/www/beatsmed
   ```

2. **Schedule backups with cron:**
   ```bash
   crontab -e
   # Add: 0 2 * * * /path/to/backup.sh
   ```

## 🛠️ Troubleshooting

### Common Issues

1. **Application not starting:**
   ```bash
   pm2 logs beatsmed
   # Check for Node.js version compatibility
   node --version
   ```

2. **502 Bad Gateway:**
   ```bash
   # Check if application is running
   pm2 status
   # Check Nginx configuration
   sudo nginx -t
   ```

3. **SSL certificate issues:**
   ```bash
   sudo certbot certificates
   sudo certbot renew
   ```

4. **Port conflicts:**
   ```bash
   sudo netstat -tulpn | grep :3000
   sudo lsof -i :3000
   ```

### Performance Issues

1. **High memory usage:**
   ```bash
   pm2 monit
   # Consider increasing VPS resources or optimizing application
   ```

2. **Slow response times:**
   ```bash
   # Enable Nginx caching
   # Optimize database queries
   # Use CDN for static assets
   ```

## 📞 Support

### Hostinger VPS Support
- **Knowledge Base**: https://support.hostinger.com/
- **Live Chat**: Available 24/7 through hPanel
- **Ticket System**: Submit tickets through hPanel

### Application Support
- **Health Check**: `https://your-domain.com/api/health`
- **Logs**: `pm2 logs beatsmed`
- **Status**: `pm2 status`

## ✅ Deployment Checklist

- [ ] VPS provisioned and accessible via SSH
- [ ] Domain DNS pointing to VPS IP address
- [ ] Node.js 18+ installed
- [ ] PM2 installed and configured
- [ ] Nginx installed and configured
- [ ] Application deployed and running
- [ ] SSL certificate installed
- [ ] Firewall configured
- [ ] Health checks passing
- [ ] Monitoring setup
- [ ] Backup strategy implemented

## 🎉 Deployment Complete!

Your Beats Medical website is now live on Hostinger VPS with:

- ✅ **Full Next.js functionality** (SSR, API routes, image optimization)
- ✅ **Production-ready configuration** with PM2 process management
- ✅ **Nginx reverse proxy** with caching and compression
- ✅ **SSL/HTTPS encryption** with automatic renewal
- ✅ **Security headers** and firewall protection
- ✅ **Health monitoring** and logging
- ✅ **Automated deployment scripts** for easy updates

### Next Steps

1. **Test all functionality** on your live domain
2. **Setup monitoring** and alerting
3. **Configure backups** and disaster recovery
4. **Optimize performance** based on traffic patterns
5. **Setup CI/CD pipeline** for automated deployments

### Useful Commands

```bash
# Application management
pm2 restart beatsmed
pm2 stop beatsmed
pm2 logs beatsmed
pm2 monit

# Nginx management
sudo systemctl restart nginx
sudo nginx -t

# SSL management
sudo certbot renew
sudo certbot certificates

# System monitoring
htop
df -h
free -h
```

Your website is now ready for production use! 🚀