import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import About from "./pages/About";
import MyTown from "./pages/MyTown";


export default function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        
        <nav>
          <Link to="/" className="nav-link">About Me</Link>
          <Link to="/town" className="nav-link">My Town</Link>
        </nav>
      </header>

      <main className="content">
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/town" element={<MyTown />} />
        </Routes>
      </main>

      <footer className="footer">
        <small>Simple React app — beginner friendly</small>
      </footer>
    </div>
  );
}
