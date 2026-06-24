# Job Application & Internship Management System

A full-stack MERN application that enables organizations to post jobs and internships while allowing applicants to browse opportunities, apply online, and track application status.

## Live Features

### Authentication

* User Registration
* User Login
* JWT Authentication
* Password Encryption using bcrypt
* Protected Routes
* Role-Based Access Control (Admin/User)

### Applicant Features

* Browse Available Jobs & Internships
* View Job Details
* Apply for Jobs
* Submit Resume Link and Cover Note
* Track Application Status
* View Application History Dashboard

### Admin Features

* Create Job Postings
* Update Job Postings
* Delete Job Postings
* View All Applications
* Manage Applicant Status
* Administrative Dashboard

### Application Workflow

Applied → Shortlisted → Selected / Rejected

---

## Tech Stack

### Frontend

* React.js
* React Router DOM
* Axios
* Context API
* CSS

### Backend

* Node.js
* Express.js
* JWT Authentication
* bcryptjs

### Database

* MongoDB Atlas
* Mongoose

### Deployment

* Vercel (Frontend)
* Render (Backend)

---

## Project Structure

```text
JobApplicationInternshipManagement/

├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
└── README.md
```

---

## API Endpoints

### Authentication

| Method | Endpoint         | Description   |
| ------ | ---------------- | ------------- |
| POST   | /api/auth/signup | Register User |
| POST   | /api/auth/login  | Login User    |

### Jobs

| Method | Endpoint      | Description        |
| ------ | ------------- | ------------------ |
| GET    | /api/jobs     | Get All Jobs       |
| POST   | /api/jobs     | Create Job (Admin) |
| PUT    | /api/jobs/:id | Update Job (Admin) |
| DELETE | /api/jobs/:id | Delete Job (Admin) |

### Applications

| Method | Endpoint                     | Description              |
| ------ | ---------------------------- | ------------------------ |
| POST   | /api/applications            | Apply for Job            |
| GET    | /api/applications/me         | User Applications        |
| GET    | /api/applications            | All Applications (Admin) |
| PUT    | /api/applications/:id/status | Update Status (Admin)    |

---

## Installation

### Backend Setup

```bash
cd backend

npm install

npm run dev
```

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

## Environment Variables

Create a `.env` file inside the backend folder:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret
```

---

## Future Improvements

* Resume Upload using Cloudinary
* Email Notifications
* Advanced Search Filters
* Analytics Dashboard
* Application Export to CSV
* Company Profiles

---

## Screenshots

Add screenshots of:

* Landing Page
* Login Page
* Signup Page
* Jobs Page
* Job Details Page
* User Dashboard
* Admin Dashboard
* Application Management

---

## Developer

**Juhi Dubey**

BCA Student | MERN Stack Developer

GitHub: https://github.com/Juhi-Dubey

---

## License

This project is developed for educational and internship evaluation purposes.
