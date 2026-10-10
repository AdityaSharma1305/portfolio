# Aditya Sharma — Full-Stack Developer & Software Engineer

<div align="center">

![Aditya Sharma Portfolio Banner](https://img.shields.io/badge/ADITYA-THE%20SERIES-E50914?style=for-the-badge&logoColor=white)
![Build](https://img.shields.io/badge/BUILD-PASSING-10B981?style=for-the-badge)
![Tech](https://img.shields.io/badge/STACK-JAVA%20%7C%20SPRING%20BOOT%20%7C%20REACT-007ACC?style=for-the-badge)
![Location](https://img.shields.io/badge/LOCATION-GURUGRAM%2C%20INDIA-red?style=for-the-badge)

<p align="center">
  <b>A bespoke, high-performance cinematic developer portfolio engineered as an episodic streaming platform experience.</b>
</p>

[**Explore Live Experience**](https://portfolio-ten-amber-70.vercel.app/) • [**View GitHub Profile**](https://github.com/AdityaSharma1305) • [**Connect on LinkedIn**](https://www.linkedin.com/in/adityasharma1305/) • [**Download Resume**](https://github.com/AdityaSharma1305/portfolio/raw/main/public/resume.pdf)

</div>

---

## 🌟 Concept & Philosophy

Most developer portfolios follow identical grid templates. This project reimagines personal branding through a **cinematic streaming platform aesthetic** ("Aditya • The Series"):

- **Dynamic Narrative Structure**: Career milestones, technical mastery, and projects presented as sequential **Seasons & Episodes**.
- **Interactive Multi-Persona Routing**: A "Who's Watching?" profile selector that reshuffles the entire page order depending on whether the visitor is a Recruiter, Software Engineer, or System Architect.
- **Micro-Interactions & Sensory Polish**: Custom Web Audio API synthesizer chimes, contextual cursors, smooth inertia scrolling, and high-performance perspective parallax.

---

## ⚡ Key Highlights & Features

### 🎬 1. Cinematic Studio Intro Sequence
- Custom synthesized studio chord with harmonic resonance.
- Title sequence card typography reveal with letterboxing and ambient crimson glow.
- Quick `Skip Intro` and `Play` controls with sound state persistence.

### 🎭 2. "Who's Watching?" Multi-Persona Switcher
Visitors can dynamically adapt the portfolio layout to their interest:
- **Aditya (Default)**: Full episodic chronological storytelling.
- **Recruiter**: Instant focus on core achievements, certifications, experience, and quick resume access.
- **Developer**: Prioritizes deep-dive technical stacks, GitHub codebases, and architectural decisions.
- **Architect**: Highlights distributed patterns, database design, and end-to-end system design.

### 🚀 3. Interactive Hero Billboard
- Custom cut-out portrait with 3D mouse/touch perspective tracking (`rotateX`, `rotateY`).
- Floating glassmorphism credential pills: *Computer Science (AI)*, *5-Star Java Badge*, *350+ DSA Solved*.
- Fast-action buttons: `Play Intro` (story reel), `My Work`, and `Resume`.

### 📱 4. Full-Screen Story Highlight Reel (`PlayIntro`)
- Instagram/Netflix story-style reel featuring rapid career highlights.
- Keyboard accessible: `Space` (Pause/Resume), `Left/Right Arrows` (Navigate), `Escape` (Close).

### 🛠️ 5. Featured Productions ("Originals")
Deep-dive project showcase with custom artwork posters and comprehensive case study modals:
- **Bookify**: Comprehensive event booking system built with **Java**, **Spring Boot**, **MySQL**, **Spring Data JPA**, **Hibernate**, and **RESTful APIs**.
- **ClearCV Interview Prep**: AI-powered interview & resume preparation tool engineered with **React.js**, **Node.js**, **REST APIs**, and automated ATS scoring.
- **Social Analyzer**: Full-stack metrics aggregator with interactive data visualizations and user analytics.
- **Mala Jaap**: Minimalist mindfulness web utility built with state management and fluid animations.

### 📜 6. The Journey (5 Seasons of Evolution)
- **Season 1 — The Foundation**: Academic milestones & computer science fundamentals.
- **Season 2 — Engineering Mastery**: Java OOP, Spring Boot, Hibernate ORM, and database indexing.
- **Season 3 — Building Products**: Production applications deployed and validated with end users.
- **Season 4 — Problem Solving**: 350+ Data Structures & Algorithms challenges solved across LeetCode & HackerRank.
- **Season 5 — What's Next**: Scalable microservices, distributed architectures, and cloud-native computing.

### 🏆 7. Hall of Fame (Certifications & Badges)
- **5-Star Gold Badge in Java** (HackerRank)
- **Java (Basic) Certified** (HackerRank)
- **SQL (Basic) Certified** (HackerRank)
- **350+ Data Structures & Algorithms Problems Solved**

---

## 💻 Tech Stack & Architecture

### **Frontend & User Interface**
- **Framework**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 6](https://vitejs.dev/) (Sub-second HMR & optimized tree-shaking)
- **Styling**: [Tailwind CSS 3.4](https://tailwindcss.com/) with custom typography, fluid clamps, and cinema palette
- **Animations & Physics**: [Framer Motion](https://www.framer.com/motion/) (Scroll-driven transforms, layout transitions)
- **Smooth Inertia Scrolling**: [Lenis](https://lenis.darkroom.engineering/)
- **Icons**: [Lucide React](https://lucide.dev/) + Custom Brand SVGs
- **Sound Engine**: Custom Web Audio API synthesizer

### **Core Backend & Data Proficiency**
- **Languages**: Java 17/21, JavaScript (ES6+), TypeScript, SQL, HTML5, CSS3
- **Frameworks & Libraries**: Spring Boot, Spring Data JPA, Hibernate ORM, Node.js, Express.js
- **Databases & Tools**: MySQL, PostgreSQL, Git, GitHub, Postman, Vercel

---

## 📁 Repository Structure

```
├── public/
│   ├── images/              # Optimized multi-resolution WebP portraits & artwork
│   ├── resume.pdf           # Genuine downloadable resume document
│   └── favicon.svg          # Monogram brand icon
├── src/
│   ├── components/
│   │   ├── Opening.tsx      # Studio intro sequence with audio
│   │   ├── Profiles.tsx     # "Who's Watching?" dynamic profile switcher
│   │   ├── Navbar.tsx       # Streaming header with audio & resume controls
│   │   ├── PlayIntro.tsx    # Interactive story highlight reel
│   │   ├── ProjectModal.tsx # Technical case-study modal dialog
│   │   └── ResumeModal.tsx  # Interactive PDF & formatted document preview
│   ├── sections/
│   │   ├── Hero.tsx         # Parallax portrait billboard
│   │   ├── Ribbon.tsx       # Horizontal rail carousel
│   │   ├── Originals.tsx    # Featured projects grid
│   │   ├── Journey.tsx      # 5 Seasons episodic career timeline
│   │   ├── TopPicks.tsx     # Top 5 highlighted achievements
│   │   ├── SkillsMatrix.tsx # Categorized technical universe
│   │   ├── Achievements.tsx # Laurel wreath certification awards
│   │   ├── AboutMe.tsx      # Starring poster & bio statistics
│   │   └── Footer.tsx       # Direct line contact cards & quick actions
│   ├── data/
│   │   ├── profile.ts       # Central source of truth for portfolio info
│   │   ├── projects.ts      # Architectural specifications for projects
│   │   └── seasons.ts       # Episodic timeline episodes & milestones
│   └── utils/
│       ├── sound.ts         # Web Audio API procedural sound engine
│       └── smoothScroll.ts  # Smooth scrolling coordinator
└── tailwind.config.js       # Cinematic colors, fonts, and bespoke utilities
```

---

## 🛠️ Local Development

### Prerequisites
- **Node.js** (v18.0 or higher)
- **npm** or **pnpm** / **yarn**

### Quick Start

1. **Clone the repository:**
   ```bash
   git clone https://github.com/AdityaSharma1305/portfolio.git
   cd portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## 📬 Contact & Connect

- **Full Name**: Aditya Sharma
- **Current Location**: Gurugram, Haryana, India
- **Phone**: [+91 9675443277](tel:+919675443277)
- **Email**: [adityapersharma@gmail.com](mailto:adityapersharma@gmail.com)
- **LinkedIn**: [linkedin.com/in/adityasharma1305](https://www.linkedin.com/in/adityasharma1305/)
- **GitHub**: [github.com/AdityaSharma1305](https://github.com/AdityaSharma1305)

---

<div align="center">
  <sub>Designed &amp; Engineered by Aditya Sharma • © 2026 All Rights Reserved</sub>
</div>
