import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const groupSchema = new mongoose.Schema({
  title: {
    unique: true,
    type: String,
  },
  location: String,
  interest: String,
  maxNumber: Number,
  admin: {type: Schema.Types.ObjectId, ref: 'User' },
  member: [{type: Schema.Types.ObjectId, ref: 'User'}]
});

const Group = mongoose.model('Group', groupSchema);
export default Group;