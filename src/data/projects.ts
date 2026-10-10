export interface Palette {
  from: string;
  via: string;
  to: string;
  accent: string;
}

export interface Metric {
  value: string;
  label: string;
}

export interface Project {
  id: string;
  title: string;
  year: string;
  genre: string;
  logline: string;
  stack: string[];
  build: string[];
  features: string[];
  metrics: Metric[];
  github: string;
  demo?: string;
  palette: Palette;
  motif: "flow" | "shield" | "tenants" | "soundtrack";
}

export const palettes: Record<string, Palette> = {
  purple: { from: "#120822", via: "#3d1a6e", to: "#07060c", accent: "#b98bff" },
  crimson: { from: "#24060b", via: "#6e0d1d", to: "#09070a", accent: "#ff3d5a" },
  amber: { from: "#1c1003", via: "#6b3c06", to: "#0a0806", accent: "#ffb547" },
  cyan: { from: "#04121f", via: "#0f4c6e", to: "#05080d", accent: "#4cc9ff" },
  emerald: { from: "#03150f", via: "#0d5a40", to: "#050a08", accent: "#46e3a8" }
};

export const projects: Project[] = [
  {
    id: "bookify",
    title: "Bookify",
    year: "2025",
    genre: "Backend Architecture • Spring Boot • MySQL",
    logline: "A robust database-driven book management platform using Java, Spring Boot REST APIs, Hibernate ORM, and MVC architecture for reliable inventory workflows.",
    stack: [
      "Java",
      "Spring Boot",
      "Spring MVC",
      "MySQL",
      "Hibernate",
      "Spring Data JPA",
      "Postman",
      "REST APIs"
    ],
    build: [
      "Developed a database-driven book management application using Java and Spring Boot, implementing RESTful APIs and CRUD operations.",
      "Designed REST API endpoints for Create, Read, Update, and Delete operations, enabling seamless communication between application components.",
      "Integrated MySQL, Spring Data JPA, and Hibernate for database connectivity, object-relational mapping, data persistence, and retrieval.",
      "Applied OOP principles and MVC architecture to organize backend logic into modular, reusable, and maintainable application components.",
      "Implemented request validation and exception handling to manage invalid inputs, application errors, and unexpected API responses.",
      "Validated REST API functionality using Postman, verifying HTTP status codes, request parameters, response data, and error handling.",
      "Debugged application issues and verified database operations to maintain data consistency and reliable communication between application and database layers."
    ],
    features: [
      "Complete CRUD RESTful API endpoints for catalog items",
      "Robust ORM persistence with Hibernate and Spring Data JPA",
      "Global exception handling and structured error payloads",
      "Layered MVC architecture (Controller, Service, Repository)",
      "Strict input validation with Spring Boot validation annotations",
      "Automated test verification using Postman collections"
    ],
    metrics: [
      { value: "REST", label: "Architecture" },
      { value: "100%", label: "Postman Verified" },
      { value: "JPA", label: "ORM Mapping" },
      { value: "MVC", label: "Design Pattern" },
      { value: "MySQL", label: "ACID Database" }
    ],
    github: "https://github.com/AdityaSharma1305/Bookify-v2",
    palette: palettes.crimson,
    motif: "flow"
  },
  {
    id: "clearcv",
    title: "ClearCV Interview Prep",
    year: "2025",
    genre: "Full-Stack • Career Tech • ATS Engine",
    logline: "A full-stack resume evaluation platform automating resume analysis, keyword-to-job matching, and structured candidate improvement feedback.",
    stack: [
      "React.js",
      "Node.js",
      "JavaScript",
      "Express.js",
      "REST APIs",
      "HTML5 / CSS3",
      "Tailwind CSS"
    ],
    build: [
      "Developed a full-stack resume analysis platform using React.js, Node.js, and JavaScript to automate resume evaluation, keyword matching, and feedback generation.",
      "Built interactive and reusable React.js UI components for resume uploads, keyword-based analysis, structured results, and user-facing feedback.",
      "Developed backend workflows using Node.js for resume parsing, data processing, keyword matching, and automated recommendation generation.",
      "Integrated frontend and backend functionality through application APIs to enable data exchange, resume processing, and structured result generation.",
      "Implemented resume analysis and keyword-matching functionalities to evaluate resume content against job requirements and generate relevant feedback.",
      "Debugged application issues, handled varied user inputs, and validated frontend-backend interactions to maintain data consistency across workflows."
    ],
    features: [
      "Automated ATS score calculation and keyword gap breakdown",
      "Interactive file upload interface with real-time feedback states",
      "Node.js server pipeline parsing resume documents into structured tokens",
      "Contextual recommendations highlighting missing skills and phrasing",
      "Responsive React UI with smooth component transitions and feedback metrics"
    ],
    metrics: [
      { value: "ATS", label: "Scoring Engine" },
      { value: "React", label: "Component Library" },
      { value: "Node.js", label: "Backend API" },
      { value: "Fast", label: "Processing Pipeline" },
      { value: "Modular", label: "Code Architecture" }
    ],
    github: "https://github.com/AdityaSharma1305/ClearCV",
    palette: palettes.amber,
    motif: "shield"
  },
  {
    id: "social-analyzer",
    title: "Social Analyzer",
    year: "2025",
    genre: "Full-Stack • Data Insights • Analytics",
    logline: "Comprehensive analytics and metrics dashboard analyzing engagement trends, distribution patterns, and content velocity.",
    stack: ["React.js", "Node.js", "JavaScript", "REST APIs", "Tailwind CSS"],
    build: [
      "Engineered an interactive analytics interface visualizing cross-platform engagement metrics.",
      "Created backend aggregation routines in Node.js for calculating growth rates and post interactions.",
      "Implemented modular charts and data filtering views to inspect real-time metrics."
    ],
    features: [
      "Interactive engagement charts and metric cards",
      "Audience growth velocity analysis",
      "Responsive layout optimized for mobile and desktop screens"
    ],
    metrics: [
      { value: "Full-Stack", label: "Implementation" },
      { value: "Analytics", label: "Engine" },
      { value: "Modern", label: "Component UI" }
    ],
    github: "https://github.com/AdityaSharma1305/social-analyzer",
    palette: palettes.emerald,
    motif: "tenants"
  },
  {
    id: "mala-jaap",
    title: "Mala Jaap",
    year: "2024",
    genre: "Frontend • Digital Utility • Interactive",
    logline: "An interactive digital mindfulness web app replicating traditional 108-bead japa with physics animations, sound feedback, and offline cycle tracking.",
    stack: ["React", "JavaScript", "Web Audio API", "LocalStorage", "CSS3 Animations"],
    build: [
      "Implemented a virtual 108-bead counter with fluid interactive feedback.",
      "Connected browser Web Audio synthesizer to generate acoustic feedback per count.",
      "Persisted daily completion records and total bead counts locally in the browser."
    ],
    features: [
      "Tactile 108-bead digital counting mechanism",
      "Acoustic feedback using native Web Audio API",
      "Offline persistence with zero external backend dependencies"
    ],
    metrics: [
      { value: "108", label: "Mala Cycles" },
      { value: "Audio", label: "Feedback API" },
      { value: "Offline", label: "First Architecture" }
    ],
    github: "https://github.com/AdityaSharma1305/mala-jaap",
    palette: palettes.cyan,
    motif: "soundtrack"
  }
];

