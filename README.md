# FinBud AI 🚀

FinBud AI is a comprehensive financial portfolio management application designed to help users track stocks, manage assets, and visualize financial data.

## 📂 Project Structure

This is a **Monorepo** containing three main components:

* **`frontend/`**: The user interface built with **Vue.js 3** and **Tailwind CSS**.
* **`backend/`**: The RESTful API server built with **Node.js**, **Express**, and **MongoDB**.
* **`data-pipeline/`**: Python scripts for data cleaning and seeding (ETL process).

## 🛠 Tech Stack

* **Frontend:** Vue.js, Chart.js, Tailwind CSS, Google OAuth (vue3-google-login).
* **Backend:** Node.js, Express.js, MongoDB (Mongoose), JWT Authentication, Nodemailer.
* **Tools:** Git, Vercel (Frontend Hosting), Render (Backend Hosting).

## 🚀 Getting Started

### Prerequisites
* Node.js installed.
* MongoDB Atlas account.
* Google Cloud Console Project (for OAuth).

### 1. Setup Backend
```bash
cd backend
npm install
# Create a .env file with: MONGO_URI, JWT_SECRET, GOOGLE_CLIENT_ID, EMAIL_USER, EMAIL_PASS
node server.js

### 2. Setup Frontend
cd frontend
npm install
# Create a .env file with: VUE_APP_API_URL=http://localhost:3000
npm run serve

### Security Note


```bash
git add README.md

git commit -m "Add README and remove sensitive files"

git push origin update-readme-and-cleanup