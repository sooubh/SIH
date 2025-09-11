import React, { useState } from 'react';
import { User } from '../../types';
import { assessmentQuestions } from '../../data/assessmentQuestions';
import { Brain, ArrowRight, ArrowLeft } from 'lucide-react';

interface InterestAssessmentProps {
  onComplete: (data: Partial<User>) => void;
}

const InterestAssessment: React.FC<InterestAssessmentProps> = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});

  const question = assessmentQuestions[currentQuestion];
  const isLastQuestion = currentQuestion === assessmentQuestions.length - 1;
  const progress = ((currentQuestion + 1) / assessmentQuestions.length) * 100;

  const handleAnswer = (answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [question.id]: answer
    }));
  };

  const nextQuestion = () => {
    if (currentQuestion < assessmentQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Assessment complete - analyze answers
      const analysisResults = analyzeAnswers(answers);
      onComplete(analysisResults);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const analyzeAnswers = (answers: { [key: string]: string }): Partial<User> => {
    // Simple analysis based on answer patterns
    const additionalSkills: string[] = [];
    const additionalInterests: string[] = [];

    // Analyze interest-based answers
    Object.entries(answers).forEach(([questionId, answer]) => {
      const lowerAnswer = answer.toLowerCase();
      
      if (lowerAnswer.includes('data') || lowerAnswer.includes('analytics')) {
        additionalInterests.push('Data Science', 'Analytics');
        additionalSkills.push('Statistics', 'Data Analysis');
      }
      
      if (lowerAnswer.includes('design') || lowerAnswer.includes('creative')) {
        additionalInterests.push('UI/UX Design', 'Creative Design');
        additionalSkills.push('Design Thinking', 'Prototyping');
      }
      
      if (lowerAnswer.includes('coding') || lowerAnswer.includes('programming')) {
        additionalInterests.push('Software Development');
        additionalSkills.push('Problem Solving', 'Logic');
      }
      
      if (lowerAnswer.includes('strategic') || lowerAnswer.includes('business')) {
        additionalInterests.push('Product Management', 'Business Strategy');
        additionalSkills.push('Strategic Thinking', 'Leadership');
      }
    });

    return {
      skills: [...new Set(additionalSkills)], // Remove duplicates
      interests: [...new Set(additionalInterests)]
    };
  };

  const currentAnswer = answers[question.id];

  return (
    <div className="p-8">
      <div className="flex items-center space-x-3 mb-6">
        <Brain className="h-8 w-8 text-blue-600" />
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Skills Assessment</h2>
          <p className="text-gray-600">Help us understand your preferences and strengths</p>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            Question {currentQuestion + 1} of {assessmentQuestions.length}
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

      {/* Question */}
      <div className="bg-gray-50 rounded-xl p-6 mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">
          {question.question}
        </h3>
        
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                currentAnswer === option
                  ? 'border-blue-500 bg-blue-50 text-blue-900'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded-full border-2 ${
                  currentAnswer === option
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-300'
                }`}>
                  {currentAnswer === option && (
                    <div className="w-full h-full rounded-full bg-white scale-50" />
                  )}
                </div>
                <span className="font-medium">{option}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={prevQuestion}
          disabled={currentQuestion === 0}
          className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
            currentQuestion === 0
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Previous</span>
        </button>

        <button
          onClick={nextQuestion}
          disabled={!currentAnswer}
          className={`flex items-center space-x-2 px-8 py-3 rounded-lg font-medium transition-all duration-200 ${
            currentAnswer
              ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <span>{isLastQuestion ? 'Complete Assessment' : 'Next Question'}</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default InterestAssessment;