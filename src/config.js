import dotenv from 'dotenv';
dotenv.config(); 

export default {
  // Environment
  nodeEnv: process.env.NODE_ENV || 'development',
  backendPort: parseInt(process.env.BACKEND_PORT) || 6101,
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:6102/feeds',
  logLevel: process.env.LOGLEVEL || 'INFO',
  infrastructureIntegration: process.env.INFRASTRUCTURE_INTEGRATION || false,
  // JWT secret
  jwtSecret: process.env.JWT_SECRET || 'horizon-secret',
  // Kafka configuration
  kafkaEnabled: process.env.KAFKA_ENABLED || false,
  kafkaBroker: process.env.KAFKA_BROKER || 'localhost:9092',
  kafkaTopic: process.env.KAFKA_TOPIC || 'logs',
  kafkaServiceName: process.env.KAFKA_SERVICE_NAME || 'FEEDS',
  // Gateway URL
  gatewayUrl: process.env.GATEWAY_URL || 'http://localhost:6900',
  // Redis configuration
  redisCacheEnabled: process.env.REDIS_CACHE_ENABLED || false,
  redisHost: process.env.REDIS_HOST || 'localhost',
  redisPort: parseInt(process.env.REDIS_PORT) || 6105,
  redisTtl: parseInt(process.env.REDIS_TTL) || 10,
  // Throttling configuration
  throttleWindowMs: parseInt(process.env.THROTTLE_WINDOW_MS) || 10 * 1000,
  throttleMax: parseInt(process.env.THROTTLE_MAX) || 100,
  // Rate limiting configuration
  maxRequestsPerMinute: parseInt(process.env.RL_MAX_REQUESTS_PER_MINUTE) || 1000,
  minIntervalBetweenRequests: parseInt(process.env.RL_MIN_INTERVAL_BETWEEN_REQUESTS) || 0,
  // Circuit breaker configuration
  CBreakerFailureThreshold: parseInt(process.env.CBREAKER_FAILURE_THRESHOLD) || 5,
  CBreakerSuccessThreshold: parseInt(process.env.CBREAKER_SUCCESS_THRESHOLD) || 3,
  CBreakerResetTimeout: parseInt(process.env.CBREAKER_RESET_TIMEOUT) || 30000,
};
