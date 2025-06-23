// const mongoose = require('mongoose');

// Mock the user model
jest.mock('../src/models/user');
const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');



// Connect to the MongoDB database before all tests
// beforeAll(async () => {
//   const url = `mongodb://127.0.0.1/integration_testing`;
//   if (mongoose.connection.readyState !== 0) {
//     await mongoose.disconnect();
//   }
//   await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
// });

// Clean up the database and close the connection after all tests
// afterAll(async () => {
//   await mongoose.connection.db.dropDatabase();
//   await mongoose.disconnect();
// });

describe('User API', () => {
  // Test creating a new user with a mock
  it('should create a user', async () => {
    User.mockImplementation(() => {
      const savedUser = { name: 'Egor Akulov', email: 'egor@example.com'};
      return {
        ...savedUser, 
        save: jest.fn().mockResolvedValue(savedUser),
      };
    });

    const response = await request(app).post('/users').send({
      name: 'Egor Akulov',
      email: 'egor@example.com',
    });
    expect(response.status).toBe(201);
    expect(response.body.name).toBe('Egor Akulov');
    expect(response.body.email).toBe('egor@example.com');
  });

  // Test retrieving a user by email with a mock
  it('should get a user by email', async () => {
    User.findOne.mockResolvedValueOnce({ name: 'Egor Akulov', email: 'egor@example.com'});
    const user = new User({ name: 'Charlie Kosakoff', email: 'chuck@example.com' });
    await user.save();

    const response = await request(app).get(`/users/egor@example.com`);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Egor Akulov');
    expect(response.body.email).toBe('egor@example.com');
  });

  // Test returning 404 if user not found
  it('should return 404 if user not found', async () => {
    User.findOne.mockResolvedValueOnce(null);
    const response = await request(app).get('/users/mikey@example.com');
    expect(response.status).toBe(404);
  });
});

/*
Using mocking allows us to test without actually using a real database
*/
