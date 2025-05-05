import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Meltview from './pages/Meltview';

function App() {
  return (
    <Router>
      <nav className="p-4 bg-black text-white flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/meltview">Meltview</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/meltview" element={<Meltview />} />
      </Routes>
    </Router>
  );
}

export default App;
