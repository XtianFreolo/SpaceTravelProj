import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styles from "./App.module.css";

import NavBar from "./components/NavBar.jsx";
import HomePage from "./pages/HomePage.jsx";
import SpaceshipPage from "./pages/SpaceshipPage.jsx";
import PlanetsPage from "./pages/PlanetsPage.jsx";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/spaceship" element={<SpaceshipPage />} />
        <Route path="/planets" element={<PlanetsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
