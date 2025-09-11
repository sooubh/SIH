import React from 'react';
import { RoadmapStep, CareerProfile, User } from '../../types';
import { X, Download } from 'lucide-react';

interface RoadmapExportProps {
  roadmap: RoadmapStep[];
  career: CareerProfile;
  user: User;
  onClose: () => void;
}

const RoadmapExport: React.FC<RoadmapExportProps> = ({ roadmap, career, user, onClose }) => {
  const generatePDFContent = () => {
    // This would integrate with a PDF generation library like jsPDF
    // For now, we'll create a downloadable text version
    const content = `
CAREER ROADMAP: ${career.title.toUpperCase()}
Generated for: ${user.name}
Date: ${new Date().toLocaleDateString()}

CAREER OVERVIEW:
${career.description}

Expected Salary: ${career.averageSalary}
Growth Rate: ${career.growthRate}
Industry: ${career.industry}

YOUR PROFILE:
Education: ${user.education}
Current Skills: ${user.skills.join(', ')}
Interests: ${user.interests.join(', ')}

LEARNING ROADMAP:

${roadmap.map((step, index) => `
STEP ${index + 1}: ${step.title}
Priority: ${step.priority.toUpperCase()}
Duration: ${step.duration}
Type: ${step.type.charAt(0).toUpperCase() + step.type.slice(1)}

Description:
${step.description}

${step.resources.length > 0 ? `
Resources:
${step.resources.map(resource => `
- ${resource.title} (${resource.provider})
  Type: ${resource.type} | Cost: ${resource.cost} | Duration: ${resource.duration}
  URL: ${resource.url}
`).join('')}` : ''}

${'='.repeat(50)}
`).join('')}

NEXT STEPS:
1. Start with high-priority steps
2. Complete one step at a time
3. Practice with hands-on projects
4. Build a portfolio showcasing your skills
5. Network with professionals in the field
6. Apply for relevant positions or internships

This roadmap is a guide. Adjust timelines based on your pace and circumstances.
Good luck on your career journey!
`;

    return content;
  };

  const downloadTxtFile = () => {
    const content = generatePDFContent();
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${career.title.replace(/\s+/g, '_')}_Roadmap_${user.name.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadHTMLFile = () => {
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <title>${career.title} Roadmap - ${user.name}</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #3B82F6, #14B8A6); color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
        .step { border: 1px solid #e5e7eb; border-radius: 8px; padding: 15px; margin-bottom: 15px; }
        .step-header { display: flex; align-items: center; margin-bottom: 10px; }
        .priority-high { color: #dc2626; }
        .priority-medium { color: #d97706; }
        .priority-low { color: #16a34a; }
        .resources { background: #f9fafb; padding: 10px; border-radius: 4px; margin-top: 10px; }
        .resource-item { margin-bottom: 5px; }
        @media print { body { margin: 0; } .no-print { display: none; } }
    </style>
</head>
<body>
    <div class="header">
        <h1>${career.title} Career Roadmap</h1>
        <p>Generated for: ${user.name}</p>
        <p>Date: ${new Date().toLocaleDateString()}</p>
    </div>
    
    <h2>Career Overview</h2>
    <p><strong>Description:</strong> ${career.description}</p>
    <p><strong>Expected Salary:</strong> ${career.averageSalary}</p>
    <p><strong>Growth Rate:</strong> ${career.growthRate}</p>
    <p><strong>Industry:</strong> ${career.industry}</p>
    
    <h2>Your Profile</h2>
    <p><strong>Education:</strong> ${user.education}</p>
    <p><strong>Current Skills:</strong> ${user.skills.join(', ')}</p>
    <p><strong>Interests:</strong> ${user.interests.join(', ')}</p>
    
    <h2>Learning Roadmap</h2>
    ${roadmap.map((step, index) => `
    <div class="step">
        <div class="step-header">
            <h3>Step ${index + 1}: ${step.title}</h3>
            <span class="priority-${step.priority}" style="margin-left: auto; font-weight: bold;">
                ${step.priority.toUpperCase()} PRIORITY
            </span>
        </div>
        <p><strong>Duration:</strong> ${step.duration}</p>
        <p><strong>Type:</strong> ${step.type.charAt(0).toUpperCase() + step.type.slice(1)}</p>
        <p>${step.description}</p>
        ${step.resources.length > 0 ? `
        <div class="resources">
            <h4>Resources:</h4>
            ${step.resources.map(resource => `
            <div class="resource-item">
                <strong>${resource.title}</strong> (${resource.provider})<br>
                Type: ${resource.type} | Cost: ${resource.cost} | Duration: ${resource.duration}<br>
                <a href="${resource.url}" target="_blank">${resource.url}</a>
            </div>
            `).join('')}
        </div>
        ` : ''}
    </div>
    `).join('')}
    
    <h2>Next Steps</h2>
    <ol>
        <li>Start with high-priority steps</li>
        <li>Complete one step at a time</li>
        <li>Practice with hands-on projects</li>
        <li>Build a portfolio showcasing your skills</li>
        <li>Network with professionals in the field</li>
        <li>Apply for relevant positions or internships</li>
    </ol>
    
    <p><em>This roadmap is a guide. Adjust timelines based on your pace and circumstances. Good luck on your career journey!</em></p>
</body>
</html>
`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${career.title.replace(/\s+/g, '_')}_Roadmap_${user.name.replace(/\s+/g, '_')}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">Export Roadmap</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          <p className="text-gray-600 mb-6">
            Download your personalized {career.title} roadmap to keep track of your progress offline.
          </p>

          <div className="space-y-4">
            <button
              onClick={downloadHTMLFile}
              className="w-full flex items-center justify-center space-x-3 bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download className="h-5 w-5" />
              <span>Download as HTML (Recommended)</span>
            </button>

            <button
              onClick={downloadTxtFile}
              className="w-full flex items-center justify-center space-x-3 bg-gray-600 text-white p-4 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Download className="h-5 w-5" />
              <span>Download as Text File</span>
            </button>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">What's included:</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Complete step-by-step roadmap</li>
              <li>• Resource links and recommendations</li>
              <li>• Your profile and career match details</li>
              <li>• Estimated timelines and priorities</li>
              <li>• Printable format for offline use</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadmapExport;