import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import VerifyPage from './pages/VerifyPage';

function App() {
  return (
    <Router basename="/diligenciasley-webpage">
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/platform" element={<LoginPage />} />
          <Route path="/platform/perfil" element={<ProfilePage />} />
          <Route path="/platform/verify" element={<VerifyPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;