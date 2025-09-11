import { AIProvider, InterviewQuestion, CareerRecommendation, EnhancedUser } from '../types/enhanced';

export class AIProviderService {
  private providers: AIProvider[] = [
    { name: 'openai', available: true },
    { name: 'gemini', available: true },
    { name: 'huggingface', available: true },
    { name: 'openrouter', available: true }
  ];

  private async callOpenAI(prompt: string, context?: any): Promise<any> {
    try {
      // Simulate OpenAI API call
      await this.delay(1500);
      
      if (prompt.includes('career counseling')) {
        return {
          response: "Based on your profile, I'd recommend focusing on emerging technologies like AI and cloud computing. These fields show strong growth potential and align with your technical background. Would you like me to create a detailed learning path for any specific area?",
          confidence: 0.92,
          provider: 'openai'
        };
      }
      
      if (prompt.includes('resume analysis')) {
        return {
          strengths: ['Strong technical skills', 'Diverse project experience', 'Good educational background'],
          weaknesses: ['Limited industry experience', 'Could improve soft skills presentation'],
          suggestions: [
            'Add quantifiable achievements',
            'Include more action verbs',
            'Highlight leadership experiences'
          ],
          score: 78,
          provider: 'openai'
        };
      }

      return { response: 'I can help you with career guidance and planning.', provider: 'openai' };
    } catch (error) {
      console.error('OpenAI API error:', error);
      throw error;
    }
  }

  private async callGemini(prompt: string, context?: any): Promise<any> {
    try {
      await this.delay(1200);
      
      if (prompt.includes('roadmap planning')) {
        return {
          roadmap: [
            {
              phase: 'Foundation (Months 1-2)',
              tasks: ['Learn Python basics', 'Understand data structures', 'Practice coding daily'],
              duration: '2 months',
              priority: 'high'
            },
            {
              phase: 'Intermediate (Months 3-4)',
              tasks: ['Master pandas and numpy', 'Learn SQL', 'Build first data project'],
              duration: '2 months',
              priority: 'high'
            },
            {
              phase: 'Advanced (Months 5-6)',
              tasks: ['Machine learning fundamentals', 'Portfolio development', 'Apply for internships'],
              duration: '2 months',
              priority: 'medium'
            }
          ],
          reasoning: 'This roadmap balances theoretical learning with practical application, ensuring steady progress.',
          provider: 'gemini'
        };
      }

      if (prompt.includes('aptitude analysis')) {
        return {
          aptitudeScores: {
            logical: 85,
            verbal: 78,
            numerical: 92,
            spatial: 70,
            creative: 88
          },
          recommendations: [
            'Strong analytical skills suggest data science or engineering careers',
            'High creativity score indicates potential in design or innovation roles'
          ],
          provider: 'gemini'
        };
      }

      return { analysis: 'Comprehensive reasoning completed', provider: 'gemini' };
    } catch (error) {
      console.error('Gemini API error:', error);
      throw error;
    }
  }

  private async callHuggingFace(prompt: string, context?: any): Promise<any> {
    try {
      await this.delay(1800);
      
      if (prompt.includes('skill classification')) {
        return {
          skills: [
            { skill: 'Python', category: 'Programming', confidence: 0.95 },
            { skill: 'Machine Learning', category: 'AI/ML', confidence: 0.88 },
            { skill: 'Data Analysis', category: 'Analytics', confidence: 0.92 }
          ],
          embeddings: [0.1, 0.2, 0.3, 0.4, 0.5], // Simplified embedding
          provider: 'huggingface'
        };
      }

      if (prompt.includes('resume parsing')) {
        return {
          extractedInfo: {
            name: 'John Doe',
            email: 'john@example.com',
            skills: ['Python', 'JavaScript', 'React', 'Node.js'],
            experience: '2 years',
            education: 'B.Tech Computer Science'
          },
          sentiment: 'positive',
          confidence: 0.89,
          provider: 'huggingface'
        };
      }

      return { classification: 'Text processed successfully', provider: 'huggingface' };
    } catch (error) {
      console.error('Hugging Face API error:', error);
      throw error;
    }
  }

  private async callOpenRouter(prompt: string, context?: any): Promise<any> {
    try {
      await this.delay(2000);
      
      return {
        response: 'This is a fallback response from OpenRouter using open-source models. I can provide basic career guidance and answer your questions.',
        model: 'mistral-7b',
        provider: 'openrouter'
      };
    } catch (error) {
      console.error('OpenRouter API error:', error);
      throw error;
    }
  }

