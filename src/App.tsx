import React, { useState, useEffect } from 'react';
import { Race, Dog, Bet, UserStats as UserStatsType } from './types/racing';
import { mockRaces, mockUserStats, mockBets } from './data/mockData';
import RaceCard from './components/RaceCard';
import DogCard from './components/DogCard';
import BettingModal from './components/BettingModal';
import UserStats from './components/UserStats';
import RaceResults from './components/RaceResults';
import LiveRaceTracker from './components/LiveRaceTracker';
import { ArrowLeft, Zap, TrendingUp } from 'lucide-react';

type View = 'races' | 'race-detail' | 'stats' | 'live-race';

function App() {
  const [currentView, setCurrentView] = useState<View>('races');
  const [selectedRace, setSelectedRace] = useState<Race | null>(null);
  const [races, setRaces] = useState<Race[]>(mockRaces);
  const [userStats, setUserStats] = useState<UserStatsType>(mockUserStats);
  const [userBets, setUserBets] = useState<Bet[]>(mockBets);
  const [bettingModal, setBettingModal] = useState({ isOpen: false, dog: null as Dog | null });

  // Simulate live race progress
  useEffect(() => {
    const interval = setInterval(() => {
      setRaces(prevRaces =>
        prevRaces.map(race => {
          if (race.status === 'live' && race.progress !== undefined) {
            const newProgress = Math.min(race.progress + Math.random() * 4, 100);
            if (newProgress >= 100) {
              return { ...race, status: 'finished' as const, progress: 100 };
            }
            return { ...race, progress: newProgress };
          }
          return race;
        })
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleSelectRace = (race: Race) => {
    setSelectedRace(race);
    if (race.status === 'live') {
      setCurrentView('live-race');
    } else {
      setCurrentView('race-detail');
    }
  };

  const handlePlaceBet = (dogId: string, amount: number, type: 'win' | 'place' | 'show') => {
    if (!selectedRace) return;

    const dog = selectedRace.dogs.find(h => h.id === dogId);
    if (!dog) return;

    const newBet: Bet = {
      id: Date.now().toString(),
      raceId: selectedRace.id,
      dogId,
      amount,
      odds: dog.odds,
      type,
      status: 'pending'
    };

    setUserBets(prev => [...prev, newBet]);
    setUserStats(prev => ({
      ...prev,
      totalBets: prev.totalBets + 1,
      totalWagered: prev.totalWagered + amount,
      currentBalance: prev.currentBalance - amount
    }));
  };

  const handleRaceComplete = (results: any[]) => {
    if (!selectedRace) return;
    
    setRaces(prev => prev.map(race => 
      race.id === selectedRace.id 
        ? { ...race, status: 'finished' as const, results, progress: 100 }
        : race
    ));
    
    setSelectedRace(prev => prev ? { ...prev, status: 'finished' as const, results, progress: 100 } : null);
  };

  const openBettingModal = (dog: Dog) => {
    setBettingModal({ isOpen: true, dog });
  };

  const closeBettingModal = () => {
    setBettingModal({ isOpen: false, dog: null });
  };

  const renderHeader = () => (
    <header className="bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 text-gray-900 p-8 shadow-2xl relative overflow-hidden">
      {/* Doge background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-6 left-24 text-8xl font-bold transform rotate-12 text-orange-600">WOW</div>
        <div className="absolute top-20 right-40 text-6xl font-bold transform -rotate-12 text-yellow-600">SUCH RACE</div>
        <div className="absolute bottom-12 left-48 text-5xl font-bold transform rotate-6 text-orange-500">VERY SPEED</div>
        <div className="absolute bottom-6 right-24 text-7xl font-bold transform -rotate-6 text-yellow-700">MUCH BET</div>
        <div className="absolute top-32 left-12 text-4xl font-bold transform rotate-45 text-orange-400">DOGE</div>
        <div className="absolute bottom-32 right-12 text-4xl font-bold transform -rotate-45 text-yellow-600">SHIBE</div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {currentView !== 'races' && (
              <button
                onClick={() => setCurrentView('races')}
                className="mr-6 p-3 rounded-xl hover:bg-yellow-500 transition-all bg-white/20 border-2 border-white/30 transform hover:scale-105"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
            )}
            <div className="flex items-center">
              <img 
                src="/doge.jpeg" 
                alt="Doge" 
                className="w-16 h-16 rounded-full mr-6 border-4 border-white shadow-2xl animate-bounce"
              />
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-1">DogeRace</h1>
                <p className="text-lg text-gray-800 font-bold">Much Racing • Very Wow • Such Speed • Many Doge</p>
              </div>
              {currentView === 'live-race' && (
                <div className="ml-6 flex items-center bg-red-500 text-white px-4 py-2 rounded-full animate-pulse border-2 border-red-600 shadow-lg">
                  <Zap className="w-5 h-5 mr-2 animate-bounce" />
                  <span className="text-lg font-bold">🔥 LIVE WOW 🔥</span>
                </div>
              )}
            </div>
          </div>
          
          <nav className="flex space-x-4">
            <button
              onClick={() => setCurrentView('races')}
              className={`px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 border-2 ${
                currentView === 'races'
                  ? 'bg-white text-orange-600 shadow-xl border-orange-300'
                  : 'bg-white/20 text-gray-900 hover:bg-white/30 border-white/30'
              }`}
            >
              🏁 Such Races
            </button>
            <button
              onClick={() => setCurrentView('stats')}
              className={`px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 border-2 ${
                currentView === 'stats'
                  ? 'bg-white text-orange-600 shadow-xl border-orange-300'
                  : 'bg-white/20 text-gray-900 hover:bg-white/30 border-white/30'
              }`}
            >
              📊 Much Stats
            </button>
          </nav>
        </div>
      </div>
    </header>
  );

  const renderRaces = () => (
    <div className="max-w-7xl mx-auto p-8">
      <div className="mb-10">
        <UserStats stats={userStats} />
      </div>
      
      <div className="mb-10">
        <div className="text-center mb-8">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">Today's Epic Doge Races</h2>
          <p className="text-2xl text-orange-600 font-bold">Very Competition • Much Excitement • Such Wow • Many Fast Doges</p>
          <div className="mt-4 flex justify-center space-x-4">
            <span className="text-4xl animate-bounce">🐕</span>
            <span className="text-4xl animate-bounce" style={{ animationDelay: '0.2s' }}>💨</span>
            <span className="text-4xl animate-bounce" style={{ animationDelay: '0.4s' }}>🏁</span>
          </div>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {races.map((race) => (
            <RaceCard
              key={race.id}
              race={race}
              onSelectRace={handleSelectRace}
            />
          ))}
        </div>
      </div>
    </div>
  );

  const renderLiveRace = () => {
    if (!selectedRace) return null;

    return (
      <div className="max-w-7xl mx-auto p-8">
        <div className="mb-10 text-center">
          <div className="flex items-center justify-center mb-6">
            <img 
              src="/doge.jpeg" 
              alt="Doge" 
              className="w-20 h-20 rounded-full mr-6 border-4 border-red-500 animate-spin"
            />
            <div>
              <h2 className="text-5xl font-bold text-gray-900 mb-2">{selectedRace.name}</h2>
              <div className="flex items-center justify-center mt-4">
                <span className="px-6 py-3 bg-red-500 text-white text-2xl font-bold rounded-full animate-pulse mr-6 border-2 border-red-600">
                  🔥 LIVE WOW 🔥
                </span>
                <span className="text-4xl animate-bounce">🐕</span>
                <span className="text-4xl animate-bounce" style={{ animationDelay: '0.2s' }}>💨</span>
                <span className="text-4xl animate-bounce" style={{ animationDelay: '0.4s' }}>🏃‍♂️</span>
              </div>
            </div>
          </div>
          <p className="text-gray-700 text-xl mb-2">
            {selectedRace.track} • {selectedRace.date} at {selectedRace.time} • {selectedRace.distance}
          </p>
          <p className="text-2xl text-green-600 font-bold">
            Much Purse: ${selectedRace.purse.toLocaleString()} DOGE 💰
          </p>
        </div>

        <LiveRaceTracker 
          race={selectedRace} 
          onRaceComplete={handleRaceComplete}
        />
      </div>
    );
  };

  const renderRaceDetail = () => {
    if (!selectedRace) return null;

    return (
      <div className="max-w-7xl mx-auto p-8">
        <div className="mb-10 text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">{selectedRace.name}</h2>
          <p className="text-gray-700 text-xl mb-2">
            {selectedRace.track} • {selectedRace.date} at {selectedRace.time} • {selectedRace.distance}
          </p>
          <p className="text-2xl text-green-600 font-bold mb-4">
            Much Purse: ${selectedRace.purse.toLocaleString()} DOGE 💰
          </p>
          <div className="flex justify-center space-x-4">
            <span className="text-3xl">🐕</span>
            <span className="text-3xl">🏁</span>
            <span className="text-3xl">🏆</span>
          </div>
        </div>

        {selectedRace.status === 'finished' && (
          <div className="mb-10">
            <RaceResults race={selectedRace} />
          </div>
        )}

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {selectedRace.dogs.map((dog, index) => (
            <DogCard
              key={dog.id}
              dog={dog}
              onBet={openBettingModal}
              raceStatus={selectedRace.status}
              position={selectedRace.results?.find(r => r.dogId === dog.id)?.position}
            />
          ))}
        </div>
      </div>
    );
  };

  const renderStats = () => (
    <div className="max-w-4xl mx-auto p-8">
      <div className="mb-10 text-center">
        <div className="flex items-center justify-center mb-6">
          <TrendingUp className="w-10 h-10 text-orange-600 mr-4" />
          <h2 className="text-5xl font-bold text-gray-900">Much Statistics</h2>
        </div>
        <p className="text-2xl text-orange-600 font-bold mb-6">Very Numbers • Such Progress • Wow Data • Many Stats</p>
        <div className="flex justify-center space-x-4 mb-6">
          <span className="text-3xl animate-bounce">📊</span>
          <span className="text-3xl animate-bounce" style={{ animationDelay: '0.2s' }}>📈</span>
          <span className="text-3xl animate-bounce" style={{ animationDelay: '0.4s' }}>💰</span>
        </div>
        <UserStats stats={userStats} />
      </div>

      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl shadow-2xl p-10 border-4 border-yellow-300">
        <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Recent Epic Bets • Such History</h3>
        <div className="space-y-6">
          {userBets.map((bet) => {
            const race = races.find(r => r.id === bet.raceId);
            const dog = race?.dogs.find(h => h.id === bet.dogId);
            
            return (
              <div key={bet.id} className="flex items-center justify-between p-6 bg-white rounded-2xl shadow-lg border-3 border-yellow-200 hover:border-orange-300 transition-all transform hover:scale-102">
                <div>
                  <p className="font-bold text-gray-900 text-xl mb-1">{dog?.name} 🐕</p>
                  <p className="text-gray-600 text-lg">{race?.name}</p>
                  <p className="text-sm text-pink-600 font-bold">{dog?.personality}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-xl mb-1">${bet.amount} DOGE • {bet.odds}</p>
                  <p className={`text-lg font-bold capitalize ${
                    bet.status === 'won' ? 'text-green-600' :
                    bet.status === 'lost' ? 'text-red-600' : 'text-yellow-600'
                  }`}>
                    {bet.status === 'won' ? '🎉 MUCH WIN! VERY SUCCESS!' : 
                     bet.status === 'lost' ? '😢 Such Loss • Next Time Wow' : '⏳ Very Pending • Much Wait'} 
                    {bet.payout && ` (+$${bet.payout} DOGE)`}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-50 to-yellow-200">
      {renderHeader()}
      
      <main>
        {currentView === 'races' && renderRaces()}
        {currentView === 'race-detail' && renderRaceDetail()}
        {currentView === 'live-race' && renderLiveRace()}
        {currentView === 'stats' && renderStats()}
      </main>

      {bettingModal.dog && (
        <BettingModal
          dog={bettingModal.dog}
          isOpen={bettingModal.isOpen}
          onClose={closeBettingModal}
          onPlaceBet={handlePlaceBet}
        />
      )}
    </div>
  );
}

export default App;