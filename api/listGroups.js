'use strict';

module.exports = async id => {
  const sql = 'SELECT * FROM SystemGroup';
  try {
    return db.query(sql);
  } catch (err) {
    logger.error(err.message);
    return err;
  }
};
