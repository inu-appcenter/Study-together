import path from 'path'
import {fileURLToPath} from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const cors = require('cors');

import express from 'express'
export const router=express.Router()
import * as controller from "../controller/controller.js"
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

router.get('/naver_login', controller.naver_login);
router.get('/auth/naver/callback', cors(), controller.auth_naver_callback)
router.get('/get_member/:access_token', cors(), controller.get_member)
router.get('/test', controller.test)
router.post('/sign_up', upload.single('img'), controller.sign_up)

router.get('/*', function(req, res) { // React router
    res.sendFile(path.join(__dirname, '../client/index.html'))
})

export default router