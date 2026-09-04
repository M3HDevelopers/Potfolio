# Portfolio Backend (Express + MongoDB)

This is the backend for the Muzammil Ahmed portfolio admin panel. It stores all site content in
MongoDB, handles admin login with JWT, sends OTP codes by email, and stores uploaded images/videos.

The frontend automatically uses this backend when `VITE_API_URL` is set. Otherwise it runs on
localStorage, so the preview still works with no server.

## 1. Set up MongoDB

Create a free cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas) and get a connection
string, or use a local MongoDB (`mongodb://127.0.0.1:27017/portfolio`).

## 2. Configure environment

```bash
cd server
cp .env.example .env
```

Edit `.env` and fill in:

- `MONGO_URI` — your MongoDB connection string
- `JWT_SECRET` — a long random string
- `ADMIN_EMAIL` / `ADMIN_PASSWORD` — the admin login
- `CORS_ORIGIN` — your frontend URL (leave `*` while developing)
- `SMTP_*` — optional, for real OTP emails. Without these the OTP code is printed to the server console.

### Email providers that work with SMTP

- **Gmail** — enable 2-Step Verification, create an App Password, use `smtp.gmail.com` port 587.
- **Brevo (Sendinblue)** — `smtp-relay.brevo.com` port 587.
- **SendGrid** — `smtp.sendgrid.net` port 587, username `apikey`.

## 3. Install, seed and run

```bash
npm install
npm run seed   # creates the admin account + empty content document
npm run dev    # or: npm start
```

The API now listens on `http://localhost:5000`. Test it with `http://localhost:5000/api/health`.

## 4. Connect the frontend

In the project root, create `.env`:

```
VITE_API_URL=http://localhost:5000
```

Rebuild/reload the frontend. The admin panel header will now say "Connected to backend".

The first time you log in, your local (browser) content is pushed to the server as the initial
dataset. After that, the server is the source of truth.

## 5. Deploy

- **Backend** — deploy the `server` folder to Render, Railway or a VPS. Set the same `.env`
  variables there. Make sure `CORS_ORIGIN` is your production frontend URL.
- **Frontend** — build with `VITE_API_URL` pointing at the deployed backend.

## API overview

| Method | Path                | Auth | Purpose                                   |
| ------ | ------------------- | ---- | ----------------------------------------- |
| POST   | /api/auth/login     |      | Login with password, returns JWT          |
| POST   | /api/auth/otp       |      | Email a 6-digit OTP to the admin email    |
| POST   | /api/auth/reset     |      | Reset password using the OTP              |
| POST   | /api/auth/password  | ✔    | Change password (current + OTP)           |
| GET    | /api/content        |      | Public content (password stripped)        |
| GET    | /api/content/full   | ✔    | Full content including messages           |
| PUT    | /api/content        | ✔    | Save content (messages merged by id)      |
| POST   | /api/contact        |      | Public contact-form submission            |
| POST   | /api/upload         | ✔    | Upload image/video/resume (max 8MB)       |
