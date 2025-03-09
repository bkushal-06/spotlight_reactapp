# spotlight - Modern News Aggregator.

## Setup Instructions

### Prerequisites
1. Node.js (v16 or higher)
2. MongoDB (local installation or MongoDB Atlas account)
3. Gmail account for email notifications

### Local Development Setup

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd spotlight
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Update the following variables:
     - `MONGODB_URI`: Your MongoDB connection string
     - `EMAIL_USER`: Gmail address for sending notifications
     - `EMAIL_PASS`: Gmail app-specific password
     - `NEWS_API_KEY`: Your News API key

4. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

### MongoDB Setup Guide

1. **Local MongoDB Installation**:
   - Download and install MongoDB Community Edition
   - Start MongoDB service:
     ```bash
     sudo systemctl start mongod
     ```
   - Verify connection:
     ```bash
     mongosh
     ```

2. **MongoDB Atlas Setup**:
   - Create account at mongodb.com/cloud/atlas
   - Create new cluster
   - Get connection string
   - Update MONGODB_URI in .env

### Project Structure

\`\`\`
src/
├── components/     # Reusable UI components
├── models/         # MongoDB schemas
├── pages/          # Route components
├── services/       # API services
├── store/          # State management
└── server/         # Backend API
\`\`\`

### Features
- User authentication
- Personalized news feed
- Email notifications
- Dark/Light mode
- Responsive design
- News preferences
- Favorites system

### API Integration
The app uses News API for fetching news. Configure your API key in the `.env` file.

### Email Notifications
Email notifications are sent using Nodemailer. Configure your Gmail account:
1. Enable 2-factor authentication
2. Generate app-specific password
3. Update EMAIL_USER and EMAIL_PASS in .env

### Deployment
1. Build the application:
\`\`\`bash
npm run build
\`\`\`

2. Start production server:
\`\`\`bash
npm start
\`\`\`

### Security Considerations
- Use environment variables for sensitive data
- Implement rate limiting
- Sanitize user inputs
- Use HTTPS in production
- Regular dependency updates
