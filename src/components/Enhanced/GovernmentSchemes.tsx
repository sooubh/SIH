import React, { useState, useEffect } from 'react';
import { GovernmentScheme, EnhancedUser } from '../../types/enhanced';
import { governmentDataService } from '../../services/governmentDataService';
import { ExternalLink, Calendar, DollarSign, Users, Award } from 'lucide-react';
import LoadingSpinner from '../LoadingSpinner';

interface GovernmentSchemesProps {
  user: EnhancedUser;
}

const GovernmentSchemes: React.FC<GovernmentSchemesProps> = ({ user }) => {
  const [schemes, setSchemes] = useState<GovernmentScheme[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    fetchSchemes();
  }, [user]);

  const fetchSchemes = async () => {
    try {
      setLoading(true);
      const data = await governmentDataService.fetchGovernmentSchemes(user);
      setSchemes(data);
    } catch (error) {
      console.error('Error fetching schemes:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredSchemes = schemes.filter(scheme => 
    selectedCategory === 'all' || scheme.category === selectedCategory
  );

  const getCategoryIcon = (category: GovernmentScheme['category']) => {
    switch (category) {
      case 'scholarship':
        return <Award className="h-5 w-5 text-blue-600" />;
      case 'skill_development':
        return <Users className="h-5 w-5 text-green-600" />;
      case 'employment':
        return <DollarSign className="h-5 w-5 text-purple-600" />;
      default:
        return <Award className="h-5 w-5 text-gray-600" />;
    }
  };

  const getCategoryColor = (category: GovernmentScheme['category']) => {
    switch (category) {
      case 'scholarship':
        return 'bg-blue-100 text-blue-800';
      case 'skill_development':
        return 'bg-green-100 text-green-800';
      case 'employment':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <LoadingSpinner message="Fetching government schemes..." />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Government Schemes</h2>
          <p className="text-gray-600">Scholarships and programs you're eligible for</p>
        </div>
        
        <div className="flex space-x-2">
          {['all', 'scholarship', 'skill_development', 'employment'].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category === 'all' ? 'All' : category.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6">
        {filteredSchemes.map((scheme) => (
          <div key={scheme.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                {getCategoryIcon(scheme.category)}
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{scheme.name}</h3>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(scheme.category)}`}>
                    {scheme.category.replace('_', ' ')}
                  </span>
                </div>
              </div>
              
              <div className="text-right">
                <div className="flex items-center space-x-1 text-green-600 font-semibold">
                  <DollarSign className="h-4 w-4" />
                  <span>{scheme.amount}</span>
                </div>
                <div className="flex items-center space-x-1 text-gray-500 text-sm mt-1">
                  <Calendar className="h-3 w-3" />
                  <span>Due: {scheme.deadline}</span>
                </div>
              </div>
            </div>

            <p className="text-gray-600 mb-4">{scheme.description}</p>

            <div className="mb-4">
              <h4 className="font-semibold text-gray-900 mb-2">Eligibility:</h4>
              <div className="flex flex-wrap gap-2">
                {scheme.eligibility.map((criteria, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {criteria}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-semibold text-gray-900 mb-2">Target Audience:</h4>
              <div className="flex flex-wrap gap-2">
                {scheme.targetAudience.map((audience, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                  >
                    {audience}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <a
                href={scheme.applicationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <span>Apply Now</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {filteredSchemes.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🏛️</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No schemes found</h3>
          <p className="text-gray-600">
            {selectedCategory === 'all' 
              ? 'No government schemes available at the moment.'
              : `No ${selectedCategory.replace('_', ' ')} schemes match your profile.`
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default GovernmentSchemes;