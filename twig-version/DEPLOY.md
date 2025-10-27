# Deploying to Vercel

## Prerequisites

- A Vercel account (sign up at https://vercel.com)
- The Vercel CLI installed (optional, for command line deployment)

## Deployment Steps

### Option 1: Using Vercel CLI (Recommended)

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. **Navigate to the twig-version directory**:
   ```bash
   cd twig-version
   ```

3. **Login to Vercel**:
   ```bash
   vercel login
   ```

4. **Deploy to Vercel**:
   ```bash
   vercel
   ```

5. **Follow the prompts**:
   - Link to existing project or create new
   - Confirm settings
   - Wait for deployment to complete

6. **Your app will be live!** 🎉

### Option 2: Using Git Integration (GitHub/GitLab/Bitbucket)

1. **Push your code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Import to Vercel**:
   - Go to https://vercel.com/new
   - Import your Git repository
   - Vercel will automatically detect the `vercel.json` file
   - Click "Deploy"

3. **Your app will be live!** 🎉

### Option 3: Using Vercel Dashboard

1. **Go to Vercel Dashboard**: https://vercel.com/new
2. **Click "Add New Project"**
3. **Import your Git repository** or upload the `twig-version` folder
4. **Configure project settings** (auto-detected from `vercel.json`)
5. **Click "Deploy"**
6. **Your app will be live!** 🎉

## Environment Variables (Optional)

If you need to set environment variables:

1. Go to your project settings in Vercel
2. Navigate to "Environment Variables"
3. Add any required variables

## Important Notes

### File Storage Limitations

⚠️ **Important**: Vercel serverless functions are read-only. The current implementation writes data to JSON files in the `data/` directory, which **will not persist** across deployments.

### Solutions for Production:

1. **Use a Database** (Recommended):
   - PostgreSQL on Vercel Postgres
   - MongoDB Atlas
   - Supabase
   - Firebase

2. **Use External Storage**:
   - AWS S3
   - Google Cloud Storage
   - Azure Blob Storage

3. **Use Vercel KV** (Redis):
   - For session storage and temporary data

### Updating the App for Vercel

To make the app fully functional on Vercel, you'll need to:

1. **Replace file operations** with database calls
2. **Use a proper session store** (Redis, database)
3. **Configure environment variables** for database connections

## Custom Domain

To add a custom domain:

1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain
4. Follow the DNS configuration instructions

## Monitoring

Vercel provides built-in analytics and monitoring:

- **Analytics**: Page views, performance metrics
- **Logs**: Serverless function logs
- **Metrics**: Response times, error rates

## Troubleshooting

### Issue: 500 Error on deployment

**Solution**: Check the Vercel logs for PHP errors. Make sure all dependencies are listed in `composer.json`.

### Issue: Routes not working

**Solution**: Verify the `vercel.json` routes are configured correctly.

### Issue: Session not persisting

**Solution**: Implement a proper session storage solution (Redis, database) as serverless functions don't share state.

### Issue: File write errors

**Solution**: Use a database or external storage instead of local file writes.

## Testing Locally

You can test the Vercel configuration locally:

```bash
# Install Vercel CLI
npm install -g vercel

# Run locally
vercel dev
```

## Deployment URL

After deployment, Vercel will provide you with:
- **Production URL**: `https://your-project.vercel.app`
- **Preview URLs**: For each git push

Enjoy your deployed Twig application! 🚀
