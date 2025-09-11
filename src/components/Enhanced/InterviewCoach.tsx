import React, { useState, useEffect } from 'react';
import { InterviewQuestion } from '../../types/enhanced';
import { aiProviderService } from '../../services/aiProviders';
import { Play, Pause, RotateCcw, CheckCircle, Clock, Brain } from 'lucide-react';
import LoadingSpinner from '../LoadingSpinner';

interface InterviewCoachProps {
  career: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

const InterviewCoach: React.FC<InterviewCoachProps> = ({ career, difficulty = 'medium' }) => {
  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);

  useEffect(() => {
    fetchQuestions();
  }, [career, difficulty]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer(timer => timer + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const data = await aiProviderService.generateInterviewQuestions(career, difficulty);
      setQuestions(data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    } finally {
      setLoading(false);
    }
  };

  const startSession = () => {
    setSessionStarted(true);
    setIsTimerRunning(true);
    setTimer(0);
  };

  const pauseTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  const resetSession = () => {
    setSessionStarted(false);
    setIsTimerRunning(false);
    setTimer(0);
    setCurrentQuestionIndex(0);
    setUserAnswer('');
    setShowAnswer(false);
    setAnsweredQuestions([]);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setAnsweredQuestions(prev => [...prev, currentQuestionIndex]);
      setCurrentQuestionIndex(prev => prev + 1);
      setUserAnswer('');
      setShowAnswer(false);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setUserAnswer('');
      setShowAnswer(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'technical': return '💻';
      case 'behavioral': return '🤝';
      case 'situational': return '🎯';
      default: return '❓';
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <LoadingSpinner message="Preparing interview questions..." />
      </div>
    );
  }

  if (!sessionStarted) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Brain className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Interview Coach</h2>
          <p className="text-gray-600 mb-6">
            Practice {career} interview questions with AI-powered feedback
          </p>

          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-blue-900 mb-2">Session Overview</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="font-bold text-blue-600">{questions.length}</div>
                <div className="text-blue-800">Questions</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-blue-600">{difficulty}</div>
                <div className="text-blue-800">Difficulty</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-blue-600">~{questions.length * 3} min</div>
                <div className="text-blue-800">Duration</div>
              </div>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <h3 className="font-semibold text-gray-900">Question Categories:</h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {Array.from(new Set(questions.map(q => q.category))).map(category => (
                <span key={category} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm flex items-center space-x-1">
                  <span>{getCategoryIcon(category)}</span>
                  <span>{category}</span>
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={startSession}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Start Interview Practice
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Interview Practice</h2>
          <p className="text-gray-600 text-sm">
            Question {currentQuestionIndex + 1} of {questions.length}
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-gray-600">
            <Clock className="h-4 w-4" />
            <span className="font-mono">{formatTime(timer)}</span>
          </div>
          <button
            onClick={pauseTimer}
            className="p-2 text-gray-600 hover:text-gray-800"
          >
            {isTimerRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>
          <button
            onClick={resetSession}
            className="p-2 text-gray-600 hover:text-gray-800"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-3">
          <span className="text-xl">{getCategoryIcon(currentQuestion.category)}</span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(currentQuestion.difficulty)}`}>
            {currentQuestion.difficulty}
          </span>
          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
            {currentQuestion.category}
          </span>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {currentQuestion.question}
        </h3>

        {/* Tips */}
        {currentQuestion.tips.length > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
            <h4 className="font-medium text-yellow-900 mb-2">💡 Tips:</h4>
            <ul className="text-sm text-yellow-800 space-y-1">
              {currentQuestion.tips.map((tip, index) => (
                <li key={index}>• {tip}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Answer Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Your Answer:
        </label>
        <textarea
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Type your answer here..."
          className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
      </div>

      {/* Expected Answer */}
      {showAnswer && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h4 className="font-medium text-green-900 mb-2 flex items-center space-x-2">
            <CheckCircle className="h-4 w-4" />
            <span>Expected Answer:</span>
          </h4>
          <p className="text-green-800 text-sm">{currentQuestion.expectedAnswer}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          <button
            onClick={prevQuestion}
            disabled={currentQuestionIndex === 0}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              currentQuestionIndex === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Previous
          </button>
          
          <button
            onClick={() => setShowAnswer(!showAnswer)}
            className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors font-medium"
          >
            {showAnswer ? 'Hide Answer' : 'Show Answer'}
          </button>
        </div>

        <button
          onClick={nextQuestion}
          disabled={currentQuestionIndex === questions.length - 1}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            currentQuestionIndex === questions.length - 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {currentQuestionIndex === questions.length - 1 ? 'Complete' : 'Next Question'}
        </button>
      </div>

      {/* Session Complete */}
      {currentQuestionIndex === questions.length - 1 && answeredQuestions.length === questions.length - 1 && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg text-center">
          <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
          <h3 className="font-semibold text-green-900 mb-1">Session Complete!</h3>
          <p className="text-green-800 text-sm">
            Great job! You've completed all {questions.length} questions in {formatTime(timer)}.
          </p>
        </div>
      )}
    </div>
  );
};

export default InterviewCoach;