import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import VerifyPage from './pages/VerifyPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/platform" replace />} />
          <Route path="/platform" element={<LoginPage />} />
          <Route path="/platform/perfil" element={<ProfilePage />} />
          <Route path="/platform/verify" element={<VerifyPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;