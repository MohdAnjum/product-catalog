// // utils/redisClient.js
// const redis = require('redis');

// const client = redis.createClient({
//   socket: {
//     host: '127.0.0.1',
//     port: 6379
//   }
// });

// client.on('error', (err) => console.error('❌ Redis Client Error', err));
// client.on('connect', () => console.log('✅ Connected to Redis'));

// client.connect(); // Returns a promise

// module.exports = client;


// utils/redisClient.js
const redis = require('redis');

const redisClient = redis.createClient({
  url: 'redis://localhost:6379' // or from process.env.REDIS_URL
});

redisClient.on('connect', () => {
  console.log('✅ Redis connected');
});

redisClient.on('error', (err) => {
  console.error('❌ Redis connection error:', err);
});

redisClient.connect(); // Important in Redis v4+

module.exports = redisClient;

