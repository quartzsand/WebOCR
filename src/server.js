const express = require('express');
const app = express();
const sslRedirect = require('heroku-ssl-redirect');
const port = process.env.PORT || 3300;

app.use((req, res, next) => {
  res.setHeader('Strict-Transport-Security', 'max-age=63072000');
  res.setHeader('Content-Security-Policy', "frame-ancestors 'none'");
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Content-Security-Policy-Report-Only ', 'default-src https:');

  next();
});

// enable ssl redirect
app.use(sslRedirect());
app.use(express.static('public'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => console.log(`Server running on port ${port}.`));
