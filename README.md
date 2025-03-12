# Synph Leave Tracker

A modern, responsive leave management system for tracking and managing employee time off.

## Technologies

### Frontend
- **Next.js** - React framework with App Router for server-side rendering and routing
- **React** - UI library using functional components and hooks
- **TypeScript** - Static type checking for enhanced code quality
- **Tailwind CSS** - Utility-first CSS framework for responsive design
- **Framer Motion** - Animation library for polished UI interactions
- **React Big Calendar** - Flexible calendar component for visualizing leave data

### Best Practices

#### Architecture
- **App Router Pattern** - Using Next.js App Router with server components by default
- **Feature-First Organization** - Components are organized by feature rather than type
- **Component Isolation** - Each component lives in its own file with co-located styles
- **Monorepo Structure** - Using a monorepo to manage multiple applications within the project

#### React Development
- **Functional Components** - All components use React functional components with hooks
- **Custom Hooks** - Complex logic extracted into custom hooks for reusability
- **Server Components** - Leveraging Next.js server components for performance optimization
- **Composition Over Inheritance** - Using component composition to share functionality
- **Context API** - For managing global state like authentication and themes

#### UI/UX Principles
- **Responsive Design** - Mobile-first approach ensuring compatibility across devices
- **Animated Transitions** - Smooth animations using spring physics for natural movement
- **Accessibility** - Semantic HTML and ARIA attributes for inclusive user experience
- **Consistent Styling** - Unified design language across the application

#### Performance Optimization
- **Code Splitting** - Dynamic imports for optimized bundle size
- **Memoization** - Strategic use of React.memo, useMemo, and useCallback
- **Resource Optimization** - Efficient handling of API calls and data management

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Run the development server:
   ```
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
apps/
  web/
    app/                 # Next.js App Router
      supervisor/        # Supervisor dashboard features
        _components/     # Reusable components for supervisor features
      types/             # TypeScript types
      _components/       # Shared components across the application
    public/              # Static assets
```
