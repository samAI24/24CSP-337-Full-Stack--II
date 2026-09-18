import "./App.css";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <div className="header-badge">Redux Toolkit Performance</div>
        <h1>Redux Selector Dashboard</h1>
        <p className="subtitle">
          Demonstrating Reselect <code>createSelector</code> memoization & dynamic state updates
        </p>
      </header>

      <Dashboard />
    </div>
  );
}

export default App;
