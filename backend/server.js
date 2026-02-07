require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { createClient } = require('redis');

// Import Routes
const authRoute = require('./routes/auth');
const stocksRoute = require('./routes/stocks');
const walletRoute = require('./routes/wallet');
const tradeRoute = require('./routes/trade');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(express.json());

// CORS Động
app.use(cors({
    origin: true, 
    credentials: true
}));

// Redis
const redisClient = createClient({ 
    url: process.env.REDIS_URL,
    socket: { reconnectStrategy: (retries) => Math.min(retries * 50, 2000) }
});
redisClient.on('error', (err) => console.log('❌ Redis Error:', err));
(async () => {
    await redisClient.connect();
    console.log('✅ Redis Connected');
    app.set('redisClient', redisClient);
})();

// MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.error('❌ MongoDB Error:', err));

// Routes
app.use('/api/auth', authRoute);
app.use('/api/stocks', stocksRoute);
app.use('/api/wallet', walletRoute);
app.use('/api/trade', tradeRoute);

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});