import { GovernmentScheme, JobMarketData, CareerDemandData } from '../types/enhanced';

export class GovernmentDataService {
  async fetchEmploymentData(): Promise<JobMarketData[]> {
    try {
      // Simulate API call to data.gov.in
      await this.delay(1000);
      
      return [
        {
          skill: 'Artificial Intelligence',
          demandTrend: 45.2,
          averageSalary: '₹15,00,000 - ₹30,00,000',
          jobOpenings: 12500,
          growthProjection: '35% by 2025',
          topCompanies: ['TCS', 'Infosys', 'Google', 'Microsoft', 'Flipkart'],
          locations: ['Bangalore', 'Hyderabad', 'Pune', 'Chennai', 'Mumbai']
        },
        {
          skill: 'Data Science',
          demandTrend: 38.7,
          averageSalary: '₹12,00,000 - ₹25,00,000',
          jobOpenings: 8900,
          growthProjection: '28% by 2025',
          topCompanies: ['Amazon', 'Flipkart', 'Paytm', 'Zomato', 'Swiggy'],
          locations: ['Bangalore', 'Delhi NCR', 'Mumbai', 'Hyderabad', 'Pune']
        },
        {
          skill: 'Cloud Computing',
          demandTrend: 42.1,
          averageSalary: '₹10,00,000 - ₹22,00,000',
          jobOpenings: 15600,
          growthProjection: '32% by 2025',
          topCompanies: ['AWS', 'Microsoft', 'Google Cloud', 'IBM', 'Accenture'],
          locations: ['Bangalore', 'Hyderabad', 'Chennai', 'Pune', 'Kolkata']
        },
        {
          skill: 'Cybersecurity',
          demandTrend: 51.3,
          averageSalary: '₹8,00,000 - ₹20,00,000',
          jobOpenings: 6700,
          growthProjection: '40% by 2025',
          topCompanies: ['Wipro', 'TCS', 'HCL', 'Tech Mahindra', 'L&T'],
          locations: ['Delhi NCR', 'Bangalore', 'Mumbai', 'Chennai', 'Hyderabad']
        }
      ];
    } catch (error) {
      console.error('Error fetching employment data:', error);
      return [];
    }
  }

  async fetchGovernmentSchemes(userProfile?: any): Promise<GovernmentScheme[]> {
    try {
      await this.delay(800);
      
      const allSchemes = [
        {
          id: 'pmkvy',
          name: 'Pradhan Mantri Kaushal Vikas Yojana (PMKVY)',
          description: 'Skill development program providing free training and certification',
          eligibility: ['Age 18-35', 'Class 10th pass', 'Indian citizen'],
          amount: 'Free training + ₹8,000 incentive',
          deadline: '2024-12-31',
          applicationUrl: 'https://www.pmkvyofficial.org/',
          category: 'skill_development' as const,
          targetAudience: ['Students', 'Job seekers', 'School dropouts']
        },
        {
          id: 'nsp',
          name: 'National Scholarship Portal',
          description: 'Centralized platform for various government scholarships',
          eligibility: ['Merit-based', 'Income criteria', 'Category-specific'],
          amount: '₹10,000 - ₹2,00,000 per year',
          deadline: '2024-10-31',
          applicationUrl: 'https://scholarships.gov.in/',
          category: 'scholarship' as const,
          targetAudience: ['Students', 'SC/ST/OBC', 'Minorities']
        },
        {
          id: 'startup-india',
          name: 'Startup India Initiative',
          description: 'Support for entrepreneurs and startups',
          eligibility: ['Innovative business idea', 'Age 18+', 'Indian resident'],
          amount: 'Up to ₹10 lakhs funding',
          deadline: 'Rolling basis',
          applicationUrl: 'https://www.startupindia.gov.in/',
          category: 'employment' as const,
          targetAudience: ['Entrepreneurs', 'Graduates', 'Professionals']
        },
        {
          id: 'digital-india',
          name: 'Digital India Skills Program',
          description: 'Free digital literacy and skill development courses',
          eligibility: ['Basic computer knowledge', 'Age 16+'],
          amount: 'Free certification',
          deadline: 'Ongoing',
          applicationUrl: 'https://digitalindia.gov.in/',
          category: 'skill_development' as const,
          targetAudience: ['Students', 'Working professionals', 'Rural population']
        },
        {
          id: 'mudra-yojana',
          name: 'Pradhan Mantri MUDRA Yojana',
          description: 'Micro-finance scheme for small businesses',
          eligibility: ['Business plan', 'Age 18+', 'Indian citizen'],
          amount: '₹50,000 - ₹10,00,000 loan',
          deadline: 'Ongoing',
          applicationUrl: 'https://www.mudra.org.in/',
          category: 'employment' as const,
          targetAudience: ['Small business owners', 'Entrepreneurs', 'Self-employed']
        }
      ];

      // Filter based on user profile if provided
      if (userProfile) {
        return allSchemes.filter(scheme => {
          if (userProfile.education === 'High School' && scheme.id === 'pmkvy') return true;
          if (userProfile.interests?.includes('entrepreneurship') && scheme.id === 'startup-india') return true;
          if (userProfile.skills?.includes('technology') && scheme.id === 'digital-india') return true;
          return scheme.category === 'scholarship'; // Always show scholarships
        });
      }

      return allSchemes;
    } catch (error) {
      console.error('Error fetching government schemes:', error);
      return [];
    }
  }

