import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { userRouter } from './routes/user';
import { newsRouter } from './routes/news';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8081;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/newsapp')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Email Configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Routes
app.use('/api/users', userRouter);
app.use('/api/news', newsRouter);

// Email Service
export const sendNewsUpdate = async (email: string, headlines: string[]) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your Daily News Update',
    html: `
      <h2>Today's Top Headlines</h2>
      ${headlines.map(headline => `<p>• ${headline}</p>`).join('')}
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});