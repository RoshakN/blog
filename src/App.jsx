import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import "./index.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="./" />
      </Routes>
    </Router>
  );
}

export default App;
