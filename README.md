# MindScribe - AI Mental Health Care

MindScribe is a full-stack wellness application for private journaling, mood tracking, AI-assisted reflection, mental health insights, and meal nutrition tracking. It includes a React dashboard experience, protected user accounts, journal CRUD, AI suggestions, emotional charts, and a nutrition analyzer with meal history.

> This project is for reflection and self-care support. It is not a replacement for professional mental health care.

## Screenshot

Add your project screenshot here:

```md
```

Create a `screenshots` folder in the project root and place your screenshot there with the same file name, or update the path above.

## Features

- User registration and login with JWT authentication
- Protected dashboard, journals, insights, nutrition, and settings pages
- Create, view, edit, and delete personal journal entries
- Mood selection and AI-assisted mood detection
- Supportive AI replies and writing suggestions
- Dashboard cards for journal count, mood score, weekly activity, and insights
- Mood distribution and emotional balance charts
- Nutrition and meal analyzer with calories, protein, carbs, fat, and fiber totals
- Meal breakdown, meal history, daily trend, and weekly trend analytics
- Profile and password settings
- Responsive dark UI built with React, Tailwind CSS, Recharts, Lucide icons, and toast notifications
- Express backend with MongoDB, Mongoose, JWT, bcrypt, Helmet, and CORS

## Screenshots

Add your screenshots to a `screenshots/` folder in the project root and use these filenames:

```txt
screenshots/dashboard.png
screenshots/new-entry.png
screenshots/insights.png
screenshots/nutrition-analyzer.png
screenshots/nutrition-breakdown.png
```

Then they will render here:

![Dashboard](./screenshots/dashboard.png)
![New Entry](./screenshots/new-entry.png)
![Insights](./screenshots/insights.png)
![Nutrition Analyzer](./screenshots/nutrition-analyzer.png)
![Nutrition Breakdown](./screenshots/nutrition-breakdown.png)

## Tech Stack

| Area | Tools |
| --- | --- |
| Frontend | React 19, Vite, React Router, Tailwind CSS, Recharts, Lucide React, React Hot Toast |
| Backend | Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs, Helmet, CORS |
| AI | Hugging Face Inference API |
| Nutrition | External food nutrition API integration |

## Project Structure

```txt
AI mental Health care/
+-- Backend/
|   +-- config/
|   +-- controllers/
|   +-- middlewares/
|   +-- models/
|   +-- routes/
|   +-- services/
|   +-- utils/
|   +-- package.json
|   +-- server.js
+-- Frontend/
|   +-- public/
|   +-- src/
|   |   +-- api/
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
- MongoDB connection string
- Hugging Face API token
- Food nutrition API key

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
USDA_API_KEY=your_food_api_key
```

Start the backend:

```bash
npm run server
```

The backend runs at:

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

The frontend runs at:

```txt
http://localhost:5173
```

## Environment Variables

| Variable | Location | Description |
| --- | --- | --- |
| `PORT` | `Backend/.env` | Backend server port |
| `MONGO_URI` | `Backend/.env` | MongoDB database connection string |
| `JWT_SECRET` | `Backend/.env` | Secret used to sign JWT tokens |
| `HUGGINGFACE_API_TOKEN` | `Backend/.env` | Token used for journal emotion analysis |
| `USDA_API_KEY` | `Backend/.env` | API key used for nutrition analysis |

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

Protected routes require this header:

```txt
Authorization: Bearer <token>
```

### Health Check

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api` | Confirms the API is running |

### Authentication

| Method | Endpoint | Description | Protected |
| --- | --- | --- | --- |
| POST | `/api/auth/register` | Register a new user | No |
| POST | `/api/auth/login` | Login and receive a token | No |
| PUT | `/api/auth/profile` | Update profile details | Yes |
| PUT | `/api/auth/password` | Update account password | Yes |

### Journals

| Method | Endpoint | Description | Protected |
| --- | --- | --- | --- |
| GET | `/api/journals` | Get all journals for the logged-in user | Yes |
| POST | `/api/journals` | Create a new journal entry | Yes |
| POST | `/api/journals/suggest` | Get AI suggestions for journal content | Yes |
| GET | `/api/journals/:id` | Get a single journal entry | Yes |
| PUT | `/api/journals/:id` | Update a journal entry | Yes |
| DELETE | `/api/journals/:id` | Delete a journal entry | Yes |

### Meals

| Method | Endpoint | Description | Protected |
| --- | --- | --- | --- |
| POST | `/api/meals/analyze` | Analyze meal text and return nutrition totals | Yes |
| POST | `/api/meals/save` | Save analyzed meal data | Yes |
| GET | `/api/meals/history` | Get recent saved meals | Yes |
| GET | `/api/meals/today-summary` | Get today's nutrition totals | Yes |
| DELETE | `/api/meals/:id` | Delete a saved meal | Yes |

## App Routes

| Route | Description |
| --- | --- |
| `/` | Homepage |
| `/login` | Authentication page |
| `/dashboard` | Dashboard overview |
| `/journals` | Journal list |
| `/journals/new` | Create journal entry |
| `/journals/:id` | View journal details |
| `/journals/:id/edit` | Edit journal entry |
| `/insights` | Mood and emotional insights |
| `/nutrition` | Nutrition and meal analyzer |
| `/settings` | Profile and password settings |

## How AI Suggestions Work

When a user writes a journal entry, the backend can send the content to a Hugging Face emotion classification model. The app uses the result to detect a likely mood and generate supportive suggestions. If the AI request fails, the app can still rely on saved user input and local fallback behavior.

## How Nutrition Analysis Works

The nutrition analyzer accepts one food item per line, such as:

```txt
2 bananas
1 apple
1 glass milk
```

The backend parses each line, estimates nutrition values, returns a food breakdown, and allows the user to save the meal. Saved meals power today's summary, meal history, and calorie trend charts.

## Future Improvements

- Add production deployment instructions
- Add frontend API base URL environment configuration
- Add automated backend and frontend tests
- Add export options for journals and meal history
- Add richer safety messaging for high-risk emotional entries
- Add more complete nutrition serving-size controls

## License

This project is currently marked as ISC in the backend package metadata.
