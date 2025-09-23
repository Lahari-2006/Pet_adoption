# Docker Deployment Guide

## Fixed Issues
✅ Java version mismatch - Updated to Java 21
✅ Frontend API configuration - Added environment variable support
✅ Backend health check - Installed curl
✅ Port configuration - Backend runs on port 2017
✅ Docker paths fixed

## How to Deploy and Run

### 1. Build and Start All Services
```bash
docker-compose up --build -d
```

### 2. Check Deployment Status
```bash
# Check if containers are running
docker-compose ps

# Check container logs
docker-compose logs -f

# Check specific service logs
docker-compose logs backend
docker-compose logs frontend
docker-compose logs mysql
```

### 3. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:2017
- **MySQL**: localhost:3307 (user: root, password: root, database: fsadi)

### 4. Stop the Application
```bash
docker-compose down
```

### 5. Stop and Remove Everything (including volumes)
```bash
docker-compose down -v
```

## Troubleshooting

### If backend fails to start:
1. Check logs: `docker-compose logs backend`
2. Rebuild: `docker-compose build --no-cache backend`
3. Restart: `docker-compose restart backend`

### If frontend can't connect to backend:
1. Verify backend is healthy: `docker-compose ps`
2. Check network: `docker network ls`
3. Test backend directly: `curl http://localhost:2017/actuator/health`

### Check container health:
```bash
docker inspect spring-backend --format='{{json .State.Health}}'
```

## Current Status
- MySQL container is running ✅
- Backend is being built (multi-stage build in progress)
- Frontend is ready to deploy

## Environment Variables Set
- Backend: `SERVER_PORT=2017`
- Frontend: `VITE_API_URL=http://backend:2017`
- MySQL: Database `fsadi` with root password