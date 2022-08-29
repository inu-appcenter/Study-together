import jwt from 'jsonwebtoken';
import User from '../models/Users.js';
import dotenv from 'dotenv';

const AUTH_ERROR = {message : 'Authentication Error'};

dotenv.config();

export const isAuth = async (req, res, next)=>{
  const authHeader = req.get('Authorization'); // 요청에 대해 헤더에 Authorization이 있는지,
  if (!(authHeader && authHeader.startsWith('Bearer '))){
    return res.status(401).json({err: AUTH_ERROR, message: 'authHeader error'});
  }
  const token = authHeader.split(' ')[1]
  jwt.verify( // jwt 검증, 데이터 베이스에 존재하는지 검증하는 로직!
    token,
    process.env.SECRET_KEY,
    async (error, decoded) =>{
      if (error){
        console.error(error);
        return res.status(401).json({err: AUTH_ERROR, message: 'verify error'});
      }
      const user = await User.findById(decoded._id);
      if (!user){
        return res.status(401).json({err: AUTH_ERROR, message: 'not exist user'});
      }
      // req.userId = user.id; // req.customData
      next();
    }
  )
}
