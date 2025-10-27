# Use official PHP with built-in server
FROM php:8.0-cli

# Set working directory
WORKDIR /var/www/html

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy composer files
COPY composer.json composer.lock* ./

# Install system packages and PHP extensions Composer commonly needs
RUN apt-get update \
	&& apt-get install -y --no-install-recommends \
		git \
		unzip \
		zip \
		libzip-dev \
		zlib1g-dev \
		libicu-dev \
	&& docker-php-ext-configure zip --with-libzip \
	&& docker-php-ext-install -j$(nproc) zip intl mbstring \
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
