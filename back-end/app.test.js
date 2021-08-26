const app = require('./app');
const request = require('supertest')(app);


  test('GET /books', async () => {
    const response = await request(app)
      .get('/books')
      .expect(200);
  
    expect(response.body).toHaveLength(4);
  });