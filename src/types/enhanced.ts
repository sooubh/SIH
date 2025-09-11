export interface EnhancedUser extends User {
  location?: string;
  gpa?: number;
  preferredLanguage?: 'en' | 'hi' | 'ta' | 'te' | 'bn';
  resumeText?: string;
  personalityTraits?: string[];
  learningStyle?: 'visual' | 'auditory' | 'kinesthetic' | 'reading';
  xpPoints?: number;
  badges?: Badge[];
  completedSteps?: string[];
  networkConnections?: string[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: Date;
  xpValue: number;
}

export interface GovernmentScheme {
  id: string;
  name: string;
  description: string;
  eligibility: string[];
  amount: string;
  deadline: string;
  applicationUrl: string;
  category: 'scholarship' | 'skill_development' | 'employment';
  targetAudience: string[];
}

export interface JobMarketData {
  skill: string;
  demandTrend: number; // percentage change
  averageSalary: string;
  jobOpenings: number;
  growthProjection: string;
  topCompanies: string[];
  locations: string[];
}

export interface AIProvider {
  name: 'openai' | 'huggingface' | 'gemini' | 'openrouter';
  available: boolean;
  rateLimitRemaining?: number;
}

export interface InterviewQuestion {
  id: string;
  question: string;
  expectedAnswer: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: 'technical' | 'behavioral' | 'situational';
  tips: string[];
}

export interface VoiceSettings {
  enabled: boolean;
  language: string;
  voice: string;
  speed: number;
}

export interface PeerConnection {
  id: string;
  name: string;
  avatar: string;
  commonGoals: string[];
  progress: number;
  lastActive: Date;
}

export interface LearningResource extends Resource {
  aiRecommendationScore: number;
  userReviews: number;
  completionRate: number;
  prerequisites: string[];
  outcomes: string[];
  language: string;
}

export interface CareerDemandData {
  career: string;
  demandScore: number;
  salaryRange: {
    min: number;
    max: number;
    currency: string;
  };
  jobGrowth: number;
  skillsInDemand: string[];
  topLocations: string[];
  governmentInitiatives: string[];
}