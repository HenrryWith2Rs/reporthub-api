import Express, { Request, Response } from 'express';

const app = Express();

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});
