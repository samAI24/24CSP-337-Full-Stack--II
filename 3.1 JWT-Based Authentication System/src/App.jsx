import React, { useState, useEffect } from 'react';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import { ExperimentHeader } from './components/ExperimentHeader';
import { JWTDebugger } from './components/JWTDebugger';
import { getUserFromToken } from './utils/token';

export const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if token exists in localStorage and is valid
    const user = getUserFromToken();
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <div className="app-container">
      {/* Student Details & Experiment Header */}
      <ExperimentHeader isLoggedIn={isLoggedIn} />

      {/* Main Authentication Flow */}
      <main>
        {isLoggedIn ? (
          <Dashboard logout={logout} />
        ) : (
          <Login login={login} />
        )}
      </main>

      {/* Experiment Theory & Learning Outcomes Card */}
      <JWTDebugger />
    </div>
  );
};

export default App;
