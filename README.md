# MindScribe - AI Mental Health Journal

MindScribe is a full-stack mental health journaling app that helps users write private journal entries, track moods, and receive AI-assisted emotional insights. The project includes a React/Vite frontend and an Express/MongoDB backend with JWT authentication.

> This project is for reflection and self-care support. It is not a replacement for professional mental health care.

## Screenshot

Add your project screenshot here:

```md
```

Create a `screenshots` folder in the project root and place your screenshot there with the same file name, or update the path above.

## Features

- User registration and login with JWT authentication
- Protected dashboard and journal pages
- Create, read, update, and delete journal entries
- Mood selection with mood scores and tags
- AI-powered emotion analysis using Hugging Face inference
- Personalized journal suggestions and supportive AI replies
- Dashboard and insights pages with charts
- Profile and password update settings
- Responsive React interface built with Vite

## Tech Stack

### Frontend

- React 19
- Vite
- React Router
- Tailwind CSS
- Recharts
- React Hot Toast
- Lucide React
- date-fns

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Helmet
- CORS
- Hugging Face Inference API

## Project Structure

```txt
AI mental Health care/
+-- Backend/
|   +-- config/
|   |   +-- db.js
|   +-- controllers/
|   |   +-- authController.js
|   |   +-- journalController.js
|   +-- middlewares/
|   |   +-- authMiddlewares.js
|   +-- models/
|   |   +-- Journal.js
|   |   +-- User.js
|   +-- routes/
|   |   +-- AuthRoutes.js
|   |   +-- journalRoutes.js
|   +-- utils/
|   |   +-- aiAnalysis.js
|   +-- package.json
|   +-- server.js
+-- Frontend/
|   +-- src/
|   |   +-- components/
|   |   +-- context/
|   |   +-- pages/
|   |   +-- services/
|   |   +-- App.jsx
|   |   +-- main.jsx
|   +-- package.json
|   +-- vite.config.js
+-- README.md
```

## Getting Started

### Prerequisites

- Node.js
- npm
- MongoDB database
- Hugging Face API token

### 1. Clone The Repository

```bash
git clone <your-repository-url>
cd "AI mental Health care"
```

### 2. Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file inside the `Backend` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
HUGGINGFACE_API_TOKEN=your_huggingface_api_token
```

Start the backend server:

```bash
npm run server
```

The backend runs on:

```txt
http://localhost:5000
```

### 3. Frontend Setup

Open a new terminal:

```bash
cd Frontend
npm install
npm run dev
```

The frontend runs on:

```txt
http://localhost:5173
```

## API Endpoints

### Auth

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user and return token |
| PUT | `/api/auth/profile` | Update user profile |
| PUT | `/api/auth/password` | Update user password |

### Journals

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/journals` | Get all journals for logged-in user |
| POST | `/api/journals` | Create a new journal |
| GET | `/api/journals/:id` | Get a single journal |
| PUT | `/api/journals/:id` | Update a journal |
| DELETE | `/api/journals/:id` | Delete a journal |
| POST | `/api/journals/suggest` | Get AI suggestions for journal content |

Protected routes require this header:

```txt
Authorization: Bearer <token>
```

## Pages

| Route | Description |
| --- | --- |
| `/` | Homepage |
| `/login` | Login and registration |
| `/dashboard` | User dashboard |
| `/journals` | Journal list |
| `/journals/new` | Create journal |
| `/journals/:id` | View journal details |
| `/journals/:id/edit` | Edit journal |
| `/insights` | Mood and emotional insights |
| `/settings` | Profile and password settings |

## How AI Analysis Works

When a user writes a journal entry, the backend sends the content to a Hugging Face emotion classification model. The app uses the result to detect the main emotion, estimate sentiment, map the emotion to a mood, and generate supportive suggestions.

If the AI request fails, the app still keeps the journal entry and can fall back to local mood rules.

## Available Scripts

### Backend

```bash
npm run server
```

Starts the Express server using Nodemon.

### Frontend

```bash
npm run dev
```

Starts the Vite development server.

```bash
npm run build
```

Builds the frontend for production.

```bash
npm run lint
```

Runs ESLint.

## Future Improvements

- Add screenshot images to the README
- Add loading and error states for every API request
- Add frontend environment variable support for API base URL
- Add journal search and filtering
- Add test coverage for backend controllers and frontend components
- Add deployment instructions

## License

This project is open for learning and personal portfolio use.
