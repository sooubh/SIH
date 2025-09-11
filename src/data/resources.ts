import { Resource } from '../types';

export const resources: Resource[] = [
  // Python Resources
  {
    id: 'python-everyone',
    title: 'Python for Everybody',
    url: 'https://www.coursera.org/specializations/python',
    type: 'course',
    provider: 'Coursera',
    duration: '8 months',
    cost: 'free',
    rating: 4.8,
    difficulty: 'beginner'
  },
  {
    id: 'automate-python',
    title: 'Automate the Boring Stuff with Python',
    url: 'https://automatetheboringstuff.com/',
    type: 'book',
    provider: 'Free Online',
    duration: '2 weeks',
    cost: 'free',
    rating: 4.7,
    difficulty: 'beginner'
  },
  
  // JavaScript Resources
  {
    id: 'javascript-fundamentals',
    title: 'JavaScript: The Complete Guide',
    url: 'https://www.udemy.com/course/javascript-the-complete-guide-2020-beginner-advanced/',
    type: 'course',
    provider: 'Udemy',
    duration: '52 hours',
    cost: 'paid',
    rating: 4.6,
    difficulty: 'intermediate'
  },
  {
    id: 'fcc-javascript',
    title: 'JavaScript Algorithms and Data Structures',
    url: 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/',
    type: 'course',
    provider: 'freeCodeCamp',
    duration: '300 hours',
    cost: 'free',
    rating: 4.8,
    difficulty: 'intermediate'
  },
  
  // React Resources
  {
    id: 'react-official',
    title: 'React Official Tutorial',
    url: 'https://react.dev/learn',
    type: 'tutorial',
    provider: 'React Team',
    duration: '1 week',
    cost: 'free',
    rating: 4.9,
    difficulty: 'beginner'
  },
  {
    id: 'fullstack-react',
    title: 'The Complete React Developer Course',
    url: 'https://www.udemy.com/course/react-2nd-edition/',
    type: 'course',
    provider: 'Udemy',
    duration: '39 hours',
    cost: 'paid',
    rating: 4.7,
    difficulty: 'intermediate'
  },
  
  // Data Science Resources
  {
    id: 'data-science-coursera',
    title: 'Data Science Specialization',
    url: 'https://www.coursera.org/specializations/jhu-data-science',
    type: 'course',
    provider: 'Johns Hopkins',
    duration: '11 months',
    cost: 'free',
    rating: 4.6,
    difficulty: 'intermediate'
  },
  {
    id: 'kaggle-learn',
    title: 'Kaggle Learn',
    url: 'https://www.kaggle.com/learn',
    type: 'course',
    provider: 'Kaggle',
    duration: 'Self-paced',
    cost: 'free',
    rating: 4.5,
    difficulty: 'beginner'
  },
  
  // Machine Learning Resources
  {
    id: 'ml-andrew-ng',
    title: 'Machine Learning Course',
    url: 'https://www.coursera.org/learn/machine-learning',
    type: 'course',
    provider: 'Stanford',
    duration: '11 weeks',
    cost: 'free',
    rating: 4.9,
    difficulty: 'intermediate'
  },
  {
    id: 'hands-on-ml',
    title: 'Hands-On Machine Learning',
    url: 'https://www.oreilly.com/library/view/hands-on-machine-learning/9781492032632/',
    type: 'book',
    provider: 'O\'Reilly',
    duration: '3 months',
    cost: 'paid',
    rating: 4.8,
    difficulty: 'intermediate'
  },
  
  // UI/UX Design Resources
  {
    id: 'figma-basics',
    title: 'Figma for Beginners',
    url: 'https://www.figma.com/resources/learn-design/',
    type: 'tutorial',
    provider: 'Figma',
    duration: '2 weeks',
    cost: 'free',
    rating: 4.7,
    difficulty: 'beginner'
  },
  {
    id: 'google-ux-design',
    title: 'Google UX Design Certificate',
    url: 'https://www.coursera.org/professional-certificates/google-ux-design',
    type: 'certification',
    provider: 'Google',
    duration: '6 months',
    cost: 'paid',
    rating: 4.6,
    difficulty: 'beginner'
  },
  
  // Cloud Computing Resources
  {
    id: 'aws-cloud-practitioner',
    title: 'AWS Cloud Practitioner',
    url: 'https://aws.amazon.com/certification/certified-cloud-practitioner/',
    type: 'certification',
    provider: 'AWS',
    duration: '3 months',
    cost: 'paid',
    rating: 4.5,
    difficulty: 'beginner'
  },
  {
    id: 'azure-fundamentals',
    title: 'Azure Fundamentals',
    url: 'https://docs.microsoft.com/en-us/learn/paths/azure-fundamentals/',
    type: 'course',
    provider: 'Microsoft',
    duration: '6 weeks',
    cost: 'free',
    rating: 4.4,
    difficulty: 'beginner'
  }
];