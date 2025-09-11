import React, { useState } from 'react';
import { User, CareerRecommendation } from './types';
import { EnhancedUser } from './types/enhanced';
import { useLocalStorage } from './hooks/useLocalStorage';
import OnboardingWizard from './components/Onboarding/OnboardingWizard';
import EnhancedDashboard from './components/Enhanced/EnhancedDashboard';
import RoadmapViewer from './components/Roadmap/RoadmapViewer';
import ChatAdvisor from './components/Chat/ChatAdvisor';
import { GraduationCap, Users, TrendingUp, Target } from 'lucide-react';

type AppView = 'landing' | 'onboarding' | 'dashboard' | 'roadmap' | 'chat';

function App() {
  const [user, setUser] = useLocalStorage<EnhancedUser | null>('career_advisor_user', null);
  const [currentView, setCurrentView] = useState<AppView>(
    user?.profileComplete ? 'dashboard' : 'landing'
  );
  const [selectedRecommendation, setSelectedRecommendation] = useState<CareerRecommendation | null>(null);

  const handleOnboardingComplete = (newUser: EnhancedUser) => {
    setUser(newUser);
    setCurrentView('dashboard');
  };

  const handleUpdateUser = (updatedUser: EnhancedUser) => {
    setUser(updatedUser);
  };

  const handleViewRoadmap = (recommendation: CareerRecommendation) => {
    setSelectedRecommendation(recommendation);
    setCurrentView('roadmap');
  };

  const handleStartOver = () => {
    setUser(null);
    setCurrentView('landing');
  };

  // Landing Page
  if (currentView === 'landing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 py-20">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                  <GraduationCap className="h-8 w-8 text-white" />
                </div>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Your Personalized
                <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                  {' '}Career Guide
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Discover your ideal career path with AI-powered recommendations, 
                personalized skill assessments, and step-by-step learning roadmaps.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={() => setCurrentView('onboarding')}
                  className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Start Your Journey
                </button>
                
                {user && (
                  <button
                    onClick={() => setCurrentView('dashboard')}
                    className="border border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
                  >
                    Continue Existing Profile
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Everything You Need for Career Success
              </h2>
              <p className="text-lg text-gray-600">
                Our comprehensive platform guides you from exploration to achievement
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-8 rounded-xl bg-blue-50 hover:shadow-lg transition-shadow duration-300">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Smart Career Matching</h3>
                <p className="text-gray-600">
                  AI analyzes your skills, interests, and goals to recommend perfect career matches
                  with detailed compatibility scores.
                </p>
              </div>

              <div className="text-center p-8 rounded-xl bg-teal-50 hover:shadow-lg transition-shadow duration-300">
                <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Personalized Roadmaps</h3>
                <p className="text-gray-600">
                  Get step-by-step learning paths with curated resources, timelines, and milestones
                  tailored to your career goals.
                </p>
              </div>

              <div className="text-center p-8 rounded-xl bg-purple-50 hover:shadow-lg transition-shadow duration-300">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">AI Career Advisor</h3>
                <p className="text-gray-600">
                  Chat with your personal AI advisor for interview prep, skill guidance, and
                  career strategy recommendations.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="py-16 bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-blue-400 mb-2">10+</div>
                <div className="text-gray-300">Career Paths</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-teal-400 mb-2">50+</div>
                <div className="text-gray-300">Learning Resources</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-purple-400 mb-2">100%</div>
                <div className="text-gray-300">Personalized</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-orange-400 mb-2">24/7</div>
                <div className="text-gray-300">AI Support</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-20 bg-gradient-to-r from-blue-600 to-teal-600 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Career?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Join thousands of professionals who have found their perfect career path
            </p>
            <button
              onClick={() => setCurrentView('onboarding')}
              className="bg-white text-blue-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Get Started Free
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Onboarding Flow
  if (currentView === 'onboarding') {
    return <OnboardingWizard onComplete={handleOnboardingComplete} />;
  }

  // Dashboard
  if (currentView === 'dashboard' && user) {
    return (
      <EnhancedDashboard
        user={user}
        onUpdateUser={handleUpdateUser}
        onNavigateToRoadmap={handleViewRoadmap}
        onNavigateToChat={() => setCurrentView('chat')}
      />
    );
  }

  // Roadmap Viewer
  if (currentView === 'roadmap' && user && selectedRecommendation) {
    return (
      <RoadmapViewer
        recommendation={selectedRecommendation}
        user={user}
        onBack={() => setCurrentView('dashboard')}
      />
    );
  }

  // Chat Advisor
  if (currentView === 'chat' && user) {
    return (
      <ChatAdvisor
        user={user}
        onBack={() => setCurrentView('dashboard')}
      />
    );
  }

  // Fallback
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h1>
        <button
          onClick={handleStartOver}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Start Over
        </button>
      </div>
    </div>
  );
}

export default App;