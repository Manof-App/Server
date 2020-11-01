const app = require('./app');
const request = require('request');
const http = require('http');
const chalk = require('chalk');

const mongoose = require('mongoose');
const dbURI = require('./db/mongoose');

const PORT = process.env.PORT;
const server = http.createServer(app);

var reqTimer = setTimeout(function wakeUp() {
  request('https://manof-application.herokuapp.com/', function () {
    console.log('WAKE UP DYNO ' + new Date(Date.now()));
  });
  return (reqTimer = setTimeout(wakeUp, 1200000));
}, 1200000);

// Set mongoose connection
(async () => {
  try {
    await mongoose.connect(dbURI, {
      useFindAndModify: false,
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });

    if (process.env.NODE_ENV !== 'test') {
      server.listen(PORT, console.log(chalk.magentaBright('Server is up at port ' + PORT + '!')));
    }
    console.log(chalk.blue(`Successfully connected to ${chalk.yellow('MongoDB database!')}`));
  } catch (err) {
    console.log('error: ' + err);
  }
})();

module.exports = app;
