# VPS Quick Reference - Beats Medical Website

## 🚀 Essential Commands

### Application Management (PM2)
```bash
# Start application
pm2 start ecosystem.config.js --env production

# Restart application
pm2 restart beatsmed

# Stop application
pm2 stop beatsmed

# View logs
pm2 logs beatsmed

# Monitor resources
pm2 monit

# Check status
pm2 status

# Save current PM2 processes
pm2 save
```

### Nginx Management
```bash
# Test configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx

# Reload configuration
sudo systemctl reload nginx

# Check status
sudo systemctl status nginx

# View error logs
sudo tail -f /var/log/nginx/error.log

# View access logs
sudo tail -f /var/log/nginx/access.log
```

### SSL Certificate Management
```bash
# Renew certificates
sudo certbot renew

# Check certificate status
sudo certbot certificates

# Test renewal
sudo certbot renew --dry-run

# Manual renewal for specific domain
sudo certbot --nginx -d your-domain.com
```

### System Monitoring
```bash
# Check disk usage
df -h

# Check memory usage
free -h

# Check CPU and processes
htop

# Check network connections
sudo netstat -tulpn

# Check running processes on port 3000
sudo lsof -i :3000

# Check system logs
sudo journalctl -f
```

### Application Updates
```bash
# Quick update using deployment script
cd /var/www/beatsmed
./deploy.sh update

# Manual update
cd /var/www/beatsmed
git pull origin main
npm ci --production
npm run build
pm2 restart beatsmed
```

### Firewall Management
```bash
# Check firewall status
sudo ufw status

# Allow specific port
sudo ufw allow 80
sudo ufw allow 443

# Enable firewall
sudo ufw enable

# Disable firewall
sudo ufw disable
```

## 🔍 Health Checks

### Application Health
```bash
# Check application health endpoint
curl http://localhost:3000/api/health

# Check if application is responding
curl -I http://localhost:3000

# Check with domain
curl -I https://your-domain.com
```

### Service Status
```bash
# Check all services
sudo systemctl status nginx
sudo systemctl status ufw
pm2 status

# Check if ports are open
sudo netstat -tulpn | grep :80
sudo netstat -tulpn | grep :443
sudo netstat -tulpn | grep :3000
```

## 🛠️ Troubleshooting

### Common Issues

**502 Bad Gateway:**
```bash
# Check if app is running
pm2 status
pm2 restart beatsmed

# Check Nginx config
sudo nginx -t
sudo systemctl restart nginx
```

**SSL Issues:**
```bash
# Check certificate
sudo certbot certificates

# Renew certificate
sudo certbot renew

# Check Nginx SSL config
sudo nginx -t
```

**High Memory Usage:**
```bash
# Check memory usage
free -h
pm2 monit

# Restart application
pm2 restart beatsmed
```

**Application Errors:**
```bash
# Check application logs
pm2 logs beatsmed --lines 50

# Check system logs
sudo journalctl -u nginx -f
```

## 📊 Performance Optimization

### Nginx Optimization
```bash
# Edit Nginx config
sudo nano /etc/nginx/sites-available/beatsmed

# Add gzip compression (already included in deployment)
# Add caching headers
# Optimize worker processes
```

### PM2 Optimization
```bash
# Use cluster mode (already configured)
pm2 start ecosystem.config.js --env production

# Monitor performance
pm2 monit

# Restart with memory limit
pm2 restart beatsmed --max-memory-restart 1G
```

## 🔐 Security

### Basic Security Checks
```bash
# Check open ports
sudo netstat -tulpn

# Check firewall rules
sudo ufw status verbose

# Check failed login attempts
sudo grep "Failed password" /var/log/auth.log

# Update system packages
sudo apt update && sudo apt upgrade -y
```

### File Permissions
```bash
# Set correct ownership
sudo chown -R beatsmed:beatsmed /var/www/beatsmed

# Set correct permissions
chmod 755 /var/www/beatsmed
chmod 644 /var/www/beatsmed/.env.production
```

## 📁 Important File Locations

```
/var/www/beatsmed/                 # Application directory
/var/www/beatsmed/.env.production  # Environment variables
/var/www/beatsmed/logs/            # Application logs
/etc/nginx/sites-available/beatsmed # Nginx configuration
/etc/letsencrypt/live/your-domain.com/ # SSL certificates
/var/log/nginx/                    # Nginx logs
~/.pm2/logs/                       # PM2 logs
```

## 🔄 Backup Commands

### Create Backup
```bash
# Application backup
sudo tar -czf /backups/beatsmed_$(date +%Y%m%d).tar.gz /var/www/beatsmed

# Database backup (if applicable)
# pg_dump dbname > backup.sql

# Configuration backup
sudo tar -czf /backups/nginx_config_$(date +%Y%m%d).tar.gz /etc/nginx/sites-available/
```

### Restore Backup
```bash
# Extract application backup
sudo tar -xzf /backups/beatsmed_20240101.tar.gz -C /

# Restart services after restore
pm2 restart beatsmed
sudo systemctl restart nginx
```

## 📞 Emergency Contacts

- **Hostinger Support**: 24/7 via hPanel live chat
- **Application Health**: https://your-domain.com/api/health
- **Server Status**: `pm2 status && sudo systemctl status nginx`

## 🎯 Quick Deployment

For new deployments or major updates:

```bash
# 1. Connect to VPS
ssh username@your-vps-ip

# 2. Navigate to app directory
cd /var/www/beatsmed

# 3. Run deployment script
./deploy.sh

# 4. Setup SSL (first time only)
./deploy.sh ssl

# 5. Verify deployment
curl https://your-domain.com/api/health
```

---

**Remember**: Always test changes in a staging environment before applying to production!