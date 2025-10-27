# How to Run the Twig Version - Setup Guide

## Prerequisites

You need to have PHP installed on your system. If you don't have it yet, you can:

1. **Download PHP from**: https://www.php.net/downloads.php
2. **Or use XAMPP** (includes PHP, MySQL, Apache): https://www.apachefriends.org/

## Installation Steps

### Option 1: Using XAMPP (Recommended for Windows)

1. **Install XAMPP** from https://www.apachefriends.org/
2. **Start XAMPP Control Panel** and start Apache
3. **Copy the entire `twig-version` folder** to `C:\xampp\htdocs\`
4. **Open your browser** and go to: `http://localhost/twig-version`

### Option 2: Using PHP Built-in Server

1. **Install PHP** from https://www.php.net/downloads.php
2. **Install Composer** from https://getcomposer.org/download/
3. **Open Command Prompt** or PowerShell in the `twig-version` folder

Run these commands:

```bash
# Install Twig dependencies
composer install

# Initialize data files
php init_data.php

# Start the PHP development server
php -S localhost:8000
```

4. **Open your browser** and go to: `http://localhost:8000`

### Option 3: Using Docker (Advanced)

If you have Docker installed:

```bash
# Create a Dockerfile
FROM php:8.0-apache

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Copy application files
COPY . /var/www/html/

# Install dependencies
WORKDIR /var/www/html
RUN composer install

# Expose port
EXPOSE 80

# Start Apache
CMD ["apache2-foreground"]
```

```bash
docker build -t twig-app .
docker run -p 8080:80 twig-app
```

## Using the Application

### Demo Credentials

- **Email**: `demo@ticketstressed.com`
- **Password**: `password123`

### Features

- ✅ Landing page with hero section
- ✅ User authentication (login/signup)
- ✅ Dashboard with ticket statistics
- ✅ Full ticket CRUD operations
- ✅ Session-based authentication
- ✅ JSON file storage

## Troubleshooting

### Issue: "composer: command not found"

**Solution**: Install Composer from https://getcomposer.org/download/

### Issue: "vendor folder not found"

**Solution**: Run `composer install` in the twig-version directory

### Issue: "Can't open data/users.json"

**Solution**: Run `php init_data.php` to create the data directory

### Issue: Permissions error on Windows

**Solution**: 
- Make sure you have write permissions in the `twig-version` folder
- Run Command Prompt as Administrator if needed

## File Structure

```
twig-version/
├── data/              # JSON data files (created by init_data.php)
├── cache/             # Twig cache (auto-generated)
├── templates/         # Twig template files
│   ├── base.twig
│   ├── landing.twig
│   ├── login.twig
│   ├── signup.twig
│   ├── dashboard.twig
│   ├── tickets.twig
│   └── 404.twig
├── index.php          # Main application entry point
├── init_data.php      # Data initialization script
├── composer.json      # PHP dependencies
├── .htaccess          # Apache rewrite rules
└── README.md          # Full documentation
```

## Quick Start (Using XAMPP)

1. Install XAMPP
2. Copy `twig-version` folder to `C:\xampp\htdocs\`
3. Start Apache from XAMPP Control Panel
4. Open browser: `http://localhost/twig-version`
5. Login with demo credentials

That's it! 🎉


