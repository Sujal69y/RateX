export type PriceModel = "free" | "paid" | "subscription";
export type Difficulty = "Beginner" | "Intermediate" | "Advanced";
export type OutcomeTag =
  | "led-to-job"
  | "good-for-beginners"
  | "career-switch"
  | "portfolio-strong";

export type Course = {
  slug: string;
  title: string;
  provider: "Coursera" | "Udemy" | "edX" | "freeCodeCamp" | "YouTube" | "Udacity";
  category: "IT" | "Data Science" | "Design" | "Business" | "Programming";
  subcategory: string;
  priceModel: PriceModel;
  priceLabel: string;
  difficulty: Difficulty;
  durationHours: number;
  certificateType: string;
  certificate: boolean;
  rating: number;
  reviewCount: number;
  trendingScore: number;
  lastUpdated: string;
  outcomeTags: OutcomeTag[];
  thumbnailGradient: string;
  skills: string[];
  prerequisites: string[];
  description: string;
};

export type Review = {
  user: string;
  reputation: number;
  experience: "Entry-level" | "Career switcher" | "Experienced";
  overall: number;
  outcome: "Got Job" | "Got Internship" | "Promotion" | "No Impact" | "Still Learning";
  completionStatus: "completed" | "in-progress" | "dropped" | "planning";
  timeSpentHours: number;
  date: string;
  text: string;
  dimensions: {
    contentQuality: number;
    practicality: number;
    difficulty: number;
    jobRelevance: number;
    instructorQuality: number;
    valueForTime: number;
    valueForMoney: number;
  };
};

export const courses: Course[] = [
  {
    slug: "google-it-support-certificate",
    title: "Google IT Support Professional Certificate",
    provider: "Coursera",
    category: "IT",
    subcategory: "IT Support",
    priceModel: "subscription",
    priceLabel: "$49/mo",
    difficulty: "Beginner",
    durationHours: 120,
    certificateType: "Professional Certificate",
    certificate: true,
    rating: 8.9,
    reviewCount: 1421,
    trendingScore: 91,
    lastUpdated: "2026-05-18",
    outcomeTags: ["led-to-job", "good-for-beginners"],
    thumbnailGradient: "from-blue-600 via-indigo-600 to-slate-900",
    skills: ["Troubleshooting", "Linux", "Networking", "Customer Support"],
    prerequisites: ["Basic computer literacy"],
    description:
      "A career-launching IT support track covering networking, operating systems, and practical troubleshooting workflows used in helpdesk roles.",
  },
  {
    slug: "ibm-data-science-professional",
    title: "IBM Data Science Professional Certificate",
    provider: "Coursera",
    category: "Data Science",
    subcategory: "Data Analysis",
    priceModel: "subscription",
    priceLabel: "$59/mo",
    difficulty: "Intermediate",
    durationHours: 180,
    certificateType: "Professional Certificate",
    certificate: true,
    rating: 8.4,
    reviewCount: 870,
    trendingScore: 84,
    lastUpdated: "2026-04-30",
    outcomeTags: ["career-switch", "portfolio-strong"],
    thumbnailGradient: "from-sky-700 via-cyan-600 to-zinc-900",
    skills: ["Python", "Pandas", "SQL", "Machine Learning"],
    prerequisites: ["Basic math", "Intro Python recommended"],
    description:
      "A structured data science pathway with labs and capstone work focused on Python, statistics, and portfolio-building analysis projects.",
  },
  {
    slug: "meta-frontend-developer",
    title: "Meta Frontend Developer",
    provider: "Coursera",
    category: "Programming",
    subcategory: "Web Development",
    priceModel: "subscription",
    priceLabel: "$49/mo",
    difficulty: "Beginner",
    durationHours: 150,
    certificateType: "Professional Certificate",
    certificate: true,
    rating: 8.6,
    reviewCount: 1112,
    trendingScore: 88,
    lastUpdated: "2026-03-21",
    outcomeTags: ["led-to-job", "portfolio-strong"],
    thumbnailGradient: "from-blue-500 via-violet-600 to-zinc-900",
    skills: ["HTML/CSS", "React", "Accessibility", "Testing"],
    prerequisites: ["No prior coding required"],
    description:
      "A beginner-friendly frontend track that emphasizes React fundamentals, UX principles, and practical portfolio output.",
  },
  {
    slug: "docker-kubernetes-udemy",
    title: "Docker & Kubernetes: The Practical Guide",
    provider: "Udemy",
    category: "IT",
    subcategory: "Cloud",
    priceModel: "paid",
    priceLabel: "$19.99",
    difficulty: "Intermediate",
    durationHours: 22,
    certificateType: "Completion Certificate",
    certificate: true,
    rating: 8.8,
    reviewCount: 2104,
    trendingScore: 93,
    lastUpdated: "2026-06-07",
    outcomeTags: ["career-switch", "led-to-job"],
    thumbnailGradient: "from-amber-500 via-orange-500 to-zinc-900",
    skills: ["Docker", "Kubernetes", "Deployment", "DevOps"],
    prerequisites: ["Command line basics", "Basic backend knowledge"],
    description:
      "A hands-on DevOps-focused course for containerization and orchestration, packed with production-minded examples.",
  },
  {
    slug: "cs50-harvard",
    title: "CS50: Introduction to Computer Science",
    provider: "edX",
    category: "Programming",
    subcategory: "Computer Science",
    priceModel: "free",
    priceLabel: "Free",
    difficulty: "Intermediate",
    durationHours: 110,
    certificateType: "Verified Certificate",
    certificate: true,
    rating: 9.3,
    reviewCount: 3941,
    trendingScore: 96,
    lastUpdated: "2026-02-14",
    outcomeTags: ["good-for-beginners", "led-to-job"],
    thumbnailGradient: "from-rose-600 via-red-600 to-zinc-900",
    skills: ["C", "Algorithms", "Data Structures", "Problem Solving"],
    prerequisites: ["Commitment and consistency"],
    description:
      "A rigorous introduction to computer science that builds real problem-solving depth and broad technical confidence.",
  },
  {
    slug: "freecodecamp-full-stack",
    title: "freeCodeCamp Full Stack Path",
    provider: "freeCodeCamp",
    category: "Programming",
    subcategory: "Full Stack",
    priceModel: "free",
    priceLabel: "Free",
    difficulty: "Beginner",
    durationHours: 300,
    certificateType: "freeCodeCamp Certificate",
    certificate: true,
    rating: 8.7,
    reviewCount: 2580,
    trendingScore: 90,
    lastUpdated: "2026-06-01",
    outcomeTags: ["good-for-beginners", "portfolio-strong"],
    thumbnailGradient: "from-emerald-500 via-teal-500 to-zinc-900",
    skills: ["JavaScript", "Node.js", "MongoDB", "APIs"],
    prerequisites: ["No prior coding experience"],
    description:
      "An extensive free curriculum for web development from foundations to backend APIs and full stack projects.",
  },
];

