import React from 'react';
import { EnhancedUser, Badge } from '../../types/enhanced';
import { Trophy, Star, Target, Zap, Award } from 'lucide-react';

interface GamificationPanelProps {
  user: EnhancedUser;
  onUpdateUser: (user: EnhancedUser) => void;
}

const GamificationPanel: React.FC<GamificationPanelProps> = ({ user, onUpdateUser }) => {
  const xpPoints = user.xpPoints || 0;
  const badges = user.badges || [];
  const completedSteps = user.completedSteps || [];

  // Calculate level based on XP
  const level = Math.floor(xpPoints / 1000) + 1;
  const xpForNextLevel = level * 1000;
  const xpProgress = (xpPoints % 1000) / 1000 * 100;

  const availableBadges: Badge[] = [
    {
      id: 'first-step',
      name: 'First Steps',
      description: 'Complete your first roadmap step',
      icon: '🚀',
      earnedAt: new Date(),
      xpValue: 100
    },
    {
      id: 'skill-master',
      name: 'Skill Master',
      description: 'Learn 5 new skills',
      icon: '🎯',
      earnedAt: new Date(),
      xpValue: 500
    },
    {
      id: 'consistent-learner',
      name: 'Consistent Learner',
      description: 'Complete tasks for 7 days straight',
      icon: '📚',
      earnedAt: new Date(),
      xpValue: 300
    },
    {
      id: 'career-explorer',
      name: 'Career Explorer',
      description: 'Explore 3 different career paths',
      icon: '🗺️',
      earnedAt: new Date(),
      xpValue: 200
    }
  ];

  const earnedBadgeIds = badges.map(b => b.id);
  const unearnedBadges = availableBadges.filter(b => !earnedBadgeIds.includes(b.id));

  const addXP = (points: number, reason: string) => {
    const newXP = xpPoints + points;
    onUpdateUser({
      ...user,
      xpPoints: newXP
    });
    
    // Show notification (you could implement a toast system)
    console.log(`+${points} XP: ${reason}`);
  };

  const earnBadge = (badge: Badge) => {
    if (!earnedBadgeIds.includes(badge.id)) {
      onUpdateUser({
        ...user,
        badges: [...badges, badge],
        xpPoints: xpPoints + badge.xpValue
      });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
          <Trophy className="h-5 w-5 text-yellow-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Your Progress</h2>
          <p className="text-gray-600 text-sm">Level up your career journey!</p>
        </div>
      </div>

      {/* Level and XP */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Star className="h-5 w-5 text-yellow-500" />
            <span className="font-semibold text-gray-900">Level {level}</span>
          </div>
          <span className="text-sm text-gray-600">{xpPoints} XP</span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${xpProgress}%` }}
          />
        </div>
        
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>{xpPoints % 1000} XP</span>
          <span>{xpForNextLevel} XP to next level</span>
        </div>
      </div>

      {/* Earned Badges */}
      {badges.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
            <Award className="h-4 w-4 text-blue-600" />
            <span>Earned Badges</span>
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {badges.map((badge) => (
              <div
                key={badge.id}
                className="flex items-center space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg"
              >
                <div className="text-2xl">{badge.icon}</div>
                <div>
                  <div className="font-medium text-green-900">{badge.name}</div>
                  <div className="text-xs text-green-700">+{badge.xpValue} XP</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Available Badges */}
      {unearnedBadges.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
            <Target className="h-4 w-4 text-gray-600" />
            <span>Available Badges</span>
          </h3>
          <div className="space-y-2">
            {unearnedBadges.slice(0, 3).map((badge) => (
              <div
                key={badge.id}
                className="flex items-center space-x-3 p-3 bg-gray-50 border border-gray-200 rounded-lg opacity-75"
              >
                <div className="text-xl grayscale">{badge.icon}</div>
                <div className="flex-1">
                  <div className="font-medium text-gray-700">{badge.name}</div>
                  <div className="text-xs text-gray-500">{badge.description}</div>
                </div>
                <div className="text-xs text-gray-500">+{badge.xpValue} XP</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="space-y-2">
        <h3 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
          <Zap className="h-4 w-4 text-purple-600" />
          <span>Quick Actions</span>
        </h3>
        
        <button
          onClick={() => addXP(50, 'Daily check-in')}
          className="w-full text-left p-3 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors"
        >
          <div className="font-medium text-purple-900">Daily Check-in</div>
          <div className="text-xs text-purple-700">+50 XP</div>
        </button>
        
        <button
          onClick={() => addXP(100, 'Profile update')}
          className="w-full text-left p-3 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
        >
          <div className="font-medium text-blue-900">Update Profile</div>
          <div className="text-xs text-blue-700">+100 XP</div>
        </button>
      </div>

      {/* Achievements Summary */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">{completedSteps.length}</div>
            <div className="text-xs text-gray-500">Steps Completed</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">{badges.length}</div>
            <div className="text-xs text-gray-500">Badges Earned</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">{level}</div>
            <div className="text-xs text-gray-500">Current Level</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamificationPanel;