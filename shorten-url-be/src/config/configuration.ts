export default () => ({
  app: {
    name: 'URL Shortener API',
    version: '1.0.0',
    description: 'URL shortening service',
    environment: process.env.NODE_ENV || 'development',
  },
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    uri: process.env.MONGODB_URI,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
    db: parseInt(process.env.REDIS_DB, 10) || 0,
  },
  cache: {
    ttl: parseInt(process.env.CACHE_TTL, 10) || 300,
  },
  throttle: {
    ttl: parseInt(process.env.THROTTLE_TTL, 10) || 60,
    limit: parseInt(process.env.THROTTLE_LIMIT, 10) || 10,
  },
  url: {
    maxGenerationAttempts:
      parseInt(process.env.MAX_GENERATION_ATTEMPTS, 10) || 5,
  },
});
