const app = require("./app");
const http = require("http");

const chalk = require("chalk");

const mongoose = require("mongoose");
const dbURI = require("./db/mongoose");

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

// Set mongoose connection
mongoose
  .connect(dbURI, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(chalk.blue("Successfully connected to MongoDB database!"));
    server.listen(
      PORT,
      console.log(chalk.yellow("Server is up at port " + PORT + "!"))
    );
  })
  .catch((error) => {
    console.log(error);
  });
