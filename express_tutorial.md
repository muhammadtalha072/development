# Express.js Framework Tutorial

## Introduction to Express.js

Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features for building web and mobile applications. It's designed to make building web applications and APIs easier and more efficient.

### Key Features of Express.js
- Fast, unopinionated, minimalist web framework
- Robust routing system
- HTTP helpers (redirection, caching, etc.)
- Extensive middleware ecosystem
- Template engine support

## Installing Express

Before you can use Express, you need to have Node.js installed on your system. Then follow these steps:

### 1. Initialize a new Node.js project
```bash
mkdir my-express-app
cd my-express-app
npm init -y
```

### 2. Install Express
```bash
npm install express
```

### 3. Install development dependencies (optional but recommended)
```bash
npm install --save-dev nodemon
```

Add this script to your `package.json`:
```json
{
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js"
  }
}
```

## Create Your First Express Server

Create a file called `app.js` and add the following code:

```javascript
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Basic route
app.get('/', (req, res) => {
  res.send('Hello, Express.js!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
```

Run your server:
```bash
npm run dev
```

Visit `http://localhost:3000` in your browser to see your Express server in action!

## Routing in Express

Express provides a powerful routing system that allows you to define how your application responds to different client requests.

### Basic Route Structure
```javascript
app.METHOD(PATH, HANDLER)
```

- `app` is an instance of Express
- `METHOD` is an HTTP request method (GET, POST, PUT, DELETE, etc.)
- `PATH` is the path on the server
- `HANDLER` is the function executed when the route is matched

### GET Routes

GET routes are used to retrieve data from the server:

```javascript
// Simple GET route
app.get('/', (req, res) => {
  res.send('Welcome to the home page!');
});

// GET route with parameters
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  res.json({ message: `User ID is ${userId}` });
});

// GET route with query parameters
app.get('/search', (req, res) => {
  const { q, category } = req.query;
  res.json({ 
    query: q, 
    category: category || 'all',
    message: 'Search results would go here'
  });
});
```

### POST Routes

POST routes are used to create new resources:

```javascript
// POST route for creating users
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  
  // In a real app, you'd save to a database
  const newUser = {
    id: Date.now(),
    name,
    email,
    createdAt: new Date()
  };
  
  res.status(201).json({
    message: 'User created successfully',
    user: newUser
  });
});

// POST route for login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  // In a real app, you'd verify credentials
  if (username && password) {
    res.json({ 
      message: 'Login successful',
      token: 'fake-jwt-token'
    });
  } else {
    res.status(400).json({ error: 'Username and password required' });
  }
});
```

### PUT Routes

PUT routes are used to update existing resources:

```javascript
// PUT route for updating users
app.put('/users/:id', (req, res) => {
  const userId = req.params.id;
  const { name, email } = req.body;
  
  // In a real app, you'd update the database
  const updatedUser = {
    id: userId,
    name,
    email,
    updatedAt: new Date()
  };
  
  res.json({
    message: 'User updated successfully',
    user: updatedUser
  });
});
```

### DELETE Routes

DELETE routes are used to remove resources:

```javascript
// DELETE route for removing users
app.delete('/users/:id', (req, res) => {
  const userId = req.params.id;
  
  // In a real app, you'd delete from the database
  res.json({
    message: `User ${userId} deleted successfully`
  });
});
```

### Route Parameters and Wildcards

```javascript
// Multiple parameters
app.get('/users/:userId/posts/:postId', (req, res) => {
  const { userId, postId } = req.params;
  res.json({ userId, postId });
});

// Optional parameters
app.get('/posts/:year/:month?', (req, res) => {
  const { year, month } = req.params;
  res.json({ 
    year, 
    month: month || 'all months'
  });
});

// Wildcard routes
app.get('/files/*', (req, res) => {
  res.json({ 
    path: req.params[0] || '',
    message: 'File path handler'
  });
});
```

## Middleware in Express

Middleware functions are functions that have access to the request object (`req`), the response object (`res`), and the next middleware function in the application's request-response cycle, commonly denoted by `next`.

### Built-in Middleware

Express comes with several built-in middleware functions:

#### express.json()
Parses incoming requests with JSON payloads:

```javascript
// Enable JSON parsing
app.use(express.json());

// Now you can access req.body in POST/PUT routes
app.post('/data', (req, res) => {
  console.log(req.body); // The parsed JSON data
  res.json({ received: req.body });
});
```

#### express.urlencoded()
Parses incoming requests with URL-encoded payloads (form data):

```javascript
// Enable form data parsing
app.use(express.urlencoded({ extended: true }));

app.post('/form', (req, res) => {
  console.log(req.body); // Form data
  res.json({ formData: req.body });
});
```

#### express.static()
Serves static files:

```javascript
// Serve static files from 'public' directory
app.use(express.static('public'));

// Serve static files with a path prefix
app.use('/assets', express.static('public'));
```

### Custom Middleware

You can create your own middleware functions:

#### Basic Custom Middleware

```javascript
// Simple logging middleware
const logger = (req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next(); // Call next() to continue to the next middleware
};

// Apply middleware globally
app.use(logger);
```

#### Authentication Middleware

```javascript
// Authentication middleware
const authenticate = (req, res, next) => {
  const token = req.header('Authorization');
  
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }
  
  // In a real app, you'd verify the token
  if (token === 'Bearer valid-token') {
    req.user = { id: 1, name: 'John Doe' }; // Add user info to request
    next();
  } else {
    res.status(401).json({ error: 'Invalid token.' });
  }
};

// Apply to specific routes
app.get('/protected', authenticate, (req, res) => {
  res.json({ 
    message: 'This is a protected route',
    user: req.user
  });
});
```

#### Error Handling Middleware

```javascript
// Error handling middleware (must have 4 parameters)
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
      status: err.status || 500
    }
  });
};

// Route that might throw an error
app.get('/error', (req, res, next) => {
  const error = new Error('Something went wrong!');
  error.status = 400;
  next(error); // Pass error to error handler
});

// Apply error handler (must be last)
app.use(errorHandler);
```

#### Route-Specific Middleware

```javascript
// Middleware for specific routes only
const validateUser = (req, res, next) => {
  const { name, email } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ 
      error: 'Name and email are required' 
    });
  }
  
  if (!email.includes('@')) {
    return res.status(400).json({ 
      error: 'Invalid email format' 
    });
  }
  
  next();
};

// Apply middleware only to this route
app.post('/users', validateUser, (req, res) => {
  res.json({ 
    message: 'User would be created',
    data: req.body
  });
});
```

## Complete Example Application

Here's a complete example that combines all the concepts:

```javascript
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Built-in middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Custom logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Sample data (in a real app, this would be a database)
let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
];

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Express API!' });
});

// GET all users
app.get('/users', (req, res) => {
  res.json(users);
});

// GET single user
app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id == req.params.id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});

// POST new user
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  const newUser = {
    id: users.length + 1,
    name,
    email
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT update user
app.put('/users/:id', (req, res) => {
  const userIndex = users.findIndex(u => u.id == req.params.id);
  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  users[userIndex] = { ...users[userIndex], ...req.body };
  res.json(users[userIndex]);
});

// DELETE user
app.delete('/users/:id', (req, res) => {
  const userIndex = users.findIndex(u => u.id == req.params.id);
  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  users.splice(userIndex, 1);
  res.json({ message: 'User deleted successfully' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

## Testing Your API

You can test your API using tools like:

1. **cURL** (command line):
```bash
# GET request
curl http://localhost:3000/users

# POST request
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice","email":"alice@example.com"}'
```

2. **Postman** (GUI application)
3. **VS Code REST Client** extension
4. **Browser** (for GET requests)

This tutorial covers the fundamental concepts of Express.js. As you build more complex applications, you'll want to explore additional topics like template engines, database integration, authentication systems, and deployment strategies.