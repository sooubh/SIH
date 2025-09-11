import React, { useState } from 'react';
import { EnhancedUser, CareerRecommendation } from '../../types/enhanced';
import Dashboard from '../Dashboard/Dashboard';
import GovernmentSchemes from './GovernmentSchemes';
import JobMarketInsights from './JobMarketInsights';
import GamificationPanel from './GamificationPanel';
import ResumeAnalyzer from './ResumeAnalyzer';
import InterviewCoach from './InterviewCoach';
import VoiceAssistant from './VoiceAssistant';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  BarChart3, 
  FileText, 
  MessageSquare, 
  Award, 
  Building, 
  Mic,
  TrendingUp,
  Users
} from 'lucide-react';

interface EnhancedDashboardProps {
  user: EnhancedUser;
  onUpdateUser: (user: EnhancedUser) => void;
  onNavigateToRoadmap: (recommendation: CareerRecommendation) => void;
  onNavigateToChat: () => void;
}

const EnhancedDashboard: React.FC<EnhancedDashboardProps> = ({
  user,
  onUpdateUser,
  onNavigateToRoadmap,
  onNavigateToChat
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [voiceSettings, setVoiceSettings] = useState({
    enabled: false,
    language: 'en-US',
    voice: 'default',
    speed: 1.0
  });

  const handleVoiceInput = (text: string) => {
    console.log('Voice input:', text);
    // Handle voice commands here
  };

  const handleSpeak = (text: string) => {
    console.log('Speaking:', text);
    // Handle text-to-speech here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Voice Assistant */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {user.name}! 
                {user.xpPoints && (
                  <span className="text-lg text-blue-600 ml-2">
                    Level {Math.floor((user.xpPoints || 0) / 1000) + 1}
                  </span>
                )}
              </h1>
              <p className="text-gray-600 mt-1">Your enhanced career dashboard</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <VoiceAssistant
                onVoiceInput={handleVoiceInput}
                onSpeak={handleSpeak}
                settings={voiceSettings}
                onSettingsChange={setVoiceSettings}
              />
              <button
                onClick={onNavigateToChat}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center space-x-2"
              >
                <MessageSquare className="h-4 w-4" />
                <span>AI Advisor</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7 lg:w-auto lg:grid-cols-7">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="market" className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Market</span>
            </TabsTrigger>
            <TabsTrigger value="schemes" className="flex items-center space-x-2">
              <Building className="h-4 w-4" />
              <span className="hidden sm:inline">Schemes</span>
            </TabsTrigger>
            <TabsTrigger value="resume" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Resume</span>
            </TabsTrigger>
            <TabsTrigger value="interview" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Interview</span>
            </TabsTrigger>
            <TabsTrigger value="gamification" className="flex items-center space-x-2">
              <Award className="h-4 w-4" />
              <span className="hidden sm:inline">Progress</span>
            </TabsTrigger>
            <TabsTrigger value="voice" className="flex items-center space-x-2">
              <Mic className="h-4 w-4" />
              <span className="hidden sm:inline">Voice</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Dashboard
              user={user}
              onUpdateUser={onUpdateUser}
              onNavigateToRoadmap={onNavigateToRoadmap}
              onNavigateToChat={onNavigateToChat}
            />
          </TabsContent>

          <TabsContent value="market" className="space-y-6">
            <JobMarketInsights
              userSkills={user.skills}
              selectedCareer="data-scientist"
            />
          </TabsContent>

          <TabsContent value="schemes" className="space-y-6">
            <GovernmentSchemes user={user} />
          </TabsContent>

          <TabsContent value="resume" className="space-y-6">
            <ResumeAnalyzer
              onAnalysisComplete={(analysis) => {
                console.log('Resume analysis:', analysis);
                // Update user profile with resume insights
                onUpdateUser({
                  ...user,
                  resumeText: analysis.extractedInfo?.text || user.resumeText
                });
              }}
            />
          </TabsContent>

          <TabsContent value="interview" className="space-y-6">
            <InterviewCoach
              career="Data Scientist"
              difficulty="medium"
            />
          </TabsContent>

          <TabsContent value="gamification" className="space-y-6">
            <GamificationPanel
              user={user}
              onUpdateUser={onUpdateUser}
            />
          </TabsContent>

          <TabsContent value="voice" className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Voice Assistant Settings</h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">Enable Voice Assistant</h3>
                    <p className="text-gray-600 text-sm">Use voice commands and text-to-speech</p>
                  </div>
                  <button
                    onClick={() => setVoiceSettings(prev => ({ ...prev, enabled: !prev.enabled }))}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      voiceSettings.enabled ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        voiceSettings.enabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Language
                  </label>
                  <select
                    value={voiceSettings.language}
                    onChange={(e) => setVoiceSettings(prev => ({ ...prev, language: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="en-US">English (US)</option>
                    <option value="hi-IN">Hindi (India)</option>
                    <option value="ta-IN">Tamil (India)</option>
                    <option value="te-IN">Telugu (India)</option>
                    <option value="bn-IN">Bengali (India)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Speech Speed: {voiceSettings.speed}x
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.1"
                    value={voiceSettings.speed}
                    onChange={(e) => setVoiceSettings(prev => ({ ...prev, speed: parseFloat(e.target.value) }))}
                    className="w-full"
                  />
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 mb-2">Voice Commands</h3>
                  <div className="text-sm text-blue-800 space-y-1">
                    <p>• "Show my recommendations" - View career matches</p>
                    <p>• "Open roadmap" - Navigate to learning roadmap</p>
                    <p>• "Start interview practice" - Begin interview coaching</p>
                    <p>• "Check my progress" - View gamification stats</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EnhancedDashboard;