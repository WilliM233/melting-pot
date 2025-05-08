import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Meltview from './pages/Meltview';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/meltview" element={<Meltview />} />
      </Routes>
    </Router>
  );
}

export default App;
