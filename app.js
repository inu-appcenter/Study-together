import cors from 'cors'
import mongoose from 'mongoose';
import express from 'express'
import morgan from 'morgan';
import path from 'path';

import testRouter from './routes/test.js';
import authRouter from './routes/auth.js';
import groupRouter from './routes/group.js';

const app = express();
const __dirname = path.resolve();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use('/auth', authRouter);
app.use('/group', groupRouter);

app.get('/', (req, res, next)=>{
  res.status(200).sendFile(__dirname+'/templates/index.html');
})

app.use('/test', testRouter);
// MongoDB connection
const connectionParams = {
  useNewUrlParser: true,
  //useCreateIndex: true,
  useUnifiedTopology: true,
};
mongoose.connect('mongodb://localhost:27017/lets_study', connectionParams);

// error processing routing route
app.use((req, res, next)=>{
  res.sendStatus(404);
})

app.use((error, req, res, next)=>{
  console.error(error);
  res.sendStatus(500);
});
app.listen(3000, ()=>{
  console.log('server running on :3000');
});