'use strict';

const fs = require('fs');

class Logger {
  static color(level) {
    return Logger.COLORS[level] || Logger.COLORS.info;
  }

  constructor(file) {
    this.file = file;
    this.stream = fs.createWriteStream(file, 'utf8');
  }

  log(level, s) {
    const date = new Date().toISOString();
    const color = Logger.color(level);
    const msg = date + '\t' + s;
    console.log(color + msg + '\x1b[0m');
    this.stream.write(msg + '\n');
  }

  warn(s) {
    this.log('warn', s);
  }

  error(s) {
    this.log('error', s);
  }

  info(s) {
    this.log('info', s);
  }
}

Logger.COLORS = {
  warn: '\x1b[1;33m',
  error: '\x1b[0;31m',
  info: '\x1b[1;37m',
};

module.exports = { Logger };
