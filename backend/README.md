# Application Wallet - Backend

A RESTful API backend built with Express.js for managing job application tracking.

## Tech Stack

- **Express 5** - Fast, minimalist web framework
- **Node.js** - JavaScript runtime
- **MySQL2** - MySQL client with promises
- **JSON Web Tokens** - Authentication and authorization
- **dotenv** - Environment variable management
- **CORS** - Cross-origin resource sharing
- **Nodemon** - Development auto-reload

## Getting Started

### Prerequisites

- Node.js v18 or higher
- MySQL database (v8.0 or higher)
- npm or yarn

### Installation

```bash
npm install
```

### Environment Configuration

Create a `.env` file in the backend directory:

```env
PORT=5000

# Database Configuration
DB_HOST=localhost
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=application_wallet

# JWT Secret
JWT_SECRET=your_secure_jwt_secret_key

# Node Environment
NODE_ENV=development
```

### Database Setup

1. Create the MySQL database from the `table-initialization.sql` file.

### Development

Start the development server with auto-reload:

```bash
npm run dev
```

The API will be available at `http://localhost:5000`

### Production

Start the production server:

```bash
npm start
```

## Project Structure

```
backend/
├── index.js              # Application entry point
├── .env                  # Environment variables
├── package.json
├── controllers/          # Request handlers
├── routes/              # API route definitions
├── services/            # Business logic layer
├── middleware/          # Custom middleware
│   └── error-middleware.js
└── utils/               # Helper functions
```

## API Endpoints

### Health Check

```
GET /
```

Returns server status.

**Response:**
```
Backend is running
```

### Applications (To be implemented)

```
GET    /api/applications          # Get all applications
POST   /api/applications          # Create new application
GET    /api/applications/:id      # Get specific application
PUT    /api/applications/:id      # Update application
DELETE /api/applications/:id      # Delete application
```

### Authentication (To be implemented)

```
POST   /api/auth/register         # Register new user
POST   /api/auth/login            # Login user
GET    /api/auth/me               # Get current user
```

## Middleware

### Error Middleware

Centralized error handling middleware that catches and formats errors:

```javascript
import { errorMiddleware } from './middleware/error-middleware';
app.use(errorMiddleware);
```

### CORS

Configured to allow cross-origin requests from the frontend:

```javascript
app.use(cors());
```

### JSON Parser

Express JSON middleware for parsing request bodies:

```javascript
app.use(express.json());
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with nodemon (auto-reload) |
| `npm start` | Start production server |

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port number | 5000 |
| `DB_HOST` | MySQL database host | localhost |
| `DB_USER` | Database username | - |
| `DB_PASSWORD` | Database password | - |
| `DB_NAME` | Database name | - |
| `JWT_SECRET` | Secret key for JWT signing | - |
| `NODE_ENV` | Environment mode | development |

## Database Schema

### Users Table (Example)

```sql
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Applications Table (Example)

```sql
CREATE TABLE applications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    company VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    salary VARCHAR(100),
    location VARCHAR(255),
    status VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### Events Table (Example)

```sql
CREATE TABLE events (
    id INT PRIMARY KEY AUTO_INCREMENT,
    application_id INT NOT NULL,
    event_type VARCHAR(100) NOT NULL,
    date DATE NOT NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE
);
```

## Error Handling

All errors are caught and processed through the error middleware:

```javascript
export const errorMiddleware = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    
    res.status(statusCode).json({
        success: false,
        message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};
```

## Security Best Practices

- ✅ CORS enabled for cross-origin requests
- ✅ Environment variables for sensitive data
- ✅ JWT for authentication
- 🔒 Add rate limiting (recommended)
- 🔒 Add helmet for security headers (recommended)
- 🔒 Add input validation (recommended)
- 🔒 Add SQL injection protection (recommended)

## Development Tips

### Auto-Reload with Nodemon

Nodemon automatically restarts the server when files change. Configuration is handled in `package.json`:

```json
{
  "scripts": {
    "dev": "nodemon index.js"
  }
}
```

### Testing API Endpoints

Use tools like:
- **Postman** - GUI for API testing
- **cURL** - Command-line HTTP client
- **Thunder Client** - VS Code extension

Example cURL request:
```bash
curl http://localhost:5000/
```

### Debugging

Add console logs or use Node.js debugger:

```bash
node --inspect index.js
```

## Database Connection

Use MySQL2 with promises for async/await support:

```javascript
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default pool;
```

## API Response Format

### Success Response

```json
{
    "success": true,
    "data": { ... },
    "message": "Operation successful"
}
```

### Error Response

```json
{
    "success": false,
    "message": "Error description"
}
```

## Contributing

1. Follow the existing project structure
2. Add new routes in the `routes/` directory
3. Implement business logic in `services/`
4. Use controllers for request handling
5. Keep middleware modular and reusable
6. Document all API endpoints

## License

ISC
