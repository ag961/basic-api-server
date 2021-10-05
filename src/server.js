'use strict';

const express = require('express');
const app = express();

const logger = require('./middleware/logger');
const notFoundHandler = require('./error-handlers/404');
const serverErrorHandler = require('./error-handlers/500');
const fruitRoutes = require('./routes/fruits.js');
const carRoutes = require('./routes/cars.js');


app.use(express.json());
app.use(logger);
app.use(fruitRoutes);


app.get('/test', (req, res) => {
  res.status(200).send('success on test route');
});

app.get('/', (req, res) => {
  res.status(200).send('Hello world');
});


app.use('*', notFoundHandler);
app.use(serverErrorHandler);

const start = (port) => {
  if (!port) { throw new Error('missing port'); }
  app.listen(port, () => console.log(`server is running on ${port}`));
};

module.exports = {
  server: app,
  start,
};
