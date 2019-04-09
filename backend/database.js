const mongoose = require('mongoose');

const config = {
  host: 'localhost',
  port: 27017,
  dbName: 'issuetracker'
};
const connString = `mongodb://${config.host}:${config.port}/${config.dbName}`;

const initDB = () => {
  mongoose.connect(connString, { useNewUrlParser: true });
  mongoose.connection.once('open', () => {
    console.log('[MongoDB]: Connected');
  });
};

module.exports = initDB;
