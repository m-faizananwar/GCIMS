# GCIMS Backend API

A high-performance C++ REST API built with Crow framework for the Global Car Information Management System (GCIMS). This backend is designed to serve car data with advanced search and sorting capabilities.

## Features

- **RESTful API** for car data queries
- **CORS support** for integration with Vercel/Next.js frontend
- **Advanced Search** by name, date range, price range, country, location
- **Sorting** by make, model, age, date, price
- **Efficient Data Structures** using AVL trees and hash tables

## Local Development

### Prerequisites

- CMake 3.10+
- C++17 compatible compiler (GCC 13+ or Clang)
- Git

### Building Locally

```bash
cd Backend
mkdir build
cd build
cmake ..
make
```

The executable `GCIMS` will be created in the `build/` directory.

### Running Locally

```bash
./GCIMS
```

The server will start on `http://localhost:8080`

## API Endpoints

### General
- `GET /` - Health check
- `GET /cars` - Get all cars

### Sorting
- `GET /cars/sorted/make/<order>` - Sort by make (ascending/descending)
- `GET /cars/sorted/make_and_model/<order>` - Sort by make and model
- `GET /cars/sorted/age/<order>` - Sort by age
- `GET /cars/sorted/date/<order>` - Sort by date
- `GET /cars/sorted/price/<order>` - Sort by price

### Search
- `GET /cars/search/name/<name>` - Search by car name
- `GET /cars/search/date_range/<startDate>/<endDate>` - Filter by date range
- `GET /cars/search/price_range/<minPrice>/<maxPrice>` - Filter by price range
- `GET /cars/search/country/<country>` - Search by country
- `GET /cars/search?name=<name>&model=<model>&country=<country>&minprice=<min>&maxprice=<max>&latitude=<lat>&longitude=<lon>&radius=<radius>` - Advanced search

## CORS Configuration

The API automatically includes CORS headers in all responses:
- `Access-Control-Allow-Origin: *`
- `Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS`
- `Access-Control-Allow-Headers: Content-Type, Authorization`

For production with Vercel, set the `CORS_ORIGIN` environment variable to restrict access.

## Deployment on Render

### Prerequisites

- GitHub repository with this code
- Render account (render.com)

### Automated Deployment

1. **Connect Repository**: Push your code to GitHub
2. **Create Service on Render**:
   - Go to render.com
   - Click "New +"
   - Select "Web Service"
   - Connect your GitHub repository
   - Render will automatically detect `render.yaml`

3. **Environment Variables**: Set any needed variables in the Render dashboard:
   ```
   PORT=8080
   NODE_ENV=production
   ```

### Manual Deployment

1. Go to https://dashboard.render.com
2. Create a new Web Service
3. Connect your GitHub repo
4. Build Command: `mkdir build && cd build && cmake -DCMAKE_BUILD_TYPE=Release .. && make`
5. Start Command: `./build/GCIMS`
6. Set Port: `8080`

### Docker Deployment

The project includes a multi-stage Dockerfile for optimal image size:

```bash
docker build -t gcims-api .
docker run -p 8080:8080 gcims-api
```

## Integration with Vercel/Next.js Frontend

### API URL Configuration

In your Next.js environment, set:

```env
NEXT_PUBLIC_API_URL=https://your-gcims-api.onrender.com
```

### Example API Call from Next.js

```javascript
// pages/api/cars.js or similar
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export async function getCars() {
  const response = await fetch(`${API_URL}/cars`);
  return response.json();
}
```

### CORS Troubleshooting

If you encounter CORS errors:
1. Verify the Render service is running (`/` endpoint returns "Hello, World!")
2. Check that your frontend domain matches the `CORS_ORIGIN` setting
3. Ensure the API URL in your frontend config is correct

## Environment Variables

Create a `.env` file (copy from `.env.example`):

```env
PORT=8080
HOST=0.0.0.0
NODE_ENV=production
CORS_ORIGIN=https://your-vercel-app.vercel.app
DATA_PATH=./
LOG_LEVEL=info
```

## Performance Optimization

### Production Build Flags

The CMakeLists.txt automatically applies optimizations for Release builds:
- `-O3` optimization level
- `-DNDEBUG` to remove debug code

### Data Management

- Data files (JSON/CSV) should be in the working directory
- Preload data on startup for faster queries
- Use efficient data structures (AVL trees, hash tables)

## Monitoring & Debugging

### Health Check

Render will periodically check `GET /` (health check endpoint) to ensure the service is running.

### Logs

View logs in Render dashboard:
1. Go to your service
2. Click "Logs" tab
3. Filter by date/time as needed

### Local Testing

```bash
# Test basic connectivity
curl http://localhost:8080/

# Test car data endpoint
curl http://localhost:8080/cars | jq

# Test search
curl "http://localhost:8080/cars/search/name/Tesla"
```

## Troubleshooting

### Port Already in Use
```bash
# Find and kill process on port 8080
lsof -ti:8080 | xargs kill -9
```

### Build Failures on Render

- Ensure `CMakeLists.txt` has all dependencies
- Check that `asio` and `crow` are properly fetched
- Verify C++ standard is compatible with compiler

### Data File Issues

- Ensure `final_data.json` and `final_data2.json` are in the working directory
- Check file permissions in Docker image
- Verify relative paths in code match deployment structure

## Development Roadmap

- [ ] Add database integration (PostgreSQL/MongoDB)
- [ ] Implement authentication (JWT)
- [ ] Add rate limiting
- [ ] Improve error handling
- [ ] Add request logging middleware
- [ ] Performance benchmarking

## License

Your license here

## Support

For issues or questions, please open an issue on GitHub.
