import React, { useState, useEffect } from 'react';
import { User, CareerRecommendation } from '../../types';
import { AIService } from '../../services/aiService';
import LoadingSpinner from '../LoadingSpinner';
import ProfileOverview from './ProfileOverview';
import CareerMatches from './CareerMatches';
import SkillGapAnalysis from './SkillGapAnalysis';
import QuickStats from './QuickStats';

interface DashboardProps {
  user: User;
  onUpdateUser: (user: User) => void;
  onNavigateToRoadmap: (recommendation: CareerRecommendation) => void;
  onNavigateToChat: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  user, 
  onUpdateUser, 
  onNavigateToRoadmap,
  onNavigateToChat 
}) => {
  const [recommendations, setRecommendations] = useState<CareerRecommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    generateRecommendations();
  }, [user]);

  const generateRecommendations = async () => {
    try {
      setLoading(true);
      setError(null);
      const results = await AIService.generateCareerRecommendations(user);
      setRecommendations(results);
    } catch (err) {
      setError('Failed to generate recommendations. Please try again.');
      console.error('Error generating recommendations:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" message="Analyzing your profile and generating recommendations..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Something went wrong</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={generateRecommendations}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
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
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {user.name}!
              </h1>
              <p className="text-gray-600 mt-1">
                Your personalized career dashboard
              </p>
            </div>
            <button
              onClick={onNavigateToChat}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              💬 Chat with AI Advisor
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Quick Stats */}
        <QuickStats user={user} recommendations={recommendations} />

        <div className="grid lg:grid-cols-3 gap-8 mt-8">
          {/* Left Column - Profile & Stats */}
          <div className="lg:col-span-1 space-y-6">
            <ProfileOverview user={user} onUpdateUser={onUpdateUser} />
            <SkillGapAnalysis 
              recommendations={recommendations}
              userSkills={user.skills}
            />
          </div>

          {/* Right Column - Career Matches */}
          <div className="lg:col-span-2">
            <CareerMatches 
              recommendations={recommendations}
              onViewRoadmap={onNavigateToRoadmap}
              onRegenerateRecommendations={generateRecommendations}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;