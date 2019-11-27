'use strict';

const fs = require('fs');
const http = require('http');
const path = require('path');

const DIR = process.cwd();
const STATIC_DIR = path.join(DIR, 'static');
const API_DIR = path.join(DIR, 'api');
const HTTP_PORT = 8000;
const HTTP_HOST = '127.0.0.1';
const INDEX = 'index.html';

const server = http.createServer(async (req, res) => {
  let url = decodeURI(req.url);
  if (url[url.length - 1] === '/') url += INDEX;
  console.log(url);
  if (url.startsWith('/api')) {
    const parameters = url.split('/');
    parameters.shift();
    parameters.shift();
    const methodName = parameters.shift();
    console.log({ methodName, parameters });
    const fileName = API_DIR + '/' + methodName + '.js';
    try {
      const method = require(fileName);
      const result = await method(...parameters);
      res.end(JSON.stringify(result));
    } catch (error) {
      res.end('{message:"ERROR 500"}');
    }
    return;
  }
  const fileName = path.resolve(STATIC_DIR, './' + url);
  if (!fileName.startsWith(STATIC_DIR)) {
    res.end('Please do not try to hack me');
    return;
  }
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
