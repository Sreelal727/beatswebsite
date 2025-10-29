#!/bin/bash

# Beats Medical Website - VPS Deployment Script
# This script automates the deployment process for Hostinger VPS

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
APP_NAME="beatsmed"
APP_DIR="/var/www/beatsmed"
NGINX_CONFIG="/etc/nginx/sites-available/beatsmed"
DOMAIN="your-domain.com"  # Replace with your actual domain
NODE_VERSION="18"

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if running as root
check_root() {
    if [[ $EUID -eq 0 ]]; then
        print_error "This script should not be run as root for security reasons."
        print_status "Please run as a regular user with sudo privileges."
        exit 1
    fi
}

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to install Node.js
install_nodejs() {
    print_status "Installing Node.js ${NODE_VERSION}..."
    
    if command_exists node; then
        NODE_CURRENT=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
        if [[ "$NODE_CURRENT" -ge "$NODE_VERSION" ]]; then
            print_success "Node.js ${NODE_CURRENT} is already installed"
            return 0
        fi
    fi
    
    # Install Node.js using NodeSource repository
    curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | sudo -E bash -
    sudo apt-get install -y nodejs
    
    print_success "Node.js installed successfully"
}

# Function to install PM2
install_pm2() {
    print_status "Installing PM2..."
    
    if command_exists pm2; then
        print_success "PM2 is already installed"
        return 0
    fi
    
    sudo npm install -g pm2
    
    # Setup PM2 startup script
    sudo pm2 startup
    
    print_success "PM2 installed successfully"
}

# Function to install and configure Nginx
install_nginx() {
    print_status "Installing and configuring Nginx..."
    
    if command_exists nginx; then
        print_success "Nginx is already installed"
    else
        sudo apt-get update
        sudo apt-get install -y nginx
    fi
    
    # Create Nginx configuration
    sudo tee $NGINX_CONFIG > /dev/null <<EOF
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private must-revalidate auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        
        # Timeout settings
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
    
    # Static files caching
    location /_next/static {
        proxy_pass http://localhost:3000;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }
    
    # API routes
    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
    
    # Security: Block access to sensitive files
    location ~ /\. {
        deny all;
    }
    
    location ~ /\.env {
        deny all;
    }
}
EOF
    
    # Enable the site
    sudo ln -sf $NGINX_CONFIG /etc/nginx/sites-enabled/
    
    # Remove default site if it exists
    sudo rm -f /etc/nginx/sites-enabled/default
    
    # Test Nginx configuration
    sudo nginx -t
    
    # Restart Nginx
    sudo systemctl restart nginx
    sudo systemctl enable nginx
    
    print_success "Nginx configured successfully"
}

# Function to setup SSL with Let's Encrypt
setup_ssl() {
    print_status "Setting up SSL with Let's Encrypt..."
    
    if ! command_exists certbot; then
        sudo apt-get install -y certbot python3-certbot-nginx
    fi
    
    # Obtain SSL certificate
    sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN --non-interactive --agree-tos --email admin@$DOMAIN
    
    print_success "SSL certificate installed successfully"
}

# Function to deploy the application
deploy_app() {
    print_status "Deploying the application..."
    
    # Create app directory
    sudo mkdir -p $APP_DIR
    sudo chown $USER:$USER $APP_DIR
    
    # Copy application files
    print_status "Copying application files..."
    rsync -av --exclude='node_modules' --exclude='.git' --exclude='.next' --exclude='out' ./ $APP_DIR/
    
    cd $APP_DIR
    
    # Install dependencies
    print_status "Installing dependencies..."
    npm ci --production
    
    # Build the application
    print_status "Building the application..."
    npm run build
    
    print_success "Application deployed successfully"
}

# Function to setup environment variables
setup_env() {
    print_status "Setting up environment variables..."
    
    if [[ ! -f "$APP_DIR/.env.production" ]]; then
        cat > $APP_DIR/.env.production <<EOF
NODE_ENV=production
PORT=3000
# Add your production environment variables here
# DATABASE_URL=your_database_url
# API_KEY=your_api_key
EOF
        print_warning "Please edit $APP_DIR/.env.production with your production environment variables"
    fi
}

