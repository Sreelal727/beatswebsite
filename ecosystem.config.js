module.exports = {
  apps: [
    {
      name: 'beatsmed',
      script: 'npm',
      args: 'start',
      cwd: '/var/www/beatsmed',
      instances: 'max', // Use all available CPU cores
      exec_mode: 'cluster',
      
      // Environment variables
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      
      // Logging
      log_file: '/var/www/beatsmed/logs/combined.log',
      out_file: '/var/www/beatsmed/logs/out.log',
      error_file: '/var/www/beatsmed/logs/error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      
      // Auto-restart configuration
      autorestart: true,
      watch: false, // Set to true for development, false for production
      max_memory_restart: '1G',
      
      // Restart policy
      restart_delay: 4000,
      max_restarts: 10,
      min_uptime: '10s',
      
      // Advanced settings
      kill_timeout: 5000,
      listen_timeout: 3000,
      
      // Health monitoring
      health_check_url: 'http://localhost:3000/api/health',
      health_check_grace_period: 3000,
      
      // Source map support
      source_map_support: true,
      
      // Merge logs from all instances
      merge_logs: true,
      
      // Time zone
      time: true,
      
      // Process title
      instance_var: 'INSTANCE_ID',
      
      // Graceful shutdown
      shutdown_with_message: true,
      
      // Node.js specific options
      node_args: [
        '--max-old-space-size=1024',
        '--optimize-for-size'
      ],
      
      // Custom environment for different stages
      env_development: {
        NODE_ENV: 'development',
        PORT: 3000,
        WATCH: true
      },
      
      env_staging: {
        NODE_ENV: 'staging',
        PORT: 3000,
      },
      
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
      }
    }
  ],
  
  // Deployment configuration
  deploy: {
    production: {
      user: 'ubuntu', // Change to your VPS username
      host: ['your-server-ip'], // Change to your VPS IP
      ref: 'origin/main',
      repo: 'https://github.com/yourusername/beatsmed.git', // Change to your repo
      path: '/var/www/beatsmed',
      'pre-deploy-local': '',
      'post-deploy': 'npm ci --production && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
      'ssh_options': 'StrictHostKeyChecking=no'
    },
    
    staging: {
      user: 'ubuntu',
      host: ['your-staging-server-ip'],
      ref: 'origin/develop',
      repo: 'https://github.com/yourusername/beatsmed.git',
      path: '/var/www/beatsmed-staging',
      'post-deploy': 'npm ci && npm run build && pm2 reload ecosystem.config.js --env staging',
      'ssh_options': 'StrictHostKeyChecking=no'
    }
  }
};