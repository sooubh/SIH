import React from 'react';
import { User, CareerRecommendation } from '../../types';
import { TrendingUp, Target, Award, BookOpen } from 'lucide-react';

interface QuickStatsProps {
  user: User;
  recommendations: CareerRecommendation[];
}

const QuickStats: React.FC<QuickStatsProps> = ({ user, recommendations }) => {
  const topMatch = recommendations[0];
  const averageMatchScore = recommendations.length > 0 
    ? (recommendations.reduce((sum, rec) => sum + rec.matchScore, 0) / recommendations.length * 100)
    : 0;
  
  const totalMissingSkills = recommendations.reduce((sum, rec) => sum + rec.missingSkills.length, 0);
  const uniqueMissingSkills = new Set(recommendations.flatMap(rec => rec.missingSkills)).size;

  const stats = [
    {
      title: 'Profile Match Score',
      value: `${Math.round(averageMatchScore)}%`,
      subtitle: 'Average compatibility',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Skills You Have',
      value: user.skills.length.toString(),
      subtitle: 'Marketable skills',
      icon: Award,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Skills to Learn',
      value: uniqueMissingSkills.toString(),
      subtitle: 'For top careers',
      icon: Target,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'Career Options',
      value: recommendations.length.toString(),
      subtitle: 'Recommended paths',
      icon: BookOpen,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-1">{stat.subtitle}</p>
            </div>
            <div className={`p-3 rounded-full ${stat.bgColor}`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuickStats;