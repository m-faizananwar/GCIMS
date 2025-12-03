# Deployment Guide

This guide walks you through deploying the GCIMS Backend API on Render and integrating it with a Next.js frontend on Vercel.

## Step 1: Prepare Your Repository

Ensure your GitHub repository includes:
- `Dockerfile` - Docker configuration for Render
- `render.yaml` - Render deployment configuration
- `CMakeLists.txt` - Build configuration
- `main.cpp` and all source files
- `final_data.json` and `final_data2.json` - Data files
- `.dockerignore` - Docker build optimization
- `.env.example` - Environment variables template

## Step 2: Deploy on Render

### Option A: Using render.yaml (Recommended)

1. Push your code to GitHub with all files above
2. Go to https://dashboard.render.com
3. Click "New +" → "Web Service"
4. Select "Build and deploy from a Git repository"
5. Connect your GitHub account and select the repository
6. Fill in:
   - **Name**: `gcims-api`
   - **Branch**: `main` (or your default branch)
   - **Root Directory**: `Backend` (if in a monorepo)
   - **Runtime**: `Docker`
   - **Plan**: Standard ($12/month)

7. Click "Create Web Service"
8. Render will automatically read `render.yaml` and deploy

### Option B: Manual Configuration

1. Same steps 1-4 as above
2. After connecting repository, fill in:
   - **Build Command**: `mkdir -p build && cd build && cmake -DCMAKE_BUILD_TYPE=Release .. && make`
   - **Start Command**: `./build/GCIMS`
   - **Port**: `8080`

3. Click "Create Web Service"

### Setting Environment Variables on Render

1. Go to your service dashboard
2. Click "Environment"
3. Add variables:
   ```
   PORT=8080
   NODE_ENV=production
   ```
4. Click "Save"

### Monitor Deployment

1. Click "Logs" tab to watch the build progress
2. Once complete, you'll see: "=== Deployment successful"
3. Your API URL will be: `https://gcims-api.onrender.com`

## Step 3: Verify Deployment

Test your API endpoints:

```bash
# Health check
curl https://gcims-api.onrender.com/

# Get all cars
curl https://gcims-api.onrender.com/cars | jq

# Search cars
curl "https://gcims-api.onrender.com/cars/search/name/Tesla"
```

## Step 4: Integrate with Vercel/Next.js

### Configure Next.js Environment

In your Vercel project, add environment variable:

```env
NEXT_PUBLIC_API_URL=https://gcims-api.onrender.com
```

### Example API Integration

```javascript
// lib/api.ts or similar
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export async function getCars() {
  const response = await fetch(`${API_URL}/cars`);
  if (!response.ok) throw new Error('Failed to fetch cars');
  return response.json();
}

export async function searchCars(name: string) {
  const response = await fetch(`${API_URL}/cars/search/name/${encodeURIComponent(name)}`);
  if (!response.ok) throw new Error('Failed to search');
  return response.json();
}
```

### Use in React Components

```tsx
// pages/cars.tsx
import { useEffect, useState } from 'react';
import { getCars } from '@/lib/api';

export default function CarsPage() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCars()
      .then(setCars)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;
  
  return (
    <div>
      {cars.map(car => (
        <div key={car.id}>{car.make} {car.model}</div>
      ))}
    </div>
  );
}
```

## Step 5: Handle CORS

The backend automatically includes CORS headers. If you encounter CORS issues:

1. **In Development**: Both Render and Vercel will have different domains
   - Backend: `https://gcims-api.onrender.com`
   - Frontend: `https://your-app.vercel.app`

2. **CORS is enabled** for all origins in the current setup
   - Headers included: `Access-Control-Allow-Origin: *`
   - This is safe for a public API

3. **To restrict CORS** (optional for production):
   - Modify `main.cpp` to check origin
   - Or add an environment variable for allowed origins

## Troubleshooting

### Build Fails on Render

**Problem**: "CMake not found" or similar
- **Solution**: Render should automatically detect Dockerfile and use it. Verify `Dockerfile` exists in repo root (or `Backend/` folder).

**Problem**: "asio not found"
- **Solution**: Ensure `CMakeLists.txt` has FetchContent for asio. Check commit includes the updated file.

### API Returns 404

**Problem**: Endpoints return "Not Found"
- **Solution**: 
  1. Check health endpoint: `curl https://gcims-api.onrender.com/`
  2. Verify service is running: Check Render logs
  3. Data files loaded correctly: Check `final_data.json` exists in working directory

### Vercel Can't Reach Backend

**Problem**: "Failed to fetch" or CORS errors in browser
- **Solution**:
  1. Verify Render service URL is accessible: `curl https://gcims-api.onrender.com/`
  2. Check `NEXT_PUBLIC_API_URL` in Vercel environment variables
  3. No trailing slash: Use `https://gcims-api.onrender.com` not `https://gcims-api.onrender.com/`

### Cold Start Delays

**Problem**: First request after idle takes 10+ seconds
- **Solution**: This is normal for free Render tier. Upgrade to "Standard" for no cold starts ($7/month extra).

## Performance Tips

1. **Caching**: Add HTTP caching headers to `/cars` endpoint
2. **Pagination**: Implement pagination for large datasets
3. **Compression**: Enable gzip compression in Render settings
4. **Database**: Replace JSON file reads with PostgreSQL (add to Render)

## Monitoring

### Render Dashboard

- View real-time logs
- Monitor CPU/Memory usage
- Check uptime and performance metrics

### Vercel Integration

- Check Function logs if using API routes
- Monitor client-side errors with Sentry or similar

## Next Steps

1. Set up monitoring/alerting
2. Add authentication if needed
3. Implement database for larger datasets
4. Add rate limiting to prevent abuse
5. Set up CI/CD for automatic deployments
