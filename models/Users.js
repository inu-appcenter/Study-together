import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username : {type: String, unique: true},
  password : String,
  age : Number,
  nickname : String,
  gender : String,
  img: String
});

const User = mongoose.model('UserList', userSchema);
export default User;