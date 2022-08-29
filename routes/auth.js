import express from 'express';
import {isAuth} from '../middleware/auth.js';
import * as authController from '../controller/auth.js';
import path from 'path';

const __dirname = path.resolve();

const router = express.Router();

router.get('/main', isAuth, (req, res, next)=>{
  res.status(200).sendFile(__dirname + '/templates/main.html');
})

router.get('/signup', (req, res, next)=>{
  res.status(200).sendFile(__dirname + '/templates/signUpPage.html');
})
router.post('/signup', authController.signup);



router.get('/login', (req, res, next)=>{
  res.status(200).sendFile(__dirname + '/templates/loginPage.html');
})
router.post('/login', authController.login);



router.get('/me', isAuth, authController.getInfo);

export default router;