import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className="bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold">
              TicTacToe
            </Link>
          </div>
          <div className="hidden md:flex space-x-4">
            <Link to="/dashboard" className="hover:underline">
              Dashboard
            </Link>
            <Link to="/matches" className="hover:underline">
              Matches
            </Link>
            <Link to="/stats" className="hover:underline">
              Stats
            </Link>
            {isAuthenticated && (
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 px-3 py-2 rounded"
              >
                Logout
              </button>
            )}
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
            >
              ☰
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-blue-700">
          <Link to="/dashboard" className="block px-4 py-2 hover:bg-blue-800">
            Dashboard
          </Link>
          <Link to="/matches" className="block px-4 py-2 hover:bg-blue-800">
            Matches
          </Link>
          <Link to="/stats" className="block px-4 py-2 hover:bg-blue-800">
            Stats
          </Link>
          {isAuthenticated && (
            <button
              onClick={logout}
              className="block w-full text-left px-4 py-2 bg-red-500 hover:bg-red-600"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;