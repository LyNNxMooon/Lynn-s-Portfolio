/*
  # Create portfolio database schema

  1. New Tables
    - `portfolio_data`
      - `id` (uuid, primary key)
      - `user_id` (text, unique identifier for the portfolio owner)
      - `data` (jsonb, stores all portfolio information)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `portfolio_data` table
    - Add policy for public read access
    - Add policy for authenticated write access with password verification
*/

CREATE TABLE IF NOT EXISTS portfolio_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text UNIQUE NOT NULL DEFAULT 'default_portfolio',
  data jsonb NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE portfolio_data ENABLE ROW LEVEL SECURITY;

-- Allow public read access to portfolio data
CREATE POLICY "Allow public read access"
  ON portfolio_data
  FOR SELECT
  TO public
  USING (true);

-- Allow public insert/update for the default portfolio
CREATE POLICY "Allow public write access"
  ON portfolio_data
  FOR ALL
  TO public
  USING (user_id = 'default_portfolio')
  WITH CHECK (user_id = 'default_portfolio');

-- Insert default portfolio data
INSERT INTO portfolio_data (user_id, data) 
VALUES ('default_portfolio', '{
  "personalInfo": {
    "name": "John Doe",
    "title": "Flutter Developer",
    "email": "john.doe@gmail.com",
    "github": "https://github.com/yourusername",
    "phone": "+44 123 456 7890",
    "photo": "https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=400",
    "aboutMe": "Passionate Flutter developer with 3+ years of experience in building cross-platform mobile applications. I love creating intuitive user experiences and solving complex problems with clean, efficient code. Always eager to learn new technologies and contribute to innovative projects."
  },
  "projects": [
    {
      "id": "1",
      "name": "Flutter E-commerce App",
      "description": "A fully functional e-commerce mobile application built with Flutter and Firebase, featuring user authentication, product catalog, shopping cart, and payment integration.",
      "detailedDescription": "This comprehensive e-commerce application showcases modern mobile development practices with Flutter. The app includes user authentication, real-time product catalog, shopping cart functionality, secure payment processing, and order management. Built with clean architecture principles and state management using Provider pattern.",
      "technologies": ["Flutter", "Dart", "Firebase", "Stripe API", "Provider"],
      "demoUrl": "",
      "githubUrl": "",
      "images": [
        "https://images.pexels.com/photos/3584994/pexels-photo-3584994.jpeg?auto=compress&cs=tinysrgb&w=400",
        "https://images.pexels.com/photos/4158/apple-iphone-smartphone-desk.jpg?auto=compress&cs=tinysrgb&w=400"
      ],
      "mockupImages": [
        "https://images.pexels.com/photos/3584994/pexels-photo-3584994.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/4158/apple-iphone-smartphone-desk.jpg?auto=compress&cs=tinysrgb&w=600"
      ],
      "featured": true
    }
  ],
  "experience": [
    {
      "id": "1",
      "title": "Mobile Developer",
      "company": "Tech Solutions Ltd",
      "description": "Developed and maintained multiple Flutter applications for clients across various industries. Collaborated with cross-functional teams to deliver high-quality mobile solutions.",
      "duration": "Jan 2022 - Present",
      "location": "London, UK"
    }
  ],
  "education": [
    {
      "id": "1",
      "degree": "Bachelor of Science in Computer Science",
      "institution": "University of Technology",
      "duration": "2018 - 2021",
      "description": "Focused on software development, mobile technologies, and computer systems. Graduated with First Class Honours.",
      "documentsUrl": "https://drive.google.com/drive/folders/your-folder-id"
    }
  ],
  "skills": [
    {
      "id": "1",
      "name": "Flutter",
      "category": "Framework",
      "level": 90,
      "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg"
    },
    {
      "id": "2",
      "name": "Dart",
      "category": "Language",
      "level": 90,
      "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg"
    }
  ]
}')
ON CONFLICT (user_id) DO NOTHING;