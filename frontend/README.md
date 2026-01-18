# Application Wallet - Frontend

A modern React + TypeScript frontend for managing job applications with a beautiful drag-and-drop Kanban board interface.

## Tech Stack

- **React 19** - Latest React with concurrent features
- **TypeScript** - Static type checking
- **Vite** - Lightning-fast build tool and dev server
- **Zustand** - Lightweight state management
- **@dnd-kit/core** - Modern drag-and-drop for React
- **React Toastify** - Beautiful toast notifications
- **React Icons** - Comprehensive icon library
- **CSS Modules** - Scoped component styling

## Getting Started

### Prerequisites

- Node.js v18 or higher
- npm or yarn

### Installation

```bash
npm install
```

### Development

Start the Vite development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

This will:
1. Run TypeScript compiler to check types
2. Bundle and optimize with Vite
3. Output production files to `dist/`

### Preview Production Build

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

## Project Structure

```
src/
├── components/           # React components
│   ├── applications/     # Main Kanban board component
│   ├── application-card/ # Individual application card
│   ├── application-column/ # Kanban column component
│   ├── header/          # App header with actions
│   ├── loading/         # Loading indicator with dots animation
│   ├── auth-modal/      # Authentication modal
│   ├── add-application-modal/ # Add new application
│   ├── view-application-modal/ # View/edit application details
│   └── shared/          # Shared/reusable components
│       ├── StandardBtn.tsx
│       └── Modal.tsx
├── hooks/               # Custom React hooks
│   └── useApplications.tsx
├── stores/              # Zustand state stores
│   ├── applicationStore.tsx  # Application data management
│   ├── authStore.tsx         # Authentication state
│   └── modalStores.tsx       # Modal visibility control
├── types/               # TypeScript type definitions
│   ├── applicationTypes.tsx
│   └── authTypes.tsx
├── constants/           # App constants
│   ├── dummyData.tsx
│   └── refCodes.tsx
├── services/            # API service layer
├── App.tsx              # Root component
├── main.tsx             # Application entry point
└── index.css            # Global styles
```

## Key Features

### Drag-and-Drop Kanban Board

Built with `@dnd-kit/core` for smooth, accessible drag-and-drop interactions. Applications can be moved between different status columns.

### State Management

Uses Zustand for simple, performant state management:

- **applicationStore** - Manages all application data and operations
- **authStore** - Handles user authentication state
- **modalStore** - Controls modal visibility and context

### Component Architecture

All components use:
- CSS Modules for scoped styling
- TypeScript for type safety
- Functional components with hooks
- Prop interfaces for clear contracts

### Toast Notifications

React Toastify provides user feedback for:
- Successful operations
- Error messages
- Validation warnings

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server on port 5173 |
| `npm run build` | Build for production |
| `npm run lint` | Run ESLint checks |
| `npm run preview` | Preview production build |

## Configuration

### Vite Config

The project uses default Vite configuration with React plugin. To customize:

Edit `vite.config.ts`:
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Add custom configuration here
})
```

### TypeScript

Two TypeScript configs are used:
- `tsconfig.app.json` - Application code configuration
- `tsconfig.node.json` - Build tool configuration

### ESLint

ESLint is configured with:
- TypeScript support
- React hooks rules
- React refresh plugin
- Strict type checking

## Styling

The project uses CSS Modules for component-level styling:

```tsx
import styles from './Component.module.css';

export default function Component() {
  return <div className={styles.container}>...</div>;
}
```

Global styles are in `index.css` using the Poppins font family.

## Environment Variables

To connect to a backend API, create a `.env` file:

```env
VITE_API_URL=http://localhost:5000
```

Access in code with:
```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

## Development Tips

### Hot Module Replacement (HMR)

Vite provides instant HMR for:
- React components
- CSS modules
- TypeScript files

### Type Checking

Run TypeScript compiler in watch mode:
```bash
tsc -b --watch
```

### Port Configuration

Default port is 5173. To change it, update `vite.config.ts`:
```typescript
export default defineConfig({
  server: {
    port: 3000
  }
})
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Follow the existing code structure
2. Use TypeScript for all new files
3. Create CSS Modules for component styles
4. Run `npm run lint` before committing
5. Ensure type checking passes: `tsc -b`

## License

ISC
