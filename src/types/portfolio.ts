export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
  images: string[];
  featured: boolean;
  detailedDescription?: string;
  mockupImages?: string[];
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  description: string;
  duration: string;
  location: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  duration: string;
  description: string;
  documentsUrl: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  level: number;
  logo?: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  github: string;
  phone: string;
  photo: string;
  aboutMe: string;
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  projects: Project[];
  experience: Experience[];
  education: Education[];
  skills: Skill[];
}