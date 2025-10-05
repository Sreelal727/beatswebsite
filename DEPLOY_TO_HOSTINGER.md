# Deploy to Your Hostinger VPS (72.60.203.93)

## Quick Deployment Steps

### 1. Connect to Your VPS
```bash
ssh root@72.60.203.93
```

### 2. Clone and Deploy
```bash
# Clone the repository
git clone https://github.com/Sreelal727/beatswebsite.git
cd beatswebsite

# Make deployment script executable
chmod +x deploy.sh

# Run automated deployment
./deploy.sh
```

### 3. Configure Environment Variables
```bash
# Copy and edit environment file
cp .env.example .env
nano .env

# Update these key variables:
DOMAIN=your-domain.com
NEXT_PUBLIC_APP_URL=https://your-domain.com
VPS_IP=72.60.203.93
```

### 4. Configure Domain DNS
Point your domain's A record to: `72.60.203.93`

### 5. Setup SSL (After domain is configured)
```bash
# Install SSL certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

## What the Deployment Script Does:

1. ✅ Updates Ubuntu system
2. ✅ Installs Node.js 20.x
3. ✅ Installs PM2 process manager
4. ✅ Installs and configures Nginx
5. ✅ Builds the Next.js application
6. ✅ Starts the app with PM2
7. ✅ Configures firewall
8. ✅ Sets up log rotation

## After Deployment:

- **Website:** http://72.60.203.93 (or your domain)
- **Health Check:** http://72.60.203.93/api/health
- **PM2 Status:** `pm2 status`
- **Nginx Status:** `sudo systemctl status nginx`

## Troubleshooting:

```bash
# Check application logs
pm2 logs beatsmed

# Check Nginx logs
sudo tail -f /var/log/nginx/error.log

# Restart application
pm2 restart beatsmed

# Restart Nginx
sudo systemctl restart nginx
```

## Management Commands:

```bash
# Update application
cd /var/www/beatswebsite
git pull origin main
npm run build
pm2 restart beatsmed

# Monitor resources
htop
pm2 monit
```

For detailed documentation, see: `HOSTINGER_VPS_DEPLOYMENT.md`