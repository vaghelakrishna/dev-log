require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/db');

const app = express();

// Database Connect karo
connectDB();

// Middleware (JSON data handle karne ke liye)
app.use(express.json());


app.use('/api/logs', require('./src/routes/logRoutes'));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})

