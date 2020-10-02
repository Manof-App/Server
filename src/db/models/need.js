// Imports
const mongoose = require("mongoose");
const validator = require("validator");
const UTILS = require("../../common/utils.js");

const needSchema = mongoose.Schema({});

// Create need model and exports
const Need = mongoose.model("Need", needSchema);
module.exports = Need;
