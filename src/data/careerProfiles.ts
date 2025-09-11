import { CareerProfile } from '../types';

export const careerProfiles: CareerProfile[] = [
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    description: 'Analyze complex data to help businesses make informed decisions using statistical analysis and machine learning.',
    requiredSkills: ['Python', 'Statistics', 'Machine Learning', 'SQL', 'Data Visualization', 'R', 'Pandas', 'NumPy'],
    averageSalary: '$95,000 - $165,000',
    growthRate: '22%',
    industry: 'Technology',
    experienceLevel: 'Mid-level',
    education: ['Bachelor\'s in Statistics', 'Master\'s in Data Science', 'PhD in Mathematics'],
    keyResponsibilities: [
      'Collect and analyze large datasets',
      'Build predictive models',
      'Create data visualizations',
      'Present findings to stakeholders'
    ],
    workEnvironment: 'Office/Remote',
    jobOutlook: 'Excellent'
  },
  {
    id: 'full-stack-developer',
    title: 'Full Stack Developer',
    description: 'Build complete web applications handling both frontend and backend development.',
    requiredSkills: ['JavaScript', 'React', 'Node.js', 'HTML', 'CSS', 'SQL', 'Git', 'REST APIs'],
    averageSalary: '$75,000 - $130,000',
    growthRate: '13%',
    industry: 'Technology',
    experienceLevel: 'Entry to Mid-level',
    education: ['Bachelor\'s in Computer Science', 'Coding Bootcamp', 'Self-taught'],
    keyResponsibilities: [
      'Develop user interfaces',
      'Build server-side applications',
      'Design databases',
      'Deploy and maintain applications'
    ],
    workEnvironment: 'Office/Remote',
    jobOutlook: 'Very Good'
  },
  {
    id: 'ux-designer',
    title: 'UX Designer',
    description: 'Design user-centered digital experiences that are intuitive and engaging.',
    requiredSkills: ['Design Thinking', 'Figma', 'User Research', 'Prototyping', 'HTML/CSS', 'Adobe Creative Suite'],
    averageSalary: '$70,000 - $120,000',
    growthRate: '8%',
    industry: 'Design/Technology',
    experienceLevel: 'Entry to Mid-level',
    education: ['Bachelor\'s in Design', 'HCI Degree', 'Design Bootcamp'],
    keyResponsibilities: [
      'Conduct user research',
      'Create wireframes and prototypes',
      'Design user interfaces',
      'Collaborate with development teams'
    ],
    workEnvironment: 'Office/Hybrid',
    jobOutlook: 'Good'
  },
  {
    id: 'product-manager',
    title: 'Product Manager',
    description: 'Lead product development from conception to launch, working with cross-functional teams.',
    requiredSkills: ['Product Strategy', 'Analytics', 'Project Management', 'Communication', 'Market Research', 'Agile'],
    averageSalary: '$90,000 - $150,000',
    growthRate: '19%',
    industry: 'Technology/Business',
    experienceLevel: 'Mid to Senior-level',
    education: ['Bachelor\'s in Business', 'MBA', 'Technical Degree'],
    keyResponsibilities: [
      'Define product vision and strategy',
      'Analyze market trends and user feedback',
      'Coordinate with engineering and design teams',
      'Manage product roadmap and timeline'
    ],
    workEnvironment: 'Office/Hybrid',
    jobOutlook: 'Excellent'
  },
  {
    id: 'cybersecurity-analyst',
    title: 'Cybersecurity Analyst',
    description: 'Protect organizations from cyber threats by monitoring, detecting, and responding to security incidents.',
    requiredSkills: ['Network Security', 'Ethical Hacking', 'Risk Assessment', 'Incident Response', 'SIEM Tools', 'Compliance'],
    averageSalary: '$80,000 - $140,000',
    growthRate: '33%',
    industry: 'Technology/Security',
    experienceLevel: 'Entry to Mid-level',
    education: ['Bachelor\'s in Cybersecurity', 'Computer Science Degree', 'Security Certifications'],
    keyResponsibilities: [
      'Monitor security events',
      'Investigate security incidents',
      'Implement security measures',
      'Conduct vulnerability assessments'
    ],
    workEnvironment: 'Office/Remote',
    jobOutlook: 'Excellent'
  },
  {
    id: 'ai-engineer',
    title: 'AI/ML Engineer',
    description: 'Design and implement artificial intelligence and machine learning systems.',
    requiredSkills: ['Python', 'TensorFlow', 'PyTorch', 'Deep Learning', 'Neural Networks', 'Computer Vision', 'NLP'],
    averageSalary: '$110,000 - $180,000',
    growthRate: '25%',
    industry: 'Technology/AI',
    experienceLevel: 'Mid to Senior-level',
    education: ['Master\'s in AI/ML', 'PhD in Computer Science', 'Bachelor\'s in Engineering'],
    keyResponsibilities: [
      'Develop ML models and algorithms',
      'Deploy AI systems to production',
      'Optimize model performance',
      'Research new AI techniques'
    ],
    workEnvironment: 'Office/Remote',
    jobOutlook: 'Excellent'
  },
  {
    id: 'cloud-architect',
    title: 'Cloud Architect',
    description: 'Design and implement cloud computing strategies and infrastructure for organizations.',
    requiredSkills: ['AWS', 'Azure', 'Google Cloud', 'DevOps', 'Kubernetes', 'Microservices', 'Security'],
    averageSalary: '$120,000 - $200,000',
    growthRate: '23%',
    industry: 'Technology/Cloud',
    experienceLevel: 'Senior-level',
    education: ['Bachelor\'s in Computer Science', 'Cloud Certifications', 'Engineering Degree'],
    keyResponsibilities: [
      'Design cloud architecture',
      'Implement cloud migration strategies',
      'Ensure security and compliance',
      'Optimize cloud costs and performance'
    ],
    workEnvironment: 'Office/Remote',
    jobOutlook: 'Excellent'
  },
  {
    id: 'digital-marketer',
    title: 'Digital Marketing Manager',
    description: 'Develop and execute digital marketing strategies to promote products and services online.',
    requiredSkills: ['SEO/SEM', 'Social Media Marketing', 'Content Marketing', 'Analytics', 'PPC', 'Email Marketing'],
    averageSalary: '$60,000 - $110,000',
    growthRate: '10%',
    industry: 'Marketing/Business',
    experienceLevel: 'Entry to Mid-level',
    education: ['Bachelor\'s in Marketing', 'Business Degree', 'Digital Marketing Certificates'],
    keyResponsibilities: [
      'Develop marketing campaigns',
      'Analyze campaign performance',
      'Manage social media presence',
      'Create content strategies'
    ],
    workEnvironment: 'Office/Remote',
    jobOutlook: 'Good'
  },
  {
    id: 'mobile-developer',
    title: 'Mobile App Developer',
    description: 'Create mobile applications for iOS and Android platforms.',
    requiredSkills: ['React Native', 'Swift', 'Kotlin', 'Flutter', 'Mobile UI/UX', 'App Store Optimization'],
    averageSalary: '$70,000 - $125,000',
    growthRate: '22%',
    industry: 'Technology/Mobile',
    experienceLevel: 'Entry to Mid-level',
    education: ['Bachelor\'s in Computer Science', 'Mobile Development Bootcamp', 'Self-taught'],
    keyResponsibilities: [
      'Design mobile app interfaces',
      'Develop mobile applications',
      'Test apps on different devices',
      'Publish apps to app stores'
    ],
    workEnvironment: 'Office/Remote',
    jobOutlook: 'Very Good'
  },
  {
    id: 'blockchain-developer',
    title: 'Blockchain Developer',
    description: 'Build decentralized applications and smart contracts using blockchain technology.',
    requiredSkills: ['Solidity', 'Web3', 'Ethereum', 'Smart Contracts', 'Cryptography', 'DeFi'],
    averageSalary: '$90,000 - $160,000',
    growthRate: '67%',
    industry: 'Technology/Blockchain',
    experienceLevel: 'Mid-level',
    education: ['Bachelor\'s in Computer Science', 'Blockchain Certifications', 'Self-taught'],
    keyResponsibilities: [
      'Develop smart contracts',
      'Build decentralized applications',
      'Implement blockchain protocols',
      'Audit and secure blockchain code'
    ],
    workEnvironment: 'Office/Remote',
    jobOutlook: 'Excellent'
  }
];