'use strict';

const persons = {
  marcus: { name: 'Marcus Aurelous', born: 121 },
  mao: { name: 'Mao Zedong', born: 1893 },
};

module.exports = id => {
  const person = persons[id];
  if (person) return person;
  return 'Person not found';
};
