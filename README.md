# GitQuest - GitHub Profile Achievement Tracker

GitQuest is an interactive web application that helps developers track and unlock GitHub profile achievements while making the process fun and engaging.

## Features & Functionality

### 1. Achievement Dashboard
```mermaid
graph TD
    A[Dashboard] --> B[Unlocked Achievements]
    A --> C[Available Achievements]
    A --> D[Progress Tracking]
    B --> E[Achievement Details]
    C --> F[Requirements]
    D --> G[Completion Status]
```

- View all available GitHub achievements
- Track progress towards each achievement
- Detailed requirements for unlocking each badge
- Real-time sync with GitHub profile

### 2. Achievement Categories

#### Profile Achievements
- Pull Shark (Pull Request mastery)
- YOLO (Merged PRs without review)
- Quick Draw (Fast PR merges)
- Pair Extraordinaire (Co-authored commits)
- Galaxy Brain (Answered discussions)
- Starstruck (Starred repositories)

#### Repository Achievements
- Arctic Code Vault
- Public Sponsor
- Mars 2020 Contributor

### 3. Progress Tracking
- Real-time progress updates
- Visual progress bars
- Achievement completion estimates
- Historical achievement data

### 4. User Features
- GitHub OAuth integration
- Personal achievement statistics
- Progress history
- Achievement sharing capabilities

### 5. Interactive Guides
- Step-by-step tutorials for each achievement
- Best practices and tips
- Common pitfalls to avoid
- Community success stories

### 6. Community Features
- Share achievements on social media
- Compare progress with friends
- Achievement leaderboards
- Community tips and tricks

### 7. Notification System
- Achievement unlock alerts
- Progress milestone notifications
- New achievement announcements
- Custom goal reminders

## How It Works

1. **Authentication**
   - Log in with GitHub account
   - Authorize necessary permissions
   - Sync profile data

2. **Profile Analysis**
   - Scan GitHub activity
   - Calculate achievement progress
   - Generate personalized roadmap

3. **Achievement Tracking**
   - Monitor GitHub activities
   - Update progress in real-time
   - Notify on completion

4. **Progress Visualization**
   - Interactive progress bars
   - Achievement statistics
   - Historical data charts

## Routes & Pages

### Main Routes
- `/` - Landing page with feature overview
- `/dashboard` - Main achievement dashboard
- `/achievements` - Complete achievement catalog
- `/profile` - User profile and statistics
- `/guides` - Achievement guides and tutorials
- `/community` - Community features and leaderboards

### Achievement-Specific Routes
- `/achievements/:id` - Detailed view of specific achievement
- `/guides/:achievement` - Specific achievement guide
- `/progress/:achievement` - Detailed progress tracking

### User Routes
- `/profile/settings` - User preferences
- `/profile/history` - Achievement history
- `/profile/stats` - Detailed statistics

## Planned Features
- Achievement predictions
- Custom achievement paths
- Integration with other platforms
- Mobile app version
- Advanced analytics dashboard
- Team achievements tracking

This application helps developers gamify their GitHub journey while providing valuable insights into their development activities and achievements.

## Project Structure

The project follows a standard React application structure with TypeScript support:

```mermaid
graph TD
    A[src/] --> B[components/]
    A --> C[contexts/]
    A --> D[pages/]
    B --> E[layout/]
    B --> F[common/]
    E --> G[Sidebar.tsx]
    E --> H[Navbar.tsx]
    F --> I[ThemeToggle.tsx]
    C --> J[ThemeContext.tsx]
    D --> K[LandingPage.tsx]
```

## Core Components

### Layout Components
- `Navbar`: Main navigation component
- `Sidebar`: Side navigation/menu component

### Theme Management
The application implements a theme management system using React Context:

```mermaid
flowchart LR
    A[ThemeContext] --> B[ThemeToggle]
    B --> C[Theme State]
    C --> D[Application Components]
```

### Pages
- `LandingPage`: Main entry point for the application content

## Technology Stack

- React with TypeScript
- TailwindCSS for styling
- Context API for state management

## Application Flow

```mermaid
sequenceDiagram
    participant User
    participant App
    participant ThemeContext
    participant Components
    
    User->>App: Opens application
    App->>ThemeContext: Initialize theme
    ThemeContext->>Components: Provide theme
    User->>Components: Interacts
    Components->>ThemeContext: Update theme
    ThemeContext->>Components: Apply new theme
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd <project-directory>
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

## Development

### Project Structure
```mermaid
graph LR
    A[Project Root] --> B[src/]
    A --> C[public/]
    A --> D[configuration files]
    D --> E[tailwind.config.js]
    D --> F[tsconfig.json]
    D --> G[vite.config.ts]
```

### Key Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm run test
```

### Development Guidelines

#### Component Structure
- Place new components in appropriate directories under `src/components/`
- Common/shared components go in `src/components/common/`
- Layout components go in `src/components/layout/`

#### Styling
- Use Tailwind CSS classes for styling
- Custom styles can be added in `src/index.css`
- Follow the project's theme system using ThemeContext

#### TypeScript
- Ensure proper typing for all components and functions
- Use interfaces for prop definitions
- Keep types and interfaces in separate files when they become complex

#### State Management
- Use React Context for global state (like theme)
- Prefer local state for component-specific data
- Consider using React Query for API data management

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```

## Features & Functionality

### Core Features

#### 1. Theme System
- Dark/Light mode toggle
- Persistent theme preference storage
- System theme detection and synchronization
- Smooth theme transitions

#### 2. Layout System
```mermaid
graph TD
    A[Layout Structure] --> B[Navbar]
    A --> C[Sidebar]
    B --> D[Theme Toggle]
    B --> E[Navigation Links]
    C --> F[Menu Items]
```

- Responsive navigation bar
- Collapsible sidebar
- Mobile-friendly layout
- Consistent theming across components

#### 3. Routing & Navigation
- Client-side routing
- Landing page
- Protected routes (if implemented)
- Navigation state management

#### 4. UI/UX Features
- Responsive design for all screen sizes
- Tailwind CSS styling
- Smooth transitions and animations
- Modern and clean interface

#### 5. Development Features
- Hot Module Replacement (HMR)
- TypeScript type checking
- ESLint configuration
- Development server with fast refresh

### Technical Features

#### State Management
- Context API implementation
- Theme state management
- Component-level state handling

#### Performance
- Vite-powered build system
- Optimized production builds
- Fast development server
- Code splitting

#### Development Tools
- TypeScript support
- ESLint integration
- Modern JavaScript features
- Developer-friendly error handling

### Planned Features
(Add any features that are planned for future implementation)
