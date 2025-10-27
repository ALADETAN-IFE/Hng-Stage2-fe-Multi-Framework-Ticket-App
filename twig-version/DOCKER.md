# Docker Setup Guide

This guide will help you run the Twig Ticket Management App using Docker.

## Prerequisites

- Docker installed on your system
  - Windows: [Docker Desktop](https://www.docker.com/products/docker-desktop)
  - Mac: [Docker Desktop](https://www.docker.com/products/docker-desktop)
  - Linux: [Docker Engine](https://docs.docker.com/engine/install/)

- Docker Compose (usually included with Docker Desktop)

## Quick Start

### Using Docker Compose (Recommended)

1. **Navigate to the twig-version directory**:
   ```bash
   cd twig-version
   ```

2. **Start the application**:
   ```bash
   docker-compose up
   ```

3. **Initialize the data**:
   ```bash
   docker exec -it twig-ticket-app php init_data.php
   ```

4. **Open your browser** and go to: `http://localhost:8080`

5. **Login with demo credentials**:
   - Email: `demo@ticketstressed.com`
   - Password: `password123`

6. **Stop the application**:
   ```bash
   docker-compose down
   ```

### Using Docker Only

1. **Build the Docker image**:
   ```bash
   docker build -t twig-ticket-app .
   ```

2. **Run the container**:
   ```bash
   docker run -d \
     --name twig-app \
     -p 8080:80 \
     -v $(pwd)/data:/var/www/html/data \
     twig-ticket-app
   ```

3. **Initialize the data**:
   ```bash
   docker exec -it twig-app php init_data.php
   ```

4. **Open your browser** and go to: `http://localhost:8080`

5. **Stop the container**:
   ```bash
   docker stop twig-app
   docker rm twig-app
   ```

## Docker Compose Services

The `docker-compose.yml` file includes three services:

### 1. Web Service (PHP Apache)
- **Container**: `twig-ticket-app`
- **Port**: 8080
- **Service**: Main PHP application
- **URL**: http://localhost:8080

### 2. Database Service (MySQL)
- **Container**: `twig-mysql`
- **Port**: 3306
- **Service**: MySQL database (for future database integration)
- **Credentials**:
  - User: `root`
  - Password: `rootpassword`
  - Database: `ticket_app`

### 3. phpMyAdmin Service
- **Container**: `twig-phpmyadmin`
- **Port**: 8081
- **Service**: Database management UI
- **URL**: http://localhost:8081

## Useful Docker Commands

### Start services
```bash
docker-compose up -d
```

### Stop services
```bash
docker-compose down
```

### View logs
```bash
docker-compose logs -f web
```

### Access container shell
```bash
docker exec -it twig-ticket-app bash
```

### Rebuild after changes
```bash
docker-compose up -d --build
```

### Clean up (remove all containers and volumes)
```bash
docker-compose down -v
```

## Development Mode

For development with hot-reload:

1. **Start in development mode**:
   ```bash
   docker-compose up
   ```

2. **Edit files locally** - changes will be reflected immediately (volumes are mounted)

3. **View logs in real-time**:
   ```bash
   docker-compose logs -f
   ```

## Troubleshooting

### Issue: Port already in use

**Solution**: Change the ports in `docker-compose.yml`:
```yaml
ports:
  - "8080:80"  # Change 8080 to another port
```

### Issue: Permission denied

**Solution**: On Linux/Mac, you might need to fix permissions:
```bash
sudo chown -R $USER:$USER data/
```

### Issue: Can't access the application

**Solution**: Check if containers are running:
```bash
docker-compose ps
```

### Issue: Database connection issues

**Solution**: Make sure all containers are up:
```bash
docker-compose ps
# All should show "Up" status
```

### Issue: Changes not reflected

**Solution**: Rebuild the containers:
```bash
docker-compose down
docker-compose up -d --build
```

## Production Deployment

### Using Docker

1. **Build the production image**:
   ```bash
   docker build -t twig-ticket-app:latest .
   ```

2. **Tag for registry** (e.g., Docker Hub):
   ```bash
   docker tag twig-ticket-app:latest yourusername/twig-ticket-app:latest
   ```

3. **Push to registry**:
   ```bash
   docker push yourusername/twig-ticket-app:latest
   ```

4. **Pull and run on server**:
   ```bash
   docker pull yourusername/twig-ticket-app:latest
   docker run -d -p 80:80 --name ticket-app yourusername/twig-ticket-app:latest
   ```

### Using Docker Compose on Server

1. **Copy files to server**:
   ```bash
   scp -r . user@server:/path/to/app
   ```

2. **SSH into server**:
   ```bash
   ssh user@server
   ```

3. **Run docker-compose**:
   ```bash
   cd /path/to/app
   docker-compose up -d
   ```

## Environment Variables

You can override environment variables using a `.env` file:

```env
MYSQL_ROOT_PASSWORD=your_password
MYSQL_DATABASE=ticket_app
MYSQL_USER=ticket_user
MYSQL_PASSWORD=your_password
```

## Data Persistence

Data is stored in Docker volumes:
- `mysql-data`: Database data
- `./data`: Application data (JSON files)

To backup data:
```bash
docker cp twig-ticket-app:/var/www/html/data ./backup-data
```

## Security Notes

⚠️ **Important**: The default Docker setup is for development only.

For production:
1. Change all default passwords
2. Use environment variables for sensitive data
3. Enable HTTPS
4. Use Docker secrets for credentials
5. Regularly update base images
6. Implement proper firewall rules

## Next Steps

- [ ] Integrate MySQL database for data persistence
- [ ] Set up automatic backups
- [ ] Configure reverse proxy (nginx)
- [ ] Enable HTTPS/SSL certificates
- [ ] Set up monitoring and logging
- [ ] Implement CI/CD pipeline

Enjoy running your Ticket Management App with Docker! 🐳
