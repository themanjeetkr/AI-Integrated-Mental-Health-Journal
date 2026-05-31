# MindScribe - AI Mental Health Journal

MindScribe is a full-stack mental health journaling app for writing private reflections, tracking moods, and receiving supportive AI-assisted insights. It uses a React + Vite frontend, an Express + MongoDB backend, JWT authentication, and Hugging Face emotion analysis.

> This project is for reflection and self-care support. It is not a replacement for professional mental health care.

## Screenshot

Add your project screenshot here:

```md
```

Create a `screenshots` folder in the project root and place your screenshot there with the same file name, or update the path above.

## Features

- User registration and login with JWT authentication
- Protected dashboard, journal, insights, and settings pages
- Create, view, edit, and delete private journal entries
- Mood selection with AI-assisted emotion detection
- Supportive AI replies and journal suggestions
- Mood and emotional insight views with charts
- Profile and password update settings
- Responsive React interface with toast notifications
- Secure backend basics with Helmet, CORS, bcrypt password hashing, and protected routes

## Tech Stack

| Area | Tools |
| --- | --- |
| Frontend | React 19, Vite, React Router, Tailwind CSS, Recharts, Lucide React, React Hot Toast |
| Backend | Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs, Helmet, CORS |
| AI | Hugging Face Inference API |

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
- MongoDB database connection string
- Hugging Face API token

### Clone the Repository

```bash
git clone <your-repository-url>
cd "AI mental Health care"
```

### Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file inside `Backend/`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
HUGGINGFACE_API_TOKEN=your_huggingface_api_token
```

Start the backend:

```bash
npm run server
```

The API will run at:

```txt
http://localhost:5000
```

### Frontend Setup

Open a second terminal:

```bash
cd Frontend
npm install
npm run dev
```

The app will run at:

```txt
http://localhost:5173
```

## Environment Variables

| Variable | Location | Description |
| --- | --- | --- |
| `PORT` | `Backend/.env` | Backend server port |
| `MONGO_URI` | `Backend/.env` | MongoDB connection string |
| `JWT_SECRET` | `Backend/.env` | Secret used to sign JWT tokens |
| `HUGGINGFACE_API_TOKEN` | `Backend/.env` | Token used for Hugging Face emotion analysis |

## Available Scripts

### Backend

| Command | Description |
| --- | --- |
| `npm run server` | Starts the Express server with Nodemon |
| `npm test` | Placeholder test script |

### Frontend

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the Vite development server |
| `npm run build` | Builds the frontend for production |
| `npm run preview` | Serves the production build locally |
| `npm run lint` | Runs ESLint |

## API Endpoints

### Health Check

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api` | Confirms the API is running |

### Authentication

| Method | Endpoint | Description | Protected |
| --- | --- | --- | --- |
| POST | `/api/auth/register` | Register a new user | No |
| POST | `/api/auth/login` | Login and receive a token | No |
| PUT | `/api/auth/profile` | Update user profile | Yes |
| PUT | `/api/auth/password` | Update user password | Yes |

### Journals

| Method | Endpoint | Description | Protected |
| --- | --- | --- | --- |
| GET | `/api/journals` | Get all journals for the logged-in user | Yes |
| POST | `/api/journals` | Create a new journal entry | Yes |
| POST | `/api/journals/suggest` | Get AI suggestions for journal content | Yes |
| GET | `/api/journals/:id` | Get a single journal entry | Yes |
| PUT | `/api/journals/:id` | Update a journal entry | Yes |
| DELETE | `/api/journals/:id` | Delete a journal entry | Yes |

Protected routes require this header:

```txt
Authorization: Bearer <token>
```

## App Routes

| Route | Description |
| --- | --- |
| `/` | Homepage |
| `/login` | Authentication page |
| `/dashboard` | User dashboard |
| `/journals` | Journal list |
| `/journals/new` | Create journal entry |
| `/journals/:id` | View journal details |
| `/journals/:id/edit` | Edit journal entry |
| `/insights` | Mood and emotional insights |
| `/settings` | Profile and password settings |

## How AI Analysis Works

When a user writes a journal entry, the backend sends the content to a Hugging Face emotion classification model. The result is used to identify the primary emotion, estimate sentiment, map the emotion to a mood, and generate supportive suggestions.

If the AI request fails, the app still saves the journal entry and falls back to local mood and keyword rules.

## Screenshot

Add a screenshot to show the dashboard or journal experience:

```md
![MindScribe Dashboard](./screenshots/mindscribe-dashboard.png)
```

Create a `screenshots/` folder in the project root and place the image there, or update the path to match your screenshot file.

## Future Improvements

- Add deployment instructions for the frontend and backend
- Add frontend environment variable support for the API base URL
- Add journal search, filtering, and sorting
- Add more complete loading and error states
- Add automated tests for backend controllers and frontend flows
- Add crisis-resource messaging for high-risk emotional entries

## License

This project is currently marked as ISC in the backend package metadata.
