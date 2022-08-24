import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    unique: true, // To prevent duplicate values
    type: String
  },
  password: String,
  name: String,
  nickname: String,
  email: String,
  gender: String,
  birthday: String,
  interest: String,
  img: String,
})

export default mongoose.model('user', userSchema);