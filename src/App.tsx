import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import VerifyPage from './pages/VerifyPage';
import TasksPage from './pages/TasksPage';
import UnderConstructionPage from './pages/UnderConstructionPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/platform" element={<LoginPage />} />
          <Route path="/platform/perfil" element={<ProfilePage />} />
          <Route path="/platform/tareas" element={<TasksPage />} />
          <Route path="/platform/verify" element={<VerifyPage />} />
          <Route path="/construccion" element={<UnderConstructionPage />} />
          <Route path="/consulta" element={<UnderConstructionPage feature="La consulta de trámites" />} />
          <Route path="/cotizar" element={<UnderConstructionPage feature="La cotización de trámites" />} />
          <Route path="/registrarse" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;