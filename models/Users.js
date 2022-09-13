import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    unique: true,
    type: String
  },
  password: String,
  name: String,
  nickname: String,
  email: String,
  gender: String,
  birthday: String,
  interest: String,
  location: String,
  img: String
});

const User = mongoose.model('UserList', userSchema);
export default User;