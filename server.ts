import express, { Request, Response } from 'express';
import serveStatic from 'serve-static';
import path from 'path';

const app = express();

// Here we are configuring dist to serve app files
app.use('/', serveStatic(path.join(__dirname, '/dist')));

// This * route is to serve project on different page routes except root `/`
app.get(/.*/, (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`app is listening on port: ${port}`);
});
