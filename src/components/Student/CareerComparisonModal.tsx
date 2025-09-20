import React from 'react';
import { CareerComparison } from '../../types/student';
import { X, DollarSign, Clock, TrendingUp, AlertCircle, Award } from 'lucide-react';

interface CareerComparisonModalProps {
  comparison: CareerComparison;
  onClose: () => void;
}

const CareerComparisonModal: React.FC<CareerComparisonModalProps> = ({ comparison, onClose }) => {
  const { career1, career2, comparison: comp } = comparison;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Career Comparison</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          {/* Career Headers */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <h3 className="text-xl font-bold text-blue-900 mb-2">{career1.title}</h3>
              <p className="text-sm text-blue-700">{career1.overview}</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <h3 className="text-xl font-bold text-green-900 mb-2">{career2.title}</h3>
              <p className="text-sm text-green-700">{career2.overview}</p>
            </div>
          </div>

          {/* Comparison Summary */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-yellow-900 mb-2">🎯 Our Recommendation:</h3>
            <p className="text-yellow-800">{comp.recommendation}</p>
          </div>

          {/* Detailed Comparison */}
          <div className="space-y-6">
            {/* Duration */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                <Clock className="h-4 w-4 text-blue-600" />
                <span>Duration</span>
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded">
                  <div className="font-medium text-gray-900">{career1.duration}</div>
                  <div className="text-sm text-gray-600">{career1.title}</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded">
                  <div className="font-medium text-gray-900">{career2.duration}</div>
                  <div className="text-sm text-gray-600">{career2.title}</div>
                </div>
              </div>
              <div className="mt-3 text-sm text-gray-700 bg-blue-50 p-3 rounded">
                <strong>Analysis:</strong> {comp.duration}
              </div>
            </div>

            {/* Salary */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                <DollarSign className="h-4 w-4 text-green-600" />
                <span>Salary Range</span>
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded">
                  <div className="font-medium text-gray-900">
                    ₹{(career1.salaryRange.india.min/100000).toFixed(1)}-{(career1.salaryRange.india.max/100000).toFixed(1)}L
                  </div>
                  <div className="text-sm text-gray-600">{career1.title}</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded">
                  <div className="font-medium text-gray-900">
                    ₹{(career2.salaryRange.india.min/100000).toFixed(1)}-{(career2.salaryRange.india.max/100000).toFixed(1)}L
                  </div>
                  <div className="text-sm text-gray-600">{career2.title}</div>
                </div>
              </div>
              <div className="mt-3 text-sm text-gray-700 bg-green-50 p-3 rounded">
                <strong>Analysis:</strong> {comp.salary}
              </div>
            </div>

            {/* Job Demand */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-purple-600" />
                <span>Job Market Demand</span>
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded">
                  <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    career1.jobDemand === 'high' ? 'bg-green-100 text-green-800' :
                    career1.jobDemand === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {career1.jobDemand} demand
                  </div>
                  <div className="text-sm text-gray-600 mt-1">{career1.title}</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded">
                  <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    career2.jobDemand === 'high' ? 'bg-green-100 text-green-800' :
                    career2.jobDemand === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {career2.jobDemand} demand
                  </div>
                  <div className="text-sm text-gray-600 mt-1">{career2.title}</div>
                </div>
              </div>
              <div className="mt-3 text-sm text-gray-700 bg-purple-50 p-3 rounded">
                <strong>Analysis:</strong> {comp.jobDemand}
              </div>
            </div>

            {/* Difficulty */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                <AlertCircle className="h-4 w-4 text-orange-600" />
                <span>Difficulty Level</span>
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded">
                  <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    career1.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                    career1.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {career1.difficulty}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">{career1.title}</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded">
                  <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    career2.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                    career2.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {career2.difficulty}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">{career2.title}</div>
                </div>
              </div>
              <div className="mt-3 text-sm text-gray-700 bg-orange-50 p-3 rounded">
                <strong>Analysis:</strong> {comp.difficulty}
              </div>
            </div>

            {/* Key Skills Comparison */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                <Award className="h-4 w-4 text-blue-600" />
                <span>Key Skills Required</span>
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="font-medium text-gray-700 mb-2">{career1.title}</div>
                  <div className="flex flex-wrap gap-1">
                    {career1.keySkills.map((skill, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="font-medium text-gray-700 mb-2">{career2.title}</div>
                  <div className="flex flex-wrap gap-1">
                    {career2.keySkills.map((skill, index) => (
                      <span key={index} className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Job Opportunities */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3">Job Opportunities</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="font-medium text-gray-700 mb-2">{career1.title}</div>
                  <div className="space-y-1">
                    {career1.jobOpportunities.slice(0, 4).map((job, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm text-gray-700">{job}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="font-medium text-gray-700 mb-2">{career2.title}</div>
                  <div className="space-y-1">
                    {career2.jobOpportunities.slice(0, 4).map((job, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-gray-700">{job}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4 mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Close Comparison
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerComparisonModal;