# URL Shortener API

## Quick Start

### Prerequisites
- Docker and Docker Compose installed on your machine 
  - https://www.youtube.com/watch?v=ZyBBv1JmnWQ

### Running the Application

1. Clone the repository:
```bash
git clone <repository-url>
cd shorten-url\\shorten-url-be
```

2. Pull docker image
```bash
docker pull nad1011/shorten-url:latest
```

2. Start all services:
```bash
docker-compose up -d
```

This will start:
- API server on port 3000
- Redis on port 6379

3. Check the API status:
```bash
curl http://localhost:3000/health
```

### Development

- The API code is mounted as a volume, so changes will reflect immediately with hot reload
- To rebuild after dependencies change: `docker-compose up -d --build`

### Available Endpoints

- `GET /` - API information
- `GET /health` - Health check
- `POST /url` - Create short URL
- `GET /url/:id` - Get original URL
- `POST /url/bulk` - Bulk create short URLs

### Endpoints tutorials
- `POST /url` - Pass a a field to body url: "https"
- `POST /url/bulk` - Pass a a field to body urls: []

### Rate Limits

- GET requests: 120 requests per minute
- POST single URL: 60 requests per minute
- POST bulk URLs: 15 requests per minute