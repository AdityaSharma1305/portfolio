import { Palette, palettes } from "./projects";

export interface Episode {
  code: string;
  title: string;
  description: string;
  tags: string[];
  runtime: string;
  palette: Palette;
}

export interface Season {
  number: number;
  title: string;
  period: string;
  synopsis: string;
  episodes: Episode[];
}

export const seasons: Season[] = [
  {
    number: 1,
    title: "The Foundation",
    period: "2022 – 2026",
    synopsis: "Undergraduate degree in Computer Science & Artificial Intelligence at Dr. APJ Abdul Kalam Technical University.",
    episodes: [
      {
        code: "S01 E01",
        title: "The B.Tech in CS (AI)",
        description: "Bachelor of Technology in Computer Science (Artificial Intelligence) at Dr. APJ Abdul Kalam Technical University, Kanpur. Rigorous study in Algorithms, Data Structures, DBMS, and OS.",
        tags: ["B.Tech CS(AI)", "AKTU", "Undergraduate"],
        runtime: "2022 – 2026",
        palette: palettes.amber
      },
      {
        code: "S01 E02",
        title: "Higher Secondary Excellence",
        description: "Completed Higher Secondary Education (Class XII) with 77.75% aggregate at Mother Teresa Higher Secondary School, Kanpur.",
        tags: ["Class XII", "77.75%", "Science"],
        runtime: "2022",
        palette: palettes.cyan
      },
      {
        code: "S01 E03",
        title: "Secondary School Foundation",
        description: "Completed Secondary School Education (Class X) with 83.2% aggregate at Mother Teresa Higher Secondary School, Kanpur.",
        tags: ["Class X", "83.2%", "Foundation"],
        runtime: "2020",
        palette: palettes.purple
      }
    ]
  },
  {
    number: 2,
    title: "Engineering Mastery",
    period: "Core Expertise",
    synopsis: "Mastering Java enterprise development, Spring Boot, REST APIs, and relational databases.",
    episodes: [
      {
        code: "S02 E01",
        title: "Java & Object-Oriented Design",
        description: "Architecting modular, maintainable code using core Java, design patterns, encapsulation, and clean class hierarchies.",
        tags: ["Java", "OOP", "Clean Code"],
        runtime: "Core Strength",
        palette: palettes.crimson
      },
      {
        code: "S02 E02",
        title: "Spring Boot & RESTful APIs",
        description: "Developing robust microservices and MVC backends with Spring MVC, request validation, and centralized exception handling.",
        tags: ["Spring Boot", "REST APIs", "MVC"],
        runtime: "Framework",
        palette: palettes.emerald
      },
      {
        code: "S02 E03",
        title: "Persistence with Hibernate & JPA",
        description: "Seamless object-relational mapping, transactional integrity, and database operations with Spring Data JPA and MySQL.",
        tags: ["Hibernate", "Spring Data JPA", "MySQL"],
        runtime: "Database",
        palette: palettes.purple
      }
    ]
  },
  {
    number: 3,
    title: "Building Products",
    period: "Originals",
    synopsis: "Developing full-stack applications from enterprise book management to AI resume evaluation.",
    episodes: [
      {
        code: "S03 E01",
        title: "Bookify Backend Architecture",
        description: "Database-driven book management application built on Java and Spring Boot with complete CRUD REST APIs, tested via Postman.",
        tags: ["Spring Boot", "MySQL", "JPA", "Postman"],
        runtime: "Flagship Project",
        palette: palettes.crimson
      },
      {
        code: "S03 E02",
        title: "ClearCV Interview Prep",
        description: "Full-stack resume evaluation and ATS matching platform built with React.js, Node.js, and automated feedback workflows.",
        tags: ["React.js", "Node.js", "ATS Engine"],
        runtime: "Full-Stack Project",
        palette: palettes.amber
      },
      {
        code: "S03 E03",
        title: "Social Analyzer & Digital Tools",
        description: "Content metrics intelligence and interactive utilities developed with responsive React component architectures.",
        tags: ["React", "Analytics", "Utilities"],
        runtime: "Web Utility",
        palette: palettes.emerald
      }
    ]
  },
  {
    number: 4,
    title: "Problem Solving & Recognition",
    period: "Continuous Practice",
    synopsis: "Demonstrated algorithmic competence with 350+ solved challenges and competitive platform badges.",
    episodes: [
      {
        code: "S04 E01",
        title: "350+ Algorithmic Milestones",
        description: "Solved 350+ coding problems across LeetCode and HackerRank, focusing on optimization, recursion, dynamic programming, and data structures.",
        tags: ["LeetCode", "HackerRank", "350+ Problems"],
        runtime: "350+ Solved",
        palette: palettes.cyan
      },
      {
        code: "S04 E02",
        title: "5-Star Java Badge",
        description: "Achieved the prestigious 5-Star Gold Java Badge on HackerRank for top-tier problem solving in core language features.",
        tags: ["HackerRank", "5-Star", "Java Gold"],
        runtime: "Achievement",
        palette: palettes.amber
      },
      {
        code: "S04 E03",
        title: "Certified Professional Skills",
        description: "Earned official HackerRank certifications in both Java and SQL (Basic), validating standard database querying and coding proficiency.",
        tags: ["Java Certificate", "SQL Certificate", "HackerRank"],
        runtime: "Certified",
        palette: palettes.emerald
      }
    ]
  },
  {
    number: 5,
    title: "What's Next",
    period: "In Production",
    synopsis: "Expanding into high-concurrency microservices, cloud deployments, and production distributed systems.",
    episodes: [
      {
        code: "S05 E01",
        title: "The Next Architecture",
        description: "Deepening expertise in distributed system scaling, Docker containerization, AWS cloud deployments, and AI microservices.",
        tags: ["Microservices", "Cloud", "Distributed Systems"],
        runtime: "Active Exploration",
        palette: palettes.purple
      }
    ]
  }
];
