// Imports
const mongoose = require("mongoose");
const validator = require("validator");
const UTILS = require("../../common/utils.js");

const assignmentSchema = mongoose.Schema({
  relatedActivityId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    trim: true,
  },

  assignment: {
    type: String,
    require: false,
    trim: true,
  },

  finalExecDate: {
    type: Date,
    require: false,
    trim: true,
    default: new Date(),
  },

  scheduleDate: {
    type: Date,
    require: false,
    trim: true,
    default: new Date(),
  },

  progress: {
    type: String,
    require: false,
    trim: true,
  },
});

// Create assignment model and exports
const Assignment = mongoose.model("Assignment", assignmentSchema);
module.exports = Assignment;
