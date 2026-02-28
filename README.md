# Enterprise AI Dashboard - React Frontend

A modern React application built with TypeScript, Material-UI, and Redux Toolkit that provides a comprehensive interface for HR AI Platform and AutoSphere Motors AI Assistant. The application features JWT authentication, role-based access control, and a beautiful gradient-themed UI.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [Architecture](#architecture)
- [Authentication & Authorization](#authentication--authorization)
- [Pages & Features](#pages--features)
- [API Integration](#api-integration)
- [UI/UX Design](#uiux-design)
- [Development](#development)
- [Build & Deployment](#build--deployment)
- [Troubleshooting](#troubleshooting)

## 🎯 Overview

This React frontend application serves as the user interface for the Enterprise AI Dashboard, connecting to a Flask REST API backend. It provides two main sections:

1. **HR AI Platform**: Tools for CV evaluation, policy management, and technical assessments
2. **AutoSphere Motors**: AI-powered chat assistant and booking management system

The application is designed with a modern, responsive UI featuring a gradient color scheme that matches the brand identity, with role-based access control to ensure appropriate feature visibility based on user permissions.

## ✨ Features

### Core Features

- **🔐 JWT Authentication**: Secure login with token-based authentication stored in sessionStorage
- **👥 Role-Based Access Control**: Different feature sets for HR Managers and Employees
- **📱 Responsive Design**: Mobile-friendly interface with collapsible sidebar navigation
- **🎨 Modern UI**: Material-UI components with custom gradient theme
- **⚡ State Management**: Redux Toolkit for centralized state management
- **🔄 Real-time Updates**: Loading states and error handling throughout the application

### HR AI Platform Features

- **📄 CV Evaluation**: Upload multiple CVs (PDF/DOCX) with job description for AI-powered evaluation
  - Ranked candidate list with scores
  - Skill analysis per candidate
  - Hire recommendations
  - Executive KPIs dashboard

- **📚 Policy Management**: Upload and manage company policies (HR Manager only)
  - Multiple PDF file upload
  - Q&A interface for policy queries
  - AI-powered policy question answering

- **🧪 Technical Evaluation**: Generate and evaluate technical interview questions
  - Step 1: Generate questions based on job description and CV
  - Step 2: Evaluate candidate answers with scoring

### AutoSphere Motors Features

- **💬 AI Chat Interface**: Conversational AI assistant with message history
  - Natural language interaction
  - Intent detection and booking flow integration
  - Context-aware responses

- **📅 Booking Management**: Create and manage service/test drive bookings
  - Create bookings with natural language or structured form
  - Search and filter bookings (by ID, phone, type)
  - Booking details view

## 🛠 Technology Stack

### Core Technologies

- **React 18.2.0** - UI library
- **TypeScript 4.9.5** - Type safety and enhanced developer experience
- **Material-UI (MUI) v5.14.0** - Component library and theming
- **Redux Toolkit 1.9.0** - State management
- **React Router v6.16.0** - Client-side routing
- **Axios 1.5.0** - HTTP client with interceptors

### Supporting Libraries

- **React Hook Form 7.45.0** - Form handling and validation
- **date-fns 2.30.0** - Date formatting utilities
- **@emotion/react & @emotion/styled** - CSS-in-JS styling (required by MUI)

### Development Tools

- **Vite 5.0.0** - Next-generation frontend build tool (fast HMR, optimized builds)
- **TypeScript 5.3.0** - Static type checking
- **ESLint** - Code linting and quality checks
- **@vitejs/plugin-react** - Vite plugin for React support

## 📁 Project Structure

```
hr-demo-react/
├── public/
│   └── logo.svg            # Infinity symbol logo
├── index.html               # HTML entry point (Vite)
├── src/
│   ├── components/          # Reusable React components
│   │   ├── layout/
│   │   │   ├── Layout.tsx       # Main layout wrapper
│   │   │   ├── Sidebar.tsx      # Left navigation sidebar
│   │   │   └── TopBar.tsx       # Top navigation bar
│   │   ├── auth/
│   │   │   └── LoginForm.tsx    # Login form component
│   │   └── common/
│   │       ├── LoadingSpinner.tsx  # Loading indicator
│   │       ├── ErrorAlert.tsx      # Error display component
│   │       └── ProtectedRoute.tsx  # Route protection wrapper
│   ├── pages/               # Page components
│   │   ├── Login.tsx        # Login page
│   │   ├── Dashboard.tsx   # Dashboard navigation hub
│   │   ├── hr/
│   │   │   ├── CVEvaluation.tsx        # CV evaluation page
│   │   │   ├── PolicyManagement.tsx     # Policy management page
│   │   │   └── TechnicalEvaluation.tsx  # Technical evaluation page
│   │   └── autosphere/
│   │       ├── Chat.tsx     # AI chat interface
│   │       └── Bookings.tsx # Booking management page
│   ├── store/               # Redux store configuration
│   │   ├── index.ts        # Store setup and configuration
│   │   ├── hooks.ts        # Typed Redux hooks
│   │   ├── slices/         # Redux slices (state + reducers)
│   │   │   ├── authSlice.ts        # Authentication state
│   │   │   ├── hrSlice.ts          # HR platform state
│   │   │   └── autosphereSlice.ts  # AutoSphere state
│   │   └── api/            # API action creators
│   │       ├── authApi.ts        # Auth API calls
│   │       ├── hrApi.ts          # HR API calls
│   │       └── autosphereApi.ts  # AutoSphere API calls
│   ├── services/
│   │   └── api.ts          # Axios instance with interceptors
│   ├── utils/
│   │   ├── theme.ts        # MUI theme configuration
│   │   └── constants.ts    # Application constants
│   ├── types/
│   │   └── index.ts        # TypeScript type definitions
│   ├── App.tsx             # Main app component with routing
│   ├── index.tsx           # Application entry point
│   └── index.css           # Global styles
├── .env                    # Environment variables (not in git)
├── .env.example            # Environment variables template
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript configuration
├── tsconfig.node.json      # TypeScript config for Vite config file
├── package.json            # Dependencies and scripts
└── README.md               # This file
```

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v16.x or higher
- **Yarn**: v1.22.x or higher (package manager)
- **Backend API**: Flask API running on `http://localhost:5001` (or configured URL)

### Installation

1. **Clone the repository** (if not already done):
   ```bash
   cd hr-demo-react
   ```

2. **Install dependencies**:
   ```bash
   yarn install
   ```
   or
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and set your API URL:
   ```
   VITE_API_URL=http://localhost:5001
   ```
   **Note**: Vite uses `VITE_` prefix for environment variables (not `REACT_APP_`)

4. **Start the development server**:
   ```bash
   yarn dev
   ```
   The application will open at `http://localhost:3000` in your default browser with hot module replacement (HMR) enabled.

### Quick Start Commands

```bash
# Install dependencies
yarn install

# Start development server (with HMR)
yarn dev

# Build for production
yarn build

# Preview production build locally
yarn preview

# Run linting
yarn lint

# Add a new package
yarn add <package-name>

# Add a dev dependency
yarn add -D <package-name>
```

### Vite Benefits

- **⚡ Lightning Fast HMR**: Near-instant hot module replacement during development
- **🚀 Optimized Builds**: Faster production builds with better tree-shaking
- **📦 Better Code Splitting**: Automatic code splitting for optimal bundle sizes
- **🔧 Modern Tooling**: Built on native ES modules for better performance

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Backend API Base URL
VITE_API_URL=http://localhost:5001
```

**Important Notes**:
- Vite uses `VITE_` prefix for environment variables (not `REACT_APP_`)
- Access variables in code using `import.meta.env.VITE_API_URL` (not `process.env`)
- Environment variables are statically replaced during build
- Variables without `VITE_` prefix are not exposed to client-side code for security

### Vite Configuration

The `vite.config.ts` file includes:
- React plugin configuration
- Path aliases (`@/` maps to `src/`)
- Development server proxy for API calls
- Production build optimizations with code splitting
- Source maps for debugging

Key configuration options:
- **Server Port**: 3000 (configurable)
- **API Proxy**: Automatically proxies `/api` requests to backend
- **Build Output**: `build/` directory
- **Manual Chunks**: Vendor, MUI, and Redux are split into separate chunks

### TypeScript Configuration

The project uses TypeScript with strict mode enabled. Configuration files:

- **`tsconfig.json`**: Main TypeScript config for source files
- **`tsconfig.node.json`**: TypeScript config for Vite config file

Key settings:
- **Strict mode**: Enabled for type safety
- **JSX**: React JSX transform
- **Module resolution**: Bundler (Vite-compatible)
- **Target**: ES2020
- **Path aliases**: `@/*` maps to `src/*`

### MUI Theme Configuration

The theme is configured in `src/utils/theme.ts` with:

- Custom color palette matching brand gradient
- Typography settings
- Component style overrides
- Dark sidebar with gradient background

## 🏗 Architecture

### State Management (Redux)

The application uses Redux Toolkit for state management with three main slices:

#### 1. Auth Slice (`authSlice.ts`)
Manages authentication state:
```typescript
{
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}
```

**Actions**:
- `login`: Authenticate user and store token
- `logout`: Clear authentication state
- `checkAuth`: Verify token validity

#### 2. HR Slice (`hrSlice.ts`)
Manages HR platform state:
- CV evaluation results
- Policy documents and Q&A history
- Technical evaluation questions and answers

#### 3. AutoSphere Slice (`autosphereSlice.ts`)
Manages AutoSphere Motors state:
- Chat message history
- Bookings list and current booking
- Booking flow state

### API Service Layer

**Axios Instance** (`src/services/api.ts`):
- Base URL configuration from environment variable
- Request interceptor: Automatically adds `Authorization: Bearer <token>` header
- Response interceptor: Handles 401 errors (triggers auto-logout)

**API Functions** (in `src/store/api/`):
- `authApi.ts`: Login, logout, token refresh
- `hrApi.ts`: CV evaluation, policy management, technical evaluation
- `autosphereApi.ts`: Chat, booking CRUD operations

### Routing Structure

Protected routes are wrapped with `ProtectedRoute` component that checks authentication:

```
/login                    # Public - Login page
/dashboard                # Protected - Navigation hub
/hr/cv-evaluation         # Protected - CV evaluation
/hr/policy                # Protected - Policy management (HR Manager only)
/hr/technical             # Protected - Technical evaluation (HR Manager only)
/autosphere/chat          # Protected - AI chat interface
/autosphere/bookings      # Protected - Booking management
```

## 🔐 Authentication & Authorization

### Authentication Flow

1. **Login**: User enters credentials on `/login` page
2. **Token Storage**: JWT token stored in `sessionStorage` (not `localStorage` for security)
3. **Auto-injection**: Token automatically added to all API requests via axios interceptor
4. **Token Validation**: Token checked on app initialization
5. **Auto-logout**: 401 responses trigger automatic logout and redirect to login

### Role-Based Access Control

Two user roles are supported:

#### HR Manager
- ✅ Full access to all HR features
- ✅ Can upload policies
- ✅ Can generate technical questions
- ✅ Can evaluate CVs and technical answers
- ✅ Access to AutoSphere features

#### Employee
- ✅ Can evaluate CVs
- ✅ Can ask policy questions (read-only)
- ❌ Cannot upload policies
- ❌ Cannot generate technical questions
- ✅ Access to AutoSphere features

Role-based UI hiding is implemented in:
- Sidebar navigation menu
- Page-level feature access
- API endpoint restrictions (enforced by backend)

## 📄 Pages & Features

### Login Page (`/login`)

**Purpose**: User authentication entry point

**Features**:
- Username and password input fields
- Form validation with React Hook Form
- Error message display
- Redirect to dashboard on successful login

**User Flow**:
1. Enter credentials
2. Submit form
3. On success: Store token → Redirect to dashboard
4. On error: Display error message

### Dashboard (`/dashboard`)

**Purpose**: Central navigation hub

**Features**:
- Welcome message with user information
- Navigation cards linking to main sections:
  - HR AI Platform card → `/hr/cv-evaluation`
  - AutoSphere Motors card → `/autosphere/chat`
- Quick stats (if available from API)
- Recent activity feed (optional)

### HR AI Platform Pages

#### CV Evaluation (`/hr/cv-evaluation`)

**Purpose**: Evaluate multiple CVs against a job description

**Features**:
- Job description textarea input
- Multiple file upload (PDF/DOCX)
- Submit button triggers evaluation
- Results display:
  - Ranked candidate list with scores
  - Individual skill analysis per candidate
  - Hire recommendations
  - Executive KPIs cards (total candidates, average score, etc.)

**API Endpoint**: `POST /api/hr/cv/evaluate`

#### Policy Management (`/hr/policy`)

**Purpose**: Upload and query company policies (HR Manager only)

**Features**:
- **Upload Section** (HR Manager only):
  - Multiple PDF file upload
  - Upload progress indicator
- **Ask Question Section**:
  - Text input for policy questions
  - Submit button
  - Answer display in formatted card
  - Question/answer history

**API Endpoints**:
- `POST /api/hr/policy/upload` - Upload policies
- `POST /api/hr/policy/ask` - Ask policy question

#### Technical Evaluation (`/hr/technical`)

**Purpose**: Generate and evaluate technical interview questions

**Features**:
- **Step 1: Generate Questions**:
  - Job description input
  - CV file upload
  - Generate button
  - Display generated questions list
- **Step 2: Evaluate Answers**:
  - Questions list (from Step 1 or manual entry)
  - Answer input fields for each question
  - Evaluate button
  - Results display with scores per question and overall

**API Endpoints**:
- `POST /api/hr/technical/generate` - Generate questions
- `POST /api/hr/technical/evaluate` - Evaluate answers

### AutoSphere Motors Pages

#### AI Chat (`/autosphere/chat`)

**Purpose**: Conversational AI assistant interface

**Features**:
- Chat message history display
- Message input field at bottom
- Send button
- Message bubbles (user vs AI)
- Intent indicators in responses
- Booking flow integration:
  - When `booking_flow: true` in response, show booking form
  - Seamless transition from chat to booking

**API Endpoint**: `POST /api/autosphere/chat`

#### Bookings (`/autosphere/bookings`)

**Purpose**: Create and manage service/test drive bookings

**Features**:
- **Create Booking Section**:
  - Booking type selector (Service/Test Drive)
  - Name, Phone, Vehicle Model inputs
  - Preferred Date picker
  - Natural language input option
  - Submit button
- **Search Section**:
  - Filter inputs: Booking ID, Phone, Type
  - Search button
  - Results table with booking details
- **Booking Details View**:
  - Full booking information display
  - Edit/Delete actions (if applicable)

**API Endpoints**:
- `POST /api/autosphere/bookings` - Create booking
- `GET /api/autosphere/bookings` - Search bookings
- `GET /api/autosphere/bookings/:id` - Get booking details

## 🔌 API Integration

### Base Configuration

All API calls use the base URL from `VITE_API_URL` environment variable. Default: `http://localhost:5001`

**Note**: In Vite, environment variables are accessed via `import.meta.env.VITE_API_URL` instead of `process.env.REACT_APP_API_URL`.

### Authentication Headers

JWT tokens are automatically included in all API requests via axios request interceptor:

```typescript
Authorization: Bearer <token>
```

### API Response Format

The application expects responses in the following format:

```typescript
{
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
```

### Error Handling

- **401 Unauthorized**: Automatically triggers logout and redirects to login
- **Network Errors**: Displayed via error alerts
- **Validation Errors**: Shown inline in forms
- **Server Errors**: Displayed via MUI Snackbar notifications

### API Functions

All API functions are organized by domain:

- **Auth API** (`authApi.ts`):
  - `login(username, password)`
  - `logout()`
  - `checkAuth()`

- **HR API** (`hrApi.ts`):
  - `evaluateCVs(jobDescription, files)`
  - `uploadPolicies(files)`
  - `askPolicyQuestion(question)`
  - `generateTechnicalQuestions(jobDescription, cvFile)`
  - `evaluateTechnicalAnswers(questions, answers)`

- **AutoSphere API** (`autosphereApi.ts`):
  - `chat(message, history)`
  - `createBooking(bookingData)`
  - `searchBookings(filters)`
  - `getBooking(bookingId)`

## 🎨 UI/UX Design

### Color Scheme

The application uses a gradient color scheme matching the brand logo:

- **Primary Color**: Deep Blue `#0A2463`
- **Secondary Color**: Purple `#7B1FA2`
- **Gradient Colors**:
  - Deep Blue: `#0A2463`
  - Cyan: `#00BCD4`
  - Teal: `#009688`
  - Purple: `#7B1FA2`
- **Background**: Light theme for main content
- **Sidebar**: Dark gradient background using the color palette

### Layout Components

#### Sidebar (`Sidebar.tsx`)
- Fixed left navigation (240px width)
- Logo at top
- Navigation menu with collapsible sections
- Active route highlighting
- User info at bottom (username, role, logout button)
- Gradient background
- Responsive: Collapses on mobile

#### TopBar (`TopBar.tsx`)
- App title/header
- User profile menu (optional)
- Breadcrumbs (optional)

#### Main Layout (`Layout.tsx`)
- Wraps all protected pages
- Manages sidebar and content area
- Responsive breakpoints

### Responsive Design

- **Desktop**: Full sidebar visible, full feature set
- **Tablet**: Collapsible sidebar, optimized layout
- **Mobile**: Hamburger menu, stacked layouts, touch-friendly controls

### Loading States

- Loading spinners for async operations
- Skeleton loaders for content areas
- Button loading states during form submissions

### Error Handling UI

- Inline form validation errors
- Global error alerts (MUI Snackbar)
- Error boundaries for component errors
- Network error messages

## 💻 Development

### Code Style

- **TypeScript**: Strict mode enabled
- **ESLint**: React app configuration
- **Components**: Functional components with hooks
- **Naming**: PascalCase for components, camelCase for functions/variables

### Adding New Features

1. **Create Page Component**:
   - Add to `src/pages/` or appropriate subdirectory
   - Use MUI components for UI
   - Connect to Redux store if needed

2. **Add Redux State** (if needed):
   - Create or update slice in `src/store/slices/`
   - Add API functions in `src/store/api/`
   - Export actions and selectors

3. **Add Route**:
   - Update `App.tsx` with new route
   - Add to sidebar navigation if needed
   - Wrap with `ProtectedRoute` if authentication required

4. **Add Types**:
   - Define TypeScript interfaces in `src/types/index.ts`

### Testing

```bash
# Run tests
yarn test

# Run tests in watch mode
yarn test --watch

# Run tests with coverage
yarn test --coverage
```

### Debugging

- **React DevTools**: Install browser extension for component inspection
- **Redux DevTools**: Install browser extension for state inspection
- **Network Tab**: Check API requests/responses in browser DevTools
- **Console**: Check for errors and warnings

### Common Development Tasks

#### Adding a New API Endpoint

1. Add function to appropriate API file (`src/store/api/`)
2. Create/update Redux slice if needed
3. Add TypeScript types
4. Use in component via `useDispatch` or `useSelector`

#### Adding a New Page

1. Create page component in `src/pages/`
2. Add route in `App.tsx`
3. Add navigation link in `Sidebar.tsx` (if needed)
4. Add role-based access control (if needed)

#### Modifying Theme

Edit `src/utils/theme.ts`:
- Update color palette
- Modify typography
- Override component styles

## 🚢 Build & Deployment

### Production Build

```bash
yarn build
```

This creates an optimized production build in the `build/` directory.

**Build Process**:
1. TypeScript compilation (`tsc`)
2. Vite bundling and optimization
3. Code splitting (vendor, MUI, Redux chunks)
4. Asset optimization and minification
5. Source map generation

### Preview Production Build

Test the production build locally before deploying:

```bash
yarn preview
```

This serves the production build at `http://localhost:4173` (default port).

### Build Output

The build process:
- Transpiles TypeScript to JavaScript
- Bundles and minifies code with tree-shaking
- Optimizes assets (images, fonts, etc.)
- Generates source maps (for debugging)
- Creates optimized chunks for better caching
- Outputs to `build/` directory

**Vite Build Features**:
- ⚡ Faster builds compared to Create React App
- 📦 Automatic code splitting
- 🎯 Better tree-shaking for smaller bundles
- 🔧 Optimized asset handling

### Environment-Specific Builds

Vite automatically loads environment variables based on mode:

- `.env` - Loaded in all cases
- `.env.local` - Loaded in all cases, ignored by git
- `.env.[mode]` - Only loaded in specified mode (e.g., `.env.production`)
- `.env.[mode].local` - Only loaded in specified mode, ignored by git

**Modes**:
- `development` - `yarn dev`
- `production` - `yarn build`
- `preview` - `yarn preview`

### Deployment Considerations

1. **Environment Variables**: Ensure `VITE_API_URL` is set correctly for production
2. **API CORS**: Backend must allow requests from production domain
3. **HTTPS**: Use HTTPS in production
4. **Build Optimization**: Vite automatically optimizes production builds
5. **Static Hosting**: Can be deployed to any static hosting service:
   - **Netlify**: Automatic deployments from Git, supports Vite
   - **Vercel**: Zero-config deployments, optimized for Vite
   - **AWS S3 + CloudFront**: Static site hosting with CDN
   - **Azure Static Web Apps**: Integrated CI/CD
   - **GitHub Pages**: Free hosting for public repos

### Deployment Checklist

- [ ] Update `VITE_API_URL` for production environment
- [ ] Run `yarn build` successfully
- [ ] Test production build locally with `yarn preview`
- [ ] Verify API connectivity
- [ ] Check authentication flow
- [ ] Test all major features
- [ ] Verify responsive design
- [ ] Check browser console for errors
- [ ] Verify environment variables are correctly loaded
- [ ] Test on multiple browsers

## 🐛 Troubleshooting

### Common Issues

#### 1. API Connection Errors

**Problem**: Cannot connect to backend API

**Solutions**:
- Verify `VITE_API_URL` in `.env` file (not `REACT_APP_API_URL`)
- Ensure backend server is running
- Check CORS configuration on backend
- Verify network connectivity
- Restart dev server after changing `.env` file (Vite requires restart)

#### 2. Authentication Issues

**Problem**: Login fails or token not persisting

**Solutions**:
- Check browser console for errors
- Verify token is stored in sessionStorage
- Check axios interceptor configuration
- Verify backend JWT secret and expiration

#### 3. Build Errors

**Problem**: `yarn build` fails

**Solutions**:
- Clear `node_modules` and reinstall: `rm -rf node_modules && yarn install`
- Clear Vite cache: `rm -rf node_modules/.vite`
- Check TypeScript errors: `yarn tsc --noEmit`
- Verify all dependencies are installed
- Check for syntax errors in code
- Ensure `vite.config.ts` is correctly configured

#### 4. Routing Issues

**Problem**: Routes not working or redirecting incorrectly

**Solutions**:
- Verify route paths match exactly
- Check `ProtectedRoute` component logic
- Ensure authentication state is correct
- Check browser console for React Router errors

#### 5. Styling Issues

**Problem**: MUI components not styled correctly

**Solutions**:
- Verify `ThemeProvider` wraps the app
- Check theme configuration in `src/utils/theme.ts`
- Ensure `@emotion/react` and `@emotion/styled` are installed
- Clear browser cache
- Restart Vite dev server (HMR may need refresh)

#### 6. Vite-Specific Issues

**Problem**: Module not found or import errors

**Solutions**:
- Ensure file extensions are correct (`.tsx`, `.ts`)
- Check path aliases in `vite.config.ts` and `tsconfig.json`
- Verify `import.meta.env` usage (not `process.env`)
- Clear Vite cache: `rm -rf node_modules/.vite`
- Restart dev server after config changes

#### 7. TypeScript Errors

**Problem**: Type errors in development

**Solutions**:
- Run `yarn tsc --noEmit` to see all type errors
- Check type definitions in `src/types/index.ts`
- Verify all imports are correct
- Update types if API response structure changed
- Ensure `vite-env.d.ts` is properly configured

### Getting Help

1. **Check Browser Console**: Look for JavaScript errors
2. **Check Network Tab**: Verify API requests/responses
3. **Check Redux DevTools**: Inspect application state
4. **Review Logs**: Check backend server logs
5. **Documentation**: Refer to this README and code comments

## 🔄 Migration from Create React App to Vite

This project has been migrated from Create React App (CRA) to Vite for improved performance and developer experience.

### Key Changes

1. **Build Tool**: Replaced `react-scripts` with `vite` and `@vitejs/plugin-react`
2. **Environment Variables**: Changed from `REACT_APP_*` to `VITE_*` prefix
3. **Environment Access**: Changed from `process.env` to `import.meta.env`
4. **HTML Entry Point**: Moved `index.html` from `public/` to project root
5. **TypeScript Config**: Updated for Vite's bundler mode
6. **Dev Server**: Faster HMR with Vite's native ESM support

### Migration Checklist

If you're migrating an existing CRA project:

- [x] Remove `react-scripts` from dependencies
- [x] Install Vite and React plugin
- [x] Create `vite.config.ts`
- [x] Move `index.html` to root and update script tag
- [x] Update environment variable names (`REACT_APP_*` → `VITE_*`)
- [x] Update environment variable access (`process.env` → `import.meta.env`)
- [x] Update `tsconfig.json` for Vite
- [x] Create `vite-env.d.ts` for type definitions
- [x] Update package.json scripts
- [x] Remove CRA-specific files (if any)

### Benefits of Vite

- **⚡ Faster Dev Server**: Near-instant startup and HMR
- **🚀 Faster Builds**: Optimized production builds
- **📦 Better Tree-Shaking**: Smaller bundle sizes
- **🔧 Modern Tooling**: Native ESM support
- **🎯 Better DX**: Improved error messages and debugging

### Breaking Changes

- Environment variables must use `VITE_` prefix
- Access via `import.meta.env` instead of `process.env`
- `index.html` must be in root directory
- Some CRA-specific features may not be available

## 📝 Additional Notes

### Package Manager

This project uses **Yarn** as the package manager. All commands should use `yarn` instead of `npm`:

```bash
# ✅ Correct
yarn install
yarn add package-name

# ❌ Avoid
npm install
npm install package-name
```

### Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### Performance Considerations

- **Code Splitting**: Automatic via Vite and React Router
- **Lazy Loading**: Consider for heavy components using `React.lazy()`
- **Image Optimization**: Optimize images before adding, or use Vite plugins
- **Bundle Analysis**: Use `vite-bundle-visualizer` or similar tools
- **HMR**: Vite's HMR is faster than CRA, improving development experience

### Security Best Practices

- JWT tokens stored in `sessionStorage` (not `localStorage`)
- Tokens automatically cleared on logout
- Protected routes prevent unauthorized access
- API requests include authentication headers
- Input validation on all forms

## 📚 Resources

### Core Technologies
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)

### UI & State Management
- [Material-UI Documentation](https://mui.com/)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [React Router Documentation](https://reactrouter.com/)

### Development Tools
- [Vite Plugin React](https://github.com/vitejs/vite-plugin-react)
- [ESLint Documentation](https://eslint.org/)

## 📄 License

[Add your license information here]

---

**Last Updated**: [Current Date]
**Version**: 0.1.0
**Maintained By**: [Your Team Name]
