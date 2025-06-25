import React, { useState, useEffect } from "react";
import { Race, UserStats, Bet, PastRace } from "./types/racing";
import {
  mockUserStats,
  mockPastRaces,
  generateMockPrice,
  generateMLPredictions,
} from "./data/mockData";
import LoginPage from "./components/LoginPage";
import UserProfile from "./components/UserProfile";
import LiveRace from "./components/LiveRace";
import BettingModal from "./components/BettingModal";
import PastRaces from "./components/PastRaces";
import { LogOut, User } from "lucide-react";
import { useLoginCredentialsMutation } from "./apis/login";
import { useLazyProfileQuery } from "./apis/profile";
import { useDispatch, useSelector } from "react-redux";
import { saveSession } from "./slices/loginSlice";
import { RootState } from "./store";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [userStats, setUserStats] = useState<UserStats>(mockUserStats);
  const [currentRace, setCurrentRace] = useState<Race | null>(null);
  const [pastRaces, setPastRaces] = useState<PastRace[]>(mockPastRaces);
  const [currentBet, setCurrentBet] = useState<Bet | null>(null);
  const [showBettingModal, setShowBettingModal] = useState(false);
  const [raceCounter, setRaceCounter] = useState(3);

  const [onHandleLogin] = useLoginCredentialsMutation();
  const [getUserProfile] = useLazyProfileQuery();
  const dispatch = useDispatch();
  const { UserId, sessionId } = useSelector((state: RootState) => state.login);

  useEffect(() => {
    if (sessionId && UserId) {
      (async () => {
        try {
          const { data: userData } = await getUserProfile({
            userId: "1",
          });

          console.log("userData ", userData, UserId);
        } catch (e) {
          console.log("e >>", e);
        }
      })();
    }
  }, [sessionId, UserId]);

  // Initialize first race
  useEffect(() => {
    if (isLoggedIn && !currentRace) {
      startNewRace();
    }
  }, [isLoggedIn]);

  // Race timer
  useEffect(() => {
    if (!currentRace || !isLoggedIn) return;

    const interval = setInterval(() => {
      setCurrentRace((prev) => {
        if (!prev) return null;

        const newTimeRemaining = Math.max(0, prev.timeRemaining - 1);
        let newStatus = prev.status;

        // Status transitions
        if (newTimeRemaining === 30 && prev.status === "betting") {
          newStatus = "locked";
        } else if (newTimeRemaining === 0 && prev.status === "locked") {
          newStatus = "running";
          // Simulate API call delay
          setTimeout(() => {
            finishRace();
          }, 2000);
        }

        return {
          ...prev,
          timeRemaining: newTimeRemaining,
          status: newStatus,
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentRace, isLoggedIn]);

  const startNewRace = () => {
    const currentPrice = generateMockPrice();
    const modelsWithPredictions = generateMLPredictions(currentPrice);

    const newRace: Race = {
      id: `race-${raceCounter.toString().padStart(3, "0")}`,
      name: `Race #${raceCounter.toString().padStart(3, "0")}`,
      startTime: new Date(),
      endTime: new Date(Date.now() + 5 * 60 * 1000),
      status: "betting",
      currentPrice,
      models: modelsWithPredictions,
      timeRemaining: 5 * 60, // 5 minutes
    };

    setCurrentRace(newRace);
    setCurrentBet(null);
    setRaceCounter((prev) => prev + 1);
  };

  const finishRace = () => {
    if (!currentRace) return;

    // Generate final price
    const finalPrice = generateMockPrice();

    // Determine winner (closest prediction)
    let winner = currentRace.models[0];
    let smallestDiff = Math.abs(finalPrice - (winner.prediction || 0));

    currentRace.models.forEach((model) => {
      const diff = Math.abs(finalPrice - (model.prediction || 0));
      if (diff < smallestDiff) {
        smallestDiff = diff;
        winner = model;
      }
    });

    // Update race
    const finishedRace: Race = {
      ...currentRace,
      status: "finished",
      targetPrice: finalPrice,
      winner: winner.id,
      timeRemaining: 0,
    };

    // Create past race record
    const pastRace: PastRace = {
      id: currentRace.id,
      name: currentRace.name,
      startPrice: currentRace.currentPrice,
      endPrice: finalPrice,
      winner: winner,
      models: currentRace.models,
      timestamp: new Date(),
      userBet: currentBet || undefined,
    };

    // Update user stats if they had a bet
    if (currentBet) {
      const won = currentBet.modelId === winner.id;
      const payout = won ? currentBet.amount * 3 : 0;

      setUserStats((prev) => ({
        ...prev,
        balance: prev.balance + payout - (won ? 0 : currentBet.amount),
        totalBets: prev.totalBets + 1,
        totalWon: prev.totalWon + (won ? 1 : 0),
        winRate: Math.round(
          ((prev.totalWon + (won ? 1 : 0)) / (prev.totalBets + 1)) * 100
        ),
        totalEarnings: prev.totalEarnings + payout - currentBet.amount,
      }));

      // Update bet status
      const updatedBet: Bet = {
        ...currentBet,
        status: won ? "won" : "lost",
        payout: won ? payout : undefined,
      };

      pastRace.userBet = updatedBet;
    }

    // Add to past races (most recent first)
    setPastRaces((prev) => [pastRace, ...prev]);

    // Start new race after 3 seconds
    setTimeout(() => {
      startNewRace();
    }, 3000);
  };

  const handleLogin = async (loginUsername: string, password: string) => {
    if (loginUsername && password) {
      // setUsername(loginUsername);
      // setIsLoggedIn(true);

      try {
        const { data } = await onHandleLogin({
          userName: "username1",
          password: "password1",
        });

        if (data?.sessionId) {
          dispatch(
            saveSession({ sessionId: data.sessionId, UserId: data.UserId })
          );
        }
      } catch (e) {
        console.log("error ", e);
      }
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setCurrentRace(null);
    setCurrentBet(null);
    setUserStats(mockUserStats);
    setPastRaces(mockPastRaces);
    setRaceCounter(3);
  };

  const handlePlaceBet = (modelId: string, amount: number) => {
    if (!currentRace || currentRace.status !== "betting") return;

    const newBet: Bet = {
      id: Date.now().toString(),
      raceId: currentRace.id,
      modelId,
      amount,
      timestamp: new Date(),
      status: "active",
    };

    setCurrentBet(newBet);
    setUserStats((prev) => ({
      ...prev,
      balance: prev.balance - amount,
    }));
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-orange-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <img
                src="/doge.jpeg"
                alt="Doge"
                className="w-10 h-10 rounded-full mr-3 border-2 border-orange-400"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">DogeRace</h1>
                <p className="text-sm text-orange-600">
                  AI battle. Doge price. You bet who's right.
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-orange-100 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* User Profile */}
          <UserProfile stats={userStats} username={username} />

          {/* Live Race */}
          {currentRace && (
            <LiveRace
              race={currentRace}
              onPlaceBet={() => setShowBettingModal(true)}
              currentBet={currentBet}
            />
          )}

          {/* Past Races */}
          <PastRaces races={pastRaces} />
        </div>
      </main>

      {/* Betting Modal */}
      {currentRace && (
        <BettingModal
          race={currentRace}
          isOpen={showBettingModal}
          onClose={() => setShowBettingModal(false)}
          onPlaceBet={handlePlaceBet}
          userBalance={userStats.balance}
        />
      )}
    </div>
  );
}

export default App;
