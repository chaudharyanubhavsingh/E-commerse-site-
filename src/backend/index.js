const express = require('express');
const server = express();
const routes = require('./routes');
const sequelize = require('./db');
const cors = require('cors');
const cookieParser = require('cookie-parser');

sequelize.sync(); // Ensure models are synchronized with the database

// Custom CORS middleware
const customCors = (req, res, next) => {
  // Set CORS headers dynamically based on request origin
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Methods', ' POST,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    // Preflight request handling
    res.sendStatus(200);
  } else {
    next();
  }
};

server.use(cookieParser());
server.use(express.json());

// Use custom CORS middleware before routes
server.use(customCors);
server.use(routes);

server.listen(8000, function check(error) {
  if (error) {
    console.log('error');
  } else {
    console.log('started');
  }
});
