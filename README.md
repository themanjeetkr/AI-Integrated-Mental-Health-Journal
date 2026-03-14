# MindScribe — AI Mental Health Journal

A full-featured React frontend for the MindScribe journaling API.

## 📁 Project Structure

```
src/
├── api/
│   └── index.js              # Axios instance + all API calls
├── context/
│   ├── AuthContext.jsx        # Auth state, login/register/logout
│   └── JournalContext.jsx     # Journal CRUD state
├── components/
│   ├── layout/
│   │   ├── DashboardLayout.jsx
│   │   ├── Sidebar.jsx
│   │   └── Navbar.jsx
│   └── ui/
│       ├── StatCard.jsx
│       ├── JournalCard.jsx
│       ├── MoodBadge.jsx
│       └── ProtectedRoute.jsx
└── pages/
    ├── Homepage.jsx           # Landing page
    ├── Auth.jsx               # Login + Register
    ├── Dashboard.jsx          # Main dashboard
    ├── Journals.jsx           # Journal list
    ├── JournalEditor.jsx      # Create / edit entry
    ├── JournalDetail.jsx      # View single entry
    ├── Insights.jsx           # AI insights + charts
    └── Settings.jsx           # User settings
```

## 📦 Install Dependencies

```bash
npm install
```

### All packages used:

| Package | Purpose |
|---|---|
| `react` `react-dom` | Core React |
| `react-router-dom` | Client-side routing |
| `axios` | HTTP requests to backend API |
| `recharts` | Mood trend & activity charts |
| `react-hot-toast` | Toast notifications |
| `lucide-react` | Icon library |
| `date-fns` | Date formatting |
| `tailwindcss` | Utility-first CSS framework |
| `autoprefixer` | CSS autoprefixer |
| `postcss` | PostCSS (required by Tailwind) |

## 🚀 Setup

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update `REACT_APP_API_URL` to point to your Express backend:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

3. Start the development server:
   ```bash
   npm start
   ```

## 🔗 API Endpoints Used

| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/register` | Register new user |
| POST | `/auth/login` | Login, returns JWT |
| GET | `/journals` | Get all user journals |
| POST | `/journals` | Create new journal |
| GET | `/journals/:id` | Get single journal |
| PUT | `/journals/:id` | Update journal |
| DELETE | `/journals/:id` | Delete journal |

## 🎨 Pages

- **`/`** — Homepage (Hero, Features, How It Works, Testimonials, CTA, Footer)
- **`/login`** — Sign in / Sign up
- **`/dashboard`** — Stats, charts, recent entries, AI insights
- **`/journals`** — Browse & filter all entries
- **`/journals/new`** — Write a new entry
- **`/journals/:id`** — Read a single entry
- **`/journals/:id/edit`** — Edit an entry
- **`/insights`** — Mood distribution, emotional balance radar
- **`/settings`** — Profile, password, notification preferences
