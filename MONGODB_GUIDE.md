# MongoDB Integration Guide

## Local Setup

### Installation

1. **Install MongoDB Community Edition**:
\`\`\`bash
# Ubuntu
sudo apt-get install mongodb

# macOS
brew tap mongodb/brew
brew install mongodb-community
\`\`\`

2. **Start MongoDB Service**:
\`\`\`bash
# Ubuntu
sudo systemctl start mongodb

# macOS
brew services start mongodb-community
\`\`\`

## MongoDB Atlas Setup

1. **Create Atlas Account**:
   - Visit mongodb.com/cloud/atlas
   - Sign up for free account
   - Create new project

2. **Create Cluster**:
   - Choose FREE tier
   - Select region
   - Choose cluster specifications

3. **Security Setup**:
   - Create database user
   - Configure IP whitelist
   - Get connection string

## Project Integration

1. **Connect to MongoDB**:
\`\`\`typescript
import mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));
\`\`\`

2. **Create Models**:
\`\`\`typescript
// User Model
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  preferences: [String],
  favorites: [String]
});

// News Model
const newsSchema = new mongoose.Schema({
  title: String,
  content: String,
  category: String,
  date: Date
});
\`\`\`

3. **Implement CRUD Operations**:
\`\`\`typescript
// Create
await User.create({ name, email, preferences });

// Read
const user = await User.findById(id);

// Update
await User.findByIdAndUpdate(id, { preferences });

// Delete
await User.findByIdAndDelete(id);
\`\`\`

## Best Practices

1. **Indexing**:
\`\`\`typescript
userSchema.index({ email: 1 });
newsSchema.index({ category: 1, date: -1 });
\`\`\`

2. **Validation**:
\`\`\`typescript
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: {
      validator: (v) => /\S+@\S+\.\S+/.test(v),
      message: 'Invalid email format'
    }
  }
});
\`\`\`

3. **Error Handling**:
\`\`\`typescript
try {
  await User.create(userData);
} catch (error) {
  if (error.code === 11000) {
    // Handle duplicate key error
  }
  // Handle other errors
}
\`\`\`

## Performance Optimization

1. **Query Optimization**:
\`\`\`typescript
// Use lean() for read-only operations
const users = await User.find().lean();

// Select specific fields
const user = await User.findById(id).select('name email');
\`\`\`

2. **Aggregation Pipeline**:
\`\`\`typescript
const stats = await News.aggregate([
  { $match: { category: 'technology' } },
  { $group: { _id: '$source', count: { $sum: 1 } } }
]);
\`\`\`

## Security

1. **Connection Security**:
\`\`\`typescript
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  ssl: true
});
\`\`\`

2. **Data Validation**:
\`\`\`typescript
const sanitize = require('mongo-sanitize');

app.post('/api/users', (req, res) => {
  const cleanData = sanitize(req.body);
  // Process cleaned data
});
\`\`\`

## Backup Strategy

1. **Regular Backups**:
\`\`\`bash
mongodump --uri="mongodb://localhost:27017/newsapp" --out=/backup/
\`\`\`

2. **Restore Data**:
\`\`\`bash
mongorestore --uri="mongodb://localhost:27017/newsapp" /backup/
\`\`\`

## Monitoring

1. **Setup Monitoring**:
   - Enable MongoDB Atlas monitoring
   - Configure alerts
   - Track performance metrics

2. **Common Metrics**:
   - Query performance
   - Connection count
   - Database size
   - Operation latency