# TicketStressed - React Version

A robust ticket management web application built with React, TypeScript, and Tailwind CSS. This application provides a seamless user experience for managing tickets with full CRUD operations, authentication, and responsive design.

## 🚀 Features

- **Landing Page**: Welcoming hero section with wavy background and decorative elements
- **Authentication**: Secure login and signup with form validation
- **Dashboard**: Statistics overview with ticket counts and quick actions
- **Ticket Management**: Full CRUD operations for tickets with status tracking
- **Responsive Design**: Mobile-first approach with tablet and desktop adaptations
- **Accessibility**: Semantic HTML, ARIA labels, and keyboard navigation support

## 🛠️ Technologies Used

- **React 19.1.1** - Frontend framework
- **TypeScript** - Type safety and better development experience
- **React Router DOM 7.9.4** - Client-side routing
- **Tailwind CSS 4.1.16** - Utility-first CSS framework
- **React Toastify 11.0.5** - Toast notifications
- **Vite 7.1.7** - Build tool and development server

## 📦 Installation & Setup

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd multi-framework-ticket-app/react-version
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## 🎯 Usage

### Demo Credentials
- **Email**: demo@ticketstressed.com
- **Password**: password123

### Application Flow

1. **Landing Page**: Start at the homepage with hero section and feature highlights
2. **Authentication**: 
   - Click "Login" to sign in with demo credentials
   - Click "Get Started" to create a new account
3. **Dashboard**: View ticket statistics and quick actions
4. **Ticket Management**: Create, view, edit, and delete tickets

### Ticket Status System
- **Open** (Green): New tickets that need attention
- **In Progress** (Amber): Tickets currently being worked on
- **Closed** (Gray): Completed or resolved tickets

## 🏗️ Project Structure

```
src/
├── assets/
│   ├── icons.tsx          # Reusable SVG icon components
│   └── react.svg          # React logo
├── pages/
│   ├── LandingPage.tsx    # Homepage with hero section
│   ├── Login.tsx          # Authentication login
│   ├── Signup.tsx         # User registration
│   ├── Dashboard.tsx      # Statistics and overview
│   ├── TicketManagement.tsx # CRUD operations for tickets
│   └── ProtectedRoute.tsx # Authentication guard
├── routes/
│   └── routes.tsx         # Application routing configuration
├── App.tsx                # Main application component
├── main.tsx              # Application entry point
└── index.css             # Global styles and Tailwind imports
```

## 🎨 Design System

### Layout Constraints
- **Max Width**: 1440px (centered on large screens)
- **Responsive Breakpoints**: Mobile, tablet, and desktop
- **Container**: Centered with proper padding

### Color Scheme
- **Primary**: Purple (#7C3AED)
- **Secondary**: Blue (#3B82F6)
- **Success**: Green (#10B981)
- **Warning**: Amber (#F59E0B)
- **Error**: Red (#EF4444)
- **Neutral**: Gray scale

### Status Colors
- **Open**: Green tones
- **In Progress**: Amber tones
- **Closed**: Gray tones

## 🧪 Testing

### Data Test IDs
All interactive elements include `data-testid` attributes for testing:
- Format: `test-react-{component}-{element}`
- Examples: `test-react-login-button`, `test-react-ticket-card-1`

### Key Test IDs
- `test-react-hero-title` - Landing page title
- `test-react-login-form` - Login form container
- `test-react-dashboard-nav` - Dashboard navigation
- `test-react-ticket-management` - Ticket management page
- `test-react-create-ticket-button` - Create ticket button

## 🔒 Security & Authentication

- **Session Management**: localStorage-based authentication
- **Session Key**: `ticketapp_session`
- **Session Expiry**: 24 hours
- **Protected Routes**: Dashboard and Ticket Management require authentication
- **Automatic Redirects**: Unauthorized users redirected to login

## ♿ Accessibility Features

- **Semantic HTML**: Proper use of `<main>`, `<nav>`, `<section>`, `<article>`, `<header>`, `<footer>`
- **ARIA Labels**: Descriptive labels for interactive elements
- **Focus Management**: Visible focus states and keyboard navigation
- **Color Contrast**: Sufficient contrast ratios for text and backgrounds
- **Screen Reader Support**: Proper heading hierarchy and alt text

## 🚀 Performance Optimizations

- **Code Splitting**: Route-based code splitting with React Router
- **Lazy Loading**: Components loaded on demand
- **Optimized Builds**: Vite's optimized production builds
- **Tree Shaking**: Unused code elimination

## 🐛 Known Issues

- **Local Storage**: Data persists only in browser (not shared across devices)
- **Mock Authentication**: No real backend integration
- **Session Expiry**: No automatic session refresh

## 🔄 State Management

- **Local State**: React hooks (useState, useEffect)
- **Data Persistence**: localStorage for tickets and authentication
- **Form Validation**: Client-side validation with error messages
- **Toast Notifications**: User feedback for actions

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px (stacked layout)
- **Tablet**: 768px - 1024px (grid layout)
- **Desktop**: > 1024px (multi-column layout)

### Mobile Features
- **Collapsible Navigation**: Hamburger menu for mobile
- **Touch-Friendly Buttons**: Adequate touch targets
- **Swipe Gestures**: Natural mobile interactions

## 🎯 Future Enhancements

- **Real Backend Integration**: Replace localStorage with API calls
- **Advanced Filtering**: Search and filter tickets
- **File Attachments**: Support for ticket attachments
- **Email Notifications**: Automated status updates
- **User Roles**: Admin and user permission levels
- **Analytics Dashboard**: Advanced reporting and insights

## 📄 License

This project is part of the HNG Internship Frontend Wizards Stage 2 task.

## 👨‍💻 Developer

**Aladetan Fortune Ifeloju (IfeCodes)**
- 💻 [GitHub](https://github.com/ALADETAN-IFE)
- 🐦 [Twitter](https://x.com/ifeCodes_)
- 💼 [LinkedIn](https://www.linkedin.com/in/fortune-ife-aladetan-458ab136a)

---

**Note**: This is the React implementation of the multi-framework ticket management application. The same application is also built with Vue.js and Twig for comparison across different frontend technologies.