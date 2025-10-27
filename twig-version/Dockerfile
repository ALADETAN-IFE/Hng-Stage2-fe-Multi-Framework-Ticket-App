# Use official PHP with built-in server
FROM php:8.0-cli

# Set working directory
WORKDIR /var/www/html

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy composer files
COPY composer.json composer.lock* ./

# Install system packages and PHP extensions Composer commonly needs
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update \
	&& apt-get install -y --no-install-recommends \
		ca-certificates \
		git \
		unzip \
		zip \
		libzip-dev \
		zlib1g-dev \
		libicu-dev \
		libxml2-dev \
		libonig-dev \
		build-essential \
		pkg-config \
		autoconf \
	&& docker-php-ext-install -j$(nproc) zip intl mbstring \
	# remove build-only packages to shrink image
	&& apt-get remove -y --purge build-essential pkg-config autoconf \
	&& apt-get autoremove -y \
	&& rm -rf /var/lib/apt/lists/*

# Install PHP dependencies (run after required extensions are available)
RUN composer install --no-dev --optimize-autoloader --no-interaction --prefer-dist

# Copy application files
COPY . .

# Create necessary directories
RUN mkdir -p data cache

# Expose port (Render will provide PORT env var)
EXPOSE $PORT

# Start PHP built-in server
CMD php -S 0.0.0.0:${PORT:-8080} -t .
