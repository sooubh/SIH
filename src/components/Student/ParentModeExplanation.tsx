import React from 'react';
import { CareerRecommendation, StudentProfile } from '../../types/student';
import { StudentCareerService } from '../../services/studentCareerService';
import { X, Users, TrendingUp, DollarSign, Award } from 'lucide-react';

interface ParentModeExplanationProps {
  recommendations: CareerRecommendation[];
  student: StudentProfile;
  onClose: () => void;
}

const ParentModeExplanation: React.FC<ParentModeExplanationProps> = ({
  recommendations,
  student,
  onClose
}) => {
  const explanation = StudentCareerService.generateParentExplanation(recommendations);
  const topCareer = recommendations[0];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-3">
            <Users className="h-6 w-6 text-purple-600" />
            <h2 className="text-2xl font-bold text-gray-900">Parent Mode Explanation</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Student Summary */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-3">Your Child's Profile Summary</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <div className="font-medium text-blue-800">Academic Performance:</div>
                <div className="text-blue-700">{student.marks.overall}% in Class {student.class}</div>
              </div>
              <div>
                <div className="font-medium text-blue-800">Current Stream:</div>
                <div className="text-blue-700 capitalize">{student.currentStream || 'To be decided'}</div>
              </div>
              <div>
                <div className="font-medium text-blue-800">Top Interests:</div>
                <div className="text-blue-700">{student.interests.slice(0, 3).join(', ')}</div>
              </div>
              <div>
                <div className="font-medium text-blue-800">Personality Traits:</div>
                <div className="text-blue-700">{student.personalityTraits.slice(0, 2).join(', ')}</div>
              </div>
            </div>
          </div>

          {/* Top Recommendation Highlight */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-900 mb-3 flex items-center space-x-2">
              <Award className="h-5 w-5" />
              <span>Top Career Recommendation: {topCareer.careerPath.title}</span>
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-3 bg-white rounded">
                <div className="text-2xl font-bold text-green-600">
                  {Math.round(topCareer.matchScore * 100)}%
                </div>
                <div className="text-sm text-gray-600">Match Score</div>
              </div>
              <div className="text-center p-3 bg-white rounded">
                <div className="text-lg font-bold text-green-600">
                  ₹{(topCareer.careerPath.salaryRange.india.max/100000).toFixed(1)}L
                </div>
                <div className="text-sm text-gray-600">Max Salary</div>
              </div>
              <div className="text-center p-3 bg-white rounded">
                <div className="text-lg font-bold text-green-600 capitalize">
                  {topCareer.careerPath.jobDemand}
                </div>
                <div className="text-sm text-gray-600">Job Demand</div>
              </div>
            </div>
          </div>

          {/* Detailed Explanation */}
          <div className="prose max-w-none">
            <div className="whitespace-pre-line text-gray-700 leading-relaxed">
              {explanation}
            </div>
          </div>

          {/* Market Trends */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h3 className="font-semibold text-purple-900 mb-3 flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Current Market Trends (2024-2025)</span>
            </h3>
            <div className="space-y-2 text-sm text-purple-800">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                <span>Technology careers are growing 25% faster than traditional fields</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                <span>Remote work opportunities have increased by 300% post-pandemic</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                <span>Government is investing ₹1 lakh crore in digital infrastructure</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                <span>Skill-based hiring is becoming more important than just degrees</span>
              </div>
            </div>
          </div>

          {/* Investment Analysis */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="font-semibold text-yellow-900 mb-3 flex items-center space-x-2">
              <DollarSign className="h-5 w-5" />
              <span>Investment Analysis</span>
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <div className="font-medium text-yellow-800 mb-2">Education Investment:</div>
                <div className="space-y-1 text-yellow-700">
                  <div>• Duration: {topCareer.careerPath.duration}</div>
                  <div>• Difficulty: {topCareer.careerPath.difficulty} level</div>
                  <div>• Multiple scholarship opportunities available</div>
                  <div>• Government schemes for skill development</div>
                </div>
              </div>
              <div>
                <div className="font-medium text-yellow-800 mb-2">Return on Investment:</div>
                <div className="space-y-1 text-yellow-700">
                  <div>• Starting salary: ₹{(topCareer.careerPath.salaryRange.india.min/100000).toFixed(1)}L per year</div>
                  <div>• Growth potential: ₹{(topCareer.careerPath.salaryRange.india.max/100000).toFixed(1)}L per year</div>
                  <div>• International opportunities available</div>
                  <div>• Job security: {topCareer.careerPath.jobDemand} demand</div>
                </div>
              </div>
            </div>
          </div>

          {/* Common Concerns */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Addressing Common Parent Concerns</h3>
            <div className="space-y-3 text-sm">
              <div>
                <div className="font-medium text-gray-800">Q: "Is this career stable and secure?"</div>
                <div className="text-gray-700 mt-1">A: {topCareer.careerPath.title} has {topCareer.careerPath.jobDemand} job demand and is {topCareer.careerPath.emergingField ? 'an emerging field with excellent growth prospects' : 'a stable field with consistent opportunities'}.</div>
              </div>
              <div>
                <div className="font-medium text-gray-800">Q: "What if my child changes their mind later?"</div>
                <div className="text-gray-700 mt-1">A: The skills developed in {topCareer.careerPath.title} are transferable to many related fields. Modern careers offer flexibility and multiple growth paths.</div>
              </div>
              <div>
                <div className="font-medium text-gray-800">Q: "How do we know this matches our child's abilities?"</div>
                <div className="text-gray-700 mt-1">A: Our recommendation is based on scientific analysis of your child's academic performance ({student.marks.overall}%), interests, and personality traits. The {Math.round(topCareer.matchScore * 100)}% match score indicates strong alignment.</div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
            <h3 className="font-semibold text-indigo-900 mb-3">Recommended Next Steps</h3>
            <div className="space-y-2 text-sm text-indigo-800">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
                <span>Discuss these recommendations with your child</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
                <span>Research the recommended colleges and courses</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
                <span>Start preparing for entrance exams if required</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-bold">4</div>
                <span>Apply for relevant scholarships and government schemes</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-bold">5</div>
                <span>Consider taking introductory courses to validate interest</span>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="text-center text-sm text-gray-600">
            <p>This analysis is based on current market trends and your child's profile.</p>
            <p>For personalized guidance, consider consulting with career counselors or industry professionals.</p>
          </div>

          {/* Close Button */}
          <div className="flex justify-center pt-4">
            <button
              onClick={onClose}
              className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              Close Parent Mode
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentModeExplanation;