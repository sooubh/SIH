import React, { useState } from 'react';
import { CareerRecommendation } from '../../types/student';
import { 
  TrendingUp, 
  DollarSign, 
  Clock, 
  Award, 
  BookOpen, 
  Users, 
  ChevronDown, 
  ChevronUp,
  ExternalLink,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface CareerRecommendationCardProps {
  recommendation: CareerRecommendation;
  rank: number;
  isSelected: boolean;
  onSelect: () => void;
  onCompare: boolean;
}

const CareerRecommendationCard: React.FC<CareerRecommendationCardProps> = ({
  recommendation,
  rank,
  isSelected,
  onSelect,
  onCompare
}) => {
  const [expanded, setExpanded] = useState(false);
  const { careerPath, matchScore, reasoning, roadmap, scholarships } = recommendation;

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 2: return 'bg-gray-100 text-gray-800 border-gray-200';
      case 3: return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'high': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={`bg-white rounded-xl shadow-lg border-2 transition-all duration-200 ${
      isSelected ? 'border-blue-500 shadow-xl' : 'border-gray-200 hover:shadow-xl'
    }`}>
      {/* Header */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className={`px-3 py-1 rounded-full text-sm font-bold border ${getRankColor(rank)}`}>
              #{rank} Match
            </div>
            {careerPath.emergingField && (
              <div className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                🚀 Trending
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600">
                {Math.round(matchScore * 100)}%
              </div>
              <div className="text-xs text-gray-500">Match Score</div>
            </div>
            
            <button
              onClick={onSelect}
              className={`p-2 rounded-lg transition-colors ${
                isSelected 
                  ? 'bg-blue-100 text-blue-600' 
                  : onCompare 
                    ? 'bg-orange-100 text-orange-600 hover:bg-orange-200' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              title={isSelected ? 'Selected for comparison' : onCompare ? 'Click to compare' : 'Select for comparison'}
            >
              {isSelected ? <CheckCircle className="h-5 w-5" /> : <Users className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-gray-900 mb-2">{careerPath.title}</h3>
        <p className="text-gray-600 mb-4">{careerPath.overview}</p>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
          <p className="text-blue-800 text-sm font-medium">
            <span className="font-semibold">Why this matches you:</span> {reasoning}
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <DollarSign className="h-4 w-4 text-green-600" />
            <div>
              <div className="text-sm font-semibold text-gray-900">
                ₹{(careerPath.salaryRange.india.min/100000).toFixed(1)}-{(careerPath.salaryRange.india.max/100000).toFixed(1)}L
              </div>
              <div className="text-xs text-gray-500">Salary Range</div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-blue-600" />
            <div>
              <div className="text-sm font-semibold text-gray-900">{careerPath.duration}</div>
              <div className="text-xs text-gray-500">Duration</div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4 text-purple-600" />
            <div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDemandColor(careerPath.jobDemand)}`}>
                {careerPath.jobDemand} demand
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <AlertCircle className="h-4 w-4 text-orange-600" />
            <div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(careerPath.difficulty)}`}>
                {careerPath.difficulty}
              </span>
            </div>
          </div>
        </div>

        {/* Expand/Collapse Button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-center space-x-2 py-2 text-blue-600 hover:text-blue-800 transition-colors"
        >
          <span>{expanded ? 'Show Less' : 'Show More Details'}</span>
          {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
      </div>

      {/* Expanded Content */}
      {expanded && (
        <div className="border-t border-gray-200 p-6 space-y-6">
          {/* Eligibility & Requirements */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
              <BookOpen className="h-4 w-4 text-blue-600" />
              <span>Eligibility & Requirements</span>
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm font-medium text-gray-700 mb-2">Required Stream:</div>
                <div className="flex flex-wrap gap-1">
                  {careerPath.eligibility.stream.map((stream, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                      {stream}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-700 mb-2">Key Subjects:</div>
                <div className="flex flex-wrap gap-1">
                  {careerPath.eligibility.subjects.map((subject, index) => (
                    <span key={index} className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-3">
              <span className="text-sm font-medium text-gray-700">Minimum Marks Required: </span>
              <span className="text-sm text-gray-900 font-semibold">{careerPath.eligibility.minimumMarks}%</span>
            </div>
          </div>

          {/* Career Roadmap */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span>Career Roadmap</span>
            </h4>
            <div className="space-y-3">
              {roadmap.map((step, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-1">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{step.stage}</div>
                    <div className="text-sm text-gray-600 mb-1">{step.description}</div>
                    <div className="text-xs text-blue-600 font-medium">Duration: {step.duration}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Entrance Exams */}
          {careerPath.entranceExams.length > 0 && careerPath.entranceExams[0] !== 'No specific entrance exams' && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                <Award className="h-4 w-4 text-orange-600" />
                <span>Entrance Exams</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {careerPath.entranceExams.map((exam, index) => (
                  <span key={index} className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                    {exam}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Key Skills */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Key Skills You'll Develop</h4>
            <div className="flex flex-wrap gap-2">
              {careerPath.keySkills.map((skill, index) => (
                <span key={index} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Job Opportunities */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Job Opportunities</h4>
            <div className="grid md:grid-cols-2 gap-2">
              {careerPath.jobOpportunities.map((job, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">{job}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Courses */}
          {careerPath.recommendedCourses.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Recommended Courses</h4>
              <div className="space-y-3">
                {careerPath.recommendedCourses.map((course, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{course.title}</div>
                        <div className="text-sm text-gray-600">{course.provider}</div>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                          <span>Duration: {course.duration}</span>
                          <span className={`px-2 py-1 rounded-full ${
                            course.cost === 'free' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                          }`}>
                            {course.cost}
                          </span>
                          <span>Rating: {course.rating}/5</span>
                        </div>
                      </div>
                      <a
                        href={course.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-3 p-1 text-blue-600 hover:text-blue-800"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Scholarships */}
          {scholarships.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                <Award className="h-4 w-4 text-yellow-600" />
                <span>Available Scholarships</span>
              </h4>
              <div className="space-y-3">
                {scholarships.map((scholarship, index) => (
                  <div key={index} className="border border-yellow-200 bg-yellow-50 rounded-lg p-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="font-medium text-yellow-900">{scholarship.name}</div>
                        <div className="text-sm text-yellow-800 mb-2">{scholarship.amount}</div>
                        <div className="text-xs text-yellow-700">
                          <div>Eligibility: {scholarship.eligibility.join(', ')}</div>
                          <div>Deadline: {scholarship.deadline}</div>
                        </div>
                      </div>
                      <a
                        href={scholarship.applicationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-3 px-3 py-1 bg-yellow-600 text-white rounded text-xs hover:bg-yellow-700"
                      >
                        Apply
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Future Scope */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Future Scope & Growth</h4>
            <p className="text-sm text-gray-700">{careerPath.futureScope}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CareerRecommendationCard;