export const providerColors: Record<Course["provider"], string> = {
  Coursera: "bg-blue-600/20 text-blue-300 border-blue-500/40",
  Udemy: "bg-purple-600/20 text-purple-300 border-purple-500/40",
  edX: "bg-red-600/20 text-red-300 border-red-500/40",
  freeCodeCamp: "bg-emerald-600/20 text-emerald-300 border-emerald-500/40",
  YouTube: "bg-rose-600/20 text-rose-300 border-rose-500/40",
  Udacity: "bg-cyan-600/20 text-cyan-300 border-cyan-500/40",
};

export const reviewSamplesByCourse: Record<string, Review[]> = {
  "google-it-support-certificate": [
    {
      user: "Nina P.",
      reputation: 1240,
      experience: "Career switcher",
      overall: 9.1,
      outcome: "Got Job",
      completionStatus: "completed",
      timeSpentHours: 140,
      date: "2026-05-01",
      text: "This was the first course where I felt like I could actually do helpdesk tasks. Labs were practical and interview-friendly.",
      dimensions: {
        contentQuality: 9,
        practicality: 9,
        difficulty: 6,
        jobRelevance: 10,
        instructorQuality: 8,
        valueForTime: 9,
        valueForMoney: 8,
      },
    },
    {
      user: "Arjun R.",
      reputation: 620,
      experience: "Entry-level",
      overall: 8.4,
      outcome: "Got Internship",
      completionStatus: "completed",
      timeSpentHours: 112,
      date: "2026-04-17",
      text: "Great baseline, but supplement with ticketing system practice and mock calls.",
      dimensions: {
        contentQuality: 8,
        practicality: 8,
        difficulty: 5,
        jobRelevance: 9,
        instructorQuality: 8,
        valueForTime: 8,
        valueForMoney: 8,
      },
    },
  ],
};

export const projectShowcaseByCourse: Record<
  string,
  Array<{ title: string; author: string; skills: string[]; image: string; url: string }>
> = {
  "google-it-support-certificate": [
    {
      title: "Helpdesk Knowledge Base Portal",
      author: "Nina P.",
      skills: ["Linux", "Networking", "Documentation"],
      image: "from-blue-600 to-zinc-900",
      url: "#",
    },
    {
      title: "Home Lab Ticket Simulator",
      author: "Arjun R.",
      skills: ["Troubleshooting", "CLI", "Support Workflow"],
      image: "from-indigo-600 to-zinc-900",
      url: "#",
    },
  ],
};

export const learningPaths = [
  {
    slug: "zero-to-cloud-engineer",
    title: "Zero to Cloud Engineer",
    description: "Build foundations in IT support, Linux, cloud basics, then Kubernetes deployment.",
    creator: "LearnScore Editorial",
    stepCount: 6,
    totalHours: 220,
    upvotes: 3280,
    difficultyProgression: ["Beginner", "Beginner", "Intermediate", "Intermediate", "Advanced"],
    tags: ["Cloud", "DevOps", "Career Switch"],
  },
  {
    slug: "frontend-job-ready",
    title: "Frontend Job-Ready Stack",
    description: "From web basics to React projects and portfolio polish for entry-level roles.",
    creator: "Community",
    stepCount: 5,
    totalHours: 180,
    upvotes: 2477,
    difficultyProgression: ["Beginner", "Beginner", "Intermediate", "Intermediate"],
    tags: ["Web Dev", "Portfolio", "Beginner"],
  },
];

export const profileMock = {
  username: "sujal",
  name: "Sujal Patel",
  currentRole: "Support Associate",
  targetRole: "Cloud Engineer",
  totalCoursesReviewed: 14,
  averageRatingGiven: 8.2,
  hoursSpent: 412,
  reputationScore: 1860,
  watchlistCount: 11,
};

export function getCourseBySlug(slug: string) {
  return courses.find((course) => course.slug === slug) ?? null;
}

export function getComparisonSuggestions(baseSlug: string) {
  return courses.filter((course) => course.slug !== baseSlug).slice(0, 3);
}
