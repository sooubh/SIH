import { StudentProfile, CareerRecommendation, CareerComparison, CareerPath } from '../types/student';
import { studentCareerPaths } from '../data/studentCareerPaths';

export class StudentCareerService {
  private static delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  static async generateCareerRecommendations(student: StudentProfile): Promise<CareerRecommendation[]> {
    await this.delay(2000);

    // Filter careers based on eligibility
    const eligibleCareers = studentCareerPaths.filter(career => {
      // Check stream compatibility
      if (student.currentStream && !career.eligibility.stream.includes(student.currentStream)) {
        return false;
      }

      // Check minimum marks
      if (student.marks.overall < career.eligibility.minimumMarks) {
        return false;
      }

      return true;
    });

    // Calculate match scores based on interests and personality
    const recommendations = eligibleCareers.map(career => {
      let matchScore = 0;

      // Interest matching (40% weight)
      const interestMatches = student.interests.filter(interest =>
        career.keySkills.some(skill => 
          skill.toLowerCase().includes(interest.toLowerCase()) ||
          interest.toLowerCase().includes(skill.toLowerCase())
        ) ||
        career.title.toLowerCase().includes(interest.toLowerCase()) ||
        career.overview.toLowerCase().includes(interest.toLowerCase())
      );
      matchScore += (interestMatches.length / Math.max(student.interests.length, 1)) * 0.4;

      // Personality trait matching (30% weight)
      const personalityMatches = student.personalityTraits.filter(trait => {
        const traitLower = trait.toLowerCase();
        const overviewLower = career.overview.toLowerCase();
        const skillsLower = career.keySkills.join(' ').toLowerCase();
        
        return overviewLower.includes(traitLower) || skillsLower.includes(traitLower);
      });
      matchScore += (personalityMatches.length / Math.max(student.personalityTraits.length, 1)) * 0.3;

      // Subject alignment (20% weight)
      const subjectMatches = student.subjects.filter(subject =>
        career.eligibility.subjects.some(reqSubject =>
          reqSubject.toLowerCase().includes(subject.toLowerCase()) ||
          subject.toLowerCase().includes(reqSubject.toLowerCase())
        )
      );
      matchScore += (subjectMatches.length / Math.max(career.eligibility.subjects.length, 1)) * 0.2;

      // Goals alignment (10% weight)
      let goalScore = 0;
      if (student.goals.salaryExpectation) {
        const expectedSalary = this.parseSalaryExpectation(student.goals.salaryExpectation);
        if (expectedSalary <= career.salaryRange.india.max) {
          goalScore += 0.5;
        }
      }
      if (student.goals.studyAbroad && career.salaryRange.abroad.max > 0) {
        goalScore += 0.5;
      }
      matchScore += goalScore * 0.1;

      // Generate reasoning
      const reasoning = this.generateReasoning(student, career, interestMatches, personalityMatches);

      // Generate roadmap
      const roadmap = this.generateRoadmap(student, career);

      // Generate scholarships
      const scholarships = this.generateScholarships(student, career);

      return {
        careerPath: career,
        matchScore: Math.min(matchScore + Math.random() * 0.1, 1), // Add small random factor
        reasoning,
        roadmap,
        scholarships
      };
    });

    return recommendations
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 3);
  }

  static async compareCareerPaths(career1Id: string, career2Id: string): Promise<CareerComparison> {
    await this.delay(1000);

    const career1 = studentCareerPaths.find(c => c.id === career1Id);
    const career2 = studentCareerPaths.find(c => c.id === career2Id);

    if (!career1 || !career2) {
      throw new Error('Career paths not found');
    }

    const comparison = {
      duration: this.compareDuration(career1.duration, career2.duration),
      difficulty: this.compareDifficulty(career1.difficulty, career2.difficulty),
      cost: this.compareCost(career1, career2),
      jobDemand: this.compareJobDemand(career1.jobDemand, career2.jobDemand),
      salary: this.compareSalary(career1.salaryRange, career2.salaryRange),
      recommendation: this.generateComparisonRecommendation(career1, career2)
    };

    return {
      career1,
      career2,
      comparison
    };
  }

  private static parseSalaryExpectation(expectation: string): number {
    const lowerExpectation = expectation.toLowerCase();
    if (lowerExpectation.includes('high') || lowerExpectation.includes('10+')) return 1000000;
    if (lowerExpectation.includes('medium') || lowerExpectation.includes('5-10')) return 500000;
    if (lowerExpectation.includes('low') || lowerExpectation.includes('3-5')) return 300000;
    return 400000; // default
  }

  private static generateReasoning(
    student: StudentProfile, 
    career: CareerPath, 
    interestMatches: string[], 
    personalityMatches: string[]
  ): string {
    const reasons = [];

    if (interestMatches.length > 0) {
      reasons.push(`Your interests in ${interestMatches.slice(0, 2).join(' and ')} align perfectly with this career.`);
    }

    if (personalityMatches.length > 0) {
      reasons.push(`Your ${personalityMatches[0]} personality trait is ideal for this field.`);
    }

    if (student.marks.overall >= career.eligibility.minimumMarks + 10) {
      reasons.push(`Your academic performance (${student.marks.overall}%) exceeds the typical requirements.`);
    }

    if (career.emergingField) {
      reasons.push(`This is an emerging field with excellent future prospects and high demand.`);
    }

    if (student.goals.studyAbroad && career.salaryRange.abroad.max > 5000000) {
      reasons.push(`This career offers excellent opportunities for working abroad.`);
    }

    return reasons.join(' ') || 'This career path matches your profile and offers good growth opportunities.';
  }

  private static generateRoadmap(student: StudentProfile, career: CareerPath) {
    const roadmap = [];

    if (student.class === '10') {
      roadmap.push({
        stage: 'Class 11-12',
        duration: '2 years',
        description: `Choose ${career.eligibility.stream[0]} stream with subjects: ${career.eligibility.subjects.join(', ')}`,
        requirements: [`Minimum 75% in Class 10`, `Focus on ${career.eligibility.subjects.slice(0, 2).join(' and ')}`],
        nextOptions: ['Entrance exam preparation', 'Skill development courses']
      });
    }

    if (career.entranceExams.length > 0 && career.entranceExams[0] !== 'No specific entrance exams') {
      roadmap.push({
        stage: 'Entrance Preparation',
        duration: '1-2 years',
        description: `Prepare for ${career.entranceExams.slice(0, 2).join(' or ')}`,
        requirements: [`Class 12 with ${career.eligibility.minimumMarks}%+`, 'Coaching/Self-study'],
        nextOptions: ['College admission', 'Backup options']
      });
    }

    roadmap.push({
      stage: 'Higher Education',
      duration: career.duration,
      description: `Complete ${career.qualifications[0]}`,
      requirements: ['Regular attendance', 'Good academic performance', 'Practical experience'],
      nextOptions: ['Job placement', 'Higher studies', 'Entrepreneurship']
    });

    roadmap.push({
      stage: 'Career Start',
      duration: '1-2 years',
      description: `Begin as ${career.jobOpportunities[0]}`,
      requirements: ['Internships', 'Portfolio/Projects', 'Networking'],
      nextOptions: ['Specialization', 'Leadership roles', 'Freelancing']
    });

    roadmap.push({
      stage: 'Career Growth',
      duration: '5+ years',
      description: `Advance to ${career.jobOpportunities[career.jobOpportunities.length - 1]}`,
      requirements: ['Continuous learning', 'Professional certifications', 'Leadership skills'],
      nextOptions: ['Senior management', 'Consulting', 'Teaching/Training']
    });

    return roadmap;
  }

  private static generateScholarships(student: StudentProfile, career: CareerPath) {
    const scholarships = [];

    // Merit-based scholarships
    if (student.marks.overall >= 85) {
      scholarships.push({
        name: 'National Merit Scholarship',
        eligibility: ['85%+ in Class 12', 'Indian citizen', 'Family income < 8 LPA'],
        amount: '₹50,000 - ₹2,00,000 per year',
        deadline: 'September 30, 2024',
        applicationUrl: 'https://scholarships.gov.in/'
      });
    }

    // Field-specific scholarships
    if (career.id.includes('engineer') || career.id.includes('software')) {
      scholarships.push({
        name: 'AICTE Pragati Scholarship',
        eligibility: ['Girl students', 'Technical courses', 'Family income < 8 LPA'],
        amount: '₹30,000 per year',
        deadline: 'October 31, 2024',
        applicationUrl: 'https://aicte-india.org/'
      });
    }

    if (career.id === 'doctor') {
      scholarships.push({
        name: 'Central Sector Scholarship',
        eligibility: ['NEET qualified', 'Top 20,000 rank', 'Family income < 8 LPA'],
        amount: '₹20,000 per year',
        deadline: 'November 15, 2024',
        applicationUrl: 'https://scholarships.gov.in/'
      });
    }

    return scholarships;
  }

  private static compareDuration(duration1: string, duration2: string): string {
    const years1 = this.extractYears(duration1);
    const years2 = this.extractYears(duration2);
    
    if (years1 < years2) {
      return `${duration1} is shorter than ${duration2}`;
    } else if (years1 > years2) {
      return `${duration1} is longer than ${duration2}`;
    } else {
      return `Both have similar duration: ${duration1}`;
    }
  }

  private static extractYears(duration: string): number {
    const match = duration.match(/(\d+)/);
    return match ? parseInt(match[1]) : 4;
  }

  private static compareDifficulty(diff1: string, diff2: string): string {
    const difficultyOrder = { 'easy': 1, 'medium': 2, 'hard': 3 };
    const level1 = difficultyOrder[diff1 as keyof typeof difficultyOrder];
    const level2 = difficultyOrder[diff2 as keyof typeof difficultyOrder];

    if (level1 < level2) {
      return `First option is easier (${diff1} vs ${diff2})`;
    } else if (level1 > level2) {
      return `Second option is easier (${diff2} vs ${diff1})`;
    } else {
      return `Both have similar difficulty level: ${diff1}`;
    }
  }

  private static compareCost(career1: CareerPath, career2: CareerPath): string {
    // Simplified cost comparison based on career type
    const costEstimate1 = this.estimateCost(career1);
    const costEstimate2 = this.estimateCost(career2);

    if (costEstimate1 < costEstimate2) {
      return `${career1.title} is generally more affordable`;
    } else if (costEstimate1 > costEstimate2) {
      return `${career2.title} is generally more affordable`;
    } else {
      return `Both have similar cost structures`;
    }
  }

  private static estimateCost(career: CareerPath): number {
    if (career.id === 'doctor') return 3; // High cost
    if (career.id.includes('engineer')) return 2; // Medium cost
    if (career.id === 'digital-marketing' || career.id === 'graphic-designer') return 1; // Low cost
    return 2; // Default medium cost
  }

  private static compareJobDemand(demand1: string, demand2: string): string {
    const demandOrder = { 'low': 1, 'medium': 2, 'high': 3 };
    const level1 = demandOrder[demand1 as keyof typeof demandOrder];
    const level2 = demandOrder[demand2 as keyof typeof demandOrder];

    if (level1 > level2) {
      return `First option has higher job demand (${demand1} vs ${demand2})`;
    } else if (level1 < level2) {
      return `Second option has higher job demand (${demand2} vs ${demand1})`;
    } else {
      return `Both have similar job demand: ${demand1}`;
    }
  }

  private static compareSalary(salary1: any, salary2: any): string {
    const avg1 = (salary1.india.min + salary1.india.max) / 2;
    const avg2 = (salary2.india.min + salary2.india.max) / 2;

    if (avg1 > avg2) {
      return `First option has higher average salary (₹${(avg1/100000).toFixed(1)}L vs ₹${(avg2/100000).toFixed(1)}L)`;
    } else if (avg1 < avg2) {
      return `Second option has higher average salary (₹${(avg2/100000).toFixed(1)}L vs ₹${(avg1/100000).toFixed(1)}L)`;
    } else {
      return `Both have similar salary ranges`;
    }
  }

  private static generateComparisonRecommendation(career1: CareerPath, career2: CareerPath): string {
    const factors = [];

    if (career1.jobDemand === 'high' && career2.jobDemand !== 'high') {
      factors.push(`${career1.title} has better job prospects`);
    } else if (career2.jobDemand === 'high' && career1.jobDemand !== 'high') {
      factors.push(`${career2.title} has better job prospects`);
    }

    if (career1.emergingField && !career2.emergingField) {
      factors.push(`${career1.title} is in an emerging field with future growth`);
    } else if (career2.emergingField && !career1.emergingField) {
      factors.push(`${career2.title} is in an emerging field with future growth`);
    }

    const avg1 = (career1.salaryRange.india.min + career1.salaryRange.india.max) / 2;
    const avg2 = (career2.salaryRange.india.min + career2.salaryRange.india.max) / 2;

    if (Math.abs(avg1 - avg2) > 200000) {
      if (avg1 > avg2) {
        factors.push(`${career1.title} offers higher earning potential`);
      } else {
        factors.push(`${career2.title} offers higher earning potential`);
      }
    }

    if (factors.length === 0) {
      return 'Both careers are excellent choices. Consider your personal interests and long-term goals.';
    }

    return `Recommendation: ${factors.join(', ')}.`;
  }

  static generateParentExplanation(recommendations: CareerRecommendation[]): string {
    const topCareer = recommendations[0];
    
    return `
**Dear Parents,**

Based on your child's profile, we recommend **${topCareer.careerPath.title}** as the top career option. Here's why this is a smart choice:

**Future Demand & Job Security:**
- ${topCareer.careerPath.futureScope}
- Job demand: ${topCareer.careerPath.jobDemand.toUpperCase()}
- ${topCareer.careerPath.emergingField ? 'This is an emerging field with excellent growth prospects.' : 'This is a stable field with consistent demand.'}

**Earning Potential:**
- Starting salary: ₹${(topCareer.careerPath.salaryRange.india.min/100000).toFixed(1)} - ₹${(topCareer.careerPath.salaryRange.india.max/100000).toFixed(1)} lakhs per year
- International opportunities: $${(topCareer.careerPath.salaryRange.abroad.min/100000).toFixed(0)}k - $${(topCareer.careerPath.salaryRange.abroad.max/100000).toFixed(0)}k per year

**Why This Matches Your Child:**
${topCareer.reasoning}

**Common Myths vs Reality:**
- Myth: "Only engineering and medicine are good careers"
- Reality: Modern careers like ${topCareer.careerPath.title} offer excellent growth and stability
- Myth: "New fields are risky"
- Reality: Emerging fields often provide the best opportunities for early career growth

**Investment Required:**
- Duration: ${topCareer.careerPath.duration}
- Difficulty level: ${topCareer.careerPath.difficulty}
- Multiple scholarship opportunities available

This recommendation is based on scientific analysis of your child's interests, academic performance, and market trends. We encourage you to support their passion while ensuring practical career success.
    `;
  }
}