import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
// dotenv.config();

// const token = jwt.sign({
//   id:"yard"
// }, process.env.SECRET_KEY, {expiresIn: '2d'});

// console.log(token);

// const edited = process.env.SECRET_KEY;

// jwt.verify(token, edited, async (error, decoded)=>{
//   if (error) console.error(error);

//   console.log(decoded);
// });

const password = '1234';
const hashedPw = bcrypt.hashSync(password, 12);
console.log(typeof(hashedPw));