  async fetchCareerDemandData(career: string): Promise<CareerDemandData | null> {
    try {
      await this.delay(600);
      
      const demandData: { [key: string]: CareerDemandData } = {
        'data-scientist': {
          career: 'Data Scientist',
          demandScore: 92,
          salaryRange: { min: 800000, max: 2500000, currency: 'INR' },
          jobGrowth: 28.5,
          skillsInDemand: ['Python', 'Machine Learning', 'SQL', 'Statistics', 'Deep Learning'],
          topLocations: ['Bangalore', 'Hyderabad', 'Pune', 'Chennai', 'Mumbai'],
          governmentInitiatives: ['Digital India', 'AI for All', 'National AI Strategy']
        },
        'full-stack-developer': {
          career: 'Full Stack Developer',
          demandScore: 88,
          salaryRange: { min: 600000, max: 1800000, currency: 'INR' },
          jobGrowth: 22.3,
          skillsInDemand: ['JavaScript', 'React', 'Node.js', 'Python', 'Cloud Computing'],
          topLocations: ['Bangalore', 'Pune', 'Hyderabad', 'Chennai', 'Delhi NCR'],
          governmentInitiatives: ['Digital India', 'Skill India', 'Make in India']
        },
        'ai-engineer': {
          career: 'AI/ML Engineer',
          demandScore: 95,
          salaryRange: { min: 1200000, max: 3000000, currency: 'INR' },
          jobGrowth: 35.7,
          skillsInDemand: ['Python', 'TensorFlow', 'PyTorch', 'Deep Learning', 'NLP'],
          topLocations: ['Bangalore', 'Hyderabad', 'Pune', 'Chennai', 'Mumbai'],
          governmentInitiatives: ['National AI Mission', 'AI for All', 'Digital India']
        }
      };

      return demandData[career.toLowerCase().replace(/\s+/g, '-')] || null;
    } catch (error) {
      console.error('Error fetching career demand data:', error);
      return null;
    }
  }

  async fetchSkillDevelopmentPrograms(): Promise<any[]> {
    try {
      await this.delay(700);
      
      return [
        {
          id: 'nsdc-ai',
          name: 'NSDC AI & Data Science Program',
          description: '6-month intensive program in AI and Data Science',
          duration: '6 months',
          cost: 'Free',
          provider: 'National Skill Development Corporation',
          skills: ['Python', 'Machine Learning', 'Data Analysis'],
          certification: 'Government certified',
          applicationUrl: 'https://nsdcindia.org/'
        },
        {
          id: 'nielit-cloud',
          name: 'NIELIT Cloud Computing Course',
          description: 'Comprehensive cloud computing certification program',
          duration: '4 months',
          cost: '₹15,000',
          provider: 'National Institute of Electronics & IT',
          skills: ['AWS', 'Azure', 'Cloud Architecture'],
          certification: 'NIELIT certified',
          applicationUrl: 'https://nielit.gov.in/'
        }
      ];
    } catch (error) {
      console.error('Error fetching skill development programs:', error);
      return [];
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const governmentDataService = new GovernmentDataService();