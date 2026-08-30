# TCF Church Website

A React + TypeScript + Vite web application for Tabernacle Christ Fellowship (TCF) Church in Singapore.

## Technology Stack

- **React** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **ESLint** - Code linting
- **Prettier** - Code formatting

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

The app will be available at `http://localhost:5173`

## Production Build

Build for production:
```bash
npm run build
```

The optimized build output will be in the `dist/` directory.

## Linting

Run ESLint to check code quality:
```bash
npm run lint
```

## Code Formatting

Format code with Prettier:
```bash
npm run format
```

## Preview

Preview the production build locally:
```bash
npm run preview
```

## Project Structure

```
src/
├── components/    # Reusable React components
├── layouts/       # Layout components
├── pages/         # Page components
├── hooks/         # Custom React hooks
├── services/      # Business logic and API calls
├── types/         # TypeScript type definitions
├── utils/         # Utility functions
├── lib/           # Third-party library configurations
├── App.tsx        # Root component
├── main.tsx       # Entry point
└── index.css      # Global styles
```

## Future Milestones

This project will eventually include:
- Supabase integration for backend services
- Authentication system
- Admin dashboard
- Database integration
- Vercel deployment

These features will be implemented in later development milestones.

## Notes

This is a development-focused setup optimized for maintainability by a single developer. The architecture prioritizes clarity and simplicity over premature optimization.
