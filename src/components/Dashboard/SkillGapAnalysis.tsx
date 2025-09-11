import React from 'react';
import { CareerRecommendation } from '../../types';
import { Target, TrendingUp } from 'lucide-react';
import SkillTag from '../SkillTag';

interface SkillGapAnalysisProps {
  recommendations: CareerRecommendation[];
  userSkills: string[];
}

const SkillGapAnalysis: React.FC<SkillGapAnalysisProps> = ({ recommendations, userSkills }) => {
  // Analyze skill gaps across all recommendations
  const skillGapAnalysis = React.useMemo(() => {
    const skillCounts: { [skill: string]: number } = {};
    const skillImportance: { [skill: string]: number } = {};

    recommendations.forEach((rec, index) => {
      const weight = recommendations.length - index; // Higher weight for better matches
      
      rec.missingSkills.forEach(skill => {
        skillCounts[skill] = (skillCounts[skill] || 0) + 1;
        skillImportance[skill] = (skillImportance[skill] || 0) + weight;
      });
    });

    const prioritySkills = Object.entries(skillCounts)
      .map(([skill, count]) => ({
        skill,
        count,
        importance: skillImportance[skill] / count, // Average importance
        priority: count >= 2 ? 'high' : count === 1 ? 'medium' : 'low'
      }))
      .sort((a, b) => b.importance - a.importance)
      .slice(0, 8);

    return prioritySkills;
  }, [recommendations]);

  const completionRate = React.useMemo(() => {
    if (recommendations.length === 0) return 0;
    
    const totalRequiredSkills = recommendations.reduce((sum, rec) => 
      sum + rec.career.requiredSkills.length, 0);
    const totalMatchedSkills = recommendations.reduce((sum, rec) => 
      sum + rec.strengthSkills.length, 0);
    
    return Math.round((totalMatchedSkills / totalRequiredSkills) * 100);
  }, [recommendations]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
          <Target className="h-5 w-5 text-orange-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Skill Gap Analysis</h2>
          <p className="text-gray-600 text-sm">Focus areas for growth</p>
        </div>
      </div>

      {/* Completion Rate */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Skill Readiness</span>
          <span className="text-sm text-gray-600">{completionRate}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-orange-500 to-red-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${completionRate}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Based on your target career requirements
        </p>
      </div>

      {/* Priority Skills */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900 flex items-center space-x-2">
          <TrendingUp className="h-4 w-4 text-blue-600" />
          <span>Priority Skills to Learn</span>
        </h3>
        
        {skillGapAnalysis.length > 0 ? (
          <div className="space-y-3">
            {skillGapAnalysis.map(({ skill, count, priority }) => (
              <div key={skill} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <SkillTag skill={skill} variant="missing" size="sm" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{skill}</p>
                    <p className="text-xs text-gray-500">
                      Required for {count} career{count > 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  priority === 'high' 
                    ? 'bg-red-100 text-red-800' 
                    : priority === 'medium'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-green-100 text-green-800'
                }`}>
                  {priority} priority
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="text-green-500 text-4xl mb-2">✅</div>
            <p className="text-gray-600 text-sm">
              Great! You have most skills needed for your target careers.
            </p>
          </div>
        )}
      </div>

      {/* Current Strengths */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-3">Your Current Strengths</h3>
        <div className="flex flex-wrap gap-2">
          {userSkills.slice(0, 6).map(skill => (
            <SkillTag key={skill} skill={skill} variant="strength" size="sm" />
          ))}
          {userSkills.length > 6 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
              +{userSkills.length - 6} more
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default SkillGapAnalysis;