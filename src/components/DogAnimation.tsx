import React from 'react';

interface DogAnimationProps {
  position: number;
  progress: number;
  color: string;
  name: string;
  isLeading?: boolean;
}

const DogAnimation: React.FC<DogAnimationProps> = ({ 
  position, 
  progress, 
  color, 
  name, 
  isLeading 
}) => {
  return (
    <div className="relative mb-6">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <span className="text-lg font-bold text-gray-800 mr-2">#{position}</span>
          <span className="text-lg font-bold text-gray-800">{name}</span>
          {isLeading && (
            <span className="ml-2 px-2 py-1 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full animate-bounce">
              🏆 WOW LEADER! 🏆
            </span>
          )}
        </div>
        <span className="text-sm text-gray-600 font-medium">{progress.toFixed(1)}%</span>
      </div>
      
      {/* Race track */}
      <div className="relative h-16 bg-gradient-to-r from-green-200 via-green-100 to-green-200 rounded-xl border-4 border-green-300 overflow-hidden shadow-lg">
        {/* Track grass pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="h-full w-full bg-gradient-to-r from-green-300 to-green-200"></div>
          <div className="absolute inset-0 bg-repeat-x opacity-20" style={{
            backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(34, 197, 94, 0.3) 10px, rgba(34, 197, 94, 0.3) 20px)`
          }}></div>
        </div>
        
        {/* Track lines */}
        <div className="absolute inset-0 flex items-center">
          <div className="w-full h-px bg-white opacity-60"></div>
        </div>
        
        {/* Finish line */}
        <div className="absolute right-2 top-0 w-2 h-full bg-gradient-to-b from-red-500 via-white to-red-500 opacity-80 animate-pulse"></div>
        <div className="absolute right-0 top-0 w-1 h-full bg-black"></div>
        
        {/* Realistic Shiba Inu Dog */}
        <div 
          className="absolute top-1/2 transform -translate-y-1/2 transition-all duration-1000 ease-out z-10"
          style={{ left: `${Math.min(progress, 92)}%` }}
        >
          <div className={`relative ${isLeading ? 'animate-bounce' : ''}`}>
            {/* Dog body - more realistic proportions */}
            <div 
              className="relative w-12 h-7 rounded-full shadow-lg"
              style={{ backgroundColor: color }}
            >
              {/* Chest area */}
              <div 
                className="absolute -left-1 top-1 w-4 h-5 rounded-full"
                style={{ backgroundColor: color }}
              ></div>
              
              {/* Dog head - more realistic Shiba Inu proportions */}
              <div 
                className="absolute -right-4 -top-1 w-7 h-7 rounded-full shadow-md"
                style={{ backgroundColor: color }}
              >
                {/* Snout */}
                <div 
                  className="absolute -right-2 top-2 w-3 h-3 rounded-full"
                  style={{ backgroundColor: color }}
                >
                  {/* Nose */}
                  <div className="absolute right-0 top-1 w-1 h-1 bg-black rounded-full"></div>
                </div>
                
                {/* Ears - pointed Shiba Inu style */}
                <div className="absolute -top-2 left-1 w-2 h-4 bg-orange-800 rounded-t-full transform -rotate-12 shadow-sm"></div>
                <div className="absolute -top-2 right-1 w-2 h-4 bg-orange-800 rounded-t-full transform rotate-12 shadow-sm"></div>
                
                {/* Inner ears */}
                <div className="absolute -top-1 left-1.5 w-1 h-2 bg-pink-300 rounded-t-full transform -rotate-12"></div>
                <div className="absolute -top-1 right-1.5 w-1 h-2 bg-pink-300 rounded-t-full transform rotate-12"></div>
                
                {/* Eyes - alert Shiba expression */}
                <div className="absolute top-1 left-1.5 w-1.5 h-1.5 bg-black rounded-full"></div>
                <div className="absolute top-1 right-1.5 w-1.5 h-1.5 bg-black rounded-full"></div>
                
                {/* Eye shine */}
                <div className="absolute top-1 left-2 w-0.5 h-0.5 bg-white rounded-full"></div>
                <div className="absolute top-1 right-2 w-0.5 h-0.5 bg-white rounded-full"></div>
                
                {/* Mouth */}
                <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-3 h-1 border-b-2 border-black rounded-b-full"></div>
              </div>
              
              {/* Realistic running legs animation */}
              <div className="absolute -bottom-4 left-1">
                {/* Front legs */}
                <div className="flex space-x-1">
                  <div className="w-1.5 h-5 bg-orange-900 rounded-full animate-pulse shadow-sm" style={{ 
                    animationDuration: '0.3s',
                    transform: `rotate(${Math.sin(Date.now() * 0.01) * 15}deg)`
                  }}></div>
                  <div className="w-1.5 h-5 bg-orange-900 rounded-full animate-pulse shadow-sm" style={{ 
                    animationDuration: '0.3s',
                    animationDelay: '0.15s',
                    transform: `rotate(${Math.sin(Date.now() * 0.01 + Math.PI) * 15}deg)`
                  }}></div>
                </div>
                {/* Paws */}
                <div className="flex space-x-1 mt-0">
                  <div className="w-2 h-1 bg-black rounded-full opacity-60"></div>
                  <div className="w-2 h-1 bg-black rounded-full opacity-60"></div>
                </div>
              </div>
              
              <div className="absolute -bottom-4 right-1">
                {/* Back legs */}
                <div className="flex space-x-1">
                  <div className="w-1.5 h-5 bg-orange-900 rounded-full animate-pulse shadow-sm" style={{ 
                    animationDuration: '0.3s',
                    animationDelay: '0.1s',
                    transform: `rotate(${Math.sin(Date.now() * 0.01 + Math.PI/2) * 20}deg)`
                  }}></div>
                  <div className="w-1.5 h-5 bg-orange-900 rounded-full animate-pulse shadow-sm" style={{ 
                    animationDuration: '0.3s',
                    animationDelay: '0.25s',
                    transform: `rotate(${Math.sin(Date.now() * 0.01 + 3*Math.PI/2) * 20}deg)`
                  }}></div>
                </div>
                {/* Paws */}
                <div className="flex space-x-1 mt-0">
                  <div className="w-2 h-1 bg-black rounded-full opacity-60"></div>
                  <div className="w-2 h-1 bg-black rounded-full opacity-60"></div>
                </div>
              </div>
              
              {/* Realistic curly Shiba tail */}
              <div className="absolute -left-4 -top-1 w-5 h-4 border-3 border-orange-800 rounded-full border-b-transparent border-l-transparent transform rotate-45 animate-pulse"></div>
              <div className="absolute -left-3 -top-2 w-2 h-2 bg-orange-800 rounded-full animate-pulse"></div>
              
              {/* Body markings - typical Shiba coloring */}
              <div className="absolute top-1 left-2 w-6 h-3 bg-white opacity-80 rounded-full"></div>
              <div className="absolute top-3 left-1 w-8 h-2 bg-white opacity-60 rounded-full"></div>
            </div>
            
            {/* Speed lines and dust - more realistic */}
            <div className="absolute -left-8 top-2 flex space-x-1">
              <div className="w-4 h-1 bg-yellow-200 rounded-full animate-ping opacity-60"></div>
              <div className="w-3 h-1 bg-yellow-300 rounded-full animate-ping opacity-40" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-1 bg-yellow-400 rounded-full animate-ping opacity-30" style={{ animationDelay: '0.4s' }}></div>
            </div>
            
            {/* Ground dust */}
            <div className="absolute -left-6 bottom-0 flex space-x-1">
              <div className="w-3 h-2 bg-gray-300 rounded-full animate-bounce opacity-50"></div>
              <div className="w-2 h-1 bg-gray-400 rounded-full animate-bounce opacity-30" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-1 h-1 bg-gray-500 rounded-full animate-bounce opacity-20" style={{ animationDelay: '0.2s' }}></div>
            </div>
            
            {/* Wow text bubble */}
            {isLeading && (
              <div className="absolute -top-8 -left-2 bg-white border-2 border-yellow-400 rounded-lg px-2 py-1 text-xs font-bold text-yellow-800 animate-bounce">
                WOW!
                <div className="absolute bottom-0 left-1/2 transform translate-y-1 -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-yellow-400"></div>
              </div>
            )}
            
            {/* Breathing effect */}
            <div className="absolute inset-0 w-12 h-7 rounded-full animate-pulse opacity-20" style={{
              backgroundColor: color,
              animationDuration: '0.8s'
            }}></div>
          </div>
        </div>
        
        {/* Cheering crowd silhouettes */}
        <div className="absolute top-0 left-4 w-1 h-2 bg-gray-600 rounded-full opacity-40 animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="absolute top-0 left-8 w-1 h-2 bg-gray-600 rounded-full opacity-40 animate-bounce" style={{ animationDelay: '0.3s' }}></div>
        <div className="absolute top-0 left-12 w-1 h-2 bg-gray-600 rounded-full opacity-40 animate-bounce" style={{ animationDelay: '0.5s' }}></div>
      </div>
      
      {/* Progress bar with Doge colors */}
      <div className="mt-3 w-full bg-gray-200 rounded-full h-2 shadow-inner">
        <div 
          className="h-2 rounded-full transition-all duration-1000 ease-out bg-gradient-to-r from-yellow-400 to-orange-500 shadow-sm"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      {/* Doge commentary */}
      <div className="mt-2 text-center">
        <span className="text-xs text-gray-600 font-medium">
          {progress < 25 ? 'Such Start • Very Begin' :
           progress < 50 ? 'Much Progress • Wow Speed' :
           progress < 75 ? 'Very Fast • So Close' :
           progress < 95 ? 'Almost There • Much Excite' :
           'FINISH LINE • VERY WOW!'}
        </span>
      </div>
    </div>
  );
};

export default DogAnimation;