import { AssessmentQuestion } from '../types';

export const assessmentQuestions: AssessmentQuestion[] = [
  // Interest Questions
  {
    id: 'interest-1',
    question: 'Which type of work environment excites you most?',
    options: [
      'Working with data and analytics',
      'Creating visual designs and user experiences',
      'Building and coding applications',
      'Leading teams and making strategic decisions'
    ],
    category: 'interests'
  },
  {
    id: 'interest-2',
    question: 'What kind of problems do you enjoy solving?',
    options: [
      'Complex analytical puzzles',
      'Creative design challenges',
      'Technical coding problems',
      'Business strategy issues'
    ],
    category: 'interests'
  },
  {
    id: 'interest-3',
    question: 'Which industry appeals to you most?',
    options: [
      'Technology and Innovation',
      'Healthcare and Life Sciences',
      'Finance and Banking',
      'Entertainment and Media'
    ],
    category: 'interests'
  },
  {
    id: 'interest-4',
    question: 'How do you prefer to work?',
    options: [
      'Independently on focused tasks',
      'Collaboratively in team projects',
      'Leading and mentoring others',
      'Balancing solo and team work'
    ],
    category: 'interests'
  },
  {
    id: 'interest-5',
    question: 'What motivates you most in your career?',
    options: [
      'Solving complex problems',
      'Creating beautiful products',
      'Building innovative solutions',
      'Making strategic impact'
    ],
    category: 'interests'
  },
  
  // Skills Questions
  {
    id: 'skill-1',
    question: 'How comfortable are you with programming?',
    options: [
      'Very comfortable - I code regularly',
      'Somewhat comfortable - I know basics',
      'Learning - I\'m just getting started',
      'Not comfortable - I prefer other skills'
    ],
    category: 'skills'
  },
  {
    id: 'skill-2',
    question: 'How do you rate your analytical thinking skills?',
    options: [
      'Excellent - I love data and patterns',
      'Good - I can analyze information well',
      'Average - I can learn with practice',
      'Prefer other types of thinking'
    ],
    category: 'skills'
  },
  {
    id: 'skill-3',
    question: 'How strong are your communication skills?',
    options: [
      'Excellent - I love presenting and writing',
      'Good - I communicate effectively',
      'Average - I can improve with practice',
      'Prefer technical over communication tasks'
    ],
    category: 'skills'
  },
  {
    id: 'skill-4',
    question: 'How comfortable are you with design and creativity?',
    options: [
      'Very comfortable - I have a design background',
      'Somewhat comfortable - I appreciate good design',
      'Learning - I\'m developing my eye for design',
      'Not comfortable - I prefer other skills'
    ],
    category: 'skills'
  },
  {
    id: 'skill-5',
    question: 'How do you handle learning new technologies?',
    options: [
      'I love it - I\'m always learning something new',
      'I adapt well - I pick up new tools quickly',
      'I manage - with time and effort I can learn',
      'I prefer mastering tools I already know'
    ],
    category: 'skills'
  },
  
  // Personality Questions
  {
    id: 'personality-1',
    question: 'Which best describes your work style?',
    options: [
      'Detail-oriented and methodical',
      'Creative and innovative',
      'Results-driven and efficient',
      'Collaborative and people-focused'
    ],
    category: 'personality'
  },
  {
    id: 'personality-2',
    question: 'How do you prefer to learn new things?',
    options: [
      'Through hands-on practice and experimentation',
      'Through structured courses and tutorials',
      'Through reading and research',
      'Through discussion and collaboration'
    ],
    category: 'personality'
  },
  {
    id: 'personality-3',
    question: 'What\'s your ideal work-life balance?',
    options: [
      'I\'m passionate about work and don\'t mind long hours',
      'I want flexibility to pursue other interests',
      'I prefer standard hours with clear boundaries',
      'I want variety - sometimes intense, sometimes relaxed'
    ],
    category: 'personality'
  }
];