  async generateCareerRecommendations(user: EnhancedUser): Promise<CareerRecommendation[]> {
    try {
      // Use Gemini for reasoning and OpenAI for detailed recommendations
      const geminiAnalysis = await this.callGemini('career analysis', user);
      const openaiRecommendations = await this.callOpenAI('career recommendations', user);
      
      // Simulate enhanced recommendations with multiple AI insights
      return [
        {
          career: {
            id: 'ai-engineer',
            title: 'AI/ML Engineer',
            description: 'Design and implement artificial intelligence systems and machine learning models.',
            requiredSkills: ['Python', 'TensorFlow', 'PyTorch', 'Statistics', 'Deep Learning'],
            averageSalary: '₹12,00,000 - ₹25,00,000',
            growthRate: '35%',
            industry: 'Technology',
            experienceLevel: 'Mid-level',
            education: ['B.Tech/M.Tech in CS/AI', 'Data Science Certification'],
            keyResponsibilities: [
              'Develop ML models and algorithms',
              'Deploy AI systems to production',
              'Optimize model performance',
              'Research new AI techniques'
            ],
            workEnvironment: 'Hybrid/Remote',
            jobOutlook: 'Excellent'
          },
          matchScore: 0.92,
          missingSkills: ['TensorFlow', 'Deep Learning', 'Statistics'],
          strengthSkills: ['Python', 'Problem Solving'],
          reasoning: 'Your strong analytical skills and programming background make you an excellent fit for AI/ML roles. The field is experiencing rapid growth in India with government initiatives like Digital India.'
        }
      ];
    } catch (error) {
      console.error('Error generating recommendations:', error);
      // Fallback to OpenRouter
      return await this.callOpenRouter('career recommendations fallback', user);
    }
  }

  async generateInterviewQuestions(career: string, difficulty: string = 'medium'): Promise<InterviewQuestion[]> {
    try {
      const geminiQuestions = await this.callGemini(`interview questions for ${career}`, { difficulty });
      
      return [
        {
          id: '1',
          question: 'Explain the difference between supervised and unsupervised learning.',
          expectedAnswer: 'Supervised learning uses labeled data to train models, while unsupervised learning finds patterns in unlabeled data.',
          difficulty: 'medium' as const,
          category: 'technical' as const,
          tips: [
            'Provide concrete examples',
            'Mention specific algorithms',
            'Discuss use cases for each'
          ]
        },
        {
          id: '2',
          question: 'Describe a challenging project you worked on and how you overcame obstacles.',
          expectedAnswer: 'Focus on problem-solving approach, teamwork, and learning outcomes.',
          difficulty: 'medium' as const,
          category: 'behavioral' as const,
          tips: [
            'Use the STAR method',
            'Highlight your role specifically',
            'Emphasize lessons learned'
          ]
        }
      ];
    } catch (error) {
      console.error('Error generating interview questions:', error);
      return [];
    }
  }

  async analyzeResume(resumeText: string): Promise<any> {
    try {
      const hfAnalysis = await this.callHuggingFace('resume parsing', { text: resumeText });
      const openaiSuggestions = await this.callOpenAI('resume analysis', { text: resumeText });
      
      return {
        ...hfAnalysis,
        ...openaiSuggestions,
        combinedScore: 82,
        aiInsights: 'Resume shows strong technical foundation with room for improvement in quantifying achievements.'
      };
    } catch (error) {
      console.error('Error analyzing resume:', error);
      return { error: 'Failed to analyze resume' };
    }
  }

  async chatWithAI(message: string, context: any, preferredProvider: string = 'openai'): Promise<any> {
    const providers = [preferredProvider, 'gemini', 'huggingface', 'openrouter'];
    
    for (const provider of providers) {
      try {
        switch (provider) {
          case 'openai':
            return await this.callOpenAI(`career counseling: ${message}`, context);
          case 'gemini':
            return await this.callGemini(`career guidance: ${message}`, context);
          case 'huggingface':
            return await this.callHuggingFace(`career chat: ${message}`, context);
          case 'openrouter':
            return await this.callOpenRouter(`career advice: ${message}`, context);
        }
      } catch (error) {
        console.warn(`${provider} failed, trying next provider...`);
        continue;
      }
    }
    
    throw new Error('All AI providers failed');
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  getProviderStatus(): AIProvider[] {
    return this.providers;
  }
}

export const aiProviderService = new AIProviderService();