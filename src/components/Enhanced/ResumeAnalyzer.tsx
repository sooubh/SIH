import React, { useState } from 'react';
import { aiProviderService } from '../../services/aiProviders';
import { Upload, FileText, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react';
import LoadingSpinner from '../LoadingSpinner';

interface ResumeAnalyzerProps {
  onAnalysisComplete: (analysis: any) => void;
}

const ResumeAnalyzer: React.FC<ResumeAnalyzerProps> = ({ onAnalysisComplete }) => {
  const [resumeText, setResumeText] = useState('');
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      setResumeText(text);
    };
    reader.readAsText(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const analyzeResume = async () => {
    if (!resumeText.trim()) return;
    
    try {
      setLoading(true);
      const result = await aiProviderService.analyzeResume(resumeText);
      setAnalysis(result);
      onAnalysisComplete(result);
    } catch (error) {
      console.error('Error analyzing resume:', error);
    } finally {
      setLoading(false);
    }
  };

  const sampleResume = `John Doe
Software Engineer
john.doe@email.com | +91-9876543210

EXPERIENCE:
Software Developer at TechCorp (2022-2024)
- Developed web applications using React and Node.js
- Improved application performance by 30%
- Led a team of 3 junior developers

EDUCATION:
B.Tech Computer Science, XYZ University (2018-2022)
CGPA: 8.5/10

SKILLS:
JavaScript, Python, React, Node.js, MongoDB, AWS`;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
          <FileText className="h-5 w-5 text-green-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Resume Analyzer</h2>
          <p className="text-gray-600 text-sm">Get AI-powered feedback on your resume</p>
        </div>
      </div>

      {!analysis ? (
        <div className="space-y-6">
          {/* File Upload Area */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Upload your resume or paste text
            </h3>
            <p className="text-gray-600 mb-4">
              Drag and drop a text file or paste your resume content below
            </p>
            <input
              type="file"
              accept=".txt,.doc,.docx"
              onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
              className="hidden"
              id="resume-upload"
            />
            <label
              htmlFor="resume-upload"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer inline-block"
            >
              Choose File
            </label>
          </div>

          {/* Text Area */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Or paste your resume text:
            </label>
            <textarea
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste your resume content here..."
              className="w-full h-64 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Sample Resume Button */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setResumeText(sampleResume)}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Use Sample Resume
            </button>
            
            <button
              onClick={analyzeResume}
              disabled={!resumeText.trim() || loading}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                resumeText.trim() && !loading
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {loading ? 'Analyzing...' : 'Analyze Resume'}
            </button>
          </div>

          {loading && (
            <div className="mt-6">
              <LoadingSpinner message="AI is analyzing your resume..." />
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {/* Overall Score */}
          <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg">
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {analysis.score || 78}/100
            </div>
            <div className="text-gray-700">Overall Resume Score</div>
            <div className="text-sm text-gray-600 mt-2">
              {analysis.aiInsights || 'Your resume shows strong potential with room for improvement.'}
            </div>
          </div>

          {/* Strengths */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span>Strengths</span>
            </h3>
            <div className="space-y-2">
              {(analysis.strengths || ['Strong technical skills', 'Good educational background']).map((strength: string, index: number) => (
                <div key={index} className="flex items-center space-x-2 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                  <span className="text-green-800">{strength}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Areas for Improvement */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-orange-600" />
              <span>Areas for Improvement</span>
            </h3>
            <div className="space-y-2">
              {(analysis.weaknesses || ['Could improve quantifiable achievements', 'Add more action verbs']).map((weakness: string, index: number) => (
                <div key={index} className="flex items-center space-x-2 p-3 bg-orange-50 rounded-lg">
                  <AlertCircle className="h-4 w-4 text-orange-600 flex-shrink-0" />
                  <span className="text-orange-800">{weakness}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Suggestions */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <span>Improvement Suggestions</span>
            </h3>
            <div className="space-y-2">
              {(analysis.suggestions || ['Add quantifiable achievements', 'Include more action verbs', 'Highlight leadership experiences']).map((suggestion: string, index: number) => (
                <div key={index} className="flex items-center space-x-2 p-3 bg-blue-50 rounded-lg">
                  <TrendingUp className="h-4 w-4 text-blue-600 flex-shrink-0" />
                  <span className="text-blue-800">{suggestion}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Extracted Information */}
          {analysis.extractedInfo && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Extracted Information</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Name:</span>
                    <span className="ml-2 text-gray-900">{analysis.extractedInfo.name}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Email:</span>
                    <span className="ml-2 text-gray-900">{analysis.extractedInfo.email}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Experience:</span>
                    <span className="ml-2 text-gray-900">{analysis.extractedInfo.experience}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Education:</span>
                    <span className="ml-2 text-gray-900">{analysis.extractedInfo.education}</span>
                  </div>
                </div>
                <div className="mt-3">
                  <span className="font-medium text-gray-700">Skills:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {analysis.extractedInfo.skills?.map((skill: string, index: number) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex space-x-4">
            <button
              onClick={() => {
                setAnalysis(null);
                setResumeText('');
              }}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Analyze Another Resume
            </button>
            <button
              onClick={() => {
                const blob = new Blob([JSON.stringify(analysis, null, 2)], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'resume-analysis.json';
                a.click();
                URL.revokeObjectURL(url);
              }}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Download Analysis
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeAnalyzer;