const express = require('express');
const Official = require('../db/models/official');
const Activity = require('../db/models/activity');
const auth = require('../middleware/auth');
const mongoose = require('mongoose');
ObjectId = require('mongodb').ObjectID;

const router = new express.Router();

// Create Official
router.post('/officials', async (req, res) => {
  const _id = req.body.relatedActivityId;

  console.log(req.body);

  try {
    const newOfficial = new Official({
      ...req.body,
      relatedActivityId: mongoose.Types.ObjectId(_id),
    });

    await newOfficial.save();
    res.status(201).send(newOfficial);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// Get all officials for a single activity
router.get('/officials/:id', async (req, res) => {
  const _id = req.params.id;

  try {
    const activity = await Activity.findById(_id);
    await activity.populate('officials').execPopulate();

    if (!activity.officials) {
      return res.status(404).send();
    }

    res.send(activity.officials);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// Delete Official by id
router.delete('/officials/:id', async (req, res) => {
  const _id = req.params.id;

  try {
    const official = await Official.findOneAndDelete({
      _id: _id,
    });

    if (!official) {
      res.status(404).send('Official not found!');
    }

    res.send(official);
  } catch (error) {
    console.log(error);
    res.status(400).send();
  }
});

// Update Official by id
router.patch('/officials/:id', async (req, res) => {
  const _id = req.params.id;
  let arrayHelper = _id.split('');

  let objId = new String();

  for (let i = 0; i < arrayHelper.length - 1; i++) {
    objId += arrayHelper[i];
  }

  try {
    const official = await Official.findOneAndUpdate(
      {
        _id: objId,
        relatedActivityId: req.body.relatedActivityId,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!official) {
      return res.status(404).send();
    }
    await official.save();
    res.send(official);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

module.exports = router;
