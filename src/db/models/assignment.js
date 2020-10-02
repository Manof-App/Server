// Imports
const mongoose = require("mongoose");
const validator = require("validator");
const UTILS = require("../../common/utils.js");

const assignmentSchema = mongoose.Schema({});

// Create need model and exports
const Assignment = mongoose.model("Assignment", assignmentSchema);
module.exports = Assignment;
