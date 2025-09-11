import React, { useState, useEffect } from 'react';
import { CareerRecommendation, RoadmapStep, User } from '../../types';
import { AIService } from '../../services/aiService';
import LoadingSpinner from '../LoadingSpinner';
import RoadmapTimeline from './RoadmapTimeline';
import RoadmapExport from './RoadmapExport';
import { ArrowLeft, Download, RefreshCw, Clock, Target } from 'lucide-react';

interface RoadmapViewerProps {
  recommendation: CareerRecommendation;
  user: User;
  onBack: () => void;
}

const RoadmapViewer: React.FC<RoadmapViewerProps> = ({ recommendation, user, onBack }) => {
  const [roadmapSteps, setRoadmapSteps] = useState<RoadmapStep[]>([]);
  const [loading, setLoading] = useState(true);
  const [showExport, setShowExport] = useState(false);

  useEffect(() => {
    generateRoadmap();
  }, [recommendation]);

  const generateRoadmap = async () => {
    try {
      setLoading(true);
      const steps = await AIService.generateRoadmap(
        recommendation.career.title,
        recommendation.missingSkills,
        user
      );
      setRoadmapSteps(steps);
    } catch (error) {
      console.error('Failed to generate roadmap:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStepCompletion = (stepId: string, completed: boolean) => {
    setRoadmapSteps(prev =>
      prev.map(step =>
        step.id === stepId ? { ...step, completed } : step
      )
    );
  };

  const totalSteps = roadmapSteps.length;
  const completedSteps = roadmapSteps.filter(step => step.completed).length;
  const progressPercentage = totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0;

  const estimatedDuration = React.useMemo(() => {
    // Calculate total estimated duration
    const totalWeeks = roadmapSteps.reduce((sum, step) => {
      const match = step.duration.match(/(\d+)-?(\d+)?/);
      if (match) {
        const min = parseInt(match[1]);
        const max = match[2] ? parseInt(match[2]) : min;
        return sum + (min + max) / 2;
      }
      return sum + 4; // default 4 weeks
    }, 0);

    const months = Math.ceil(totalWeeks / 4);
    return months;
  }, [roadmapSteps]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" message="Creating your personalized roadmap..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {recommendation.career.title} Roadmap
                </h1>
                <p className="text-gray-600 mt-1">
                  Your personalized learning path to becoming a {recommendation.career.title.toLowerCase()}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={generateRoadmap}
                className="flex items-center space-x-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Regenerate</span>
              </button>
              <button
                onClick={() => setShowExport(true)}
                className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Download className="h-4 w-4" />
                <span>Export PDF</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Progress Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Target className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Progress</h3>
                <p className="text-2xl font-bold text-blue-600">{Math.round(progressPercentage)}%</p>
                <p className="text-sm text-gray-500">{completedSteps} of {totalSteps} steps</p>
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-teal-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Clock className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Duration</h3>
                <p className="text-2xl font-bold text-green-600">{estimatedDuration} months</p>
                <p className="text-sm text-gray-500">Estimated timeline</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <div className="text-orange-600 font-bold text-lg">🎯</div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Match Score</h3>
                <p className="text-2xl font-bold text-orange-600">
                  {Math.round(recommendation.matchScore * 100)}%
                </p>
                <p className="text-sm text-gray-500">Career compatibility</p>
              </div>
            </div>
          </div>
        </div>

        {/* Roadmap Timeline */}
        <RoadmapTimeline
          steps={roadmapSteps}
          onUpdateStep={updateStepCompletion}
          careerTitle={recommendation.career.title}
        />
      </div>

      {/* Export Modal */}
      {showExport && (
        <RoadmapExport
          roadmap={roadmapSteps}
          career={recommendation.career}
          user={user}
          onClose={() => setShowExport(false)}
        />
      )}
    </div>
  );
};

export default RoadmapViewer;