#  Full-Stack React + Express Authentication Boilerplate

---

## 
Project Overview

This is a full-stack authentication system built with **React (frontend)** and **Express (backend)**.  
It uses **JWTs with refresh token rotation**, **password hashing**, **form validation**, and multiple **security best practices** on both ends.

---

##  Technologies Used

###  Backend

- Node.js & Express 5.x  
- MongoDB + Mongoose  
- JSON Web Tokens (JWT)  
- bcryptjs – password hashing  
- Joi – request body validation  
- Helmet – secure HTTP headers  
- express-rate-limit – rate limiting  
- CORS – secure cross-origin access  
- Morgan – request logging  
- Nodemon – development server

###  Frontend

- React 19.x (with Vite)  
- React Router DOM v7  
- Axios – API communication  
- React Hook Form + Zod – form validation  
- Tailwind CSS – utility-first styling  
- React Hot Toast & Toastify – notifications

---

##  Setup & Installation
Backend Setup
cd backend
npm install
cp .env.example .env   # Create your environment config
npm run dev

Frontend Setup
cd frontend
npm install
npm run dev


Security Features
Password hashing with bcryptjs

✅ JWT-based authentication (access & refresh tokens)

✅ HTTP-only, SameSite-secure cookies for refresh tokens

✅ Helmet for HTTP header protection

✅ Rate limiting to prevent brute-force attacks

✅ CORS restricted to frontend origin only

✅ Request validation with Joi (backend)

✅ Form validation with Zod (frontend)



###  Clone the Repository

```bash
git clone https://github.com/pratibha-surya/atu_karigari.git
cd atu_karigari
