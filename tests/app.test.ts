import request from 'supertest';
import app from '../app';

describe('Generating a PDF', () => {
  test('when given a URL, respond with a PDF', async () => {
    const response = await request(app)
      .post('/')
      .send({
        // TODO: this should be a static site that is in the project
        url: 'https://example.com',
      });

    expect(response.status).toBe(200);
    expect(response.header['content-type']).toBe('application/pdf');
  });

  test('responds with a PDF when given an HTML string', async () => {
    const response = await request(app)
      .post('/')
      .send({
        htmlString: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <meta http-equiv="X-UA-Compatible" content="ie=edge">
              <title>Document</title>
          </head>
          <body>
            Hey there!    
          </body>
          </html>
      `,
      });

    expect(response.status).toBe(200);
    expect(response.header['content-type']).toBe('application/pdf');
  });

  test('responds with a 400 when not given a url or htmlString', async () => {
    const response = await request(app)
      .post('/')
      .send();

    expect(response.status).toBe(400);
  });
});
