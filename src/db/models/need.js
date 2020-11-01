const { ObjectId } = require('mongodb');
// Imports
const mongoose = require('mongoose');
const validator = require('validator');
const UTILS = require('../../common/utils.js');

const needSchema = mongoose.Schema({
    relatedActivityId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        trim: true,
    },

    isRequiredNotebookGuide: {
        type: Boolean,
        required: false,
        default: false,
        trim: true,
    },

    isRequiredGuideItems: {
        type: Boolean,
        required: false,
        default: false,
        trim: true,
    },

    detailedIGuideItems: {
        type: String,
        required: false,
        trim: true,
    },

    isRequiredClothing: {
        type: Boolean,
        required: false,
        default: false,
        trim: true,
    },

    detailedClothing: {
        type: String,
        required: false,
        trim: true,
    },

    isRequiredVehicles: {
        type: Boolean,
        required: false,
        default: false,
        trim: true,
    },

    isRequiredOfficeEquipment: {
        type: Boolean,
        required: false,
        default: false,
        trim: true,
    },

    isRequiredDepotEquipment: {
        type: Boolean,
        required: false,
        default: false,
        trim: true,
    },

    isRequiredFood: {
        type: Boolean,
        required: false,
        default: false,
        trim: true,
    },

    foodOrderingForm: {
        type: Boolean,
        required: false,
        default: false,
        trim: true,
    },

    foodType: {
        type: Boolean,
        required: false,
        default: false,
        trim: true,
    },

    foodDescription: {
        type: String,
        required: false,
        trim: true,
    },

    isRequiredTransportation: {
        type: Boolean,
        required: false,
        default: false,
        trim: true,
    },

    isSitesAvailable: {
        type: Boolean,
        required: false,
        default: false,
        trim: true,
    },

    isSleepingArrangements: {
        type: Boolean,
        required: false,
        default: false,
        trim: true,
    },

    sleepingLocation: {
        type: String,
        required: false,
        trim: true,
    },

    isRequiredBidingPrice: {
        type: Boolean,
        required: false,
        default: false,
        trim: true,
    },

    isRequiredExtraEquipment: {
        type: Boolean,
        required: false,
        default: false,
        trim: true,
    },
});

// Create need model and exports
const Need = mongoose.model('Need', needSchema);
module.exports = Need;
