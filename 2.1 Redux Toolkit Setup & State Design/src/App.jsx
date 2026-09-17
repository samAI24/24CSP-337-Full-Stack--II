import React from "react";
import Header from "./components/Header";
import PostComposer from "./components/PostComposer";
import DraftList from "./components/DraftList";
import StateInspector from "./components/StateInspector";

function App() {
  return (
    <div className="app-viewport">
      <div className="app-container">
        <Header />

        <main className="app-main-grid">
          <section className="composer-column">
            <PostComposer />
          </section>

          <section className="feed-column">
            <DraftList />
          </section>
        </main>

        <footer className="app-footer">
          <StateInspector />
          <div className="footer-meta">
            <p>© 2026 Sam Fawaz Hadi Ali AL-Basara — UID: 24BAI70236 | Full Stack-II (24CSP-337) Centralized State Lab</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
