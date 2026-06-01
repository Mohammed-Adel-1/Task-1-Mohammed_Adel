# User Management API

A simple backend project implementing basic user management features using CRUD operations with authentication and authorization.

## Features

- User CRUD operations
- User login system
- Password hashing for secure password storage
- Authentication using token-based access
- Authorization for protected routes
- Request validation using Joi

## API Functionalities

### User

- Create user
- User SignIn
- Get user by ID
- Update user
- Delete user

### Authentication

- Login with email and password
- Generate authentication token after successful login

## Security

- Passwords are hashed before storing in the database
- Protected routes require authentication
- Authorization middleware controls access permissions

## Validation

Request data is validated using Joi to ensure:

- Required fields are provided
- Correct data types
- Proper input formatting

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Joi

## Author

Mohammed Adel