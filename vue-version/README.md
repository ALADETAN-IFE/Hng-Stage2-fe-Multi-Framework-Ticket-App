# Vue Version - TicketStressed

A Vue 3 implementation of the ticket management system with the same design and functionality as the React version.

## Features

- **Authentication**: Login/Signup with localStorage-based session management
- **Protected Routes**: Requires authentication for dashboard and ticket management
- **Dashboard**: View ticket statistics and quick actions
- **Ticket Management**: Create, edit, delete tickets with status tracking
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- **Toast Notifications**: User-friendly feedback for actions

## Tech Stack

- Vue 3 (Composition API)
- Vue Router 4
- Vite
- Tailwind CSS 4
- vue3-toastify

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## Project Structure

```
vue-version/
├── src/
│   ├── components/      # Reusable components
│   │   ├── Footer.vue
│   │   ├── LandingPageCards.vue
│   │   └── WavyBackground.vue
│   ├── assts/
│   │   └── icons/           # Icon components
│   ├── layout/          # Layout components
│   │   └── Layout.vue
│   ├── pages/           # Page components
│   │   ├── Dashboard.vue
│   │   ├── LandingPage.vue
│   │   ├── Login.vue
│   │   ├── ProtectedRoute.vue
│   │   ├── Signup.vue
│   │   └── TicketManagement.vue
│   ├── router/          # Router configuration
│   │   └── index.js
│   ├── App.vue
│   ├── main.js
│   └── style.css
└── public/
```

## Usage

### Demo Credentials

**Email:** demo@ticketstressed.com  
**Password:** password123

### Key Features

1. **Landing Page**: Introduction with feature cards and navigation to login/signup
2. **Authentication**: Create account or login with demo credentials
3. **Dashboard**: View ticket statistics and navigate to ticket management
4. **Ticket Management**: Create, edit, and delete tickets with status and priority

## Routes

- `/` - Landing page
- `/auth/login` - Login page
- `/auth/signup` - Signup page
- `/dashboard` - Dashboard (protected)
- `/tickets` - Ticket management (protected)
- `/tickets/create` - Create new ticket (protected)

## LocalStorage Keys

- `ticketapp_session` - Current user session
- `ticketapp_session_users` - Registered users
- `tickets` - User tickets

## Design

The Vue version maintains the exact same design and functionality as the React version, using:
- Tailwind CSS for styling
- Modern gradient backgrounds
- Responsive layout
- Consistent color scheme (purple, blue, indigo)
- Animated decorative elements
