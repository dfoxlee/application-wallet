# Application Wallet

A full-stack application tracking system built with React, TypeScript, and Express. Manage your job applications with an intuitive drag-and-drop Kanban board interface.

## Features

- 📋 **Kanban Board Interface** - Organize applications by status with drag-and-drop functionality
- 🎯 **Application Tracking** - Track company name, position, salary, location, and timeline
- 📝 **Event History** - Log important events and updates for each application
- 🔐 **Authentication** - Secure user authentication system
- 🎨 **Modern UI** - Clean, responsive design with CSS modules
- ⚡ **Real-time Updates** - State management with Zustand for instant UI updates

## Tech Stack

### Frontend
- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Zustand** - State management
- **@dnd-kit/core** - Drag and drop functionality
- **React Toastify** - Toast Notifications
- **React Icons** - Icon library

### Backend
- **Express 5** - Web framework
- **Node.js** - Runtime environment
- **MySQL2** - Database driver
- **JSON Web Tokens** - Authentication
- **dotenv** - Environment configuration
- **CORS** - Cross-origin resource sharing

## Project Structure

```
application-wallet/
├── backend/
│   ├── index.js              # Express server entry point
│   ├── package.json
│   ├── .env                  # Environment variables
│   ├── controllers/          # Request handlers
│   ├── routes/              # API routes
│   ├── services/            # Business logic
│   ├── middleware/          # Custom middleware
│   └── utils/               # Utility functions
│
└── frontend/
    ├── src/
    │   ├── components/      # React components
    │   │   ├── applications/
    │   │   ├── application-card/
    │   │   ├── application-column/
    │   │   ├── header/
    │   │   ├── loading/
    │   │   ├── auth-modal/
    │   │   ├── add-application-modal/
    │   │   ├── view-application-modal/
    │   │   └── shared/
    │   ├── hooks/           # Custom React hooks
    │   ├── stores/          # Zustand stores
    │   ├── types/           # TypeScript type definitions
    │   ├── constants/       # Constants and reference data
    │   ├── services/        # API service layer
    │   └── App.tsx          # Main application component
    └── package.json
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MySQL database

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd application-wallet
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

### Configuration

1. **Backend Environment Variables**
   
   Create a `.env` file in the `backend` directory:
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=application_wallet
   JWT_SECRET=your_jwt_secret
   ```

2. **Database Setup**
   
   Set up your MySQL database and run the necessary migrations/schema.

### Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   ```
   The backend will run on `http://localhost:5000`

2. **Start the frontend development server**
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will run on `http://localhost:5173` (Vite default)

3. **Access the application**
   
   Open your browser and navigate to `http://localhost:5173`

## Port Configuration

- **Backend API**: Port `5000` (configurable via `PORT` environment variable in `.env`)
- **Frontend Dev Server**: Port `5173` (default Vite port, can be changed in `vite.config.ts`)

## Available Scripts

### Backend

- `npm run dev` - Start development server with nodemon (auto-reload)
- `npm start` - Start production server

### Frontend

- `npm run dev` - Start Vite development server
- `npm run build` - Build for production (TypeScript compilation + Vite build)
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build locally

## Application States

Applications can be in the following states:
- Applied
- Phone Screen
- Interview
- Offer
- Rejected

## Development

### Code Style

- ESLint configuration for TypeScript and React
- CSS Modules for component styling
- TypeScript strict mode enabled

### State Management

The application uses Zustand for state management with the following stores:
- `applicationStore` - Manages application data and CRUD operations
- `authStore` - Handles authentication state
- `modalStore` - Controls modal visibility and state

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Author

David Foxlee
