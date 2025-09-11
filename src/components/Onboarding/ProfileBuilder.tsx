import React, { useState } from 'react';
import { User } from '../../types';
import SkillTag from '../SkillTag';
import { Plus, User as UserIcon, GraduationCap, Code, Heart } from 'lucide-react';

interface ProfileBuilderProps {
  initialData: Partial<User>;
  onComplete: (data: Partial<User>) => void;
}

const ProfileBuilder: React.FC<ProfileBuilderProps> = ({ initialData, onComplete }) => {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    email: initialData.email || '',
    education: initialData.education || '',
    yearOfStudy: initialData.yearOfStudy || '',
    skills: initialData.skills || [],
    interests: initialData.interests || [],
    experience: initialData.experience || '',
    careerGoals: initialData.careerGoals || ''
  });
  
  const [newSkill, setNewSkill] = useState('');
  const [newInterest, setNewInterest] = useState('');

  const commonSkills = [
    'JavaScript', 'Python', 'Java', 'React', 'Node.js', 'HTML', 'CSS',
    'SQL', 'Git', 'Machine Learning', 'Data Analysis', 'UI/UX Design',
    'Project Management', 'Communication', 'Problem Solving'
  ];

  const commonInterests = [
    'Web Development', 'Data Science', 'Artificial Intelligence', 'Mobile Apps',
    'Cybersecurity', 'Cloud Computing', 'UI/UX Design', 'Product Management',
    'Digital Marketing', 'Blockchain', 'Game Development', 'DevOps'
  ];

  const addSkill = (skill: string) => {
    if (skill && !formData.skills.includes(skill)) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const addInterest = (interest: string) => {
    if (interest && !formData.interests.includes(interest)) {
      setFormData(prev => ({
        ...prev,
        interests: [...prev.interests, interest]
      }));
      setNewInterest('');
    }
  };

  const removeInterest = (interestToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.filter(interest => interest !== interestToRemove)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(formData);
  };

  const isFormValid = formData.name && formData.email && formData.education && 
                     formData.skills.length > 0 && formData.interests.length > 0;

  return (
    <div className="p-8">
      <div className="flex items-center space-x-3 mb-6">
        <UserIcon className="h-8 w-8 text-blue-600" />
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Build Your Profile</h2>
          <p className="text-gray-600">Tell us about your background and aspirations</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder="Enter your full name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder="Enter your email"
              required
            />
          </div>
        </div>

        {/* Education */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Education Background</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Education Level *
              </label>
              <select
                value={formData.education}
                onChange={(e) => setFormData(prev => ({ ...prev, education: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                required
              >
                <option value="">Select your education level</option>
                <option value="High School">High School</option>
                <option value="Bachelor's - Year 1">Bachelor's - Year 1</option>
                <option value="Bachelor's - Year 2">Bachelor's - Year 2</option>
                <option value="Bachelor's - Year 3">Bachelor's - Year 3</option>
                <option value="Bachelor's - Year 4">Bachelor's - Year 4</option>
                <option value="Master's Student">Master's Student</option>
                <option value="PhD Student">PhD Student</option>
                <option value="Recent Graduate">Recent Graduate</option>
                <option value="Working Professional">Working Professional</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Work Experience
              </label>
              <select
                value={formData.experience}
                onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              >
                <option value="">Select experience level</option>
                <option value="No experience">No experience</option>
                <option value="0-1 years">0-1 years</option>
                <option value="1-3 years">1-3 years</option>
                <option value="3-5 years">3-5 years</option>
                <option value="5+ years">5+ years</option>
              </select>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Code className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Your Skills *</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {formData.skills.map((skill) => (
                <SkillTag
                  key={skill}
                  skill={skill}
                  onRemove={() => removeSkill(skill)}
                  variant="default"
                />
              ))}
            </div>
            
            <div className="flex gap-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add a skill..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill(newSkill))}
              />
              <button
                type="button"
                onClick={() => addSkill(newSkill)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-1"
              >
                <Plus className="h-4 w-4" />
                <span>Add</span>
              </button>
            </div>
            
            <div>
              <p className="text-sm text-gray-600 mb-2">Popular skills:</p>
              <div className="flex flex-wrap gap-2">
                {commonSkills.filter(skill => !formData.skills.includes(skill)).slice(0, 8).map((skill) => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => addSkill(skill)}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                  >
                    + {skill}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Interests */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Heart className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Your Interests *</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {formData.interests.map((interest) => (
                <SkillTag
                  key={interest}
                  skill={interest}
                  onRemove={() => removeInterest(interest)}
                  variant="default"
                />
              ))}
            </div>
            
            <div className="flex gap-2">
              <input
                type="text"
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
                placeholder="Add an interest..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addInterest(newInterest))}
              />
              <button
                type="button"
                onClick={() => addInterest(newInterest)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-1"
              >
                <Plus className="h-4 w-4" />
                <span>Add</span>
              </button>
            </div>
            
            <div>
              <p className="text-sm text-gray-600 mb-2">Popular interests:</p>
              <div className="flex flex-wrap gap-2">
                {commonInterests.filter(interest => !formData.interests.includes(interest)).slice(0, 8).map((interest) => (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => addInterest(interest)}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                  >
                    + {interest}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Career Goals */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Career Goals (Optional)
          </label>
          <textarea
            value={formData.careerGoals}
            onChange={(e) => setFormData(prev => ({ ...prev, careerGoals: e.target.value }))}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            placeholder="Tell us about your career aspirations..."
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!isFormValid}
            className={`px-8 py-3 rounded-lg font-medium transition-all duration-200 ${
              isFormValid
                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Continue to Assessment
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileBuilder;