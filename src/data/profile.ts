export interface ProfileInfo {
  fullName: string;
  displayName: string;
  firstName: string;
  seriesTag: string;
  originalLabel: string;
  role: string;
  tagline: string[];
  intro: string;
  email: string;
  phone: string;
  links: {
    linkedin: string;
    github: string;
    leetcode?: string;
    hackerrank?: string;
  };
  resumePdf: string;
  portrait: {
    src: string;
    srcSet: string;
    alt: string;
  };
  interests: string[];
}

export const profile: ProfileInfo = {
  fullName: "Aditya Sharma",
  displayName: "Aditya Sharma",
  firstName: "ADITYA",
  seriesTag: "THE SERIES",
  originalLabel: "A SHARMA ORIGINAL",
  role: "Full-Stack Developer",
  tagline: [
    "Full-Stack Developer",
    "Java & Spring Boot Specialist",
    "Problem Solver (350+ DSA)"
  ],
  intro:
    "Computer Science (AI) graduate with hands-on experience in Java, Spring Boot, RESTful APIs, React.js, SQL, and Object-Oriented Programming. Skilled in developing scalable full-stack applications, integrating frontend and backend components, and building database-driven solutions using Hibernate and Spring Data JPA. Strong foundation in application debugging, reusable components, and maintainable code, with 350+ coding problems solved.",
  email: "adityapersharma@gmail.com",
  phone: "+91 9675443277",
  links: {
    linkedin: "https://www.linkedin.com/in/adityasharma1305/",
    github: "https://github.com/AdityaSharma1305",
  },
  resumePdf: "/resume.pdf",
  portrait: {
    src: "/assets/portrait-720.webp",
    srcSet: "/assets/portrait-420.webp 420w, /assets/portrait-720.webp 720w, /assets/portrait-1100.webp 1100w",
    alt: "Portrait of Aditya Sharma"
  },
  interests: [
    "Backend Architecture",
    "Spring Boot & Microservices",
    "Competitive Programming",
    "Distributed Systems"
  ]
};

export interface EducationItem {
  school: string;
  place: string;
  degree: string;
  period: string;
  score: string;
}

export const educationList: EducationItem[] = [
  {
    school: "Dr. APJ Abdul Kalam Technical University",
    place: "Kanpur, Uttar Pradesh, India",
    degree: "Bachelor of Technology in Computer Science (AI)",
    period: "2022 – 2026",
    score: "Undergraduate (B.Tech CS-AI)"
  },
  {
    school: "Mother Teresa Higher Secondary School",
    place: "Kanpur, Uttar Pradesh, India",
    degree: "Higher Secondary (Class XII)",
    period: "2022",
    score: "77.75%"
  },
  {
    school: "Mother Teresa Higher Secondary School",
    place: "Kanpur, Uttar Pradesh, India",
    degree: "Secondary Education (Class X)",
    period: "2020",
    score: "83.2%"
  }
];

export interface AchievementItem {
  id: string;
  title: string;
  org: string;
  detail: string;
  laurel: string;
}

export const achievementsList: AchievementItem[] = [
  {
    id: "hackerrank-java-badge",
    title: "5-Star Java Badge",
    org: "HackerRank",
    detail: "Earned 5-Star Gold Badge on HackerRank for high proficiency in Java core concepts, OOP, and data structures.",
    laurel: "5-STAR"
  },
  {
    id: "hackerrank-cert-java",
    title: "Java (Basic) Certificate",
    org: "HackerRank",
    detail: "Certified in Java fundamentals, object-oriented principles, exception handling, and algorithm implementation.",
    laurel: "CERTIFIED"
  },
  {
    id: "hackerrank-cert-sql",
    title: "SQL (Basic) Certificate",
    org: "HackerRank",
    detail: "Certified in relational database querying, joins, aggregations, filtering, and subqueries.",
    laurel: "SQL PRO"
  },
  {
    id: "leetcode-350",
    title: "350+ Coding Problems Solved",
    org: "LeetCode & HackerRank",
    detail: "Demonstrated strong algorithmic thinking, optimization techniques, and data structure mastery across 350+ problems.",
    laurel: "350+ SOLVED"
  }
];

export interface PersonaProfile {
  id: string;
  name: string;
  blurb: string;
  color: string;
  order: string[];
}

export const personaProfiles: PersonaProfile[] = [
  {
    id: "aditya",
    name: "Aditya",
    blurb: "The full series, in order",
    color: "#ff3d5a",
    order: ["about", "journey", "originals", "picks", "skills", "moments"]
  },
  {
    id: "recruiter",
    name: "Recruiter",
    blurb: "Education, skills & achievements first",
    color: "#4cc9ff",
    order: ["journey", "moments", "skills", "originals", "about", "picks"]
  },
  {
    id: "developer",
    name: "Developer",
    blurb: "Projects, architecture & tech stack first",
    color: "#46e3a8",
    order: ["originals", "skills", "journey", "moments", "about", "picks"]
  },
  {
    id: "creative",
    name: "Architect",
    blurb: "System highlights & design patterns first",
    color: "#ffb547",
    order: ["picks", "originals", "journey", "skills", "moments", "about"]
  }
];
