# 🎯 PrepZone — Online Mock Test & Practice Platform

<p align="center">
  <a href="https://ais-pre-3kfbpsyc7hcxerzjq4ciiy-641276739377.asia-southeast1.run.app" target="_blank">
    <img src="https://img.shields.io/badge/🚀_LAUNCH_LIVE_DEMO-CLICK_HERE_TO_RUN_APP-6366F1?style=for-the-badge&logo=google-cloud&logoColor=white&labelColor=1E1B4B" alt="Live Demo" height="42" />
  </a>
</p>

<p align="center">
  <b>A modern, full-stack online examination and practice engine built with React, Vite, Express, and Tailwind CSS.</b><br>
  Designed for campus placements, competitive exams (GATE, CAT, GRE, Tech Placements), and timed mock assessments.
</p>

<p align="center">
  <a href="https://ais-pre-3kfbpsyc7hcxerzjq4ciiy-641276739377.asia-southeast1.run.app" target="_blank">
    <img src="https://img.shields.io/badge/Live_Preview-Cloud_Run_Active-10B981?style=flat-square&logo=google-cloud&logoColor=white" alt="Live Status" />
  </a>
  <img src="https://img.shields.io/badge/Frontend-React_18_%2B_Vite-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React 18" />
  <img src="https://img.shields.io/badge/Backend-Express.js_%2B_Node.js-339933?style=flat-square&logo=node.js&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/Styling-Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/License-MIT-blue?style=flat-square" alt="License" />
</p>

---

## 🌐 Live Demo & How to Access

Anyone viewing this repository on GitHub can launch and test the full application instantly in the browser without installing anything:

### 🔗 **Direct Live Demo Link:**
### 👉 **[https://ais-pre-3kfbpsyc7hcxerzjq4ciiy-641276739377.asia-southeast1.run.app](https://ais-pre-3kfbpsyc7hcxerzjq4ciiy-641276739377.asia-southeast1.run.app)**

> 💡 **Tip for Repository Owners**: To show this Live Demo link directly on your GitHub Profile and repository header:
> 1. Go to your GitHub repository page.
> 2. Click the **⚙️ (Settings gear icon)** next to the **About** section on the right sidebar.
> 3. Paste `https://ais-pre-3kfbpsyc7hcxerzjq4ciiy-641276739377.asia-southeast1.run.app` into the **Website** field.
> 4. Check the **Include in home page** box and click **Save changes**.
> 5. Now, whenever anyone visits your GitHub profile or repository, a clickable **Website / Live Demo** button appears at the very top!

---

## 🔑 Quick Login & Demo Credentials

The platform comes pre-seeded with test accounts, subjects, question banks, and simulated leaderboard entries:

| Role | Email | Password | Access Capabilities |
| :--- | :--- | :--- | :--- |
| **Student Candidate** | `student@prepzone.edu` | `student123` | Take mock tests, view detailed answer keys, track analytics, update profile photo, climb leaderboard |
| **Platform Administrator** | `admin@prepzone.edu` | `admin123` | Manage tests, add/edit question pools, monitor user performance & platform statistics |
| **Guest / Instant Access** | *Click "Continue as Guest"* | *No password required* | Instant access to all subjects, mock exams, and analytics |

---

## ✨ Key Features

### 📝 Realistic Online Examination Engine
- **Timed Mock Tests**: Configurable exam timers with warning countdowns and automatic submission when time expires.
- **Question Navigation Palette**:
  - 🟢 **Answered**
  - 🔴 **Not Answered / Visited**
  - 🟣 **Marked for Review**
  - 🟣🟢 **Answered & Marked for Review**
  - ⚪ **Not Visited**
- **Negative Marking & Scoring**: Realistic marking scheme (+3 for correct, -1 for incorrect, 0 for unattempted).
- **Fullscreen Mode & Keyboard Navigation**: Focus mode for exam simulation.

