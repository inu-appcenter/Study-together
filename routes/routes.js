import path from 'path'
import {fileURLToPath} from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

import * as controller from "../controller/controller.js"
import * as naver_OAuth from "../controller/naver_OAuth.js"

import express from 'express'
export const router=express.Router()
import multer from 'multer' // For image uploading
import fs from 'fs' // To delete files

// storage for images
const storage = multer.diskStorage({
    // destination of file
    destination: function (req, file, callback) {
      callback(null, './uploads/images');
    },
  
    // decide filename
    filename: function (req, file, callback) {
      callback(null, Date.now() + file.originalname);
    }
})
// parameter for image upload
const upload = multer({
    storage: storage,
    limits: {
        fieldSize: 1024 * 1024 * 3,
    },
})

router.get('/naver_OAuth/login', naver_OAuth.login);
router.get('/naver/OAuth/callback', naver_OAuth.callback)
router.post('/naver_OAuth/get_member', naver_OAuth.get_member)
router.post('/naver_OAuth/refresh_access_token', naver_OAuth.refresh_access_token)
router.post('/sign_up', upload.single('img'), controller.sign_up)


router.get('/test', (req, res)=>{ // 테스트용
  res.sendFile(path.join(__dirname, '../client/test.html'))
})
router.get('/*', function(req, res) { // 테스트용
  res.sendFile(path.join(__dirname, '../client/index.html'))
})

export default router