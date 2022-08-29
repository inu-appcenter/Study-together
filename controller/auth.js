import User from '../models/Users.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const jwtExpiresInDays = '2d'; // jwt 만기일
const bcryptSaltRounds = 12; // Bcrypt salt 지정값

export async function signup(req, res){
  const found = await User.findOne({username: req.body.username});
  if (found){
    return res.status(409).json({message: `${req.body.username} already exists`});
  }
  
  const hashedPw = bcrypt.hashSync(req.body.password, bcryptSaltRounds); // Encryption

  // 새로운 유저를 생성
  const newUser = new User({
    username: req.body.username,
    password: hashedPw,
    age: req.body.age,
    nickname: req.body.nickname,
    gender: req.body.gender,
  });

  console.log(newUser);
  await newUser.save();

  res.status(201).redirect('/');
}

export async function login(req, res){
  console.log(req.body);
  const {username, password} = req.body;
  // 유저의 아이디가 존재할 경우 추출해내는 구문
  const user = await User.findOne({username:username});
  if (!user){
    return res.status(401).json({message: 'Invalid user or password'});
  }
  // 들어온 패스워드값을 해싱해 DB에 있는 유저의 패스워드 정보와 대조
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({message: 'Invalid user or password'});
  }

  // 모든 단계를 통과하고 나면 user의 _id를 통해 토큰을 발급
  const token = createJwtToken(user._id);
  res.cookie('jwt', 'Bearer' + token);
  res.status(200).json({token, user});
}

export async function getInfo(req, res){
  // 미들웨어를 통해 들어온 req.decoded를 이용해 유저의 정보를 추출해낼 수 있다.
  const user = await User.findOne({_id: req.decoded._id}); 
  if (!user){
    return res.status(404).json({message: 'User not found'});
  }
  // 위에 기술한 것과 마찬가지로, req.token 또한 미들웨어에서 지정해줬기 때문에 이용할 수 있다!
  res.status(200).json({token: req.token, username: user.username});
}

function createJwtToken(id){
  return jwt.sign({_id: id}, process.env.SECRET_KEY, {expiresIn: jwtExpiresInDays});
}
