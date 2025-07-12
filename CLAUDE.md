# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a modern React-based landing page for "Akademia Poliglotki" (Academy of Polyglots), an online language learning platform. The project is a design prototype/mockup demonstrating a modern redesign proposal for a language learning website.

## Architecture & Technology Stack

- **Frontend Framework**: React with hooks (useState, useEffect)
- **Styling**: Tailwind CSS with custom gradients and animations
- **Icons**: Lucide React icon library
- **UI Components**: Custom components from `@/components/ui/` (Button, Card, Badge)
- **Design Approach**: Modern glassmorphism effects, gradient-heavy design, responsive mobile-first layout

## Current Project State

**Important**: This is a prototype/mockup project with several missing dependencies:

- No `package.json` or build configuration
- Missing UI component files referenced in imports (`@/components/ui/button.jsx`, etc.)
- No `/src/main.jsx` entry point (referenced in index.html)
- No development server setup

## File Structure

```
/
├── index.html          # Main HTML entry point
├── App.jsx            # Main React component with all page sections
├── App.css            # Tailwind CSS styles and custom animations
└── Documentation/     # Polish-language design documentation
```

## Main Application Components

The `App.jsx` file contains all page sections in a single component:

- **Header**: Sticky navigation with mobile menu
- **Hero Section**: Main call-to-action with animated 3D globe
- **Features Section**: 4 key benefits with gradient cards
- **About Section**: Company info with statistics
- **Courses Section**: 5 language offerings with pricing
- **Testimonials Section**: Customer reviews
- **CTA Section**: Final call-to-action
- **Footer**: Contact information and links

## Design Features

- **Color Scheme**: Orange-to-red gradient primary palette
- **Animations**: 
  - Floating elements (`animate-float`)
  - Bouncing country flags
  - Spinning globe (20s duration)
  - Hover effects with scale transforms
- **Responsive Design**: Grid layouts adapting from mobile to desktop
- **Glassmorphism**: Backdrop blur effects and semi-transparent elements

## Content Data

All content is currently hardcoded within the component:
- `languages` array: 5 language courses with pricing
- `testimonials` array: 3 customer reviews
- `features` array: 4 key platform benefits
- `stats` array: Platform statistics

## To Make This Project Functional

1. Initialize a React project structure (Vite recommended)
2. Install dependencies: `react`, `tailwindcss`, `lucide-react`
3. Create missing UI components or use a component library (shadcn/ui recommended)
4. Set up proper entry point in `/src/main.jsx`
5. Configure Tailwind CSS build process

## Common Development Tasks

Since this is a prototype without build tools, typical development commands are not applicable. To work with this code:

1. Set up a new React project
2. Copy the component code
3. Install required dependencies
4. Create missing UI components