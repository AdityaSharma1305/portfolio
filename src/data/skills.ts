export interface Skill {
  name: string;
  mono: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  subtitle: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "backend",
    title: "Backend Development",
    subtitle: "Enterprise architecture, APIs & microservices",
    skills: [
      { name: "Java", mono: "Jv" },
      { name: "Spring Boot", mono: "Sb" },
      { name: "Spring MVC", mono: "Sm" },
      { name: "RESTful APIs", mono: "Ap" },
      { name: "Hibernate", mono: "Hb" },
      { name: "Spring Data JPA", mono: "Jp" },
      { name: "Node.js", mono: "No" },
      { name: "Microservices", mono: "Ms" }
    ]
  },
  {
    id: "languages",
    title: "Programming Languages",
    subtitle: "Core syntax, OOP & computational logic",
    skills: [
      { name: "Java", mono: "Jv" },
      { name: "JavaScript", mono: "Js" },
      { name: "C", mono: "C" },
      { name: "SQL", mono: "Sq" },
      { name: "HTML5", mono: "Ht" },
      { name: "CSS3", mono: "Cs" }
    ]
  },
  {
    id: "frontend",
    title: "Frontend Engineering",
    subtitle: "Reactive user interfaces & web performance",
    skills: [
      { name: "React.js", mono: "Re" },
      { name: "Next.js", mono: "Nx" },
      { name: "JavaScript", mono: "Js" },
      { name: "HTML5", mono: "H5" },
      { name: "CSS3", mono: "C3" },
      { name: "Tailwind CSS", mono: "Tw" },
      { name: "Responsive UI", mono: "Rs" }
    ]
  },
  {
    id: "database",
    title: "Database & ORM",
    subtitle: "Data persistence, ACID transactions & schemas",
    skills: [
      { name: "MySQL", mono: "My" },
      { name: "SQL", mono: "Sq" },
      { name: "DBMS", mono: "Db" },
      { name: "Hibernate", mono: "Hb" },
      { name: "Spring Data JPA", mono: "Jp" },
      { name: "Database Integration", mono: "Di" }
    ]
  },
  {
    id: "tools",
    title: "Tools, Testing & Core CS",
    subtitle: "API contracts, debugging & engineering standards",
    skills: [
      { name: "Postman", mono: "Pm" },
      { name: "Git", mono: "Gt" },
      { name: "GitHub", mono: "Gh" },
      { name: "OOP Principles", mono: "Op" },
      { name: "Data Structures", mono: "Ds" },
      { name: "Operating Systems", mono: "Os" },
      { name: "Computer Networks", mono: "Cn" },
      { name: "Exception Handling", mono: "Eh" }
    ]
  }
];

// Map skills to projects where they are demonstrated
export const skillToProjects: Record<string, string[]> = {
  "Java": ["Bookify"],
  "Spring Boot": ["Bookify"],
  "Spring MVC": ["Bookify"],
  "RESTful APIs": ["Bookify", "ClearCV Interview Prep", "Social Analyzer"],
  "MySQL": ["Bookify"],
  "Hibernate": ["Bookify"],
  "Spring Data JPA": ["Bookify"],
  "React.js": ["ClearCV Interview Prep", "Social Analyzer", "Mala Jaap"],
  "Node.js": ["ClearCV Interview Prep", "Social Analyzer"],
  "JavaScript": ["ClearCV Interview Prep", "Social Analyzer", "Mala Jaap"],
  "Postman": ["Bookify"],
  "Tailwind CSS": ["ClearCV Interview Prep", "Social Analyzer"],
  "OOP Principles": ["Bookify"],
  "Exception Handling": ["Bookify", "ClearCV Interview Prep"]
};
