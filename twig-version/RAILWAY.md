# Deploying to Railway

This guide will help you deploy the Twig Ticket Management App to Railway.

## Prerequisites

- A Railway account (sign up at https://railway.app)
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

2. **Go to Railway Dashboard**: https://railway.app/dashboard

3. **Click "New Project"**

4. **Select "Deploy from GitHub repo"**

5. **Select your repository** and Railway will automatically detect the PHP application

6. **Railway will automatically**:
   - Detect PHP from `composer.json`
   - Run `composer install`
   - Start the application using the `railway.json` configuration

7. **Click on the deployed service** and open the generated URL

8. **Your app will be live!** 🎉

### Option 2: Deploy with Railway CLI

1. **Install Railway CLI**:
   ```bash
   npm install -g @railway/cli
   ```

2. **Login to Railway**:
   ```bash
   railway login
   ```

3. **Initialize and deploy**:
   ```bash
   railway init
   railway up
   ```

4. **Your app will be live!** 🎉

## Important Notes

### File Storage Limitations

⚠️ **Important**: Railway uses ephemeral file systems. The current implementation writes data to JSON files in the `data/` directory, which **will not persist** across deployments or container restarts.

### Solutions for Production:

1. **Use Railway PostgreSQL** (Recommended):
   - Add PostgreSQL service in Railway dashboard
   - Use the DATABASE_URL environment variable
   - Update the code to use a database instead of JSON files

2. **Use Railway Redis**:
   - Add Redis service for session storage
   - Store temporary data in Redis

3. **Use External Storage**:
   - AWS S3
   - Google Cloud Storage
   - Supabase Storage

### Required Changes for Full Functionality

To make the app fully functional on Railway, you'll need to:

1. **Replace file operations** with database calls
2. **Use a proper session store** (Redis, database)
3. **Configure environment variables** for database connections

## Configuration Files

### railway.json
- Configures the build and deployment process
- Sets PHP server to listen on Railway's PORT
- Specifies Composer installation command

## Environment Variables

Railway automatically provides:
- `PORT` - The port to bind to (automatically set)

To add custom environment variables:
1. Go to your project settings
2. Navigate to "Variables"
3. Add your variables

### Example for Database:
```
DATABASE_URL=postgresql://user:password@host:5432/dbname
REDIS_URL=redis://host:6379
```

## Monitoring

Railway provides:
- **Metrics**: CPU, memory, and network usage
- **Logs**: Real-time application logs
- **Deployment History**: Track all deployments

## Troubleshooting

### Issue: App not starting

**Solution**: Check logs in Railway dashboard. Make sure `railway.json` is properly configured.

### Issue: Port binding error

**Solution**: The app uses `$PORT` from Railway. Make sure PHP server uses `0.0.0.0:$PORT`.

### Issue: File write errors

**Solution**: Use a database or external storage instead of local file writes.

### Issue: Sessions not persisting

**Solution**: Implement a proper session storage solution (Redis, database).

## Database Setup (Optional)

1. **Add PostgreSQL service** in Railway dashboard
2. **Get the DATABASE_URL** from service settings
3. **Update your code** to use the database instead of JSON files

## Custom Domain

To add a custom domain:
1. Go to your project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Configure DNS as instructed

## Cost

Railway offers:
- **Free tier**: $5 credit per month
- **Pay-as-you-go**: Usage-based pricing
- **Pro plan**: For more resources

## Next Steps

- [ ] Integrate Railway PostgreSQL for data persistence
- [ ] Set up Redis for session storage
- [ ] Configure custom domain
- [ ] Set up automated deployments from GitHub
- [ ] Add monitoring and alerts

Enjoy your deployed Twig application on Railway! 🚂
