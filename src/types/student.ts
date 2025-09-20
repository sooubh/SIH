export interface StudentProfile {
  id?: string;
  name: string;
  email: string;
  class: '10' | '12' | 'graduate';
  currentStream?: 'science' | 'commerce' | 'arts' | 'vocational';
  subjects: string[];
  marks: {
    overall: number;
    subject_wise?: { [subject: string]: number };
  };
  interests: string[];
  personalityTraits: string[];
  goals: {
    salaryExpectation?: string;
    studyAbroad?: boolean;
    preferredLocation?: string;
    workLifeBalance?: 'high' | 'medium' | 'low';
  };
  parentMode?: boolean;
  profileComplete: boolean;
}

export interface CareerPath {
  id: string;
  title: string;
  overview: string;
  eligibility: {
    stream: string[];
    subjects: string[];
    minimumMarks: number;
  };
  futureScope: string;
  jobOpportunities: string[];
  salaryRange: {
    india: { min: number; max: number };
    abroad: { min: number; max: number };
    currency: string;
  };
  keySkills: string[];
  entranceExams: string[];
  qualifications: string[];
  recommendedCourses: Course[];
  duration: string;
  difficulty: 'easy' | 'medium' | 'hard';
  jobDemand: 'high' | 'medium' | 'low';
  emergingField: boolean;
}

export interface Course {
  id: string;
  title: string;
  provider: string;
  type: 'online' | 'offline' | 'hybrid';
  cost: 'free' | 'paid';
  duration: string;
  url: string;
  rating: number;
}

export interface CareerRecommendation {
  careerPath: CareerPath;
  matchScore: number;
  reasoning: string;
  roadmap: RoadmapStep[];
  scholarships: Scholarship[];
}

export interface RoadmapStep {
  stage: string;
  duration: string;
  description: string;
  requirements: string[];
  nextOptions: string[];
}

export interface Scholarship {
  name: string;
  eligibility: string[];
  amount: string;
  deadline: string;
  applicationUrl: string;
}

export interface CareerComparison {
  career1: CareerPath;
  career2: CareerPath;
  comparison: {
    duration: string;
    difficulty: string;
    cost: string;
    jobDemand: string;
    salary: string;
    recommendation: string;
  };
}