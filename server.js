'use strict';

const http = require('http');

const HTTP_PORT = 8000;
const HTTP_HOST = '127.0.0.1';

const server = http.createServer((req, res) => {
  console.log(req.url);
  res.end('Hello world server example');
});

server.listen(HTTP_PORT);

console.log(`Server started at http://${HTTP_HOST}:${HTTP_PORT}/`);
