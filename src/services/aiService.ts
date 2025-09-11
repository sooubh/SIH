import { User, CareerRecommendation, RoadmapStep, ChatMessage } from '../types';
import { careerProfiles } from '../data/careerProfiles';
import { resources } from '../data/resources';

// Simulate AI service calls with realistic delays and responses
export class AIService {
  private static delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  static async generateCareerRecommendations(user: User): Promise<CareerRecommendation[]> {
    await this.delay(2000); // Simulate API call delay

    // Simple matching algorithm based on user skills and interests
    const recommendations = careerProfiles.map(career => {
      const skillMatches = user.skills.filter(skill => 
        career.requiredSkills.some(reqSkill => 
          reqSkill.toLowerCase().includes(skill.toLowerCase()) ||
          skill.toLowerCase().includes(reqSkill.toLowerCase())
        )
      );
      
      const interestMatches = user.interests.filter(interest =>
        career.title.toLowerCase().includes(interest.toLowerCase()) ||
        career.description.toLowerCase().includes(interest.toLowerCase()) ||
        career.industry.toLowerCase().includes(interest.toLowerCase())
      );

      const matchScore = (skillMatches.length * 0.6 + interestMatches.length * 0.4) / 
                        Math.max(career.requiredSkills.length * 0.6 + 2 * 0.4, 1);

      const missingSkills = career.requiredSkills.filter(skill =>
        !user.skills.some(userSkill => 
          userSkill.toLowerCase().includes(skill.toLowerCase()) ||
          skill.toLowerCase().includes(userSkill.toLowerCase())
        )
      );

      const strengthSkills = career.requiredSkills.filter(skill =>
        user.skills.some(userSkill => 
          userSkill.toLowerCase().includes(skill.toLowerCase()) ||
          skill.toLowerCase().includes(userSkill.toLowerCase())
        )
      );

      return {
        career,
        matchScore: Math.min(matchScore + Math.random() * 0.2, 1),
        missingSkills,
        strengthSkills,
        reasoning: this.generateReasoning(career, skillMatches, interestMatches, user)
      };
    });

    return recommendations
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 3);
  }

  static generateReasoning(career: any, skillMatches: string[], interestMatches: string[], user: User): string {
    const reasons = [];
    
    if (skillMatches.length > 0) {
      reasons.push(`Your skills in ${skillMatches.slice(0, 2).join(' and ')} align well with this role.`);
    }
    
    if (interestMatches.length > 0) {
      reasons.push(`Your interest in ${interestMatches[0]} matches this career path.`);
    }
    
    if (user.education.toLowerCase().includes('computer science') || 
        user.education.toLowerCase().includes('engineering')) {
      reasons.push(`Your technical education background is relevant for this field.`);
    }

    return reasons.join(' ') || 'This career path offers good growth opportunities and matches your profile.';
  }

  static async generateRoadmap(career: string, missingSkills: string[], user: User): Promise<RoadmapStep[]> {
    await this.delay(1500);

    const roadmapSteps: RoadmapStep[] = [];
    let stepId = 1;

    // Add foundational skills
    missingSkills.slice(0, 3).forEach(skill => {
      const skillResources = resources.filter(r => 
        r.title.toLowerCase().includes(skill.toLowerCase()) ||
        skill.toLowerCase().includes(r.title.toLowerCase())
      ).slice(0, 2);

      roadmapSteps.push({
        id: `step-${stepId++}`,
        title: `Master ${skill}`,
        description: `Learn the fundamentals of ${skill} through structured courses and hands-on practice.`,
        duration: this.getSkillDuration(skill),
        priority: stepId <= 2 ? 'high' : 'medium',
        type: 'skill',
        resources: skillResources,
        completed: false
      });
    });

    // Add project steps
    roadmapSteps.push({
      id: `step-${stepId++}`,
      title: 'Build Portfolio Projects',
      description: `Create 2-3 projects that showcase your new skills in ${career.toLowerCase()}.`,
      duration: '6-8 weeks',
      priority: 'high',
      type: 'project',
      resources: [],
      completed: false
    });

    // Add certification step
    roadmapSteps.push({
      id: `step-${stepId++}`,
      title: 'Get Industry Certification',
      description: `Pursue relevant certifications to validate your expertise in ${career.toLowerCase()}.`,
      duration: '2-3 months',
      priority: 'medium',
      type: 'certification',
      resources: resources.filter(r => r.type === 'certification').slice(0, 2),
      completed: false
    });

    // Add experience step
    roadmapSteps.push({
      id: `step-${stepId++}`,
      title: 'Gain Practical Experience',
      description: 'Apply for internships, freelance projects, or contribute to open source projects.',
      duration: '3-6 months',
      priority: 'high',
      type: 'experience',
      resources: [],
      completed: false
    });

    return roadmapSteps;
  }

  static getSkillDuration(skill: string): string {
    const durationMap: { [key: string]: string } = {
      'Python': '4-6 weeks',
      'JavaScript': '6-8 weeks',
      'React': '3-4 weeks',
      'Node.js': '3-4 weeks',
      'SQL': '2-3 weeks',
      'Machine Learning': '8-12 weeks',
      'Statistics': '6-8 weeks',
      'Data Visualization': '2-3 weeks',
      'HTML': '1-2 weeks',
      'CSS': '2-3 weeks',
      'Git': '1-2 weeks',
    };
    
    return durationMap[skill] || '3-4 weeks';
  }

  static async chatWithAI(messages: ChatMessage[], userContext: User): Promise<string> {
    await this.delay(1000);

    const lastMessage = messages[messages.length - 1];
    const userMessage = lastMessage.content.toLowerCase();

    // Simple response generation based on keywords
    if (userMessage.includes('salary') || userMessage.includes('pay')) {
      return "Salaries vary by location and experience. Data Scientists typically earn $95k-$165k, while Full Stack Developers earn $75k-$130k. Focus on building strong skills first, and the compensation will follow!";
    }

    if (userMessage.includes('interview') || userMessage.includes('preparation')) {
      return "For interview prep, I recommend: 1) Practice coding problems on LeetCode/HackerRank, 2) Prepare STAR method stories for behavioral questions, 3) Research the company and role thoroughly, 4) Practice explaining your projects clearly. Would you like specific tips for any career?";
    }

    if (userMessage.includes('skill') || userMessage.includes('learn')) {
      return `Based on your profile, I'd recommend focusing on ${userContext.interests[0] || 'your interests'} first. Start with foundational concepts, then move to hands-on projects. Consistency is key - even 30 minutes daily makes a big difference!`;
    }

    if (userMessage.includes('project') || userMessage.includes('portfolio')) {
      return "Great question! For your portfolio: 1) Choose projects that solve real problems, 2) Include a variety of skills, 3) Document your process and learnings, 4) Deploy your projects live, 5) Write clear README files. Quality over quantity!";
    }

    if (userMessage.includes('time') || userMessage.includes('long')) {
      return "Career transitions typically take 6-12 months with consistent effort. The key is setting realistic milestones and celebrating small wins. Your current skills in " + (userContext.skills[0] || 'your field') + " are already valuable!";
    }

    return "That's a great question! I'm here to help you navigate your career journey. Based on your profile and goals, I can provide personalized advice on skills development, career transitions, and growth strategies. What specific aspect would you like to explore?";
  }
}