# Function to start the application with PM2
start_app() {
    print_status "Starting the application with PM2..."
    
    cd $APP_DIR
    
    # Stop existing process if running
    pm2 delete $APP_NAME 2>/dev/null || true
    
    # Start the application
    pm2 start npm --name $APP_NAME -- start
    
    # Save PM2 configuration
    pm2 save
    
    print_success "Application started successfully"
}

# Function to setup firewall
setup_firewall() {
    print_status "Configuring firewall..."
    
    # Enable UFW if not already enabled
    sudo ufw --force enable
    
    # Allow SSH, HTTP, and HTTPS
    sudo ufw allow ssh
    sudo ufw allow 'Nginx Full'
    
    print_success "Firewall configured successfully"
}

# Function to setup log rotation
setup_logs() {
    print_status "Setting up log rotation..."
    
    sudo tee /etc/logrotate.d/beatsmed > /dev/null <<EOF
$APP_DIR/logs/*.log {
    daily
    missingok
    rotate 52
    compress
    delaycompress
    notifempty
    create 644 $USER $USER
    postrotate
        pm2 reload $APP_NAME
    endscript
}
EOF
    
    # Create logs directory
    mkdir -p $APP_DIR/logs
    
    print_success "Log rotation configured successfully"
}

# Function to run health check
health_check() {
    print_status "Running health check..."
    
    sleep 5  # Wait for app to start
    
    if curl -f http://localhost:3000 > /dev/null 2>&1; then
        print_success "Application is running and responding"
    else
        print_error "Application health check failed"
        print_status "Checking PM2 status..."
        pm2 status
        print_status "Checking application logs..."
        pm2 logs $APP_NAME --lines 20
        exit 1
    fi
}

# Main deployment function
main() {
    print_status "Starting Beats Medical VPS deployment..."
    
    # Check prerequisites
    check_root
    
    # Update system
    print_status "Updating system packages..."
    sudo apt-get update
    sudo apt-get upgrade -y
    
    # Install required software
    install_nodejs
    install_pm2
    install_nginx
    
    # Deploy application
    deploy_app
    setup_env
    
    # Start services
    start_app
    
    # Configure system
    setup_firewall
    setup_logs
    
    # Health check
    health_check
    
    print_success "Deployment completed successfully!"
    print_status "Your application is now running at http://localhost:3000"
    print_status "Nginx is proxying requests from port 80 to your application"
    
    if [[ "$DOMAIN" != "your-domain.com" ]]; then
        print_status "To setup SSL, run: sudo ./deploy.sh ssl"
        print_status "Make sure your domain $DOMAIN points to this server's IP address"
    fi
    
    print_status "To view application logs: pm2 logs $APP_NAME"
    print_status "To restart application: pm2 restart $APP_NAME"
    print_status "To stop application: pm2 stop $APP_NAME"
}

# Handle command line arguments
case "${1:-deploy}" in
    "deploy")
        main
        ;;
    "ssl")
        setup_ssl
        ;;
    "restart")
        print_status "Restarting application..."
        cd $APP_DIR
        pm2 restart $APP_NAME
        print_success "Application restarted"
        ;;
    "logs")
        pm2 logs $APP_NAME
        ;;
    "status")
        pm2 status
        ;;
    "update")
        print_status "Updating application..."
        cd $APP_DIR
        git pull origin main
        npm ci --production
        npm run build
        pm2 restart $APP_NAME
        print_success "Application updated"
        ;;
    *)
        echo "Usage: $0 {deploy|ssl|restart|logs|status|update}"
        echo "  deploy  - Full deployment (default)"
        echo "  ssl     - Setup SSL certificate"
        echo "  restart - Restart the application"
        echo "  logs    - View application logs"
        echo "  status  - Check PM2 status"
        echo "  update  - Update application from git"
        exit 1
        ;;
esac