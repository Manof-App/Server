const express = require("express");
const Activity = require("../db/models/activity");
const auth = require("../middleware/auth.js");

const router = new express.Router();

// Create an activity
router.post("/activities", auth, async (req, res) => {
  const newActivity = new Activity({
    ...req.body,
    relatedEmailId: req.user.email,
  });

  try {
    await newActivity.save();
    res.status(201).send(newActivity);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// Get all orders for logged in customer
router.get("/allActivities", auth, async (req, res) => {
  // const match = {};

  // if (req.query.isApproved) {
  //   match.isApproved = req.query.isApproved === "false";
  // }

  try {
    await req.user
      .populate({
        path: "activities",
        options: {
          limit: 4,
        },
      })
      .execPopulate();
    res.send(req.user.activities);
  } catch (error) {
    res.status(500).send();
  }
});

// Get all activities for logged in user
// GET /activities?isApproved=true
// GET /activities?limit=10&skip=0
// GET /activities?sortBy=startDate_desc
router.get("/activities", auth, async (req, res) => {
  const match = {};
  const sort = {};

  if (req.query.isApproved) {
    match.isApproved = req.query.isApproved === "false";
  }

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":");
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }

  try {
    await req.user
      .populate({
        path: "activities",
        match,
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort,
        },
      })
      .execPopulate();
    res.send(req.user.activities);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// Get a single activity
router.get("/activities/:id", auth, async (req, res) => {
  const _id = req.params.id;
  console.log(_id);

  try {
    const activity = await Activity.findOne({
      _id: _id,
      relatedEmailId: req.user.email,
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
router.delete("activities/:id", auth, async (req, res) => {
  const _id = req.params.id;

  try {
    const activity = await Activity.findOneAndDelete({
      _id: _id,
      relatedEmailId: req.user.email,
    });

    console.log(activity);
    if (!activity) {
      res.status(404).send("Activity not found!");
    }

    res.send(activity);
  } catch (error) {
    console.log(error);
    res.status(400).send();
  }
});

// Update activity by id
router.patch("/activities/:id", auth, async (req, res) => {
  const _id = req.params.id;

  try {
    const activity = await Activity.findOneAndUpdate(
      {
        _id: _id,
        relatedEmailId: req.user.email,
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
