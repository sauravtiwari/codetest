const app = require('../index');
const Event = require('../models/Events');
const User = require('../models/User');
const request = require('supertest')

beforeAll(async () => {
    await User.remove({});
    await Event.remove({});
});

describe('Tests Endpoints', () => {
    it('checks Event count', async () => {
        const count = await Event.countDocuments({});
        expect(count).toBeGreaterThan(-1);
    });

    it('checks User count', async () => {
        const count = await User.countDocuments({});
        expect(count).toBeGreaterThan(-1);
    });

    it('should fetch all events', async () => {
        const res = await request(app)
          .get('/');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('success', true);
        expect(res.body).toHaveProperty('events')
    });
    
    it('should fetch all users', async () => {
        const res = await request(app)
            .get('/users')
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('success', true);
        expect(res.body).toHaveProperty('users')
    });
    
    it('should create user', async () => {
        const res = await request(app)
            .post('/createUser')
            .send({ name: 'dummy' });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('success', true);
        expect(res.body).toHaveProperty('user');
    });

    it('should not create duplicate user', async () => {
        const res = await request(app)
            .post('/createUser')
            .send({ name: 'dummy' });
        expect(res.statusCode).toEqual(500);
        expect(res.body).toHaveProperty('success', false);
        expect(res.body).toHaveProperty('message', 'A user already exists with this name');
    });

    it('should give error', async () => {
        const res = await request(app)
            .get('/getUserEvents');
        expect(res.statusCode).toEqual(500);
        expect(res.body).toHaveProperty('success', false);
        expect(res.body).toHaveProperty('message', 'Name parameter needs to be specified');
    })

    it('should get User events', async () => {
        const res = await request(app)
            .get('/getUserEvents?name=dummy');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('success', true);
        expect(res.body).toHaveProperty('events');
    });

    it('should not create Event in case of invalid parameters', async () => {
        const res = await request(app)
            .post('/')
            .send({ user: 'dummy', title: 'dummy title' });
        expect(res.statusCode).toEqual(500);
        expect(res.body).toHaveProperty('success', false);
        expect(res.body).toHaveProperty('message', 'Invalid Parameters');
    });

    const data = {
        "title": "title",
        "details": "details",
        "start": "2019-06-05",
        "end": "2019-06-10",
        "location": {
            "address": "address",
            "latLng": {
                "lat": 123,
                "lng": 456
            }
        },
        "user": "dummy"
    };

    it('should create Event', async () => {
        const res = await request(app)
            .post('/')
            .send(data);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('success', true);
        expect(res.body).toHaveProperty('event');
    });

    it('should not create Event in case of existing event', async () => {
        const newData = Object.create(data);
        const res = await request(app)
            .post('/')
            .send(newData);
        expect(res.statusCode).toEqual(500);
        expect(res.body).toHaveProperty('success', false);
        expect(res.body).toHaveProperty('message', 'An Event already exists at this venue on this day');
    });

    it('should not create Event in case of user not in database', async () => {
        const newData = Object.create(data);
        newData.user = 'new user';
        const res = await request(app)
            .post('/')
            .send(newData);
        expect(res.statusCode).toEqual(500);
        expect(res.body).toHaveProperty('success', false);
        expect(res.body).toHaveProperty('message', 'User not found');
    });

    

});