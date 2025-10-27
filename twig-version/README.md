# TicketStressed - Twig Version

A robust ticket management web application built with PHP and Twig templating engine. This is the server-side rendered version of the multi-framework ticket management application.

## 🚀 Features

- **Landing Page**: Welcoming hero section with wavy background and decorative elements
- **Authentication**: Secure login and signup with session management
- **Dashboard**: Statistics overview with ticket counts and quick actions
- **Ticket Management**: Full CRUD operations for tickets with status tracking
- **Responsive Design**: Mobile-first approach with tablet and desktop adaptations

## 🛠️ Technologies Used

- **PHP 7.4+** - Server-side scripting language
- **Twig 3.0** - Template engine
- **Tailwind CSS** - Utility-first CSS framework
- **Session Management** - PHP sessions for authentication

## 📦 Installation & Setup

### Prerequisites
- PHP 7.4 or higher
- Composer
- Web server (Apache with mod_rewrite or Nginx)

### Installation Steps

1. **Navigate to the twig-version directory**
   ```bash
   cd multi-framework-ticket-app/twig-version
   ```

2. **Install dependencies**
   ```bash
   composer install
   ```

3. **Create necessary directories**
   ```bash
   mkdir -p data cache templates
   ```

4. **Create initial data files**
   ```bash
   echo '[]' > data/users.json
   echo '[]' > data/tickets.json
   ```

5. **Set permissions**
   ```bash
   chmod 755 cache data
   chmod 644 data/*.json
   ```

6. **Configure web server**

   **Apache**: Ensure mod_rewrite is enabled and .htaccess is working
  
   **PHP Built-in Server (Development)**:
   ```bash
   php -S localhost:8000
   ```

7. **Open your browser**
   Navigate to `http://localhost:8000` to view the application

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

## 🏗️ Project Structure

```
twig-version/
├── templates/
│   ├── base.twig          # Base layout template
│   ├── landing.twig       # Landing page
│   ├── login.twig         # Login page
│   ├── signup.twig        # Signup page
│   ├── dashboard.twig     # Dashboard page
│   ├── tickets.twig       # Ticket management page
│   └── 404.twig           # 404 error page
├── data/
│   ├── users.json         # User data storage
│   └── tickets.json       # Ticket data storage
├── cache/                 # Twig cache directory
├── img/                   # Static images
├── index.php             # Application entry point
├── composer.json         # Dependencies
└── .htaccess            # URL rewriting rules
```

## 🎨 Design System

### Color Scheme
- **Primary**: Teal (#0D9488)
- **Secondary**: Gray (#6B7280)
- **Success**: Green (#10B981)
- **Warning**: Amber (#F59E0B)
- **Error**: Red (#EF4444)

### Status Colors
- **Open**: Green tones
- **In Progress**: Amber tones
- **Closed**: Gray tones

## 🔒 Security & Authentication

- **Session Management**: PHP session-based authentication
- **Protected Routes**: Dashboard and Ticket Management require authentication
- **Automatic Redirects**: Unauthorized users redirected to login

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px (stacked layout)
- **Tablet**: 768px - 1024px (grid layout)
- **Desktop**: > 1024px (multi-column layout)

## 🎯 Future Enhancements

- **Database Integration**: Replace JSON files with MySQL/PostgreSQL
- **Advanced Filtering**: Search and filter tickets
- **File Attachments**: Support for ticket attachments
- **Email Notifications**: Automated status updates
- **User Roles**: Admin and user permission levels

## 📄 License

This project is part of the HNG Internship Frontend Wizards Stage 2 task.

## 👨‍💻 Developer

**Aladetan Fortune Ifeloju (IfeCodes)**
- 💻 [GitHub](https://github.com/ALADETAN-IFE)
- 🐦 [Twitter](https://x.com/ifeCodes_)
- 💼 [LinkedIn](https://www.linkedin.com/in/fortune-ife-aladetan-458ab136a)

---

**Note**: This is the Twig (PHP) implementation of the multi-framework ticket management application. The same application is also built with React and Vue.js for comparison across different frontend technologies.