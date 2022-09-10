import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username : {type: String, unique: true},
  password : String,
  age : Number,
  nickname : String,
  gender : String,
  location:String,
  interest: String,
  img: String
});

const User = mongoose.model('UserList', userSchema);
export default User;