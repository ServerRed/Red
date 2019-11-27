'use strict';

const fs = require('fs');
const http = require('http');
const path = require('path');

const DIR = process.cwd();
const HTTP_PORT = 8000;
const HTTP_HOST = '127.0.0.1';
const INDEX = 'index.html';

const server = http.createServer((req, res) => {
  let url = decodeURI(req.url);
  if (url[url.length - 1] === '/') url += INDEX;
  const fileName = path.join(DIR, 'static', url);
  console.log({ url, fileName });
  fs.readFile(fileName, 'utf8', (err, data) => {
    if (err) {
      res.end('Error 404: File not found');
      return;
    }
    res.end(data);
  });
});

server.listen(HTTP_PORT);

console.log(`Server started at http://${HTTP_HOST}:${HTTP_PORT}/`);
