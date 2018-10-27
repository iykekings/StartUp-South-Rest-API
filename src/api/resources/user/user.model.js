import mongoose from 'mongoose';

export const STANDARD_ROLE = 3;
export const SPEAKER_ROLE = 2;
export const ADMIN_ROLE = 1;
const { Schema } = mongoose;

// Todo: Add profile_pics url
const userSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: false
  },
  position: {
    type: String,
    required: false
  },
  location: {
    type: String,
    required: true
  },
  points: {
    type: Number,
    required: false
  },
  password: {
    type: String,
    required: true
  },
  role: {
    default: 3,
    required: true,
    type: Number
  }
});

export default mongoose.model('User', userSchema);
