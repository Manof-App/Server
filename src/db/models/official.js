// Imports
const mongoose = require('mongoose');
const validator = require('validator');
const UTILS = require('../../common/utils.js');

const officialSchema = mongoose.Schema(
    {
        relatedActivityId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Activity',
        },

        job: {
            type: String,
            require: false,
            trim: true,
        },

        jobTitle: {
            type: String,
            require: false,
            trim: true,
        },

        requiredDate: {
            type: Date,
            require: false,
            trim: true,
            default: new Date(),
        },

        extraHoursNeeded: {
            type: Number,
            require: false,
            trim: true,
            default: -1,
        },

        managerApproval: {
            type: Boolean,
            require: false,
            trim: true,
            default: false,
        },

        managerDepartmentApproval: {
            type: Boolean,
            require: false,
            trim: true,
            default: false,
        },

        notes: {
            type: String,
            require: false,
            trim: true,
            default: 'אין',
        },
    },
    {
        timestamp: true,
    }
);

// Create need model and exports
const Official = mongoose.model('Official', officialSchema);

module.exports = Official;
