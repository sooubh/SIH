import React, { useState, useEffect } from 'react';
import { JobMarketData, CareerDemandData } from '../../types/enhanced';
import { governmentDataService } from '../../services/governmentDataService';
import { TrendingUp, TrendingDown, MapPin, Building, DollarSign } from 'lucide-react';
import LoadingSpinner from '../LoadingSpinner';

interface JobMarketInsightsProps {
  userSkills: string[];
  selectedCareer?: string;
}

const JobMarketInsights: React.FC<JobMarketInsightsProps> = ({ userSkills, selectedCareer }) => {
  const [marketData, setMarketData] = useState<JobMarketData[]>([]);
  const [careerDemand, setCareerDemand] = useState<CareerDemandData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMarketData();
    if (selectedCareer) {
      fetchCareerDemand(selectedCareer);
    }
  }, [userSkills, selectedCareer]);

  const fetchMarketData = async () => {
    try {
      setLoading(true);
      const data = await governmentDataService.fetchEmploymentData();
      setMarketData(data);
    } catch (error) {
      console.error('Error fetching market data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCareerDemand = async (career: string) => {
    try {
      const data = await governmentDataService.fetchCareerDemandData(career);
      setCareerDemand(data);
    } catch (error) {
      console.error('Error fetching career demand:', error);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <LoadingSpinner message="Analyzing job market trends..." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Career-Specific Demand */}
      {careerDemand && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {careerDemand.career} Market Analysis
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {careerDemand.demandScore}/100
              </div>
              <div className="text-sm text-gray-600">Demand Score</div>
            </div>
            
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-lg font-bold text-blue-600 mb-2">
                ₹{(careerDemand.salaryRange.min / 100000).toFixed(1)}L - ₹{(careerDemand.salaryRange.max / 100000).toFixed(1)}L
              </div>
              <div className="text-sm text-gray-600">Salary Range</div>
            </div>
            
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 mb-2">
                +{careerDemand.jobGrowth}%
              </div>
              <div className="text-sm text-gray-600">Growth Rate</div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Skills in High Demand</h3>
              <div className="flex flex-wrap gap-2">
                {careerDemand.skillsInDemand.map((skill, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      userSkills.includes(skill)
                        ? 'bg-green-100 text-green-800'
                        : 'bg-orange-100 text-orange-800'
                    }`}
                  >
                    {skill}
                    {userSkills.includes(skill) && ' ✓'}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Top Hiring Locations</h3>
              <div className="space-y-2">
                {careerDemand.topLocations.map((location, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-700">{location}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {careerDemand.governmentInitiatives.length > 0 && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Government Initiatives</h3>
              <div className="flex flex-wrap gap-2">
                {careerDemand.governmentInitiatives.map((initiative, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-200 text-blue-800 rounded-full text-sm"
                  >
                    {initiative}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Overall Market Trends */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Job Market Trends</h2>
        
        <div className="grid gap-6">
          {marketData.map((data, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900">{data.skill}</h3>
                <div className={`flex items-center space-x-1 ${
                  data.demandTrend > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {data.demandTrend > 0 ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                  <span className="font-semibold">
                    {data.demandTrend > 0 ? '+' : ''}{data.demandTrend}%
                  </span>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  <span className="text-gray-700">{data.averageSalary}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Building className="h-4 w-4 text-blue-600" />
                  <span className="text-gray-700">{data.jobOpenings.toLocaleString()} openings</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-purple-600" />
                  <span className="text-gray-700">{data.growthProjection}</span>
                </div>
              </div>

              <div className="mt-3">
                <div className="text-xs text-gray-500 mb-1">Top Companies:</div>
                <div className="flex flex-wrap gap-1">
                  {data.topCompanies.slice(0, 3).map((company, idx) => (
                    <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                      {company}
                    </span>
                  ))}
                  {data.topCompanies.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                      +{data.topCompanies.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobMarketInsights;