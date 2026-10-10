# Aditya Sharma — Pixel-Precise Cinematic Developer Portfolio

A modern, production-grade personal developer portfolio for **Aditya Sharma** recreating the cinematic, streaming-platform experience ("The Series") of [portfolio-two-omega-fy8murbx0e.vercel.app](https://portfolio-two-omega-fy8murbx0e.vercel.app/).

---

## 🎬 Core Features & Experiences

1. **Netflix-Style Cinematic Opening Sequence ("TUDUM"):**
   - Letterbox animated title cards, sound synthesis, typography reveal, and studio badge (`A SHARMA ORIGINAL`).
   - "▶ PLAY" and "SKIP INTRO" actions.

2. **"Who's Watching?" Streaming Profile Switcher:**
   - Multi-persona selector that **dynamically reorders** the portfolio sections:
     - **Aditya:** The full chronological series.
     - **Recruiter:** Experience, achievements & technical skills prioritized first.
     - **Developer:** Projects, GitHub links & architecture stack prioritized first.
     - **Architect:** System highlights & design patterns prioritized first.

3. **Hero Billboard Section:**
   - Full-bleed portrait cutout with 3D mouse-tracking perspective parallax (`rotateX`, `rotateY`).
   - Massive `Bebas Neue` typography ("ADITYA • THE SERIES").
   - Action controls: `▶ Play Intro` (interactive highlight reel), `＋ My Work` (scrolls to projects), and `Resume`.
   - Floating glass stat badges (`B.Tech CS(AI)`, `5-Star Java Badge`, `350+ DSA Solved`).

4. **Full-Screen Interactive Story Reel (`PlayIntro`):**
   - Instagram/Netflix story highlight reel with top progress bars and keyboard controls (`Space` to pause/resume, `Arrow Left/Right` to navigate, `Esc` to close).

5. **"Continue Exploring" Ribbon Rail:**
   - Horizontal rail with episode watermark numbers, palette gradients, and progress indicators.

6. **Featured Productions ("Originals"):**
   - Verified real-world projects from GitHub:
     - **Bookify:** Java, Spring Boot, MySQL, REST APIs, Hibernate, JPA, Postman.
     - **ClearCV Interview Prep:** React.js, Node.js, JavaScript, REST APIs, ATS evaluation.
     - **Social Analyzer:** React, Node.js, data analytics.
     - **Mala Jaap:** Interactive React mindfulness utility.
   - Comprehensive **ProjectModal** case study dialog with impact metrics, architectural contributions, tech stack, and key features.

7. **"The Journey" (Seasons & Episodes):**
   - Season 1: The Foundation (AKTU B.Tech CS-AI & academic milestones).
   - Season 2: Engineering Mastery (Java OOP, Spring Boot, Hibernate ORM).
   - Season 3: Building Products (Bookify, ClearCV, Social Analyzer).
   - Season 4: Problem Solving & Recognitions (350+ LeetCode/HackerRank, 5-Star Java).
   - Season 5: What's Next (Microservices & Scalable Systems).

8. **"My Skill Universe" (Technical Matrix):**
   - Categorized: Backend Development, Programming Languages, Frontend Engineering, Database & ORM, Tools & Core CS.
   - Interactive skill cards with monospace badges and cross-referenced project linkages.

9. **"Hall of Fame" (Achievements & Awards):**
   - Prestigious golden laurel wreath awards: 5-Star Java Badge, HackerRank Java & SQL Certified, 350+ Problems Solved.

10. **"The Full Story" (Interactive Resume & PDF):**
    - High-fidelity formatted document view + integrated PDF download (`public/resume.pdf`).

11. **Cinematic Sound & Polish:**
    - Web Audio API synthesizer for the TUDUM chord, clicks, whooshes, and sound mute/unmute toggle.
    - Custom contextual cursor (`play`, `view`, `link`, `close`).
    - Film grain overlay (`.grain`) and Lenis smooth scrolling.

---

## 🚀 Running Locally

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Verify production build
npm run build
```

---

## 🌐 Deploy to Vercel

```bash
# Login to Vercel CLI
vercel login

# Deploy production build
vercel --prod
```
Or push this repository to GitHub and connect it to your Vercel dashboard.
