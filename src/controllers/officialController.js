const express = require("express");
const Official = require("../db/models/official");
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

module.exports = router;
