import React, { useState } from 'react';
import { PastRace } from '../types/racing';
import { ChevronDown, ChevronUp, Trophy, TrendingUp, TrendingDown } from 'lucide-react';

interface PastRacesProps {
  races: PastRace[];
}

const PastRaces: React.FC<PastRacesProps> = ({ races }) => {
  const [expandedRace, setExpandedRace] = useState<string | null>(null);

  const toggleExpanded = (raceId: string) => {
    setExpandedRace(expandedRace === raceId ? null : raceId);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getPriceChange = (startPrice: number, endPrice: number) => {
    const change = ((endPrice - startPrice) / startPrice) * 100;
    return {
      percentage: change.toFixed(2),
      isPositive: change >= 0
    };
  };

  const getRobotDogeEmoji = (modelId: string) => {
    switch (modelId) {
      case 'satoshi-shibe':
        return '🤖🐕';
      case 'moondoggie':
        return '🚀🐕';
      case 'sheba-fomo':
        return '📈🐕';
      default:
        return '🤖';
    }
  };

  // Sort races by timestamp (most recent first)
  const sortedRaces = [...races].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

  return (
    <div className="bg-white rounded-xl shadow-lg border border-orange-200">
      <div className="p-6 border-b border-orange-200">
        <h2 className="text-xl font-bold text-gray-900">Recent Races</h2>
        <p className="text-gray-600 text-sm">Click to view race details</p>
      </div>

      <div className="divide-y divide-orange-100">
        {sortedRaces.map((race) => {
          const priceChange = getPriceChange(race.startPrice, race.endPrice);
          const isExpanded = expandedRace === race.id;

          return (
            <div key={race.id} className="transition-all duration-200">
              {/* Race Summary */}
              <div
                className="p-4 hover:bg-orange-50 cursor-pointer"
                onClick={() => toggleExpanded(race.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Trophy className="w-5 h-5 text-orange-500 mr-2" />
                      <span className="font-medium text-gray-900">{race.name}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {formatTime(race.timestamp)}
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">
                        ${race.endPrice.toFixed(4)}
                      </div>
                      <div className={`text-xs flex items-center ${
                        priceChange.isPositive ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {priceChange.isPositive ? (
                          <TrendingUp className="w-3 h-3 mr-1" />
                        ) : (
                          <TrendingDown className="w-3 h-3 mr-1" />
                        )}
                        {priceChange.percentage}%
                      </div>
                    </div>

                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </div>
              </div>

              {/* Expanded Details */}
              {isExpanded && (
                <div className="px-4 pb-4 bg-orange-50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-white rounded-lg p-4 border border-orange-200">
                      <h4 className="font-medium text-gray-900 mb-2">Price Movement</h4>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Start:</span>
                          <span className="font-medium">${race.startPrice.toFixed(4)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">End:</span>
                          <span className="font-medium">${race.endPrice.toFixed(4)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Change:</span>
                          <span className={`font-medium ${
                            priceChange.isPositive ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {priceChange.isPositive ? '+' : ''}{priceChange.percentage}%
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 border border-orange-200">
                      <h4 className="font-medium text-gray-900 mb-2">Winner</h4>
                      <div className="flex items-center">
                        <div className="text-2xl mr-3">
                          {getRobotDogeEmoji(race.winner.id)}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{race.winner.name}</div>
                          <div className="text-sm text-orange-600">{race.winner.personality}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* All Predictions */}
                  <div className="bg-white rounded-lg p-4 border border-orange-200">
                    <h4 className="font-medium text-gray-900 mb-3">AI Predictions</h4>
                    <div className="space-y-2">
                      {race.models.map((model) => {
                        const accuracy = Math.abs(race.endPrice - (model.prediction || 0));
                        const isWinner = model.id === race.winner.id;

                        return (
                          <div
                            key={model.id}
                            className={`flex items-center justify-between p-3 rounded ${
                              isWinner ? 'bg-green-50 border border-green-200' : 'bg-gray-50'
                            }`}
                          >
                            <div className="flex items-center">
                              <div className="text-xl mr-3">
                                {getRobotDogeEmoji(model.id)}
                              </div>
                              <div>
                                <span className="text-sm font-medium text-gray-900">
                                  {model.name}
                                </span>
                                {isWinner && (
                                  <Trophy className="w-4 h-4 text-yellow-500 ml-2 inline" />
                                )}
                                <div className="text-xs text-orange-600">{model.personality}</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-medium">
                                ${model.prediction?.toFixed(4)}
                              </div>
                              <div className="text-xs text-gray-600">
                                Off by ${accuracy.toFixed(4)}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* User Bet Info */}
                  {race.userBet && (
                    <div className="mt-4 bg-white rounded-lg p-4 border border-orange-200">
                      <h4 className="font-medium text-gray-900 mb-2">Your Bet</h4>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                          Bet {race.userBet.amount} DOGE on{' '}
                          {race.models.find(m => m.id === race.userBet?.modelId)?.name}
                        </div>
                        <div className={`text-sm font-medium ${
                          race.userBet.status === 'won' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {race.userBet.status === 'won' 
                            ? `Won ${race.userBet.payout} DOGE!` 
                            : 'Lost'
                          }
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PastRaces;