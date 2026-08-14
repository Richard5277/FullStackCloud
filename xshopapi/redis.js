
const Redis = require('ioredis');
const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost', // Redis server hostname
  port: process.env.REDIS_PORT || 6379,        // Redis server port
});

redis.on('connect', () => {
  console.log('Connected to Redis server');
});

redis.on('error', (err) => {
  console.error('Redis error:', err);
});

async function main(){
  try {
    // Retrieve the user data cached by Express app
    const userData = await redis.get('user:123');
    if (userData) {
      console.log('User data from Redis:', JSON.parse(userData));
    } else {
      console.log('No user data found in Redis for user:123');
    }
  } catch (err) {
    console.error('Error during main execution:', err);
  } finally {
    await redis.quit();
  }
}
main();