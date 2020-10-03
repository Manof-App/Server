// Imports
const mongoose = require("mongoose");
const validator = require("validator");
const UTILS = require("../../common/utils.js");

// Create activity schema
const activitySchema = new mongoose.Schema(
  {
    relatedEmailId: {
      type: mongoose.Schema.Types.String,
      required: true,
      ref: "User",
    },

    activityName: {
      type: String,
      required: false,
      trim: true,
    },

    manager: {
      type: String,
      required: false,
      trim: true,
    },

    startDate: {
      type: Date,
      required: false,
      trim: true,
    },

    endDate: {
      type: Date,
      required: false,
      trim: true,
    },

    targetedStudents: {
      type: String,
      required: false,
      trim: true,
    },

    targetedGuides: {
      type: String,
      required: false,
      trim: true,
    },

    crewPreparationDate: {
      type: Date,
      required: false,
      trim: true,
    },

    type: {
      type: String,
      required: false,
      trim: true,
    },

    preparationsDate: {
      type: Date,
      required: false,
      trim: true,
    },

    targetAudienceDetails: {
      type: String,
      required: false,
      trim: true,
    },

    summarizeDate: {
      type: Date,
      require: false,
      trim: true,
    },

    isScheduled: {
      type: Boolean,
      required: false,
      trim: true,
      default: false,
    },

    mapLocation: {
      type: Object,
      required: false,
      trim: true,
      latitude: {
        type: Number,
      },
      longitude: {
        type: Number,
      },
      city: {
        type: String,
      },
      principalSubdivision: {
        type: String,
      },
    },

    isApproved: {
      type: Boolean,
      required: false,
      trim: true,
      default: false,
    },
  },

  {
    timestamp: true,
  }
);

activitySchema.virtual("officials", {
  ref: "Official",
  localField: "_id",
  foreignField: "relatedActivityId",
});

// Create activity model and exports
const Activity = mongoose.model("Activity", activitySchema);
module.exports = Activity;
