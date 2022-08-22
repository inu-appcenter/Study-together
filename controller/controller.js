import path from 'path'
import {fileURLToPath} from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

import request from 'request'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from '../models/User.js'

//네이버 OAuth
const client_id = 'hSAxIZYqNtrSumDgyWQD';
const state = "RAMDOM_STATE";
export const naver_login = async (req, res) => { // 네이버로 login
  const redirect_URL = encodeURI("http://localhost:4000/auth/naver/callback");
  const login_URL = 'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=' + client_id + '&redirect_uri=' + redirect_URL + '&state=' + state;
  res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
  res.end(login_URL)
}

export const auth_naver_callback = async (req, res) => { // 로그인 완료시 callback
  const client_secret = 'JSau1N85kI';
  const code = req.query.code;
  const api_url = 'https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id='
   + client_id + '&client_secret=' + client_secret + '&code=' + code + '&state=' + state;
  const options = {
      url: api_url,
      headers: {'X-Naver-Client-Id': client_id, 'X-Naver-Client-Secret': client_secret}
  }
  request.get(options, (error, response, body)=>{
    if (!error && response.statusCode == 200) {
      res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
      //res.end(`<script>localStorage.setItem('token', '${body}');</script>`) // 토큰 저장
      res.end(`<script>localStorage.setItem('token', '${body}'); location.href="http://localhost:4000/test";</script>`) // 테스트용
    } else {
      res.status(response.statusCode).end();
      console.log('error = ' + response.statusCode);
    }
  })
}

export const get_member = async(req, res)=>{ // 
  const options = {
    url: 'https://openapi.naver.com/v1/nid/me',
    headers: {'Authorization': `bearer ${req.params.access_token}`}
  }
  request.get(options, (error, response, body)=>{
    if (!error && response.statusCode == 200) {
      let profile=JSON.parse(body).response //네이버 프로필
      res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
      User.findOne({ username: profile.id }, (err, user) => { //회원인지 찾기
        if(!user){ // 회원아니면 회원가입 해야되니까 네이버 프로필 보내기
          res.end(JSON.stringify({registered: "No", profile: profile}))
          return
        }
        
        res.end(JSON.stringify({registered: "Yes", user: user})) // 회원이면 회원정보 보내기
      })
    } else {
      res.status(response.statusCode).end();
      console.log('error = ' + response.statusCode);
    }
  })
}
//---

export const sign_up = async(req, res)=>{
  console.log(req.body)
  const newUser = new User({ // New document
    username: req.body.username,
    password: req.body.password? bcrypt.hashSync(req.body.password, 10): '', // Encryption
    name: req.body.name,
    nickname: req.body.nickname,
    email: req.body.email,
    gender: req.body.gender,
    birthday: req.body.birthday,
    //img: req.body.profileImg!==''? req.file.filename : ''
    img: ''
  });

  newUser.save(err => {
    if (err) { // Duplicate not allowed
      return res.status(409).json({error: 'ID already in use'})
    }

    return res.status(200).json({title: 'User successfully added'})
  })
}