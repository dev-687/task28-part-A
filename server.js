const express = require('express');
const mongoose = require("mongoose");
const mongoDBConn = require('./config/MongoDBConfig'); // Import MongoDB connection function
const bodyParser = require('body-parser');
const router = require('./routers/routers');
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use('/api/v1', router);

// Connect to MongoDB before starting the server
mongoDBConn().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
}).catch(err => {
  console.error('Failed to start server due to DB connection error:', err);
});
