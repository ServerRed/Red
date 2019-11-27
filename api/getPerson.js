'use strict';

const fs = require('fs').promises;
const PERSONS_PATH = './data/persons/';

module.exports = async id => {
  const fileName = PERSONS_PATH + id + '.json';
  const data = await fs.readFile(fileName, 'utf8');
  return JSON.parse(data);
};
