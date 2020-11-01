const request = require('supertest');
const app = require('../src/server.js');
const Activity = require('../src/db/models/activity');
const { setupDatabase, activityOne } = require('./fixtures/db');

beforeEach(setupDatabase);

test('Should activity task for user', async () => {
  const response = await request(app)
    .post('/activities')
    .send({
      activityName: 'A Wild Trip to Brazil!',
      startDate: new Date('2021-04-16'),
    })
    .expect(201);

  // Assert that the database was changed correctly
  const activity = await Activity.findById(response.body._id);
  expect(activity).not.toBeNull();
  expect(activity.status).toEqual('not_active');
});

test('Should fetch all activities', async () => {
  const response = await request(app).get('/allActivities').send().expect(200);

  // Assert that the database was changed correctly
  expect(response.body.length).toBe(3);
});

test('Should update an activity by id', async () => {
  const response = await request(app)
    .patch(`/activities/${activityOne._id}`)
    .send({
      startDate: new Date('2025-01-29'),
    })
    .expect(200);
});
