# ReactJS + Node.js Authentication System

Modern full-stack authentication system with React.js (TypeScript + Vite) frontend and Node.js (Express + ES Modules) backend with MySQL database.

## 🚀 Live Demo

🔗 **GitHub Repository**: [https://github.com/ayberkdo/reactjs_nodejs_authentication](https://github.com/ayberkdo/reactjs_nodejs_authentication)

## ✨ Features

### Frontend (React.js + TypeScript + Vite)

- ⚡ **Vite** for fast development and building
- 🎨 **Tailwind CSS** for modern styling
- 🔥 **React Hook Form** with Zod validation
- 🗃️ **Zustand** for state management
- 🚦 **React Router** for navigation
- 🔄 **React Query** for data fetching
- 🎯 **TypeScript** for type safety
- 🎉 **React Hot Toast** for notifications
- 🔒 **Protected routes** implementation

### Backend (Node.js + Express + ES Modules)

- 🟢 **Node.js** with ES Modules
- ⚡ **Express.js** web framework
- 🔐 **JWT** authentication
- 🛡️ **bcryptjs** for password hashing
- 🚦 **Express Rate Limiting**
- 🔍 **Express Validator** for input validation
- 🛡️ **Helmet** for security headers
- 🌐 **CORS** configuration
- 📝 **Morgan** for logging
- 🗄️ **MySQL** database with Sequelize ORM
- 🔄 **Automatic database initialization**

## 📁 Project Structure

```
reactjs_nodejs_authentication/
├── client/                 # React.js frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   │   ├── auth/       # Authentication components
│   │   │   └── ui/         # UI components
│   │   ├── pages/          # Page components
│   │   ├── store/          # Zustand store
│   │   ├── lib/            # Utilities and API
│   │   ├── types/          # TypeScript types
│   │   └── hooks/          # Custom hooks
│   ├── package.json
│   └── vite.config.ts
├── server/                 # Node.js backend
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Express middleware
│   │   ├── models/         # Data models
│   │   ├── routes/         # API routes
│   │   ├── utils/          # Utilities
│   │   └── index.js        # Server entry point
│   ├── package.json
│   └── .env
├── package.json            # Root package.json for scripts
└── README.md
```

## 🛠️ Quick Start

1. **Clone the repository**

   ```bash
   git clone https://github.com/ayberkdo/reactjs_nodejs_authentication.git
   cd reactjs_nodejs_authentication
   ```

2. **Install all dependencies**
   ```bash
   npm run install:all
   ```

3. **Setup MySQL Database**
   - Install MySQL on your system (XAMPP, WAMP, or standalone MySQL)
   - Start MySQL service
   - Update database credentials in `server/.env`

4. **Environment Configuration**
   
   **Server (.env):**
   ```env
   NODE_ENV=development
   PORT=5000
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRES_IN=7d
   CORS_ORIGIN=http://localhost:5173
   
   # Database Configuration
   DB_HOST=localhost
   DB_PORT=3306
   DB_NAME=reactjs_nodejs_auth_db
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   ```

   **Client (.env):**
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

5. **Initialize Database**
   ```bash
   cd server
   npm run db:init
   ```

6. **Start Development**
   ```bash
   cd ..
   npm run dev
   ```

## 🚀 Development

### Run both client and server together:

```bash
npm run dev
```

### Run individually:

**Server only:**

```bash
npm run server:dev
```

**Client only:**

```bash
npm run client:dev
```

## 🌐 URLs

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/api/health

## 🔑 Default Users

The system comes with pre-configured users for testing:

| Email             | Password    | Role  |
| ----------------- | ----------- | ----- |
| admin@example.com | password123 | admin |
| user@example.com  | password123 | user  |

## 📡 API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)
- `POST /api/auth/logout` - Logout user (protected)

### Users Management

- `GET /api/users` - Get all users (protected)
- `GET /api/users/:id` - Get user by ID (protected)
- `PUT /api/users/:id` - Update user (protected)
- `DELETE /api/users/:id` - Delete user (protected)

## �️ Database Commands

- `npm run db:init` - Initialize database and create tables
- `npm run db:reset` - Reset database (drop and recreate tables)

## 🛡️ Security Features

- **JWT Authentication** with secure token handling
- **Password hashing** with bcryptjs (12 rounds)
- **Rate limiting** to prevent abuse
- **Input validation** on both client and server
- **CORS protection**
- **Security headers** with Helmet
- **Protected routes** on frontend
- **Authorization middleware** on backend
- **SQL injection** protection with Sequelize ORM
- **Authorization middleware** on backend

## 🎨 UI Components

The project includes custom UI components built with Tailwind CSS:

- Button with loading states
- Input with error handling
- Card layouts
- Form validation
- Toast notifications

## 🔄 State Management

- **Zustand** for global state management
- **React Query** for server state management
- **Local storage** persistence for authentication

## 📱 Responsive Design

The application is fully responsive and works on:

- Desktop computers
- Tablets
- Mobile devices

## 🚀 Production Deployment

### Build the client:

```bash
npm run client:build
```

### Start the server:

```bash
npm run server:start
```

## 🚀 Deployment

### Production Setup

1. **Environment Variables**: Update production values in `.env`
2. **Database**: Setup MySQL in production environment
3. **Build Client**: `npm run client:build`
4. **Start Server**: `npm run server:start`

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Technologies Used

**Frontend:**
- React 19 + TypeScript
- Vite 7
- Tailwind CSS 3
- React Router Dom 7
- Zustand + React Query
- React Hook Form + Zod

**Backend:**
- Node.js + Express 5
- MySQL + Sequelize 6
- JWT + bcryptjs
- Express Validator
- Rate Limiting + CORS + Helmet

## 📄 License

This project is licensed under the ISC License.

## �‍💻 Author

**Ayberk Doğan**
- GitHub: [@ayberkdo](https://github.com/ayberkdo)
- Repository: [reactjs_nodejs_authentication](https://github.com/ayberkdo/reactjs_nodejs_authentication)

## �🙏 Acknowledgments

- React.js team for the amazing framework
- Vite team for the fast build tool
- Express.js team for the web framework
- MySQL team for the robust database
- All open-source contributors

---

⭐ **Star this repository if you found it helpful!**

Built with ❤️ using modern web technologies in 2025.
