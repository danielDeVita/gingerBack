import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { route } from './routes/user';

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', route);

export default app;