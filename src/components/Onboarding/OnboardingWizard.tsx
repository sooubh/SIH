import React, { useState } from 'react';
import { User } from '../../types';
import ProfileBuilder from './ProfileBuilder';
import InterestAssessment from './InterestAssessment';
import ProgressBar from '../ProgressBar';
import { CheckCircle } from 'lucide-react';

interface OnboardingWizardProps {
  onComplete: (user: User) => void;
}

const OnboardingWizard: React.FC<OnboardingWizardProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [user, setUser] = useState<User>({
    name: '',
    email: '',
    education: '',
    skills: [],
    interests: [],
    profileComplete: false
  });

  const totalSteps = 2;
  const progress = (currentStep / totalSteps) * 100;

  const handleProfileComplete = (profileData: Partial<User>) => {
    setUser(prev => ({ ...prev, ...profileData }));
    setCurrentStep(2);
  };

  const handleAssessmentComplete = (assessmentData: Partial<User>) => {
    const completedUser = { ...user, ...assessmentData, profileComplete: true };
    setUser(completedUser);
    onComplete(completedUser);
  };

  const steps = [
    { number: 1, title: 'Profile Setup', description: 'Tell us about yourself' },
    { number: 2, title: 'Skills Assessment', description: 'Discover your interests' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to Your Career Journey
          </h1>
          <p className="text-lg text-gray-600">
            Let's get to know you better to provide personalized career guidance
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <ProgressBar progress={progress} className="max-w-md mx-auto" showLabel />
        </div>

        {/* Step Indicators */}
        <div className="flex justify-center items-center space-x-4 mb-8">
          {steps.map((step) => (
            <div
              key={step.number}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                currentStep >= step.number
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-500'
              }`}
            >
              {currentStep > step.number ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                  currentStep >= step.number ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
                }`}>
                  {step.number}
                </div>
              )}
              <div>
                <div className="font-medium">{step.title}</div>
                <div className="text-xs opacity-75">{step.description}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {currentStep === 1 && (
            <ProfileBuilder
              initialData={user}
              onComplete={handleProfileComplete}
            />
          )}
          {currentStep === 2 && (
            <InterestAssessment
              onComplete={handleAssessmentComplete}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default OnboardingWizard;