# MindScribe — AI Mental Health Journal

MindScribe is a full-stack mental wellness journaling application that uses 
AI to analyze your emotional state from daily journal entries. It automatically 
detects your primary emotion, generates personalized recommendations, and 
visualizes your mood patterns over time through interactive charts.

## 🧠 How It Works
Write a journal entry → AI analyzes the content → Detects sentiment score, 
primary emotion, secondary emotions, and risk level → Dashboard updates 
with your latest mental health insights.

## 🛠️ Tech Stack

**Frontend:** React 18, Tailwind CSS v4, Recharts, React Router v6,
             React Hot Toast, Lucide React

**Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, bcrypt, dotenv

**AI:** Sentiment analysis pipeline with emotion classification
        (joy, sadness, anger, fear, surprise, disgust → normalized moods)

## ✨ Key Features
- 🔐 JWT authentication with protected routes
- 📝 Full journal CRUD with mood tagging
- 🤖 AI sentiment analysis on every entry
- 📊 7-day mood trend and activity charts
- 🎯 Emotional balance radar chart
- 🥧 Mood distribution pie chart
- 💡 Personalized AI recommendations
- 🎨 Custom dark SaaS UI with glassmorphism

## 🚀 Getting Started

### Backend
cd Backend
npm install
node server.js

### Frontend
cd Frontend
npm install
npm run dev
