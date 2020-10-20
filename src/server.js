const app = require('./app');
const http = require('http');

const chalk = require('chalk');

const mongoose = require('mongoose');
const dbURI = require('./db/mongoose');

const PORT = process.env.PORT;
const server = http.createServer(app);

const reqTimer = setTimeout(function wakeUp() {
  request('https://manof-application.herokuapp.com/', function () {
    console.log('WAKE UP DYNO');
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

    console.log(
      chalk.blue(
        `Successfully connected to ${chalk.yellow('MongoDB database!')}`
      )
    );
    server.listen(
      PORT,
      console.log(chalk.magentaBright('Server is up at port ' + PORT + '!'))
    );
  } catch (err) {
    console.log('error: ' + err);
  }
})();
