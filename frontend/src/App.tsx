import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Toaster } from 'sonner';
import Home from './pages/Home';
import MeltviewLayout from './pages/MeltviewLayout';
import Meltview from './pages/Meltview';
import UserSettings from './pages/UserSettings';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/meltview" element={<MeltviewLayout />}>
            <Route index element={<Meltview />} />
            <Route path="/meltview/settings" element={<UserSettings />} />
          </Route>
        </Routes>
      </Router>
      <Toaster richColors position="top-right" />
    </>
  );
}

export default App;
