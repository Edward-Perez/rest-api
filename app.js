'use strict';

const express = require('express');
const morgan = require('morgan');
const routes = require('./routes');
const db = require('./models').sequelize;
const app = express();

// set port
app.set('port', process.env.PORT || 5000);

// setup morgan which gives us http request logging
app.use(morgan('dev'));

// JSON Middleware
app.use(express.json());

// routes 
app.use('/', routes);

// Database connection
db.authenticate()
  .then(() => console.log('Database Connected'))
  .catch(err => console.log('Database Connection Failed', err));

// Database sync on express server
db.sync()
  .then(() => {
    const server = app.listen(app.get('port'), () => {
      console.log(`Express server is listening on port ${server.address().port}`);
    });
  })
  .catch(err => console.log(err));


// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }
  
  res.status(err.status || 500).json({
    message: err.message,
    error: { type: err.errors },
  });
});