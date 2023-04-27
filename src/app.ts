import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { userRouter } from './routes/user';
import { productRouter } from './routes/product'
require('./utils/auth')

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/user', userRouter);
app.use('/products', productRouter)

export default app;