import User from '../models/Users.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const jwtExpiresInDays = '2d';
const bcryptSaltRounds = 12;

export async function signup(req, res){
  console.log(req.body);

  const found = await User.findOne({username: req.body.username});
  if (found){
    return res.status(409).json({message: `${req.body.username} already exists`});
  }
  
  const hashedPw = bcrypt.hashSync(req.body.password, bcryptSaltRounds);

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
  // const token = createJwtToken(newUser._id);
  // res.status(201).json({token, newUser});
}

export async function login(req, res){
  console.log(req.body);
  const {username, password} = req.body;
  const user = await User.findOne({username:username});
  if (!user){
    return res.status(401).json({message: 'Invalid user or password'});
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({message: 'Invalid user or password'});
  }

  const token = createJwtToken(user._id);
  res.cookie('jwt', token);
  res.status(200).json({token, user});
}

export async function getInfo(req, res){
  // const user = await User.findOne({username: req.body.username});
  // if (!user){
  //   return res.status(404).json({message: 'User not found'});
  // }
  // res.status(200).json({token: req.token, username: user.username});
  res.status(200).json({message: 'good!'});
}

function createJwtToken(id){
  return jwt.sign({_id: id}, process.env.SECRET_KEY, {expiresIn: jwtExpiresInDays});
}

