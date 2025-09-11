import React from 'react';
import { RoadmapStep } from '../../types';
import { Check, Clock, ExternalLink, BookOpen, Code, Award, Briefcase } from 'lucide-react';

interface RoadmapTimelineProps {
  steps: RoadmapStep[];
  onUpdateStep: (stepId: string, completed: boolean) => void;
  careerTitle: string;
}

const RoadmapTimeline: React.FC<RoadmapTimelineProps> = ({ steps, onUpdateStep, careerTitle }) => {
  const getStepIcon = (type: RoadmapStep['type']) => {
    switch (type) {
      case 'skill':
        return Code;
      case 'project':
        return BookOpen;
      case 'certification':
        return Award;
      case 'experience':
        return Briefcase;
      default:
        return Clock;
    }
  };

  const getStepColor = (type: RoadmapStep['type'], completed: boolean) => {
    if (completed) return 'bg-green-500 text-white';
    
    switch (type) {
      case 'skill':
        return 'bg-blue-100 text-blue-600';
      case 'project':
        return 'bg-purple-100 text-purple-600';
      case 'certification':
        return 'bg-orange-100 text-orange-600';
      case 'experience':
        return 'bg-teal-100 text-teal-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getPriorityColor = (priority: RoadmapStep['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Learning Timeline</h2>
        <p className="text-gray-600">
          Follow this step-by-step roadmap to become a {careerTitle.toLowerCase()}
        </p>
      </div>

      <div className="space-y-6">
        {steps.map((step, index) => {
          const Icon = getStepIcon(step.type);
          const isCompleted = step.completed;
          const isLast = index === steps.length - 1;

          return (
            <div key={step.id} className="relative">
              {/* Timeline line */}
              {!isLast && (
                <div className="absolute left-6 top-16 w-0.5 h-16 bg-gray-200" />
              )}

              <div className="flex space-x-4">
                {/* Step indicator */}
                <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
                  getStepColor(step.type, isCompleted)
                }`}>
                  {isCompleted ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <Icon className="h-5 w-5" />
                  )}
                </div>

                {/* Step content */}
                <div className="flex-1 pb-8">
                  <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow duration-200">
                    {/* Step header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className={`text-lg font-bold ${
                            isCompleted ? 'text-green-900 line-through' : 'text-gray-900'
                          }`}>
                            {step.title}
                          </h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            getPriorityColor(step.priority)
                          }`}>
                            {step.priority} priority
                          </span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                            {step.duration}
                          </span>
                        </div>
                        <p className={`text-gray-600 ${isCompleted ? 'line-through' : ''}`}>
                          {step.description}
                        </p>
                      </div>
                      
                      <button
                        onClick={() => onUpdateStep(step.id, !isCompleted)}
                        className={`ml-4 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                          isCompleted
                            ? 'bg-green-600 text-white hover:bg-green-700'
                            : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {isCompleted ? 'Completed' : 'Mark Complete'}
                      </button>
                    </div>

                    {/* Resources */}
                    {step.resources.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-3">Recommended Resources:</h4>
                        <div className="grid sm:grid-cols-2 gap-3">
                          {step.resources.map((resource) => (
                            <div
                              key={resource.id}
                              className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all duration-200"
                            >
                              <div className="flex-1 min-w-0">
                                <h5 className="font-medium text-gray-900 truncate">
                                  {resource.title}
                                </h5>
                                <div className="flex items-center space-x-2 mt-1">
                                  <span className="text-xs text-gray-500">{resource.provider}</span>
                                  <span className="text-xs text-gray-400">•</span>
                                  <span className="text-xs text-gray-500">{resource.duration}</span>
                                  <span className={`px-1.5 py-0.5 rounded text-xs ${
                                    resource.cost === 'free' 
                                      ? 'bg-green-100 text-green-700' 
                                      : 'bg-orange-100 text-orange-700'
                                  }`}>
                                    {resource.cost}
                                  </span>
                                </div>
                              </div>
                              <a
                                href={resource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ml-3 p-1 text-blue-600 hover:text-blue-800 transition-colors"
                              >
                                <ExternalLink className="h-4 w-4" />
                              </a>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Completion celebration */}
      {steps.every(step => step.completed) && (
        <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-teal-50 rounded-xl border border-green-200">
          <div className="text-center">
            <div className="text-4xl mb-2">🎉</div>
            <h3 className="text-xl font-bold text-green-900 mb-2">
              Congratulations!
            </h3>
            <p className="text-green-700">
              You've completed your roadmap to becoming a {careerTitle.toLowerCase()}. 
              You're now ready to pursue opportunities in this field!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoadmapTimeline;