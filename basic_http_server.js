// Import the http module
const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');

// Create HTTP server
const server = http.createServer((req, res) => {
  // Parse the URL
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  
  // Set default headers
  res.setHeader('Content-Type', 'text/html');
  
  // Simple routing
  if (pathname === '/' || pathname === '/home') {
    res.statusCode = 200;
    res.end(`
      <html>
        <head><title>Node.js HTTP Server</title></head>
        <body>
          <h1>Welcome to Node.js HTTP Server!</h1>
          <p>This is the home page.</p>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/api/data">API Data</a></li>
          </ul>
        </body>
      </html>
    `);
  } 
  else if (pathname === '/about') {
    res.statusCode = 200;
    res.end(`
      <html>
        <head><title>About - Node.js Server</title></head>
        <body>
          <h1>About This Server</h1>
          <p>Built with Node.js core modules:</p>
          <ul>
            <li><strong>http:</strong> Creating the server</li>
            <li><strong>url:</strong> Parsing request URLs</li>
            <li><strong>path:</strong> Working with file paths</li>
            <li><strong>fs:</strong> File system operations</li>
          </ul>
          <p><a href="/">← Back to Home</a></p>
        </body>
      </html>
    `);
  }
  else if (pathname === '/api/data') {
    // Return JSON data
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    
    const data = {
      message: 'Hello from Node.js API!',
      timestamp: new Date().toISOString(),
      server: 'Node.js HTTP Server',
      version: process.version,
      platform: process.platform
    };
    
    res.end(JSON.stringify(data, null, 2));
  }
  else {
    // 404 Not Found
    res.statusCode = 404;
    res.end(`
      <html>
        <head><title>404 - Page Not Found</title></head>
        <body>
          <h1>404 - Page Not Found</h1>
          <p>The page you're looking for doesn't exist.</p>
          <p><a href="/">← Go to Home</a></p>
        </body>
      </html>
    `);
  }
});

// Define port
const PORT = process.env.PORT || 3000;

// Start the server
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
  console.log(`Process ID: ${process.pid}`);
  console.log(`Node.js version: ${process.version}`);
  console.log(`Platform: ${process.platform}`);
});

// Handle server errors
server.on('error', (err) => {
  console.error('Server error:', err);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('Received SIGTERM, shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('\nReceived SIGINT, shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});