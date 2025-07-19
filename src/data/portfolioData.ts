import { PortfolioData } from '../types/portfolio';

// This is the default data that will be used when no saved data exists
// or when the user resets their portfolio
export const defaultPortfolioData: PortfolioData = {
  personalInfo: {
    name: "John Doe",
    title: "Flutter Developer",
    email: "john.doe@gmail.com",
    github: "https://github.com/yourusername",
    phone: "+44 123 456 7890",
    photo: "https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=400",
    aboutMe: "Passionate Flutter developer with 3+ years of experience in building cross-platform mobile applications. I love creating intuitive user experiences and solving complex problems with clean, efficient code. Always eager to learn new technologies and contribute to innovative projects."
  },
  projects: [
    {
      id: "1",
      name: "Flutter E-commerce App",
      description: "A fully functional e-commerce mobile application built with Flutter and Firebase, featuring user authentication, product catalog, shopping cart, and payment integration.",
      detailedDescription: "This comprehensive e-commerce application showcases modern mobile development practices with Flutter. The app includes user authentication, real-time product catalog, shopping cart functionality, secure payment processing, and order management. Built with clean architecture principles and state management using Provider pattern.",
      technologies: ["Flutter", "Dart", "Firebase", "Stripe API", "Provider"],
      demoUrl: "",
      githubUrl: "",
      images: [
        "https://images.pexels.com/photos/3584994/pexels-photo-3584994.jpeg?auto=compress&cs=tinysrgb&w=400",
        "https://images.pexels.com/photos/4158/apple-iphone-smartphone-desk.jpg?auto=compress&cs=tinysrgb&w=400"
      ],
      mockupImages: [
        "https://images.pexels.com/photos/3584994/pexels-photo-3584994.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/4158/apple-iphone-smartphone-desk.jpg?auto=compress&cs=tinysrgb&w=600"
      ],
      featured: true
    },
    {
      id: "2",
      name: "Task Management App",
      description: "Cross-platform task management application with real-time synchronization, built using Flutter and GraphQL for efficient data management.",
      detailedDescription: "A powerful task management solution that helps users organize their daily activities. Features include task creation, categorization, priority settings, deadline reminders, and team collaboration. The app uses GraphQL for efficient data fetching and real-time updates.",
      technologies: ["Flutter", "GraphQL", "SQLite", "Bloc", "Material Design"],
      demoUrl: "",
      githubUrl: "",
      images: [
        "https://images.pexels.com/photos/3243/pen-calendar-to-do-checklist.jpg?auto=compress&cs=tinysrgb&w=400"
      ],
      mockupImages: [
        "https://images.pexels.com/photos/3243/pen-calendar-to-do-checklist.jpg?auto=compress&cs=tinysrgb&w=600"
      ],
      featured: true
    },
    {
      id: "3",
      name: "Weather Forecast App",
      description: "Beautiful weather application with location-based forecasts, interactive maps, and personalized weather alerts.",
      detailedDescription: "An elegant weather application that provides accurate forecasts with beautiful animations and intuitive design. Features include current weather conditions, 7-day forecasts, weather maps, severe weather alerts, and location-based recommendations.",
      technologies: ["Flutter", "REST API", "Geolocator", "Weather API", "Custom UI"],
      demoUrl: "",
      githubUrl: "",
      images: [
        "https://images.pexels.com/photos/1431822/pexels-photo-1431822.jpeg?auto=compress&cs=tinysrgb&w=400"
      ],
      mockupImages: [
        "https://images.pexels.com/photos/1431822/pexels-photo-1431822.jpeg?auto=compress&cs=tinysrgb&w=600"
      ],
      featured: false
    }
  ],
  experience: [
    {
      id: "1",
      title: "Mobile Developer",
      company: "Tech Solutions Ltd",
      description: "Developed and maintained multiple Flutter applications for clients across various industries. Collaborated with cross-functional teams to deliver high-quality mobile solutions.",
      duration: "Jan 2022 - Present",
      location: "London, UK"
    },
    {
      id: "2",
      title: "Junior Flutter Developer",
      company: "StartupTech",
      description: "Built MVP mobile applications using Flutter framework. Implemented RESTful APIs integration and worked on UI/UX improvements based on user feedback.",
      duration: "Jun 2021 - Dec 2021",
      location: "Manchester, UK"
    },
    {
      id: "3",
      title: "Software Development Intern",
      company: "Digital Innovations",
      description: "Assisted in developing mobile applications and gained hands-on experience with Flutter, Dart, and Firebase technologies.",
      duration: "Jan 2021 - May 2021",
      location: "Birmingham, UK"
    }
  ],
  education: [
    {
      id: "1",
      degree: "Bachelor of Science in Computer Science",
      institution: "University of Technology",
      duration: "2018 - 2021",
      description: "Focused on software development, mobile technologies, and computer systems. Graduated with First Class Honours.",
      documentsUrl: "https://drive.google.com/drive/folders/your-folder-id"
    }
  ],
  skills: [
    { id: "1", name: "Flutter", category: "Framework", level: 90, logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
    { id: "2", name: "Dart", category: "Language", level: 90, logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg" },
    { id: "3", name: "Firebase", category: "Backend", level: 85, logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
    { id: "4", name: "REST APIs", category: "Integration", level: 80, logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { id: "5", name: "GraphQL", category: "Integration", level: 75, logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg" },
    { id: "6", name: "Java", category: "Language", level: 70, logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
    { id: "7", name: "Python", category: "Language", level: 65, logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { id: "8", name: "HTML/CSS", category: "Web", level: 75, logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
    { id: "9", name: "Kotlin", category: "Language", level: 60, logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg" },
    { id: "10", name: "C#", category: "Language", level: 55, logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" },
    { id: "11", name: "Git", category: "Tool", level: 85, logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { id: "12", name: "SQLite", category: "Database", level: 70, logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg" }
  ]
};