# Enterprise AI Dashboard - React Frontend

React frontend application for the Enterprise AI Dashboard, featuring HR AI Platform and AutoSphere Motors AI Assistant.

## Features

- **Authentication**: JWT-based login with session storage
- **HR AI Platform**:
  - CV Evaluation with multiple file upload
  - Policy Management (upload and Q&A)
  - Technical Evaluation (question generation and answer evaluation)
- **AutoSphere Motors**:
  - AI Chat interface with message history
  - Booking management (create and search)

## Technology Stack

- React 18 with TypeScript
- Material-UI (MUI) v5
- Redux Toolkit for state management
- React Router v6 for routing
- Axios for API calls
- date-fns for date formatting

## Setup

1. Install dependencies:
```bash
yarn install
```

2. Create a `.env` file in the root directory:
```
REACT_APP_API_URL=http://localhost:5001
```

3. Start the development server:
```bash
yarn start
```

The app will open at `http://localhost:3000`.

## Project Structure

```
src/
├── components/
│   ├── layout/          # Layout components (Sidebar, TopBar, Layout)
│   ├── auth/            # Authentication components
│   └── common/          # Common components (Loading, Error, ProtectedRoute)
├── pages/
│   ├── Login.tsx        # Login page
│   ├── Dashboard.tsx     # Dashboard navigation hub
│   ├── hr/               # HR pages
│   └── autosphere/       # AutoSphere pages
├── store/
│   ├── slices/           # Redux slices (auth, hr, autosphere)
│   └── api/              # API functions
├── services/
│   └── api.ts            # Axios instance with interceptors
├── utils/
│   ├── theme.ts          # MUI theme configuration
│   └── constants.ts     # Constants
└── types/
    └── index.ts          # TypeScript type definitions
```

## Color Scheme

The app uses a gradient color scheme matching the logo:
- Deep Blue: `#0A2463`
- Cyan: `#00BCD4`
- Teal: `#009688`
- Purple: `#7B1FA2`

The sidebar features a gradient background using these colors.

## Authentication

- JWT tokens are stored in `sessionStorage`
- Tokens are automatically included in API requests via axios interceptors
- 401 errors trigger automatic logout
- Protected routes require authentication

## Role-Based Access

- **HR Manager**: Full access to all features
- **Employee**: Limited access (cannot upload policies or generate technical questions)

## API Integration

All API calls are made to the Flask backend. The base URL is configured via `REACT_APP_API_URL` environment variable.

## Build

To build for production:

```bash
yarn build
```

The build output will be in the `build` directory.

## Package Management

This project uses **Yarn** as the package manager. Use the following commands:

- Install dependencies: `yarn install` or `yarn`
- Add a package: `yarn add <package-name>`
- Add a dev dependency: `yarn add -D <package-name>`
- Remove a package: `yarn remove <package-name>`
- Update packages: `yarn upgrade`
- Start dev server: `yarn start`
- Build for production: `yarn build`
- Run tests: `yarn test`
