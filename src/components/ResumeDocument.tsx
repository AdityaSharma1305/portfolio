import React from "react";
import { profile, educationList, achievementsList } from "../data/profile";
import { projects } from "../data/projects";
import { skillCategories } from "../data/skills";
import { Mail, Phone, GraduationCap, Award, Briefcase, Code } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";

export const ResumeDocument: React.FC = () => {
  return (
    <div className="bg-white text-zinc-900 rounded-xl p-6 sm:p-10 shadow-2xl font-sans max-w-4xl mx-auto selection:bg-red-500 selection:text-white">
      {/* Header */}
      <header className="border-b border-zinc-200 pb-5 text-center sm:text-left">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 uppercase">
          {profile.fullName}
        </h1>
        <p className="text-sm font-semibold text-zinc-600 mt-1 uppercase tracking-wider">
          {profile.role} • CS (Artificial Intelligence) Graduate
        </p>

        <div className="mt-3 flex flex-wrap justify-center sm:justify-start items-center gap-x-4 gap-y-1.5 text-xs text-zinc-700">
          <a
            href={`mailto:${profile.email}`}
            className="flex items-center gap-1.5 hover:text-red-600 transition"
          >
            <Mail className="h-3.5 w-3.5 text-red-600" />
            {profile.email}
          </a>
          <span>•</span>
          <a
            href={`tel:${profile.phone}`}
            className="flex items-center gap-1.5 hover:text-red-600 transition"
          >
            <Phone className="h-3.5 w-3.5 text-red-600" />
            {profile.phone}
          </a>
          <span>•</span>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 hover:text-red-600 transition"
          >
            <LinkedinIcon className="h-3.5 w-3.5 text-blue-600" />
            linkedin.com/in/adityasharma1305
          </a>
          <span>•</span>
          <a
            href={profile.links.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 hover:text-red-600 transition"
          >
            <GithubIcon className="h-3.5 w-3.5 text-zinc-800" />
            github.com/AdityaSharma1305
          </a>
        </div>
      </header>

      {/* Professional Summary */}
      <section className="mt-5">
        <h2 className="text-xs font-bold tracking-widest text-zinc-900 uppercase border-b-2 border-zinc-900 pb-1 mb-2">
          Professional Summary
        </h2>
        <p className="text-xs leading-relaxed text-zinc-800 text-justify">
          Computer Science (AI) graduate with hands-on experience in <strong>Java</strong>, <strong>Spring Boot</strong>, <strong>RESTful APIs</strong>, <strong>React.js</strong>, <strong>SQL</strong>, and <strong>Object-Oriented Programming</strong>. Skilled in developing full-stack applications, integrating frontend and backend components, and building database-driven solutions using <strong>Hibernate</strong> and <strong>Spring Data JPA</strong>. Strong foundation in application debugging, reusable components, and maintainable code, with <strong>350+ coding problems solved</strong>.
        </p>
      </section>

      {/* Technical Skills */}
      <section className="mt-5">
        <h2 className="text-xs font-bold tracking-widest text-zinc-900 uppercase border-b-2 border-zinc-900 pb-1 mb-2 flex items-center gap-1.5">
          <Code className="h-3.5 w-3.5" /> Technical Skills
        </h2>
        <div className="space-y-1 text-xs text-zinc-800">
          <div>
            <strong className="text-zinc-950 font-semibold">Programming Languages:</strong> Java, JavaScript, C
          </div>
          <div>
            <strong className="text-zinc-950 font-semibold">Backend Development:</strong> Java, Spring Boot, Spring MVC, RESTful APIs, Microservices, Node.js, API Integration, MVC Architecture, CRUD Operations
          </div>
          <div>
            <strong className="text-zinc-950 font-semibold">Frontend Development:</strong> React.js, Next.js, JavaScript, HTML5, CSS3, Responsive UI Development, Reusable Components
          </div>
          <div>
            <strong className="text-zinc-950 font-semibold">Database &amp; ORM:</strong> MySQL, SQL, DBMS, Hibernate, Spring Data JPA, Database Integration
          </div>
          <div>
            <strong className="text-zinc-950 font-semibold">Tools &amp; API Development:</strong> Postman, Git, GitHub, REST API Validation, Debugging, Exception Handling
          </div>
          <div>
            <strong className="text-zinc-950 font-semibold">Software Engineering:</strong> Object-Oriented Programming, Data Structures, SDLC, Code Maintainability, Application Validation
          </div>
          <div>
            <strong className="text-zinc-950 font-semibold">Core CS:</strong> Operating Systems, Computer Networks, Database Management Systems
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="mt-5">
        <h2 className="text-xs font-bold tracking-widest text-zinc-900 uppercase border-b-2 border-zinc-900 pb-1 mb-2 flex items-center gap-1.5">
          <GraduationCap className="h-3.5 w-3.5" /> Education
        </h2>
        <div className="space-y-2 text-xs">
          {educationList.map((edu, idx) => (
            <div key={idx} className="flex justify-between items-start">
              <div>
                <p className="font-bold text-zinc-950">{edu.school}</p>
                <p className="text-zinc-700">{edu.degree}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="font-semibold text-zinc-900">{edu.period}</p>
                <p className="text-zinc-600">{edu.place.split(",")[0]}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="mt-5">
        <h2 className="text-xs font-bold tracking-widest text-zinc-900 uppercase border-b-2 border-zinc-900 pb-1 mb-2 flex items-center gap-1.5">
          <Briefcase className="h-3.5 w-3.5" /> Selected Projects
        </h2>
        <div className="space-y-4 text-xs">
          {projects.slice(0, 2).map((proj) => (
            <div key={proj.id}>
              <div className="flex justify-between items-baseline">
                <p className="font-bold text-zinc-950">
                  {proj.title}{" "}
                  <span className="font-normal text-zinc-600 italic">
                    | {proj.stack.slice(0, 5).join(", ")}
                  </span>
                </p>
                <a
                  href={proj.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-red-700 font-semibold hover:underline"
                >
                  GitHub
                </a>
              </div>
              <ul className="list-disc list-outside ml-4 mt-1 space-y-1 text-zinc-700 text-justify">
                {proj.build.slice(0, 4).map((point, pIdx) => (
                  <li key={pIdx}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications & Achievements */}
      <section className="mt-5">
        <h2 className="text-xs font-bold tracking-widest text-zinc-900 uppercase border-b-2 border-zinc-900 pb-1 mb-2 flex items-center gap-1.5">
          <Award className="h-3.5 w-3.5" /> Certifications &amp; Achievements
        </h2>
        <ul className="list-disc list-outside ml-4 text-xs space-y-1 text-zinc-800">
          <li>
            <strong>HackerRank Java Certificate</strong> and <strong>HackerRank SQL (Basic) Certificate</strong>.
          </li>
          <li>
            Achieved a <strong>5-Star Java Badge</strong> on HackerRank.
          </li>
          <li>
            Solved <strong>350+ coding problems</strong> on LeetCode and HackerRank, demonstrating strong programming, algorithmic thinking, and problem-solving skills.
          </li>
        </ul>
      </section>

      {/* Additional Information */}
      <section className="mt-5 border-t border-zinc-200 pt-3 text-xs text-zinc-700">
        <p>
          <strong>Languages:</strong> English, Hindi &nbsp;|&nbsp; <strong>Interests:</strong> Competitive Programming, Cricket, Music
        </p>
      </section>
    </div>
  );
};
