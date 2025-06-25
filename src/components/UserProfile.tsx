import React from 'react';
import { UserStats } from '../types/racing';
import { TrendingUp, DollarSign, Target, Trophy } from 'lucide-react';

interface UserProfileProps {
  stats: UserStats;
  username: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ stats, username }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-orange-200">
      <h2 className="text-lg font-bold text-gray-900 mb-4">{username}'s Performance</h2>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="text-center p-3 bg-orange-50 rounded-lg border border-orange-200">
          <div className="flex items-center justify-center mb-2">
            <DollarSign className="w-5 h-5 text-orange-600 mr-1" />
            <span className="text-xl font-bold text-gray-900">
              {stats.balance.toFixed(2)}
            </span>
          </div>
          <div className="text-xs text-gray-600 font-medium">DOGE Balance</div>
        </div>

        <div className="text-center p-3 bg-orange-50 rounded-lg border border-orange-200">
          <div className="flex items-center justify-center mb-2">
            <Target className="w-5 h-5 text-orange-600 mr-1" />
            <span className="text-xl font-bold text-gray-900">{stats.winRate}%</span>
          </div>
          <div className="text-xs text-gray-600 font-medium">Win Rate</div>
        </div>

        <div className="text-center p-3 bg-orange-50 rounded-lg border border-orange-200">
          <div className="flex items-center justify-center mb-2">
            <Trophy className="w-5 h-5 text-orange-600 mr-1" />
            <span className="text-xl font-bold text-gray-900">{stats.totalBets}</span>
          </div>
          <div className="text-xs text-gray-600 font-medium">Total Bets</div>
        </div>

        <div className="text-center p-3 bg-orange-50 rounded-lg border border-orange-200">
          <div className="flex items-center justify-center mb-2">
            <TrendingUp className="w-5 h-5 text-orange-600 mr-1" />
            <span className={`text-xl font-bold ${stats.totalEarnings >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {stats.totalEarnings >= 0 ? '+' : ''}{stats.totalEarnings.toFixed(2)}
            </span>
          </div>
          <div className="text-xs text-gray-600 font-medium">Total Earnings</div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;