import mongoose from 'mongoose';

// User Config
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['Administrator', 'Moderator', 'User'],
    default: 'User',
  },
});
