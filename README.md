# Astro Vastu Pragati — Vedic Wisdom & Spiritual Blog

**Astro Vastu Pragati** by **Acharya Pragati** is a full-stack MERN web application and consulting platform for Vedic Astrology, Vastu Shastra, Numerology, Occult, Rashifal, Seva Stories, and Spirituality.

---

## ✨ Features

- **Executive Aesthetic:** Tailored deep Navy Blue (`#0B192C`), crisp white, and champagne gold theme with custom SVG iconography.
- **Dynamic Topic Filtering:** Instant discipline quick selector with an **All** posts view covering Astrology, Numerology, Vastu Shastra, Rashifal, Seva Stories, and Spirituality.
- **Rich Media & Cloudinary Integration:** Direct image and video uploads to Cloudinary with automatic cloud CDN hosting.
- **Inline Home Feed Video Player:** Videos play inline on the home page feed, muted by default with floating sound toggles and playback controls.
- **Likes & Guest Comments:** Lightweight interactive engagement with anti-bot honeypot spam protection and admin moderation.
- **Admin Dashboard:** Secure JWT-protected portal for creating, editing, publishing, drafting, and deleting articles with React Quill rich text editing.
- **Client Consultations:** Integrated consultation booking flow and direct contact channels.

---

## 🛠 Tech Stack

- **Frontend:** React 18, Vite, Tailwind CSS, Lucide-style Custom SVG Icons, React Router 6, Axios, React Quill
- **Backend:** Node.js, Express.js, MongoDB (Mongoose), Multer, Cloudinary SDK, JWT, Bcrypt
- **Storage:** Cloudinary (Free Tier / 25 Monthly Credits)
- **Deployment:** Vercel (Frontend) + Render / Railway / Node host (Backend)

---

## 📁 Project Structure

```text
astro-blog/
├── backend/                  # Express REST API
│   ├── config/               # DB & Cloudinary configuration
│   ├── controllers/          # Blog, User, Auth controllers
│   ├── middleware/           # JWT auth & error handling
│   ├── models/               # MongoDB Mongoose schemas
│   ├── routes/               # API endpoints
│   ├── server.js             # Express app entrypoint
│   └── .env.example          # Sample environment variables
├── frontend/                 # React + Vite Client
│   ├── public/               # Static assets (portrait, icons)
│   ├── src/
│   │   ├── components/       # BlogCard, Navbar, Footer, Icons
│   │   ├── pages/            # Home, About, BlogPost, AdminDashboard, etc.
│   │   └── api/              # Axios instance with baseURL
│   ├── vercel.json           # SPA rewrites rule for Vercel
│   └── .env.example          # Frontend environment variables
└── README.md
```

---

## 🚀 Local Development Setup

### 1. Prerequisites
- **Node.js** (v18 or higher) & **npm**
- **MongoDB** running locally (`mongodb://127.0.0.1:27017/astro-blog`) or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster URL.
- Free [Cloudinary Account](https://cloudinary.com/) for media storage.

### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
```

Fill in your `.env`:
```env
PORT=5000
CLIENT_URL=http://localhost:5173
MONGO_URI=mongodb://127.0.0.1:27017/astro-blog
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=7d

# Initial Admin
ADMIN_NAME=Acharya Pragati
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_secure_password

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Seed the admin account:
```bash
npm run seed
```

Start the backend:
```bash
npm run dev
```
Backend runs at `http://localhost:5000`. Test health: `http://localhost:5000/api/health`.

### 3. Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env
```

Ensure `frontend/.env` contains:
```env
VITE_API_URL=http://localhost:5000/api
```

Start Vite dev server:
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

---

## 🌐 Production Deployment Guide

### A. Deploy Frontend on Vercel
1. Log in to [Vercel](https://vercel.com/) and click **"Add New Project"**.
2. Select your GitHub repository: `Lakshaygaur391/AstroVastuBlog`.
3. Configure the project:
   - **Root Directory:** Click Edit and select `frontend`.
   - **Framework Preset:** `Vite` (auto-detected).
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Add Environment Variable:
   - `VITE_API_URL` = `https://your-backend-url.onrender.com/api` (your deployed backend API).
5. Click **Deploy**. Vercel will automatically build and assign you a free `*.vercel.app` domain with SSL!

*(Note: `frontend/vercel.json` is already configured with SPA rewrites so direct links and page refreshes work seamlessly!)*

### B. Deploy Backend on Render (Free Tier)
1. Log in to [Render](https://render.com/) and click **"New Web Service"**.
2. Connect your GitHub repository `Lakshaygaur391/AstroVastuBlog`.
3. Configure service settings:
   - **Root Directory:** `backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
4. Add Environment Variables:
   - `NODE_ENV` = `production`
   - `PORT` = `5000`
   - `CLIENT_URL` = `https://your-project.vercel.app` (your Vercel frontend URL)
   - `MONGO_URI` = your cloud MongoDB Atlas connection string
   - `JWT_SECRET` = your secret key
   - `CLOUDINARY_CLOUD_NAME` = your Cloudinary cloud name
   - `CLOUDINARY_API_KEY` = your Cloudinary API key
   - `CLOUDINARY_API_SECRET` = your Cloudinary API secret
5. Deploy the Web Service. Copy the Render URL (e.g. `https://astro-backend.onrender.com`) and paste it as `VITE_API_URL` in your Vercel settings (`https://astro-backend.onrender.com/api`).

---

## 🔒 Security
- `.env` files and credentials are strictly ignored in `.gitignore`.
- Password hashing using `bcryptjs` with salt rounds.
- Bot anti-spam honeypot on blog comments.
- Role-based JWT validation on all administrative endpoints.
