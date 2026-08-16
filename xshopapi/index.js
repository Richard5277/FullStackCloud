const express = require('express');
const app = express();
const Redis = require('ioredis');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 8080;
const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://mongodb:27017/xshop';

app.use(express.json());

const redis = new Redis(`redis://${REDIS_HOST}:${REDIS_PORT}`);

// MongoDB connection
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  retryWrites: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
  // Retry connection after 5 seconds
  setTimeout(() => {
    mongoose.connect(MONGODB_URI);
  }, 5000);
});

// User schema
const userSchema = new mongoose.Schema({
  _id: String,
  name: String,
  email: String,
});

const User = mongoose.model('User', userSchema);

app.get('/', (req, res) => {
  res.send('Welcome to xShopDB!');
});

app.post('/user/:id', async (req, res) => {
  const userId = req.params.id;
  const userData = req.body;
  try {
    // Save to MongoDB
    const user = new User({ _id: userId, ...userData });
    await user.save();
    
    // Save to Redis cache
    await redis.set(
      `user:${userId}`,
      JSON.stringify(userData),
      'EX', 
      60 * 60 // Set expiration time to 1 hour
    );
    
    res.json({ message: 'User data saved to MongoDB and Redis cache', userId, userData });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/user/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    // Check Redis cache first
    let userData = await redis.get(`user:${userId}`);
    if (userData) {
      console.log(`Cache HIT for user:${userId}`);
      res.json({ source: 'Redis cache', data: JSON.parse(userData) });
      return;
    }
    
    // Cache miss - query MongoDB
    console.log(`Cache MISS for user:${userId}, querying MongoDB`);
    const user = await User.findById(userId);
    if (user) {
      const userDataObj = { name: user.name, email: user.email };
      
      // Save to Redis for future hits
      await redis.set(
        `user:${userId}`,
        JSON.stringify(userDataObj),
        'EX',
        60 * 60
      );
      
      res.json({ source: 'MongoDB (now cached)', data: userDataObj });
    } else {
      res.status(404).send('User not found');
    }
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});