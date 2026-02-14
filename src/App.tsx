import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { IntroPage } from "./pages/IntroPage";
import "./App.css";

function App() {
  return (
    <Router basename="/pymentor/">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/intro" element={<IntroPage />} />
      </Routes>
    </Router>
  );
}

export default App;
