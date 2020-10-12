const express = require('express');
const User = require('../db/models/user');
const auth = require('../middleware/auth');
const Utils = require('../common/utils.js');
const account = require('../emails/account.js');

const router = new express.Router();

// Create new user
router.post('/users/register', async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();

    account.sendWelcomeEmail(user.email, user.password);
    const token = await user.generateAuthToken();

    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

// Login user
router.post('/users/login', async (req, res) => {
  const userEmail = req.body.email;
  const userPassword = req.body.password;

  try {
    const user = await User.findByCredentials(userEmail, userPassword);
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send('Failed to login');
  }
});

// Logout user
router.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });

    await req.user.save();
    res.json({ status: '200' });
  } catch (error) {
    res.status(500).send('Failed to logout');
  }
});

// Logout all
router.post('/users/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.json({ status: '200' });

    //res.status(200).send('Successfully disconnected from all devices!');
  } catch (error) {
    res.status(500).send('Failed to logged out from all devices');
  }
});

// Get current logged in user
router.get('/users/me', auth, async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).send('Failed');
  }
});

router.get('/users/all', async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send('Failed');
  }
});

// Delete user
router.delete('/users/:id', async (req, res) => {
  const _email = req.params.id;
  console.log(_email);
  try {
    const user = await User.findOneAndDelete({
      email: _email,
    });

    res.send(req.user);
  } catch (error) {
    res.status(500).send('Failed to delete');
  }
});

// Update logged in user
router.patch('/users/me', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowUpdates = ['firstName', 'lastName', 'email', 'address', 'phone', 'role'];
  const isValidationOperation = updates.every((currentUpdate) => allowUpdates.includes(currentUpdate));

  if (!isValidationOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.send(req.user);
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

router.patch('/users/resetPassword', async (req, res) => {
  const userEmail = req.body.email;

  try {
    const filter = { email: userEmail };
    const password = { password: Utils.generatePassword() };

    await User.findOneAndUpdate(filter, password, function (err, success) {
      if (err) {
        return err;
      }
      account.resetPassword(userEmail, password);
      res.json({ status: '200' });
    });
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

module.exports = router;
