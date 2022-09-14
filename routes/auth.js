import express from 'express';
import multer from 'multer';

import {isAuth} from '../middleware/auth.js';
import * as authController from '../controller/auth.js';
import path from 'path';

const __dirname = path.resolve();

const router = express.Router();

const storage = multer.diskStorage({
  destination: function(req, file ,cb){
      cb(null, './uploads');
  }
  ,
  filename: function(req, file, cb){
      cb(null, file.originalname);
  }  
});
// storage 과정을 수행하는 이유 -> multer는 이름을 랜덤으로 저장하기 때문에!
// 이 상황은 어차피 aws에 올리면 에러가 뜰 것이다.
const upload = multer({storage: storage});

router.get('/main', isAuth, (req, res, next)=>{
  res.status(200).sendFile(__dirname + '/templates/main.html');
})

router.get('/signup', (req, res, next)=>{
  res.status(200).sendFile(__dirname + '/templates/signUpPage.html');
})
router.post('/signup', upload.single('uploadFile'), authController.signup);

router.get('/login', (req, res, next)=>{
  res.status(200).sendFile(__dirname + '/templates/loginPage.html');
})
router.post('/login', authController.general_login);

router.get('/get_member', isAuth, authController.getUserInfo);

router.get('/myImage', isAuth, authController.getUserProfileImage);

// 필요한 것, 유저 정보 수정 by using patch method!

export default router;