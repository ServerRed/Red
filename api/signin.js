'use strict';

module.exports = async ({ login, password }) => {
  if (login === 'admin' && password === '12345') {
    return 'You are in';
  } else {
    return 'Wrong password';
  }
};
