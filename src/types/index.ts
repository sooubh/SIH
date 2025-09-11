export interface User {
  id?: string;
  name: string;
  email: string;
  education: string;
  yearOfStudy?: string;
  skills: string[];
  interests: string[];
  experience?: string;
  careerGoals?: string;
  profileComplete: boolean;
}

export interface CareerProfile {
  id: string;
  title: string;
  description: string;
  requiredSkills: string[];
  averageSalary: string;
  growthRate: string;
  industry: string;
  experienceLevel: string;
  education: string[];
  keyResponsibilities: string[];
  workEnvironment: string;
  jobOutlook: string;
}

export interface CareerRecommendation {
  career: CareerProfile;
  matchScore: number;
  missingSkills: string[];
  strengthSkills: string[];
  reasoning: string;
}

export interface RoadmapStep {
  id: string;
  title: string;
  description: string;
  duration: string;
  priority: 'high' | 'medium' | 'low';
  type: 'skill' | 'project' | 'certification' | 'experience';
  resources: Resource[];
  completed: boolean;
}

export interface Resource {
  id: string;
  title: string;
  url: string;
  type: 'course' | 'tutorial' | 'certification' | 'book' | 'practice';
  provider: string;
  duration: string;
  cost: 'free' | 'paid';
  rating: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export interface AssessmentQuestion {
  id: string;
  question: string;
  options: string[];
  category: 'interests' | 'skills' | 'personality';
}