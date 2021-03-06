// Imports
const express = require('express');
const router = new express.Router();

const multer = require('multer');
const sharp = require('sharp');

const User = require('../db/models/user');
const auth = require('../middleware/auth');

const Utils = require('../common/utils.js');
const account = require('../emails/account.js');

// Create new user
router.post('/users/register', async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    account.sendWelcomeEmail(user.email, req.body.password);
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
    req.user.tokens = req.user.tokens.filter((currTokenObj) => {
      return currTokenObj.token !== req.token;
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

// Get all users
router.get('/users/all', async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send('Failed');
  }
});

// Delete user
router.delete('/users/:id', auth, async (req, res) => {
  const _userId = req.params.id;

  try {
    await User.findOneAndDelete({
      userId: _userId,
    });
    res.send({ status: '200' });
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

router.patch('/users/role', async (req, res) => {
  console.log(req.body);
  const filter = { userId: req.body.userId };
  const role = req.body.role;

  try {
    let user = await User.findOne(filter, function (err, doc) {
      if (err) return false;
      doc.role = role;
      doc.save();
    });

    if (!user) {
      return res.status(400).send();
    }

    res.send(user);
  } catch (error) {
    return res.status(400).send();
  }
});

// Reset user password
router.patch('/users/resetPassword', async (req, res) => {
  const userEmail = req.body.email;
  const password = Utils.generatePassword();

  try {
    await User.findOne({ email: userEmail }, function (err, doc) {
      if (err) {
        return false;
      }
      if (doc) {
        doc.password = password;
        account.resetPassword(userEmail, password);
        res.json({ status: '201' });
        doc.save();
      } else {
        return res.status(404).send();
      }
    });
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

// Set multer middleware
const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('File extension must be either jpg, jpeg or png only!'));
    }
    cb(undefined, true);
  },
});

// Upload user avatar
router.post(
  '/users/me/avatar',
  auth,
  upload.single('avatar'),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

// Delete user avatar
router.delete('/users/me/avatar', auth, async (req, res) => {
  req.user.avatar = undefined;
  await req.user.save();
  res.send();
});

// Read user avatar
router.get('/users/:id/avatar', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user || !user.avatar) {
      throw new Error();
    }

    res.set('Content-Type', 'image/png');
    res.send(user.avatar);
  } catch (error) {
    res.status(404).send();
  }
});

module.exports = router;
