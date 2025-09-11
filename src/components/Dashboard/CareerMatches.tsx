import React from 'react';
import { CareerRecommendation } from '../../types';
import { ArrowRight, RefreshCw, Briefcase, DollarSign, TrendingUp, MapPin } from 'lucide-react';
import SkillTag from '../SkillTag';

interface CareerMatchesProps {
  recommendations: CareerRecommendation[];
  onViewRoadmap: (recommendation: CareerRecommendation) => void;
  onRegenerateRecommendations: () => void;
}

const CareerMatches: React.FC<CareerMatchesProps> = ({ 
  recommendations, 
  onViewRoadmap,
  onRegenerateRecommendations 
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Career Matches</h2>
          <p className="text-gray-600">Careers tailored to your profile</p>
        </div>
        <button
          onClick={onRegenerateRecommendations}
          className="flex items-center space-x-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
        >
          <RefreshCw className="h-4 w-4" />
          <span>Refresh</span>
        </button>
      </div>

      <div className="space-y-6">
        {recommendations.map((recommendation, index) => (
          <div
            key={recommendation.career.id}
            className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-200"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-xl font-bold text-gray-900">
                    {recommendation.career.title}
                  </h3>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    {Math.round(recommendation.matchScore * 100)}% Match
                  </span>
                </div>
                <p className="text-gray-600 mb-3">{recommendation.career.description}</p>
                <p className="text-sm text-blue-600 font-medium">{recommendation.reasoning}</p>
              </div>
            </div>

            {/* Career Details */}
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4 text-green-600" />
                <div>
                  <p className="text-xs text-gray-500">Salary Range</p>
                  <p className="font-semibold text-gray-900">{recommendation.career.averageSalary}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-blue-600" />
                <div>
                  <p className="text-xs text-gray-500">Growth Rate</p>
                  <p className="font-semibold text-gray-900">{recommendation.career.growthRate}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-purple-600" />
                <div>
                  <p className="text-xs text-gray-500">Work Environment</p>
                  <p className="font-semibold text-gray-900">{recommendation.career.workEnvironment}</p>
                </div>
              </div>
            </div>

            {/* Skills Analysis */}
            <div className="space-y-3 mb-4">
              {recommendation.strengthSkills.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Your Strengths:</p>
                  <div className="flex flex-wrap gap-2">
                    {recommendation.strengthSkills.map(skill => (
                      <SkillTag key={skill} skill={skill} variant="strength" size="sm" />
                    ))}
                  </div>
                </div>
              )}
              
              {recommendation.missingSkills.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Skills to Develop:</p>
                  <div className="flex flex-wrap gap-2">
                    {recommendation.missingSkills.slice(0, 5).map(skill => (
                      <SkillTag key={skill} skill={skill} variant="missing" size="sm" />
                    ))}
                    {recommendation.missingSkills.length > 5 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                        +{recommendation.missingSkills.length - 5} more
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Action Button */}
            <div className="flex justify-end">
              <button
                onClick={() => onViewRoadmap(recommendation)}
                className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <Briefcase className="h-4 w-4" />
                <span>View Learning Roadmap</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {recommendations.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🔍</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No recommendations yet</h3>
          <p className="text-gray-600">Complete your profile to get personalized career matches.</p>
        </div>
      )}
    </div>
  );
};

export default CareerMatches;