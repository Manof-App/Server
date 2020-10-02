// Imports
const mongoose = require("mongoose");
const validator = require("validator");
const UTILS = require("../../common/utils.js");

const officialSchema = mongoose.Schema({});

// Create need model and exports
const Official = mongoose.model("Official", officialSchema);
module.exports = Official;
