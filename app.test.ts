import request from 'supertest';
import app from './app';

describe('Test rendering a PDF from a url', () => {
  test('It should respond with a PDF', async () => {
    const response = await request(app)
      .post('/')
      .send({
        // TODO: this should be a static site that is in the project
        url: 'https://example.com',
      });

    expect(response.status).toBe(200);
    expect(response.header['content-type']).toBe('application/pdf');
  });
});
