import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStats, getMatches } from '../api/client';
import { Match } from '../types';
import { toast } from 'react-toastify';

interface Stats {
  wins: number;
  losses: number;
  draws: number;
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [loadingStats, setLoadingStats] = useState<boolean>(false);
  const [loadingMatches, setLoadingMatches] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      setLoadingStats(true);
      setError(null);
      try {
        const response = await getStats();
        setStats(response);
      } catch (err) {
        setError('Failed to fetch stats.');
        toast.error('Failed to fetch stats.');
      } finally {
        setLoadingStats(false);
      }
    };

    const fetchMatches = async () => {
      setLoadingMatches(true);
      setError(null);
      try {
        const response = await getMatches();
        setMatches(response);
      } catch (err) {
        setError('Failed to fetch matches.');
        toast.error('Failed to fetch matches.');
      } finally {
        setLoadingMatches(false);
      }
    };

    fetchStats();
    fetchMatches();
  }, []);

  const handleCreateMatch = () => {
    navigate('/game');
  };

  const handleViewStats = () => {
    navigate('/stats');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-700">Wins</h2>
            <p className="text-3xl font-bold text-green-500">
              {loadingStats ? 'Loading...' : stats?.wins ?? 0}
            </p>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-700">Losses</h2>
            <p className="text-3xl font-bold text-red-500">
              {loadingStats ? 'Loading...' : stats?.losses ?? 0}
            </p>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-700">Draws</h2>
            <p className="text-3xl font-bold text-yellow-500">
              {loadingStats ? 'Loading...' : stats?.draws ?? 0}
            </p>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recent Matches</h2>
          {loadingMatches ? (
            <p>Loading...</p>
          ) : matches.length === 0 ? (
            <p>No recent matches found.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {matches.map((match) => (
                <li key={match.id} className="py-4">
                  <div className="flex justify-between items-center">
                    <p className="text-gray-700">
                      Match ID: <span className="font-semibold">{match.id}</span>
                    </p>
                    <p className="text-gray-500">{new Date(match.created_at).toLocaleString()}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex space-x-4">
          <button
            onClick={handleCreateMatch}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
          >
            Start New Match
          </button>
          <button
            onClick={handleViewStats}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-600"
          >
            View Full Stats
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;