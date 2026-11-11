// Content taken from Shakil_Ur_Rehman_Full_Stack_Developer_Resume.pdf

export const summary =
  "Full Stack Developer building and deploying scalable web applications end-to-end with Next.js, React.js, TypeScript, Express.js, and PostgreSQL, from normalized RBAC schemas and REST APIs to interactive dashboards.";

export const openSource = [
  {
    project: "React",
    repo: "react/react",
    what: "Fixed transition events returning undefined fields; added regression tests",
    prs: [{ n: 37985, url: "https://github.com/react/react/pull/37985" }],
    color: "cobalt",
  },
  {
    project: "Next.js",
    repo: "vercel/next.js",
    what: "Fixed create-next-app skipping setup commands for template-based projects",
    prs: [{ n: 99769, url: "https://github.com/vercel/next.js/pull/99769" }],
    color: "marigold",
  },
  {
    project: "three.js",
    repo: "mrdoob/three.js",
    what: "Fixed USDZ export of off-center orthographic cameras (aperture, offset)",
    prs: [{ n: 35411, url: "https://github.com/mrdoob/three.js/pull/35411" }],
    color: "orchid",
  },
  {
    project: "Spring Boot",
    repo: "spring-projects/spring-boot",
    what: "Fixed a self-comparing test assertion and inverted runtime-hints arguments",
    prs: [
      { n: 52532, url: "https://github.com/spring-projects/spring-boot/pull/52532" },
      { n: 52618, url: "https://github.com/spring-projects/spring-boot/pull/52618" },
    ],
    color: "mint",
  },
  {
    project: "Bootstrap",
    repo: "twbs/bootstrap",
    what: "OTP input fixes (co-author)",
    prs: [{ n: 43252, url: "https://github.com/twbs/bootstrap/pull/43252" }],
    color: "orchid",
  },
  {
    project: "React Docs",
    repo: "reactjs/react.dev",
    what: "Relative links in localized docs",
    prs: [{ n: 8712, url: "https://github.com/reactjs/react.dev/pull/8712" }],
    color: "cobalt",
  },
];

export const experience = [
  {
    company: "Digilize Media",
    role: "Frontend Developer Intern",
    where: "New Delhi, India",
    when: "Nov 2025 – May 2026",
    color: "marigold",
    points: [
      "Developed and optimized 5+ responsive production web applications utilizing React.js, Next.js, and TypeScript, reducing average page load times by 25% via server-side rendering and asset optimization.",
      "Engineered 20+ high-fidelity, interactive UI components and complex 3D animations using Framer and Three.js, accelerating future development cycles by 30% through a reusable component architecture.",
    ],
  },
  {
    company: "Softpro India Computer Technologies Pvt. Ltd.",
    role: "Java Intern",
    where: "Remote",
    when: "Aug 2024 – Sep 2024",
    color: "cobalt",
    points: [
      "Developed Gyan Portal, a Spring Boot web app for assignment management, progress tracking, and student queries.",
      "Designed REST APIs for 500+ students and 50+ teachers; built during a 45-day industry training program.",
    ],
  },
];

export const education = {
  school: "Noida Institute of Engineering and Technology, Greater Noida",
  degree: "B.Tech in Computer Science and Engineering",
  when: "2021 – 2025",
  cgpa: "8.97",
};

export const certifications = [
  {
    name: "Databases and SQL for Data Science with Python (Honors)",
    by: "IBM, Coursera",
    year: "2023",
    url: "https://coursera.org/verify/SWULP6JT45JW",
  },
  {
    name: "Introduction to NoSQL Databases",
    by: "IBM, Coursera",
    year: "2023",
    url: "https://coursera.org/verify/F46XMHEM4ZFU",
  },
];

export const achievements = [
  { text: "1st prize, Debug-A-Palooza at Ebullience-24, NIET's annual technical fest", year: "2024" },
  { text: "580+ problems solved on LeetCode", url: "https://leetcode.com/u/shakilurehman/" },
  {
    text: "Completed Google Cloud Study Jam",
    year: "2023",
    url: "https://www.skills.google/public_profiles/711dd707-b43a-4026-b7e9-049fce439bbb",
  },
];

export const skills = [
  { group: "Languages", items: ["TypeScript", "JavaScript", "Java", "Python", "SQL"], color: "cobalt" },
  { group: "Frontend", items: ["React.js", "Next.js (App Router)", "Tailwind CSS", "TanStack Query", "Recharts", "Framer"], color: "marigold" },
  { group: "Backend", items: ["Node.js", "Express.js", "Next.js Route Handlers", "Spring Boot", "REST APIs"], color: "mint" },
  { group: "Databases & auth", items: ["PostgreSQL", "Prisma", "Drizzle ORM", "JWT", "Clerk", "Zod"], color: "orchid" },
  { group: "Tools", items: ["Git", "GitHub", "AWS", "Vercel"], color: "cobalt" },
];
