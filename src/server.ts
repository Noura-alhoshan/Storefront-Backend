import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import routes from './routes/routes'


const app: express.Application = express();
const address: string = '0.0.0.0:3000';

app.use(bodyParser.json());

app.get('/', function (req: Request, res: Response) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});

app.use('/api', routes)
export default app
