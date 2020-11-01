const mongoose = require('mongoose');
const User = require('../../src/db/models/user');
const Activity = require('../../src/db/models/activity');
const jwt = require('jsonwebtoken');

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  userId: '305219941',
  email: 'omerlubko@gmail.com',
  password: 'Red12345',
  tokens: [
    {
      token: jwt.sign({ userId: '305219941' }, process.env.JWT_SECRET),
    },
  ],
};

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
  _id: userTwoId,
  userId: '204410468',
  email: 'talidan1993@gmail.com',
  password: 'Purple789',
  tokens: [
    {
      token: jwt.sign({ userId: '204410468' }, process.env.JWT_SECRET),
    },
  ],
};

const activityOne = {
  _id: new mongoose.Types.ObjectId(),
  activityName: 'A wild Trip To Asia',
  startDate: new Date('2021-05-19'),
};

const activityTwo = {
  _id: new mongoose.Types.ObjectId(),
  activityName: 'A wild Trip To America',
  startDate: new Date('2022-05-19'),
};

const activityThree = {
  _id: new mongoose.Types.ObjectId(),
  activityName: 'A wild Trip To Australia',
  startDate: new Date('2023-05-19'),
};

const setupDatabase = async () => {
  await User.deleteMany();
  await Activity.deleteMany();

  await new User(userOne).save();
  await new User(userTwo).save();

  await new Activity(activityOne).save();
  await new Activity(activityTwo).save();
  await new Activity(activityThree).save();
};

module.exports = {
  userOneId,
  userOne,
  userTwoId,
  userTwo,
  activityOne,
  activityTwo,
  activityThree,
  setupDatabase,
};
