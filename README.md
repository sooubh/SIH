# Student Career Guide

A focused career guidance platform designed specifically for students in Class 10 and 12, with emphasis on careers suitable for students with lower academic grades.

## Features

- **Student-Focused Onboarding**: Simple 4-step profile creation process
- **Low-Grade Friendly Careers**: Career recommendations suitable for students with 40-60% marks
- **Parent Mode**: Detailed explanations for parents to understand career choices
- **Career Comparison**: Side-by-side comparison of different career paths
- **Realistic Career Options**: Focus on practical, achievable careers like:
  - Digital Marketing
  - Graphic Design
  - Content Creation
  - Teaching
  - Hospitality & Tourism
  - Fitness Training
  - Beauty & Wellness
  - Retail & Sales

## Target Audience

This platform is specifically designed for:

- Students in Class 10 and 12
- Students with academic scores between 40-70%
- Students looking for practical, achievable career paths
- Parents who want to understand their child's career options

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Routing**: React Router

## Getting Started

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Project Structure

```
src/
├── components/          # React components
│   ├── Home/           # Landing page
│   ├── Navigation/     # Simple navigation
│   └── Student/        # Student-specific features
│       ├── StudentOnboarding.tsx
│       ├── StudentDashboard.tsx
│       ├── CareerRecommendationCard.tsx
│       ├── CareerComparisonModal.tsx
│       └── ParentModeExplanation.tsx
├── data/               # Career path data
│   └── studentCareerPaths.ts
├── services/           # Career recommendation logic
│   └── studentCareerService.ts
└── types/              # TypeScript definitions
    └── student.ts
```

## Key Features

### Student Onboarding

- Simple 4-step process
- Basic information collection
- Academic performance tracking
- Interest and personality assessment
- Goal setting

### Career Recommendations

- Personalized suggestions based on:
  - Academic performance (40-70% range)
  - Interests and personality
  - Stream selection (Science/Commerce/Arts)
  - Career goals

### Parent Mode

- Detailed explanations for parents
- Career prospects and salary information
- Investment requirements
- Future scope and job security

### Career Comparison

- Side-by-side comparison of career options
- Duration, difficulty, and cost analysis
- Job demand and salary comparison
- Personalized recommendations

## Career Categories

The platform focuses on careers that are:

- **Accessible**: Lower academic requirements
- **Practical**: Real-world job opportunities
- **Growing**: Emerging fields with good prospects
- **Diverse**: Options across different streams

## Philosophy

This platform believes that:

- Every student has potential regardless of academic scores
- Success comes in many forms beyond traditional careers
- Practical skills are as valuable as academic knowledge
- Parents should be involved in career decisions
- Career guidance should be realistic and achievable

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
