# Orange Contract Generator (OCG)

A React + TypeScript application for generating, editing, and managing legal contract templates using Google's Gemini AI.

## Features

- 🤖 **AI-Powered Contract Generation** - Intelligent wizard using Gemini AI
- 📄 **Document Import** - OCR-based PDF/Word/Image import with AI vision
- 🎙️ **Voice Input** - Real-time voice transcription for editing
- ✏️ **Smart Editor** - Rich contract editor with AI chat assistance
- 🔐 **User Authentication** - JWT-based auth with MongoDB persistence
- 🌓 **Dark Mode** - Full dark/light theme support
- 🌍 **i18n** - English and French translations

## Project Structure

```
OCG/
├── src/                          # Frontend source code
│   ├── main.tsx                  # App entry point
│   ├── app/                      # Main application
│   │   └── App.tsx               # Root component with state management
│   ├── components/               # React components
│   │   ├── auth/                 # Authentication (Login/Register)
│   │   ├── layout/               # Layout (Navigation)
│   │   └── contract/             # Contract features
│   │       ├── Choice.tsx        # Creation method selector
│   │       ├── Library.tsx       # Template grid with preview
│   │       ├── Wizard.tsx        # AI contract builder
│   │       ├── Prefill.tsx       # Variable mapping form
│   │       ├── Editor.tsx        # Rich editor with AI chat
│   │       └── OCRUpload.tsx     # Document import
│   ├── hooks/                    # Custom React hooks
│   │   ├── useAuth.ts            # Authentication state
│   │   ├── useTemplates.ts       # Template CRUD operations
│   │   ├── useTheme.ts           # Theme management
│   │   └── useLocalStorage.ts    # Persistent state
│   ├── services/                 # External services
│   │   ├── ai.service.ts         # Gemini AI integration
│   │   ├── api.service.ts        # Backend HTTP client
│   │   └── audio.service.ts      # Voice transcription
│   ├── types/                    # TypeScript definitions
│   │   └── index.ts              # All types and interfaces
│   ├── i18n/                     # Internationalization
│   │   └── translations.ts       # EN/FR translations
│   └── styles/                   # CSS styles
│       └── index.css             # Custom styles
├── server/                       # Backend (Node.js + Express)
│   ├── index.js                  # Server entry point
│   ├── models/                   # Mongoose models
│   │   ├── User.js               # User schema
│   │   └── Template.js           # Template schema
│   ├── routes/                   # API routes
│   │   ├── auth.js               # Authentication endpoints
│   │   ├── templates.js          # Template CRUD endpoints
│   │   └── users.js              # User profile endpoints
│   └── middleware/               # Express middleware
│       └── auth.js               # JWT authentication
├── converter/                    # Legacy contract samples
├── index.html                    # HTML entry point
├── vite.config.ts                # Vite configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Dependencies
```

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Atlas account
- Google Gemini API key

### Environment Setup

**Frontend (.env in root)**
```env
GEMINI_API_KEY=your_gemini_api_key
```

**Backend (server/.env)**
```env
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_jwt_secret
PORT=3001
```

### Installation

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server && npm install
```

### Development

```bash
# Terminal 1: Start backend
cd server && npm run dev

# Terminal 2: Start frontend
npm run dev
```

The app will be available at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login
- `GET /api/auth/verify` - Verify JWT token

### Templates
- `GET /api/templates` - List user templates
- `POST /api/templates` - Create template
- `PATCH /api/templates/:id/pin` - Toggle pin status
- `POST /api/templates/:id/duplicate` - Duplicate template
- `DELETE /api/templates/:id` - Delete template

### Users
- `GET /api/users/me` - Get profile
- `PUT /api/users/me` - Update profile/preferences

## Contract Types

| Type | Description |
|------|-------------|
| Master Agreement | Framework agreement |
| Service Order | Specific service terms |
| MOU | Memorandum of Understanding |
| NDA | Non-Disclosure Agreement |
| SLA | Service Level Agreement |
| Distribution DTC | Direct-to-Consumer distribution |
| Distribution GP | General Public distribution |
| Distribution Fixe | Fixed line distribution |
| Distribution POSTP | Postpaid distribution |
| Recharge | Recharge services |
| Partenariat | Partnership agreement |
| GNV | GNV services |
| Avenant | Amendment |

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS
- **Backend**: Node.js, Express, Mongoose
- **Database**: MongoDB Atlas
- **AI**: Google Gemini (gemini-2.5-flash-preview)
- **Auth**: JWT with bcrypt

## License

Proprietary - Orange Internal Use Only
