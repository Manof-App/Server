const express = require("express");
const app = express();

// Routes
const userRouter = require("../controllers/userController");
const activityRouter = require("../controllers/activityController");
const officialRouter = require("../controllers/officialController");
const needRouter = require("../controllers/needController.js");
const assignmentRouter = require("../controllers/assignmentController.js");

app.use(userRouter);
app.use(activityRouter);
app.use(officialRouter);
app.use(needRouter);
app.use(assignmentRouter);

module.exports = app;