export const editorialPicks = [
  {
    label: "Main Focus",
    title: "Full-Stack Developer",
    detail: "Java, Spring Boot, React.js & SQL",
    palette: palettes.purple
  },
  {
    label: "Enterprise Backend",
    title: "Bookify",
    detail: "Spring Boot • MySQL • Hibernate • REST",
    palette: palettes.crimson
  },
  {
    label: "Career Tech Platform",
    title: "ClearCV Interview Prep",
    detail: "React.js • Node.js • ATS Engine",
    palette: palettes.amber
  },
  {
    label: "Core Competency",
    title: "Problem Solving",
    detail: "350+ LeetCode & HackerRank Solved",
    palette: palettes.cyan
  },
  {
    label: "Recognition",
    title: "5-Star Java Badge",
    detail: "HackerRank Gold Certified",
    palette: palettes.emerald
  }
];

export const storyReelItems = [
  {
    kicker: "Education",
    title: "B.Tech CS(AI)",
    lines: [
      "Dr. APJ Abdul Kalam Technical University (2022–2026)",
      "Bachelor of Technology in Computer Science (Artificial Intelligence)"
    ],
    chips: ["Java", "Data Structures", "Algorithms", "AI & ML Foundations", "DBMS", "OS"]
  },
  {
    kicker: "Backend Expertise",
    title: "Spring Boot",
    lines: [
      "Production-ready RESTful APIs, Spring MVC, and Hibernate ORM",
      "Database persistence with MySQL and Spring Data JPA"
    ],
    chips: ["Spring Boot", "Spring MVC", "Hibernate", "Spring Data JPA", "MySQL", "Postman"]
  },
  {
    kicker: "Frontend & Full-Stack",
    title: "React & Next.js",
    lines: [
      "Responsive, reusable component architectures and modern UI development",
      "API integrations with Node.js and Express servers"
    ],
    chips: ["React.js", "Next.js", "JavaScript", "HTML5", "CSS3", "Node.js", "REST APIs"]
  },
  {
    kicker: "Flagship Project",
    title: "Bookify",
    lines: [
      "Database-driven book management application with Spring Boot",
      "Full CRUD operations, modular MVC design, and request validation"
    ],
    chips: ["Spring Boot", "MySQL", "JPA", "Postman Tested", "MVC"]
  },
  {
    kicker: "Career Tech Project",
    title: "ClearCV",
    lines: [
      "Automated resume parsing, keyword matching, and candidate feedback",
      "Full-stack React & Node.js application for job readiness"
    ],
    chips: ["React.js", "Node.js", "ATS Evaluation", "Keyword Matching"]
  },
  {
    kicker: "Coding Milestone",
    title: "350+ Solved",
    lines: [
      "Solved 350+ coding problems on LeetCode and HackerRank",
      "5-Star Java Badge and HackerRank Java & SQL Certified"
    ],
    chips: ["LeetCode", "HackerRank 5-Star", "Java Certified", "SQL Certified"]
  }
];
