# Deploying to Render

This guide will help you deploy the Twig Ticket Management App to Render.

## Prerequisites

- A Render account (sign up at https://render.com)
- Your code pushed to a GitHub repository

## Deployment Steps

### Option 1: Deploy from GitHub (Recommended)

1. **Create a GitHub repository** and push your code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Go to Render Dashboard**: https://dashboard.render.com

3. **Click "New +" and select "Web Service"**

4. **Connect your GitHub repository**

5. **Configure your service**:
   - **Name**: `twig-ticket-app` (or any name you prefer)
   - **Runtime**: PHP
   - **Build Command**: `composer install --no-dev --optimize-autoloader`
   - **Start Command**: `php -S 0.0.0.0:$PORT`

6. **Click "Create Web Service"**

7. **Render will automatically**:
   - Detect PHP from `composer.json`
   - Run the build command
   - Start the application
   - Provide you with a URL

8. **Your app will be live!** 🎉

### Option 2: Deploy using Render Blueprint

1. **Push your code to GitHub** with `render.yaml` file

2. **Go to Render Dashboard**: https://dashboard.render.com

3. **Click "New +" and select "Blueprint"**

4. **Connect your GitHub repository**

5. **Render will detect `render.yaml` and deploy automatically**

6. **Your app will be live!** 🎉

## Important Notes

### File Storage Limitations

⚠️ **Important**: Render uses ephemeral file systems. The current implementation writes data to JSON files in the `data/` directory, which **will not persist** across deployments or container restarts.

### Solutions for Production:

1. **Use Render PostgreSQL** (Recommended):
   - Add PostgreSQL database in Render dashboard
   - Use the DATABASE_URL environment variable
   - Update the code to use a database instead of JSON files

2. **Use Render Redis**:
   - Add Redis service for session storage
   - Store temporary data in Redis

3. **Use External Storage**:
   - AWS S3
   - Google Cloud Storage
   - Supabase Storage

### Required Changes for Full Functionality

To make the app fully functional on Render, you'll need to:

1. **Replace file operations** with database calls
2. **Use a proper session store** (Redis, database)
3. **Configure environment variables** for database connections

## Configuration Files

### render.yaml
- Render Blueprint for automatic deployment
- Configures the build and start commands
- Sets environment variables

## Environment Variables

Render automatically provides:
- `PORT` - The port to bind to (automatically set)

To add custom environment variables:
1. Go to your service settings
2. Navigate to "Environment"
3. Add your variables

### Example for Database:
```
DATABASE_URL=postgresql://user:password@host:5432/dbname
REDIS_URL=redis://host:6379
```

## Monitoring

Render provides:
- **Metrics**: CPU, memory, and network usage
- **Logs**: Real-time application logs
- **Deployment History**: Track all deployments
- **Deploy Hooks**: Automatically deploy on git push

## Free Tier

Render offers:
- **Free tier**: Persistent web services (may spin down after inactivity)
- **Starter plan**: $7/month for always-on web services
- **Professional**: For production workloads

## Custom Domain

To add a custom domain:
1. Go to your service settings
2. Navigate to "Custom Domains"
3. Add your custom domain
4. Configure DNS as instructed

## Troubleshooting

### Issue: App not starting

**Solution**: Check logs in Render dashboard. Make sure build and start commands are correct.

### Issue: Port binding error

**Solution**: The app uses `$PORT` from Render. Make sure PHP server uses `0.0.0.0:$PORT`.

### Issue: File write errors

**Solution**: Use a database or external storage instead of local file writes.

### Issue: Sessions not persisting

**Solution**: Implement a proper session storage solution (Redis, database).

## Database Setup (Optional)

1. **Add PostgreSQL database** in Render dashboard
2. **Get the DATABASE_URL** from service settings
3. **Update your code** to use the database instead of JSON files

## Auto-Deploy

Render automatically deploys when you:
- Push to your main/master branch
- Merge a pull request

To disable auto-deploy:
1. Go to service settings
2. Navigate to "Auto-Deploy"
3. Toggle off

## SSH Access

For debugging, you can SSH into your service:
1. Install Render CLI: `npm install -g render-cli`
2. Login: `render login`
3. SSH: `render shell`

## Next Steps

- [ ] Integrate Render PostgreSQL for data persistence
- [ ] Set up Redis for session storage
- [ ] Configure custom domain
- [ ] Set up monitoring and alerts
- [ ] Enable auto-deploy

Enjoy your deployed Twig application on Render! 🚀
