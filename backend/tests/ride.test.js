const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const User = require('../models/User');
const Ride = require('../models/Ride');

let token;
let userId;

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/uberclone_test');

  // Register and login a test user to get an auth token
  const registerRes = await request(app)
    .post('/api/auth/register')
    .send({
      name: 'Test Rider',
      email: 'rider@example.com',
      password: 'password123',
      role: 'rider'
    });

  const loginRes = await request(app)
    .post('/api/auth/login')
    .send({
      email: 'rider@example.com',
      password: 'password123'
    });

  token = loginRes.body.token;
  userId = (await User.findOne({ email: 'rider@example.com' }))._id;
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

afterEach(async () => {
  await Ride.deleteMany({});
});

describe('Ride API', () => {
  it('should create a new ride', async () => {
    const res = await request(app)
      .post('/api/rides')
      .set('Authorization', `Bearer ${token}`)
      .send({
        pickup: 'Hitech City, Hyderabad',
        dropoff: 'Miyapur, Hyderabad'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.pickup).toBe('Hitech City, Hyderabad');
    expect(res.body.dropoff).toBe('Miyapur, Hyderabad');
    expect(res.body.rider).toBe(String(userId));
  });

  it('should not create a ride without token', async () => {
    const res = await request(app)
      .post('/api/rides')
      .send({
        pickup: 'Hitech City',
        dropoff: 'Miyapur'
      });

    expect(res.statusCode).toBe(401);
    expect(res.body.error).toBe('No token');
  });

  it('should list rides for the logged-in user', async () => {
    // Create a ride
    await request(app)
      .post('/api/rides')
      .set('Authorization', `Bearer ${token}`)
      .send({
        pickup: 'Secunderabad',
        dropoff: 'Charminar'
      });

    // List rides
    const res = await request(app)
      .get('/api/rides')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0].pickup).toBe('Secunderabad');
  });
});
