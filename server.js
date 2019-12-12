'use strict';

const fs = require('fs');
const http = require('http');
const path = require('path');

const config = require('./config.js');
const db = require('./lib/db.js')(config.database);
global.db = db;

const { Logger } = require('./lib/logger.js');
const date = new Date().toISOString().split('T')[0];
const logger  = new Logger('./logs/' + date + '.log');
global.logger = logger;

const DIR = process.cwd();
const STATIC_DIR = path.join(DIR, 'static');
const API_DIR = path.join(DIR, 'api');
const INDEX = 'index.html';

const end = (res, code, message) => {
  res.statusCode = code;
  res.end(JSON.stringify({ code, message }));
};

const server = http.createServer(async (req, res) => {
  let url = decodeURI(req.url);
  if (url[url.length - 1] === '/') url += INDEX;
  if (url.startsWith('/api')) {
    const [urlPath, urlQuery] = url.split('?');
    const parameters = urlPath.split('/');
    parameters.shift();
    parameters.shift();
    const methodName = parameters.shift();
    const fileName = API_DIR + '/' + methodName + '.js';
    const args = {};
    const query = urlQuery.split('&');
    for (const item of query) {
      const [key, value] = item.split('=');
      args[key] = value;
    }
    try {
      logger.info(`Execute ${url}`);
      const method = require(fileName);
      const result = await method(args);
      res.end(JSON.stringify(result));
    } catch (err) {
      console.dir(err);
      logger.error(`Error executing ${url}: ${err.stack}`);
      end(res, 500, 'Server error');
    }
    return;
  }
  const fileName = path.resolve(STATIC_DIR, './' + url);
  if (!fileName.startsWith(STATIC_DIR)) {
    logger.warn(`Hack detection ${url}`);
    end(res, 400, 'Bad request: Please do not try to hack me');
    return;
  }
  fs.readFile(fileName, 'utf8', (err, data) => {
    if (err) {
      logger.error(`File is not found ${url}`);
      end(res, 404, 'Error 404: File is not found');
      return;
    }
    res.end(data);
  });
});

server.listen(config.http.port);

{
  const url = `http://${config.http.host}:${config.http.port}`;
  logger.info(`Server started at ${url}`);
}
