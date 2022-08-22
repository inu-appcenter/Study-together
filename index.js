// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
import path from 'path'
import {fileURLToPath} from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import cors from 'cors'

import express from 'express'
const app = express();
import mongoose from 'mongoose';
import router from "./routes/routes.js"

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/uploads/images', express.static(path.join(__dirname,'/uploads/images')))
app.use('/', router)

// MongoDB connection
const connectionParams = {
  useNewUrlParser: true,
  //useCreateIndex: true,
  useUnifiedTopology: true,
};
mongoose.connect('mongodb://localhost:27017/lets_study', connectionParams);

const port = process.env.PORT || 4000;
app.listen(port, (err) => {
  if (err) 
    return console.log(err);
  console.log('Server running on port: ', port);
});