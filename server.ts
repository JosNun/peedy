import app from './app';

const port = process.env.PORT ?? 3546;

app.listen(port, () => console.log(`Peedy listening on port ${port}`));
