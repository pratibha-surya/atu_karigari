
# Full-Stack React + Express Authentication Boilerplate

---







---

## Project Overview

This is a full-stack authentication system built with React on the frontend and Express on the backend.  
It uses JWTs for authentication with secure refresh token rotation, password hashing, validation, and security middleware.

---

## Technologies

### Backend

- Node.js, Express 5.x  
- MongoDB with Mongoose  
- JWT (jsonwebtoken)  
- bcryptjs for password hashing  
- Joi for backend input validation  
- Helmet, express-rate-limit, CORS for security  
- Morgan for HTTP logging  
- Nodemon for development

### Frontend

- React 19.x with Vite  
- React Router DOM v7  
- Axios for HTTP requests  
- React Hook Form + Zod for form validation  
- Tailwind CSS for styling  
- React Hot Toast & React Toastify for notifications

---

## Setup & Installation
Backend step
cd backend
npm install
frontend step
cd frontend
npm install
## Backend
npm run dev
## Frontend
npm run dev
 ## Security Features
Password hashing with bcryptjs

JWT authentication with access & refresh tokens

HTTP-only, secure, SameSite cookies for refresh tokens

Helmet for setting secure HTTP headers

Rate limiting to prevent brute force attacks

Strict CORS allowing only frontend origin

Backend validation with Joi

Frontend validation with Zod











### Clone the repo

```bash
git clone https://github.com/pratibha-surya/atu_karigari.git
cd  assig
cd frontend
cd backend

