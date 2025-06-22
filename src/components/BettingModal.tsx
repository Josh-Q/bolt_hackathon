import React, { useState } from 'react';
import { Dog } from '../types/racing';
import { X, DollarSign } from 'lucide-react';

interface BettingModalProps {
  dog: Dog;
  isOpen: boolean;
  onClose: () => void;
  onPlaceBet: (dogId: string, amount: number, type: 'win' | 'place' | 'show') => void;
}

const BettingModal: React.FC<BettingModalProps> = ({ dog, isOpen, onClose, onPlaceBet }) => {
  const [amount, setAmount] = useState(50);
  const [betType, setBetType] = useState<'win' | 'place' | 'show'>('win');

  if (!isOpen) return null;

  const calculatePayout = () => {
    const [numerator, denominator] = dog.odds.split('-').map(Number);
    const multiplier = numerator / denominator;
    return Math.round(amount * multiplier + amount);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPlaceBet(dog.id, amount, betType);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8 w-full max-w-md mx-4 border-4 border-yellow-400 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <img 
              src="/doge.jpeg" 
              alt="Doge" 
              className="w-10 h-10 rounded-full mr-3 border-3 border-orange-400 animate-spin"
            />
            <h2 className="text-2xl font-bold text-gray-900">Much Bet • Very Wow</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-white/50 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="mb-6 p-4 bg-white rounded-xl border-3 border-yellow-300 shadow-lg">
          <div className="flex items-center mb-3">
            <div
              className="w-8 h-8 rounded-full mr-3 border-3 shadow-md animate-pulse"
              style={{
                backgroundColor: dog.coat.primary,
                borderColor: dog.coat.secondary
              }}
            ></div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{dog.name}</h3>
              <p className="text-sm text-pink-600 font-bold">{dog.personality}</p>
            </div>
          </div>
          <p className="text-xl text-orange-600 font-bold">Such Odds: {dog.odds} 🚀</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-lg font-bold text-gray-900 mb-3">
              Very Bet Type • Much Choice
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(['win', 'place', 'show'] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setBetType(type)}
                  className={`py-3 px-4 rounded-xl text-sm font-bold capitalize transition-all transform hover:scale-105 border-2 ${
                    betType === type
                      ? 'bg-orange-500 text-white shadow-lg border-orange-600 animate-pulse'
                      : 'bg-white text-gray-700 hover:bg-yellow-100 border-yellow-300'
                  }`}
                >
                  {type === 'win' ? '🥇 WIN' : type === 'place' ? '🥈 PLACE' : '🥉 SHOW'}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-lg font-bold text-gray-900 mb-3">
              Much Amount (DOGE) • Wow Money
            </label>
            <div className="relative">
              <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-orange-500" />
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                min="10"
                max="1000"
                step="10"
                className="w-full pl-12 pr-4 py-4 border-3 border-yellow-300 rounded-xl focus:ring-4 focus:ring-orange-200 focus:border-orange-400 text-lg font-bold bg-white"
              />
            </div>
            <div className="flex space-x-2 mt-3">
              {[25, 50, 100, 200].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setAmount(preset)}
                  className="px-4 py-2 text-sm font-bold bg-yellow-200 text-gray-800 rounded-lg hover:bg-yellow-300 transition-colors border-2 border-yellow-400 transform hover:scale-105"
                >
                  ${preset} 🐕
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8 p-4 bg-gradient-to-r from-green-100 to-green-200 rounded-xl border-3 border-green-300 shadow-lg">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-gray-900">Such Payout:</span>
              <span className="text-2xl font-bold text-green-700">${calculatePayout()} DOGE</span>
            </div>
            <p className="text-sm text-green-600 font-bold mt-1">Very Profit • Much Win • To The Moon! 🚀</p>
          </div>

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-4 px-6 border-3 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 transition-colors font-bold text-lg"
            >
              Such Cancel 😢
            </button>
            <button
              type="submit"
              className="flex-1 py-4 px-6 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-xl hover:from-orange-600 hover:to-yellow-600 transition-all transform hover:scale-105 font-bold text-lg shadow-lg border-2 border-orange-600"
            >
              🚀 PLACE BET WOW 🚀
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BettingModal;