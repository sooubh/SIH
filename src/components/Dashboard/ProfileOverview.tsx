import React, { useState } from 'react';
import { User } from '../../types';
import { User as UserIcon, Edit3, Save, X } from 'lucide-react';
import SkillTag from '../SkillTag';

interface ProfileOverviewProps {
  user: User;
  onUpdateUser: (user: User) => void;
}

const ProfileOverview: React.FC<ProfileOverviewProps> = ({ user, onUpdateUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  const handleSave = () => {
    onUpdateUser(editedUser);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedUser(user);
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <UserIcon className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Profile Overview</h2>
            <p className="text-gray-600 text-sm">Your career profile summary</p>
          </div>
        </div>
        
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Edit3 className="h-4 w-4" />
          </button>
        ) : (
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
            >
              <Save className="h-4 w-4" />
            </button>
            <button
              onClick={handleCancel}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {/* Basic Info */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          {isEditing ? (
            <input
              type="text"
              value={editedUser.name}
              onChange={(e) => setEditedUser(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          ) : (
            <p className="text-gray-900 font-medium">{user.name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Education</label>
          {isEditing ? (
            <input
              type="text"
              value={editedUser.education}
              onChange={(e) => setEditedUser(prev => ({ ...prev, education: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          ) : (
            <p className="text-gray-900">{user.education}</p>
          )}
        </div>

        {user.experience && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
            <p className="text-gray-900">{user.experience}</p>
          </div>
        )}

        {/* Skills */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
          <div className="flex flex-wrap gap-2">
            {user.skills.map(skill => (
              <SkillTag key={skill} skill={skill} size="sm" />
            ))}
          </div>
        </div>

        {/* Interests */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Interests</label>
          <div className="flex flex-wrap gap-2">
            {user.interests.map(interest => (
              <SkillTag key={interest} skill={interest} variant="default" size="sm" />
            ))}
          </div>
        </div>

        {user.careerGoals && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Career Goals</label>
            <p className="text-gray-900 text-sm">{user.careerGoals}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileOverview;