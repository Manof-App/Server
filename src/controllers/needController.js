const express = require('express');
const mongoose = require('mongoose');
const Need = require('../db/models/need');

const router = new express.Router();

// Create Need
router.post('/needs', async (req, res) => {
  const _id = req.body.relatedActivityId;
  console.log(req.body);
  try {
    const newNeed = new Need({
      ...req.body,
      relatedActivityId: mongoose.Types.ObjectId(_id),
    });

    await newNeed.save();
    res.status(201).send(newNeed);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// Delete Need by id
router.delete('/needs/:id', async (req, res) => {
  const _id = req.params.id;

  try {
    const need = await Need.findOneAndDelete({
      _id: _id,
    });

    if (!need) {
      res.status(404).send('Need was not found!');
    }

    res.send(need);
  } catch (error) {
    console.log(error);
    res.status(400).send();
  }
});

// Get Need by activity id
router.get('/needs/:id', async (req, res) => {
  const _id = req.params.id;
  try {
    const need = await Need.findOne({
      relatedActivityId: _id,
    });

    if (!need) {
      return res.status(404).send();
    }
    res.send(need);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update activity by id
router.patch('/needs/:id', async (req, res) => {
  const _id = req.params.id;

  try {
    const need = await Need.findOneAndUpdate(
      {
        relatedActivityId: _id,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    console.log(need);
    if (!need) {
      return res.status(404).send();
    }

    await need.save();
    res.send(need);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

module.exports = router;
