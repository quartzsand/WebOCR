const http = require('http');
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

app.use(express.static('public'));

const hostname = '127.0.0.1';
const port = 3300;

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, hostname, () =>
  console.log(`Server running at ${hostname} on port ${port}.`)
);
