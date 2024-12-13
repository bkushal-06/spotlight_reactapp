import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  preferences: [String],
  favorites: [String],
  lastVisit: { type: Date, default: Date.now },
  emailNotifications: { type: Boolean, default: true }
});

export const User = mongoose.model('User', userSchema);