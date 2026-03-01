# Smart Access Guardian

Smart Access Guardian is a role-based healthcare access management system designed to demonstrate secure data access, user authentication, and role-specific dashboards. The platform allows patients, doctors, and administrators to interact with a centralized medical system while maintaining controlled access to sensitive information.

The application consists of a React frontend deployed on Vercel and a Node.js/Express backend deployed on Render, connected to a MongoDB Atlas database.

### Live Link: https://medsecure-access-control.vercel.app/
---

## Project Architecture

Frontend: React + Vite
Backend: Node.js + Express
Database: MongoDB Atlas
Authentication: JWT
Deployment: Vercel (Frontend) and Render (Backend)

User Roles:

* Patient
* Doctor
* Admin

---

## Features

### Patient

* View personal health records
* Schedule appointments with doctors
* Request prescription refills
* Access billing information
* Send queries to doctors

### Doctor

* View upcoming appointments
* Access patient records
* Review diagnostic results
* Update treatment plans
* Prescribe medications
* Respond to patient queries

### Admin

* Manage user accounts
* Monitor system activity
* View security logs
* Generate compliance reports
* Handle emergency access

---


## Installation (Local Development)

### 1. Clone the repository

```
git clone https://github.com/your-username/medsecure-access-control.git
cd medsecure-access-control
```

---

### 2. Backend Setup

Navigate to the backend folder:

```
cd backend
npm install
```

Create a `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run the backend:

```
npm run dev
```

or

```
node server.js
```

---

### 3. Frontend Setup

Open another terminal:

```
cd frontend
npm install
npm run dev
```

Frontend will run on:

```
http://localhost:5173
```

---






## Security Considerations

* Passwords are hashed using bcrypt
* JWT tokens are used for authentication
* Role-based access control restricts system features
* Sensitive environment variables are stored securely

---

## Future Improvements

* Real-time notifications
* Role-based analytics dashboard
* Secure file uploads for medical reports
* Audit logging system
* Two-factor authentication

