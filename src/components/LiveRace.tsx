import React from 'react';
import { Race, Bet } from '../types/racing';
import { Clock, DollarSign, Zap, Play } from 'lucide-react';
import LiveRaceAnimation from './LiveRaceAnimation';

interface LiveRaceProps {
  race: Race;
  onPlaceBet: () => void;
  currentBet?: Bet | null;
}

const LiveRace: React.FC<LiveRaceProps> = ({ race, onPlaceBet, currentBet }) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusColor = () => {
    switch (race.status) {
      case 'betting':
        return 'bg-green-500';
      case 'locked':
        return 'bg-yellow-500';
      case 'running':
        return 'bg-red-500 animate-pulse';
      case 'finished':
        return 'bg-gray-500';
      default:
        return 'bg-orange-500';
    }
  };

  const getStatusText = () => {
    switch (race.status) {
      case 'betting':
        return 'Betting Open';
      case 'locked':
        return 'Betting Locked';
      case 'running':
        return 'Race Running';
      case 'finished':
        return 'Race Finished';
      default:
        return 'Upcoming';
    }
  };

  const getRobotDogeEmoji = (modelId: string) => {
    switch (modelId) {
      case 'satoshi-shibe':
        return '🤖🐕'; // Conservative robot doge
      case 'moondoggie':
        return '🚀🐕'; // Aggressive rocket doge
      case 'sheba-fomo':
        return '📈🐕'; // Trend following doge
      default:
        return '🤖';
    }
  };

  return (
    <div className="space-y-8">
      {/* Race Header */}
      <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl shadow-xl p-8 border-2 border-orange-200">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Zap className="w-8 h-8 text-orange-600 mr-3" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{race.name}</h2>
              <p className="text-orange-600">AI battle. Doge price. You bet who's right.</p>
            </div>
          </div>
          <div className={`px-4 py-2 rounded-full text-white font-bold ${getStatusColor()}`}>
            {getStatusText()}
          </div>
        </div>

        {/* Current Price & Timer */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-orange-200 text-center">
            <div className="flex items-center justify-center mb-2">
              <DollarSign className="w-6 h-6 text-green-600 mr-2" />
              <span className="text-sm font-medium text-gray-600">Current DOGE Price</span>
            </div>
            <div className="text-3xl font-bold text-gray-900">
              ${race.currentPrice.toFixed(4)}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-orange-200 text-center">
            <div className="flex items-center justify-center mb-2">
              <Clock className="w-6 h-6 text-orange-600 mr-2" />
              <span className="text-sm font-medium text-gray-600">Time Remaining</span>
            </div>
            <div className="text-3xl font-bold text-gray-900">
              {formatTime(race.timeRemaining)}
            </div>
          </div>
        </div>

        {/* Robot Doge AI Models */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {race.models.map((model) => (
            <div key={model.id} className="bg-white rounded-xl p-6 border-2 border-orange-200 hover:border-orange-300 transition-colors">
              <div className="text-center">
                <div 
                  className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center border-4 border-white shadow-lg text-2xl"
                  style={{ backgroundColor: model.color }}
                >
                  {getRobotDogeEmoji(model.id)}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{model.name}</h3>
                <p className="text-sm text-orange-600 mb-3 font-medium">{model.personality}</p>
                
                {model.prediction && (
                  <div className="space-y-2">
                    <div className="text-xl font-bold text-gray-900">
                      ${model.prediction.toFixed(4)}
                    </div>
                    <div className="text-sm text-gray-600">
                      Confidence: {model.confidence}%
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full transition-all duration-300"
                        style={{ 
                          width: `${model.confidence}%`,
                          backgroundColor: model.color 
                        }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Current Bet Display */}
        {currentBet && (
          <div className="mb-6 bg-orange-100 border border-orange-300 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="text-orange-800 font-medium">
                Your bet: {currentBet.amount} DOGE on{' '}
                {race.models.find(m => m.id === currentBet.modelId)?.name}
              </div>
              <div className="text-orange-600 font-bold">
                Potential win: {(currentBet.amount * 3).toFixed(2)} DOGE
              </div>
            </div>
          </div>
        )}

        {/* Place Bet Button */}
        {race.status === 'betting' && !currentBet && (
          <div className="text-center">
            <button
              onClick={onPlaceBet}
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:from-orange-600 hover:to-red-600 transition-all transform hover:scale-105 active:scale-95"
            >
              <Play className="w-5 h-5 inline mr-2" />
              Place Your Bet
            </button>
          </div>
        )}

        {race.status === 'locked' && (
          <div className="text-center">
            <div className="bg-yellow-100 border border-yellow-300 rounded-xl p-4">
              <p className="text-yellow-800 font-medium">
                Betting is now locked. Race starting soon...
              </p>
            </div>
          </div>
        )}

        {race.status === 'running' && (
          <div className="text-center">
            <div className="bg-red-100 border border-red-300 rounded-xl p-4">
              <p className="text-red-800 font-medium animate-pulse">
                🏁 Race in progress! Waiting for final price...
              </p>
            </div>
          </div>
        )}

        {race.status === 'finished' && race.winner && (
          <div className="text-center">
            <div className="bg-green-100 border border-green-300 rounded-xl p-4">
              <p className="text-green-800 font-bold text-lg">
                🏆 Winner: {race.models.find(m => m.id === race.winner)?.name}!
              </p>
              <p className="text-green-700 mt-1">
                Final price: ${race.targetPrice?.toFixed(4)}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Live Race Animation */}
      <LiveRaceAnimation 
        race={race} 
        isActive={race.status === 'running' || race.status === 'locked'} 
      />
    </div>
  );
};

export default LiveRace;