import { CareerPath } from '../types/student';

export const studentCareerPaths: CareerPath[] = [
  {
    id: 'digital-marketing',
    title: 'Digital Marketing Specialist',
    overview: 'Promote products and services online through social media, search engines, email, and other digital channels. Great for creative students with good communication skills.',
    eligibility: {
      stream: ['commerce', 'arts', 'science'],
      subjects: ['English', 'Computer Science', 'Business Studies'],
      minimumMarks: 45
    },
    futureScope: 'Rapidly growing field with increasing digitalization. Opportunities in startups, agencies, and large corporations. Many successful marketers are self-taught.',
    jobOpportunities: [
      'Digital Marketing Manager',
      'Social Media Manager',
      'SEO Specialist',
      'Content Creator',
      'PPC Expert',
      'Marketing Analyst'
    ],
    salaryRange: {
      india: { min: 250000, max: 1200000 },
      abroad: { min: 2000000, max: 6000000 },
      currency: 'INR'
    },
    keySkills: [
      'Social Media Marketing',
      'Content Creation',
      'SEO/SEM',
      'Analytics',
      'Creativity',
      'Communication'
    ],
    entranceExams: ['No specific entrance exams required'],
    qualifications: ['BBA', 'B.Com', 'BA', 'Digital Marketing Certification'],
    recommendedCourses: [
      {
        id: 'google-digital-marketing',
        title: 'Google Digital Marketing Course',
        provider: 'Google',
        type: 'online',
        cost: 'free',
        duration: '3 months',
        url: 'https://learndigital.withgoogle.com/',
        rating: 4.7
      }
    ],
    duration: '3 years (Bachelor) + 6 months (Certification)',
    difficulty: 'easy',
    jobDemand: 'high',
    emergingField: true
  },
  {
    id: 'graphic-designer',
    title: 'Graphic Designer / UI/UX Designer',
    overview: 'Create visual content for websites, apps, advertisements, and print media. Design user interfaces and experiences for digital products. Perfect for artistic students.',
    eligibility: {
      stream: ['arts', 'commerce', 'science'],
      subjects: ['Fine Arts', 'Computer Science', 'English'],
      minimumMarks: 45
    },
    futureScope: 'Growing demand in digital agencies, tech companies, and freelance market. Opportunities in web design, app design, and branding.',
    jobOpportunities: [
      'Graphic Designer',
      'UI/UX Designer',
      'Web Designer',
      'Brand Designer',
      'Creative Director',
      'Freelance Designer'
    ],
    salaryRange: {
      india: { min: 200000, max: 1000000 },
      abroad: { min: 1500000, max: 5000000 },
      currency: 'INR'
    },
    keySkills: [
      'Adobe Creative Suite',
      'Design Principles',
      'Creativity',
      'User Experience',
      'Typography',
      'Color Theory'
    ],
    entranceExams: ['NIFT', 'NID', 'CEED', 'UCEED'],
    qualifications: ['B.Des', 'BFA', 'Diploma in Design', 'Online Certifications'],
    recommendedCourses: [
      {
        id: 'ui-ux-design',
        title: 'UI/UX Design Specialization',
        provider: 'CalArts (Coursera)',
        type: 'online',
        cost: 'paid',
        duration: '6 months',
        url: 'https://coursera.org/specializations/ui-ux-design',
        rating: 4.6
      }
    ],
    duration: '3-4 years (Bachelor)',
    difficulty: 'medium',
    jobDemand: 'medium',
    emergingField: true
  },
  {
    id: 'content-creator',
    title: 'Content Creator / YouTuber',
    overview: 'Create engaging content for social media platforms, YouTube, blogs, and other digital channels. Build an audience and monetize your creativity.',
    eligibility: {
      stream: ['arts', 'commerce', 'science'],
      subjects: ['English', 'Any subject'],
      minimumMarks: 40
    },
    futureScope: 'Explosive growth in content consumption. Opportunities in influencer marketing, brand partnerships, and digital entrepreneurship.',
    jobOpportunities: [
      'YouTuber',
      'Social Media Influencer',
      'Blogger',
      'Podcaster',
      'Video Editor',
      'Content Strategist'
    ],
    salaryRange: {
      india: { min: 100000, max: 5000000 },
      abroad: { min: 1000000, max: 20000000 },
      currency: 'INR'
    },
    keySkills: [
      'Video Editing',
      'Content Writing',
      'Social Media',
      'Photography',
      'Creativity',
      'Communication'
    ],
    entranceExams: ['No entrance exams required'],
    qualifications: ['Any Bachelor degree', 'Self-taught', 'Online courses'],
    recommendedCourses: [
      {
        id: 'youtube-creator',
        title: 'YouTube Creator Academy',
        provider: 'YouTube',
        type: 'online',
        cost: 'free',
        duration: 'Self-paced',
        url: 'https://creatoracademy.youtube.com/',
        rating: 4.5
      }
    ],
    duration: 'Self-paced learning',
    difficulty: 'easy',
    jobDemand: 'high',
    emergingField: true
  },
  {
    id: 'teacher',
    title: 'Teacher / Education',
    overview: 'Educate and inspire students at various levels. Can specialize in specific subjects or work in administration and curriculum development.',
    eligibility: {
      stream: ['arts', 'science', 'commerce'],
      subjects: ['Any subject for specialization'],
      minimumMarks: 50
    },
    futureScope: 'Stable career with opportunities in schools, colleges, online education, and educational technology companies.',
    jobOpportunities: [
      'School Teacher',
      'College Professor',
      'Online Educator',
      'Educational Consultant',
      'Curriculum Developer',
      'Principal/Administrator'
    ],
    salaryRange: {
      india: { min: 200000, max: 800000 },
      abroad: { min: 2500000, max: 8000000 },
      currency: 'INR'
    },
    keySkills: [
      'Subject Knowledge',
      'Communication',
      'Patience',
      'Leadership',
      'Technology Skills',
      'Creativity'
    ],
    entranceExams: ['B.Ed Entrance', 'TET', 'CTET', 'NET/SET'],
    qualifications: ['Bachelor + B.Ed', 'M.Ed', 'Ph.D for college teaching'],
    recommendedCourses: [
      {
        id: 'teaching-methods',
        title: 'Modern Teaching Methods',
        provider: 'IGNOU',
        type: 'online',
        cost: 'free',
        duration: '6 months',
        url: 'https://ignou.ac.in/',
        rating: 4.3
      }
    ],
    duration: '3 years (Bachelor) + 2 years (B.Ed)',
    difficulty: 'easy',
    jobDemand: 'medium',
    emergingField: false
  },
  {
    id: 'hospitality-tourism',
    title: 'Hospitality & Tourism',
    overview: 'Work in hotels, restaurants, travel agencies, and tourism companies. Great for people-oriented students who enjoy serving others.',
    eligibility: {
      stream: ['arts', 'commerce', 'science'],
      subjects: ['English', 'Any subject'],
      minimumMarks: 45
    },
    futureScope: 'Growing tourism industry in India. Opportunities in luxury hotels, resorts, travel companies, and event management.',
    jobOpportunities: [
      'Hotel Manager',
      'Travel Agent',
      'Event Planner',
      'Restaurant Manager',
      'Tour Guide',
      'Customer Service'
    ],
    salaryRange: {
      india: { min: 180000, max: 800000 },
      abroad: { min: 2000000, max: 6000000 },
      currency: 'INR'
    },
    keySkills: [
      'Customer Service',
      'Communication',
      'Multilingual',
      'Problem Solving',
      'Leadership',
      'Cultural Awareness'
    ],
    entranceExams: ['IHM Entrance', 'NCHMCT JEE'],
    qualifications: ['BHM', 'BBA Tourism', 'Diploma in Hotel Management'],
    recommendedCourses: [
      {
        id: 'hospitality-management',
        title: 'Hospitality Management',
        provider: 'IHM',
        type: 'offline',
        cost: 'paid',
        duration: '3 years',
        url: 'https://ihmctan.edu.in/',
        rating: 4.2
      }
    ],
    duration: '3 years (Bachelor)',
    difficulty: 'easy',
    jobDemand: 'medium',
    emergingField: false
  },
  {
    id: 'fitness-trainer',
    title: 'Fitness Trainer / Sports Coach',
    overview: 'Help people achieve their fitness goals through exercise, nutrition guidance, and motivation. Perfect for sports-loving students.',
    eligibility: {
      stream: ['arts', 'science', 'commerce'],
      subjects: ['Physical Education', 'Biology'],
      minimumMarks: 40
    },
    futureScope: 'Growing fitness awareness and gym culture. Opportunities in gyms, sports clubs, personal training, and online fitness coaching.',
    jobOpportunities: [
      'Personal Trainer',
      'Gym Instructor',
      'Sports Coach',
      'Nutritionist',
      'Fitness Blogger',
      'Online Coach'
    ],
    salaryRange: {
      india: { min: 150000, max: 600000 },
      abroad: { min: 1500000, max: 4000000 },
      currency: 'INR'
    },
    keySkills: [
      'Physical Fitness',
      'Nutrition Knowledge',
      'Motivation',
      'Communication',
      'Anatomy',
      'First Aid'
    ],
    entranceExams: ['No specific entrance exams'],
    qualifications: ['B.P.Ed', 'Fitness Certification', 'Sports Science'],
    recommendedCourses: [
      {
        id: 'fitness-certification',
        title: 'Personal Training Certification',
        provider: 'ACE',
        type: 'online',
        cost: 'paid',
        duration: '3 months',
        url: 'https://acefitness.org/',
        rating: 4.4
      }
    ],
    duration: '1-3 years (Certification/Degree)',
    difficulty: 'easy',
    jobDemand: 'medium',
    emergingField: true
  },
  {
    id: 'beauty-wellness',
    title: 'Beauty & Wellness',
    overview: 'Work in beauty salons, spas, or start your own beauty business. Great for creative students interested in fashion and beauty.',
    eligibility: {
      stream: ['arts', 'commerce', 'science'],
      subjects: ['Any subject'],
      minimumMarks: 40
    },
    futureScope: 'Growing beauty industry with opportunities in salons, spas, beauty brands, and online beauty consulting.',
    jobOpportunities: [
      'Beauty Therapist',
      'Makeup Artist',
      'Hair Stylist',
      'Spa Manager',
      'Beauty Consultant',
      'Beauty Blogger'
    ],
    salaryRange: {
      india: { min: 120000, max: 500000 },
      abroad: { min: 1000000, max: 3000000 },
      currency: 'INR'
    },
    keySkills: [
      'Beauty Techniques',
      'Customer Service',
      'Creativity',
      'Communication',
      'Business Skills',
      'Trend Awareness'
    ],
    entranceExams: ['No specific entrance exams'],
    qualifications: ['Beauty Course', 'Cosmetology Diploma', 'Self-taught'],
    recommendedCourses: [
      {
        id: 'beauty-course',
        title: 'Professional Beauty Course',
        provider: 'Lakme Academy',
        type: 'offline',
        cost: 'paid',
        duration: '6 months',
        url: 'https://lakmeacademy.com/',
        rating: 4.3
      }
    ],
    duration: '6 months - 2 years',
    difficulty: 'easy',
    jobDemand: 'medium',
    emergingField: true
  },
  {
    id: 'retail-sales',
    title: 'Retail & Sales',
    overview: 'Work in retail stores, showrooms, or as sales representatives. Great for students with good communication and persuasion skills.',
    eligibility: {
      stream: ['arts', 'commerce', 'science'],
      subjects: ['Any subject'],
      minimumMarks: 40
    },
    futureScope: 'Always in demand across various industries. Opportunities in retail chains, automobile showrooms, real estate, and B2B sales.',
    jobOpportunities: [
      'Sales Executive',
      'Retail Manager',
      'Store Manager',
      'Customer Service Rep',
      'Business Development',
      'Account Manager'
    ],
    salaryRange: {
      india: { min: 150000, max: 600000 },
      abroad: { min: 2000000, max: 5000000 },
      currency: 'INR'
    },
    keySkills: [
      'Communication',
      'Persuasion',
      'Customer Service',
      'Product Knowledge',
      'Negotiation',
      'Relationship Building'
    ],
    entranceExams: ['No specific entrance exams'],
    qualifications: ['Any Bachelor degree', 'Sales Certification'],
    recommendedCourses: [
      {
        id: 'sales-training',
        title: 'Sales Training Program',
        provider: 'Dale Carnegie',
        type: 'offline',
        cost: 'paid',
        duration: '2 months',
        url: 'https://dalecarnegie.com/',
        rating: 4.5
      }
    ],
    duration: '3 years (Bachelor) + Training',
    difficulty: 'easy',
    jobDemand: 'high',
    emergingField: false
  }
];