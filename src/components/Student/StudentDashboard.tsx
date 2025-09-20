import React, { useState, useEffect } from 'react';
import { StudentProfile, CareerRecommendation, CareerComparison } from '../../types/student';
import { StudentCareerService } from '../../services/studentCareerService';
import LoadingSpinner from '../LoadingSpinner';
import CareerRecommendationCard from './CareerRecommendationCard';
import CareerComparisonModal from './CareerComparisonModal';
import ParentModeExplanation from './ParentModeExplanation';
import { MessageSquare, Users, TrendingUp, Award, RefreshCw } from 'lucide-react';

interface StudentDashboardProps {
  student: StudentProfile;
  onUpdateStudent: (student: StudentProfile) => void;
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ student, onUpdateStudent }) => {
  const [recommendations, setRecommendations] = useState<CareerRecommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [showComparison, setShowComparison] = useState(false);
  const [comparisonData, setComparisonData] = useState<CareerComparison | null>(null);
  const [selectedCareers, setSelectedCareers] = useState<string[]>([]);
  const [showParentMode, setShowParentMode] = useState(false);

  useEffect(() => {
    generateRecommendations();
  }, [student]);

  const generateRecommendations = async () => {
    try {
      setLoading(true);
      const results = await StudentCareerService.generateCareerRecommendations(student);
      setRecommendations(results);
    } catch (error) {
      console.error('Error generating recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleComparecareers = async (career1Id: string, career2Id: string) => {
    try {
      const comparison = await StudentCareerService.compareCareerPaths(career1Id, career2Id);
      setComparisonData(comparison);
      setShowComparison(true);
    } catch (error) {
      console.error('Error comparing careers:', error);
    }
  };

  const handleCareerSelect = (careerId: string) => {
    if (selectedCareers.includes(careerId)) {
      setSelectedCareers(prev => prev.filter(id => id !== careerId));
    } else if (selectedCareers.length < 2) {
      setSelectedCareers(prev => [...prev, careerId]);
    }

    if (selectedCareers.length === 1 && !selectedCareers.includes(careerId)) {
      handleComparecareers(selectedCareers[0], careerId);
      setSelectedCareers([]);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" message="Analyzing your profile and finding perfect career matches..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Hi {student.name}! 👋
              </h1>
              <p className="text-gray-600 mt-1">
                Here are your personalized career recommendations for Class {student.class}
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              {student.parentMode && (
                <button
                  onClick={() => setShowParentMode(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <Users className="h-4 w-4" />
                  <span>Parent Mode</span>
                </button>
              )}
              
              <button
                onClick={generateRecommendations}
                className="flex items-center space-x-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Refresh</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {Math.round(recommendations[0]?.matchScore * 100 || 0)}%
                </div>
                <div className="text-sm text-gray-600">Best Match Score</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Award className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{student.interests.length}</div>
                <div className="text-sm text-gray-600">Interests Matched</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{recommendations.length}</div>
                <div className="text-sm text-gray-600">Career Options</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{student.marks.overall}%</div>
                <div className="text-sm text-gray-600">Academic Score</div>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <h3 className="font-semibold text-blue-900 mb-2">💡 How to use your recommendations:</h3>
          <div className="text-blue-800 text-sm space-y-1">
            <p>• Click on any career card to see detailed information and roadmap</p>
            <p>• Select two careers to compare them side by side</p>
            <p>• Check out scholarships and entrance exam details for each career</p>
            <p>• Use Parent Mode to get detailed explanations for your family</p>
          </div>
        </div>

        {/* Career Recommendations */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Your Top Career Matches</h2>
            {selectedCareers.length > 0 && (
              <div className="text-sm text-blue-600">
                {selectedCareers.length === 1 ? 'Select one more career to compare' : 'Comparing selected careers...'}
              </div>
            )}
          </div>

          <div className="grid gap-6">
            {recommendations.map((recommendation, index) => (
              <CareerRecommendationCard
                key={recommendation.careerPath.id}
                recommendation={recommendation}
                rank={index + 1}
                isSelected={selectedCareers.includes(recommendation.careerPath.id)}
                onSelect={() => handleCareerSelect(recommendation.careerPath.id)}
                onCompare={selectedCareers.length === 1 && !selectedCareers.includes(recommendation.careerPath.id)}
              />
            ))}
          </div>
        </div>

        {/* Comparison Modal */}
        {showComparison && comparisonData && (
          <CareerComparisonModal
            comparison={comparisonData}
            onClose={() => {
              setShowComparison(false);
              setComparisonData(null);
            }}
          />
        )}

        {/* Parent Mode Modal */}
        {showParentMode && (
          <ParentModeExplanation
            recommendations={recommendations}
            student={student}
            onClose={() => setShowParentMode(false)}
          />
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;