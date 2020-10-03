const express = require("express");
const Official = require("../db/models/official");
const Activity = require("../db/models/activity");
const auth = require("../middleware/auth");

const router = new express.Router();

// Create an activity
router.post("/officials", auth, async (req, res) => {
  const newOfficial = new Official({
    ...req.body,
  });

  try {
    await newOfficial.save();
    res.status(201).send(newOfficial);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// Get all activities for logged in user
// GET /activities?isApproved=true
// GET /activities?limit=10&skip=0
// GET /activities?sortBy=startDate_desc
router.get("/officials/:id", auth, async (req, res) => {
  const _id = req.params.id;

  try {
    const activity = await Activity.findById(_id);
    await activity.populate("officials").execPopulate();
    res.send(activity.officials);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;
