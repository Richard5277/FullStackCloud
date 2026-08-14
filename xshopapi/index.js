const express = require('express');
const app = express();
const Redis = require('ioredis');

const PORT = process.env.PORT || 8080;
const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
const REDIS_PORT = process.env.REDIS_PORT || 6379;

app.use(express.json());

const redis = new Redis(`redis://${REDIS_HOST}:${REDIS_PORT}`);

app.get('/', (req, res) => {
  res.send('Welcome to xShopDB!');
});

app.post('/user/:id', async (req, res) => {
  const userId = req.params.id;
  const userData = req.body;
  try {
    await redis.set(
      `user:${userId}`,
      JSON.stringify(userData),
      'EX', 
      60 * 60 // Set expiration time to 1 hour
    );
    res.json({ message: 'User data saved to cache', userId, userData });
  } catch (err) {
    console.error('Redis error:', err);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/user/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const userData = await redis.get(`user:${userId}`);
    if (userData) {
      res.json(JSON.parse(userData));
    } else {
      res.status(404).send('User not found');
    }
  } catch (err) {
    console.error('Redis error:', err);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});