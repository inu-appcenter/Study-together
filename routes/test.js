import express from 'express';
import path from 'path';

const __dirname = path.resolve();
const router = express.Router();


router.get('/', (req, res, next)=>{
  res.sendFile(__dirname+'/templates/test.html');
})
router.post('/', (req, res, next)=>{
  console.log(req.body);
  res.json({message: 'good!'});
})

export default router;