### 📊 In-Depth Performance Analytics & Instant Results
- **Comprehensive Scorecards**: Overall score, accuracy percentage, time spent per question, percentile rank.
- **Subject & Topic Breakdown**: Accuracy metrics grouped by topic (Quant, Reasoning, Verbal, Tech, Core CS).
- **Difficulty-Wise Analysis**: Success rate across Easy, Medium, and Hard tiers.
- **Detailed Explanations & Step-by-Step Solutions**: Complete answer keys with explanations for every question.

### 👤 Profile & Device Photo Upload
- **PC / Laptop Photo Upload**: Browse files directly from your computer or drag-and-drop any image (PNG, JPG, WebP, GIF, SVG).
- **Client-Side Canvas Optimization**: Center-crops and scales photos automatically to clean, high-resolution 320×320 avatars.
- **DiceBear Illustrated Presets**: Optional quick-select avatar styles (Robot, Student, Modern, Scholar).

### 🏆 Competitive Leaderboard & Performance History
- Real-time global percentile ranking, badges, and candidate score comparisons.
- Chronological exam history with past scorecard review and re-attempt options.

### 🛠️ Administrator Portal
- Create and edit mock test papers with subject categorization, duration, and difficulty ratings.
- Manage question banks with multiple-choice options, correct answer keys, and detailed solutions.
- View real-time platform statistics (total tests taken, average score, candidate pass rates).

### 🌓 Accessibility & Theme
- Dark Mode / Light Mode with seamless system preference detection and manual toggle.

---

## 🏗️ Architecture & Tech Stack

```
prepzone/
├── server/                     # Express.js backend services
│   ├── db.js                   # In-memory database store with seed data
│   ├── seedData.js             # Comprehensive question pools & subjects
│   └── routes/                 # REST API endpoints (auth, tests, questions, results, admin)
├── src/                        # Frontend React + Vite SPA
│   ├── components/             # Modular UI components (Exam, Dashboard, Admin, Profile, etc.)
│   ├── context/                # Global ThemeContext (Dark/Light mode)
│   ├── services/api.js         # API client & local persistence helper
│   ├── App.jsx                 # Core router and view coordinator
│   └── main.jsx                # Application root mount
├── server.js                   # Express server entry point with Vite middleware
├── vite.config.js              # Vite configuration with Tailwind CSS plugin
├── jsconfig.json               # JavaScript compiler & path aliases (@/*)
└── package.json                # Project dependencies and build scripts
```

- **Frontend**: React 18, Vite, Lucide React Icons, Tailwind CSS
- **Backend**: Node.js, Express.js (REST API)
- **Data Persistence**: In-memory relational store with local storage synchronization
- **Production Bundle**: Single-command ESBuild bundler (`dist/server.cjs` + static assets)

---

## 💻 Local Development Setup

To run this project locally on your PC or Laptop:

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- `npm` (comes bundled with Node.js)

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/prepzone.git
cd prepzone
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the development server
```bash
npm run dev
```

The application will start at **`http://localhost:3000`**. Open this URL in your web browser.

### 4. Build for production
```bash
npm run build
npm start
```

---

## 🚀 1-Click Deployment Options

If you or anyone else forks this repository and wants to host their own live demo:

### Option A: Render (Free Web Service)
1. Push this repository to your GitHub account.
2. Sign up or log in to [Render](https://render.com/).
3. Click **New +** -> **Web Service** -> Connect your GitHub repository.
4. Set the following settings:
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
5. Click **Create Web Service**. Your live URL will be ready in 2 minutes!

### Option B: Railway
1. Go to [Railway.app](https://railway.app/).
2. Click **New Project** -> **Deploy from GitHub repo**.
3. Railway will automatically detect Node.js and run `npm run build` and `npm start`.

### Option C: Docker Container
Build and run using the included `Dockerfile`:
```bash
docker build -t prepzone .
docker run -p 3000:3000 prepzone
```

---

## 🤝 Contributing & Feedback

Contributions, feedback, and feature requests are welcome!
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

<p align="center">
  Developed with ❤️ for students, educators, and campus placement aspirants.
</p>
