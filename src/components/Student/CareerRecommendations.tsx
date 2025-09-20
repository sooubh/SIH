import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { StudentProfile, CareerRecommendation } from '../../types/student';
import { StudentCareerService } from '../../services/studentCareerService';
import LoadingSpinner from '../LoadingSpinner';
import CareerRecommendationCard from './CareerRecommendationCard';
import CareerComparisonModal from './CareerComparisonModal';
import ParentModeExplanation from './ParentModeExplanation';
import { 
  ArrowLeft, 
  RefreshCw, 
  Users, 
  TrendingUp, 
  Award, 
  MessageSquare,
  Share2,
  Download,
  Star
} from 'lucide-react';

const CareerRecommendations: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [student, setStudent] = useState<StudentProfile | null>(null);
  const [recommendations, setRecommendations] = useState<CareerRecommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [showComparison, setShowComparison] = useState(false);
  const [comparisonData, setComparisonData] = useState<any>(null);
  const [selectedCareers, setSelectedCareers] = useState<string[]>([]);
  const [showParentMode, setShowParentMode] = useState(false);

  useEffect(() => {
    // Get student data from location state or localStorage
    const studentData = location.state?.student || JSON.parse(localStorage.getItem('studentProfile') || 'null');
    
    if (!studentData) {
      // Redirect to onboarding if no student data
      navigate('/student-onboarding');
      return;
    }

    setStudent(studentData);
    generateRecommendations(studentData);
  }, [location.state, navigate]);

  const generateRecommendations = async (studentData: StudentProfile) => {
    try {
      setLoading(true);
      const results = await StudentCareerService.generateCareerRecommendations(studentData);
      setRecommendations(results);
    } catch (error) {
      console.error('Error generating recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCompareCareers = async (career1Id: string, career2Id: string) => {
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
      handleCompareCareers(selectedCareers[0], careerId);
      setSelectedCareers([]);
    }
  };

  const handleShareResults = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Career Recommendations',
        text: `I just got my personalized career recommendations! Check out these ${recommendations.length} career options that match my profile.`,
        url: window.location.href
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleDownloadResults = () => {
    const resultsText = recommendations.map((rec, index) => 
      `${index + 1}. ${rec.careerPath.title}\n   Match Score: ${Math.round(rec.matchScore * 100)}%\n   ${rec.reasoning}\n`
    ).join('\n');
    
    const blob = new Blob([resultsText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'my-career-recommendations.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" message="Analyzing your profile and finding perfect career matches..." />
      </div>
    );
  }

  if (!student) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No Profile Found</h2>
          <p className="text-gray-600 mb-6">Please complete the onboarding process first.</p>
          <Link
            to="/student-onboarding"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Start Onboarding
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/')}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Home</span>
              </button>
              <div className="h-6 w-px bg-gray-300"></div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Hi {student.name}! 👋
                </h1>
                <p className="text-gray-600 mt-1">
                  Here are your personalized career recommendations for Class {student.class}
                </p>
              </div>
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
                onClick={() => generateRecommendations(student)}
                className="flex items-center space-x-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Refresh</span>
              </button>

              <button
                onClick={handleShareResults}
                className="flex items-center space-x-2 px-4 py-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
              >
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </button>

              <button
                onClick={handleDownloadResults}
                className="flex items-center space-x-2 px-4 py-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
              >
                <Download className="h-4 w-4" />
                <span>Download</span>
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

        {/* Success Message */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <Star className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-green-900 mb-1">Congratulations! 🎉</h3>
              <p className="text-green-800">
                We've analyzed your profile and found {recommendations.length} career paths that match your interests, 
                academic performance, and personality. These recommendations are specifically tailored for students 
                with your background and goals.
              </p>
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
            <p>• Share or download your results for future reference</p>
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

        {/* Next Steps */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">What's Next?</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Discuss with Family</h4>
              <p className="text-gray-600 text-sm">Use Parent Mode to help your family understand your career choices</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Research Further</h4>
              <p className="text-gray-600 text-sm">Explore each career path in detail and check out the recommended courses</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-6 w-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Start Planning</h4>
              <p className="text-gray-600 text-sm">Begin preparing for entrance exams and skill development</p>
            </div>
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

export default CareerRecommendations;
