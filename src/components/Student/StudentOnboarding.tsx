import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StudentProfile } from '../../types/student';
import { GraduationCap, User, Heart, Target, ArrowRight, ArrowLeft } from 'lucide-react';

interface StudentOnboardingProps {
  onComplete: (profile: StudentProfile) => void;
}

const StudentOnboarding: React.FC<StudentOnboardingProps> = ({ onComplete }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [profile, setProfile] = useState<StudentProfile>({
    name: '',
    email: '',
    class: '12',
    subjects: [],
    marks: { overall: 0 },
    interests: [],
    personalityTraits: [],
    goals: {},
    profileComplete: false
  });

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const commonSubjects = {
    '10': ['Mathematics', 'Science', 'Social Science', 'English', 'Hindi', 'Computer Science'],
    '12': {
      science: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Computer Science', 'English'],
      commerce: ['Accountancy', 'Business Studies', 'Economics', 'Mathematics', 'English', 'Computer Science'],
      arts: ['History', 'Geography', 'Political Science', 'Economics', 'English', 'Psychology', 'Sociology']
    }
  };

  const interestOptions = [
    'Coding & Programming', 'Design & Creativity', 'Medicine & Healthcare', 'Business & Finance',
    'Teaching & Education', 'Sports & Fitness', 'Music & Arts', 'Science & Research',
    'Social Work', 'Technology & Innovation', 'Writing & Communication', 'Engineering & Building',
    'Law & Justice', 'Environment & Nature', 'Travel & Tourism', 'Food & Cooking'
  ];

  const personalityOptions = [
    'Logical & Analytical', 'Creative & Artistic', 'Leadership Oriented', 'Research Minded',
    'People Person', 'Detail Oriented', 'Problem Solver', 'Independent Worker',
    'Team Player', 'Risk Taker', 'Organized & Systematic', 'Innovative Thinker'
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    } else {
      const completedProfile = { ...profile, profileComplete: true };
      onComplete(completedProfile);
      
      // Save to localStorage for the recommendations page
      localStorage.setItem('studentProfile', JSON.stringify(completedProfile));
      
      // Navigate to career recommendations page
      navigate('/career-recommendations', { 
        state: { student: completedProfile } 
      });
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return profile.name && profile.email && profile.class;
      case 2:
        return profile.subjects.length > 0 && profile.marks.overall > 0;
      case 3:
        return profile.interests.length > 0;
      case 4:
        return profile.personalityTraits.length > 0;
      default:
        return false;
    }
  };

  const toggleArrayItem = (array: string[], item: string, setter: (items: string[]) => void) => {
    if (array.includes(item)) {
      setter(array.filter(i => i !== item));
    } else {
      setter([...array, item]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🎓 Student Career Advisor
          </h1>
          <p className="text-lg text-gray-600">
            Let's find the perfect career path for you after Class {profile.class}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm text-gray-500">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-teal-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <User className="h-8 w-8 text-blue-600" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Basic Information</h2>
                  <p className="text-gray-600">Tell us about yourself</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Class *
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    {['10', '12', 'graduate'].map((cls) => (
                      <button
                        key={cls}
                        onClick={() => setProfile(prev => ({ ...prev, class: cls as any }))}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          profile.class === cls
                            ? 'border-blue-500 bg-blue-50 text-blue-900'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="font-semibold">
                          {cls === 'graduate' ? 'Graduate' : `Class ${cls}`}
                        </div>
                        <div className="text-sm text-gray-600">
                          {cls === '10' && 'Choosing stream'}
                          {cls === '12' && 'Choosing career'}
                          {cls === 'graduate' && 'Career change'}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {profile.class === '12' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Stream
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                      {['science', 'commerce', 'arts'].map((stream) => (
                        <button
                          key={stream}
                          onClick={() => setProfile(prev => ({ ...prev, currentStream: stream as any }))}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            profile.currentStream === stream
                              ? 'border-blue-500 bg-blue-50 text-blue-900'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="font-semibold capitalize">{stream}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 2: Academic Information */}
          {currentStep === 2 && (
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <GraduationCap className="h-8 w-8 text-blue-600" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Academic Information</h2>
                  <p className="text-gray-600">Your subjects and performance</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Overall Percentage/CGPA *
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={profile.marks.overall || ''}
                    onChange={(e) => setProfile(prev => ({ 
                      ...prev, 
                      marks: { ...prev.marks, overall: parseInt(e.target.value) || 0 }
                    }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your percentage (e.g., 85)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subjects *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {(profile.class === '10' 
                      ? commonSubjects['10']
                      : profile.currentStream 
                        ? commonSubjects['12'][profile.currentStream as keyof typeof commonSubjects['12']]
                        : commonSubjects['10']
                    ).map((subject) => (
                      <button
                        key={subject}
                        onClick={() => toggleArrayItem(
                          profile.subjects, 
                          subject, 
                          (subjects) => setProfile(prev => ({ ...prev, subjects }))
                        )}
                        className={`p-3 rounded-lg border-2 text-sm transition-all ${
                          profile.subjects.includes(subject)
                            ? 'border-blue-500 bg-blue-50 text-blue-900'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {subject}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Interests */}
          {currentStep === 3 && (
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <Heart className="h-8 w-8 text-blue-600" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Your Interests</h2>
                  <p className="text-gray-600">What do you enjoy doing? (Select multiple)</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {interestOptions.map((interest) => (
                  <button
                    key={interest}
                    onClick={() => toggleArrayItem(
                      profile.interests, 
                      interest, 
                      (interests) => setProfile(prev => ({ ...prev, interests }))
                    )}
                    className={`p-4 rounded-lg border-2 text-sm transition-all ${
                      profile.interests.includes(interest)
                        ? 'border-blue-500 bg-blue-50 text-blue-900'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Personality & Goals */}
          {currentStep === 4 && (
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <Target className="h-8 w-8 text-blue-600" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Personality & Goals</h2>
                  <p className="text-gray-600">How would you describe yourself?</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Personality Traits (Select multiple) *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {personalityOptions.map((trait) => (
                      <button
                        key={trait}
                        onClick={() => toggleArrayItem(
                          profile.personalityTraits, 
                          trait, 
                          (traits) => setProfile(prev => ({ ...prev, personalityTraits: traits }))
                        )}
                        className={`p-3 rounded-lg border-2 text-sm transition-all ${
                          profile.personalityTraits.includes(trait)
                            ? 'border-blue-500 bg-blue-50 text-blue-900'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {trait}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Salary Expectation
                    </label>
                    <select
                      value={profile.goals.salaryExpectation || ''}
                      onChange={(e) => setProfile(prev => ({ 
                        ...prev, 
                        goals: { ...prev.goals, salaryExpectation: e.target.value }
                      }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select expectation</option>
                      <option value="3-5 lakhs">₹3-5 lakhs per year</option>
                      <option value="5-10 lakhs">₹5-10 lakhs per year</option>
                      <option value="10+ lakhs">₹10+ lakhs per year</option>
                      <option value="money not priority">Money is not the priority</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Work-Life Balance Preference
                    </label>
                    <select
                      value={profile.goals.workLifeBalance || ''}
                      onChange={(e) => setProfile(prev => ({ 
                        ...prev, 
                        goals: { ...prev.goals, workLifeBalance: e.target.value as any }
                      }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select preference</option>
                      <option value="high">High - Family time is important</option>
                      <option value="medium">Medium - Balanced approach</option>
                      <option value="low">Low - Career focused</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={profile.goals.studyAbroad || false}
                      onChange={(e) => setProfile(prev => ({ 
                        ...prev, 
                        goals: { ...prev.goals, studyAbroad: e.target.checked }
                      }))}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Interested in studying/working abroad</span>
                  </label>
                </div>

                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={profile.parentMode || false}
                      onChange={(e) => setProfile(prev => ({ ...prev, parentMode: e.target.checked }))}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Parent Mode (Get detailed explanation for parents)</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={handlePrev}
              disabled={currentStep === 1}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                currentStep === 1
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Previous</span>
            </button>

            <button
              onClick={handleNext}
              disabled={!isStepValid()}
              className={`flex items-center space-x-2 px-8 py-3 rounded-lg font-medium transition-all duration-200 ${
                isStepValid()
                  ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <span>{currentStep === totalSteps ? 'Get Career Recommendations' : 'Next Step'}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentOnboarding;