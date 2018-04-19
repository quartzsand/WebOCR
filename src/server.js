const express = require('express');
const app = express();
const sslRedirect = require('heroku-ssl-redirect');

// enable ssl redirect
app.use(sslRedirect());
app.use(express.static('public'));

const port = process.env.PORT || 3300;

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => console.log(`Server running on port ${port}.`));
