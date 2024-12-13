import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  imageUrl: String,
  date: { type: Date, default: Date.now },
  url: { type: String, required: true },
  source: String
});

export const News = mongoose.model('News', newsSchema);