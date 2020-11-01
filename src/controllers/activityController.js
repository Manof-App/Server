const express = require('express');
const mongoose = require('mongoose');
const Activity = require('../db/models/activity');
const UTIL = require('../common/utils.js');
const auth = require('../middleware/auth.js');

const router = new express.Router();

// Create an activity
router.post('/activities', async (req, res) => {
  const newActivity = new Activity({
    ...req.body,
    _id: new mongoose.Types.ObjectId(),
  });

  try {
    await newActivity.save();
    res.status(201).send(newActivity);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// Get all activities
router.get('/allActivities', async (req, res) => {
  try {
    const activities = await Activity.find({});

    res.send(activities);
  } catch (error) {
    res.status(500).send();
  }
});

// Get all activities for logged in user
router.get('/activities', async (req, res) => {
  let sort = {};
  let isApproved;
  let status;

  if (req.query.isApproved) {
    isApproved = [{ isApproved: req.query.isApproved === 'true' ? true : false }];
  } else {
    isApproved = [{ isApproved: false }, { isApproved: true }];
  }

  if (req.query.status) {
    status = req.query.status;
  } else {
    status = 'active';
  }

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(':');
    sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
  } else {
    sort = { startDate: 1 };
  }
  sort.type = 'asc';

  try {
    const activities = await Activity.find({
      status: status,
      $or: isApproved,
    })
      .sort(sort)
      .exec();

    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(2) || 0;

    let startIndex = (page - 1) * limit;
    let endIndex = page * limit;

    let next = ++page;
    let prev = --page;

    const data = {};

    if (endIndex < activities.length) {
      data.next = {
        page: next,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      data.previous = {
        page: --prev,
        limit: limit,
      };
    }

    data.startIndex = startIndex;
    data.endIndex = endIndex;
    data.length = activities.length;

    const filteredList = activities.filter((activity) => activity.endDate > new Date(Date.now()));

    data.results = filteredList.slice(startIndex, endIndex);

    res.send(data);
  } catch (error) {
    // console.log(error);
    res.status(500).send(error);
  }
});

// Get a single activity
router.get('/activities/:id', async (req, res) => {
  const _id = req.params.id;

  try {
    const activity = await Activity.findOne({
      _id: _id,
    });

    if (!activity) {
      return res.status(404).send();
    }
    res.send(activity);
  } catch (error) {
    res.status(500).send();
  }
});

// Delete an activity by id
router.delete('/activities/:id', async (req, res) => {
  const _id = req.params.id;
  try {
    const activity = await Activity.findOneAndDelete({
      _id: _id,
    });

    if (!activity) {
      res.status(404).send('Activity not found!');
    }

    res.send(activity);
  } catch (error) {
    console.log(error);
    res.status(400).send();
  }
});

// Update activity by id
router.patch('/activities/:id', async (req, res) => {
  const _id = req.params.id;
  console.log(_id);

  try {
    const activity = await Activity.findOneAndUpdate(
      {
        _id: _id,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    console.log(activity);

    if (!activity) {
      return res.status(404).send();
    }

    await activity.save();
    res.send(activity);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

module.exports = router;
