# E-Dashboard (MERN Stack Project)

This is a full-stack MERN (MongoDB, Express, React, Node.js) e-commerce dashboard project. It includes user registration, login with JWT authentication, product management, and secure communication between frontend and backend APIs.

---

## Technologies Used

- **Frontend:** React.js, React Router, Fetch API
- **Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT
- **Deployment:** Vercel (Frontend), Render (Backend), MongoDB Atlas (Database)

---

## Project Structure

```
E-Dashboard/
│
├── backend/
│   ├── db/
│   │   └── config.js
|   |   |
|   |   ├── user.js
│   |   └── product.js
│   ├── index.js
│   |_ .env
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── Components/
│   │   ├── Images/
│   │   └── App.js
│   └── .env
│
├── .gitignore
├── .env.example
├── package.json
└── README.md
```

---

## Deployment Setup

### 1. Clone the repository
```bash
git clone https://github.com/Mohitsharmaraina/E-Dashboard.git
cd E-Dashboard
```

### 2. Setup Environment Variables

Create `.env` files in `backend/` and `frontend/` (do **not** commit them). Use `.env.example` as reference.

#### Sample `backend/.env`
```
PORT=4500
JWT_KEY=your_jwt_secret
MONGO_URI=your_mongodb_atlas_uri
```

#### Sample `frontend/.env`
```
REACT_APP_API_URL=https://your-backend-render-url
```

### 3. Install Dependencies

```bash
npm install
cd frontend
npm install
```

### 4. Start in Development

```bash
npm run dev
```

---

## Deployment Steps

### Backend on Render

- Connect your GitHub repo on [Render](https://render.com)
- Choose root folder: `backend/`
- Use build command: `npm install`
- Start command: `node index.js`
- Set environment variables in dashboard

### Frontend on Vercel

- Connect GitHub repo on [Vercel](https://vercel.com)
- Set project root: `frontend/`
- Build command: `npm run build`
- Output directory: `build`
- Add `REACT_APP_API_URL` in Vercel Environment Variables

---

## Features

-  JWT Authentication
-  Product Search & Filter
-  User Login/Register
-  CRUD Operations for Products

---

## Contact

Made with ❤️ by [Mohit Sharma](https://github.com/Mohitsharmaraina)