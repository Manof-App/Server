const express = require("express");
const Activity = require("../db/models/activity");
const Assignment = require("../db/models/assignment");
const mongoose = require("mongoose");

const auth = require("../middleware/auth.js");

const router = new express.Router();

// Create new user
router.post("/assignments", auth, async (req, res) => {
  const assignments = req.body;

  try {
    for (let assignment of assignments) {
      await new Assignment({
        ...assignment,
        relatedActivityId: mongoose.Types.ObjectId(
          assignment.relatedActivityId
        ),
      }).save();
    }

    res.status(201).send(assignments);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all assignments for a single activity
router.get("/assignments/:id", auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const activity = await Activity.findById(_id, function (response, error) {
      console.log(error);
    });
    await activity.populate("assignments").execPopulate();
    res.send(activity.assignments);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;
