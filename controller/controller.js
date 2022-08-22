import bcrypt from 'bcrypt'
import User from '../models/User.js'

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
      res.writeHead(409, {'Content-Type': 'text/html;charset=utf-8'});
      return res.end('ID already in use or DB error')
    }

    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
    return res.end('User successfully added')
  })
}