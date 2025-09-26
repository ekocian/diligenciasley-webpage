import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { authService, User } from '../services/api';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | 'info'>('info');
  const [loading, setLoading] = useState(true);

  const showMessage = (text: string, type: 'success' | 'error' | 'info' = 'info') => {
    setMessage(text);
    setMessageType(type);
  };

  const loadProfile = async () => {
    try {
      const userData = await authService.getProfile();
      setUser(userData);
      setMessage('');
    } catch (error) {
      showMessage(error instanceof Error ? error.message : 'Error al cargar perfil', 'error');
      // Si hay error de autenticación, redirigir al login
      if (error instanceof Error && error.message.includes('autorizado')) {
        setTimeout(() => navigate('/platform'), 2000);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await authService.logout();
      showMessage('Sesión cerrada', 'success');
      setTimeout(() => navigate('/platform'), 1000);
    } catch (error) {
      showMessage(error instanceof Error ? error.message : 'Error al cerrar sesión', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  if (loading && !user) {
    return (
      <div className="main-container">
        <Card className="auth-card">
          <div className="text-center">Cargando...</div>
        </Card>
      </div>
    );
  }

  return (
    <div className="main-container">
      <Card className="auth-card">
        <h1 className="auth-title">Mi Perfil</h1>

        {message && (
          <Message
            severity={messageType}
            text={message}
            className="w-full mb-3"
          />
        )}

        {user ? (
          <div className="profile-info mb-4">
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Estado:</strong> {user.active ? 'Activo' : 'Inactivo'}</p>
            <p><strong>ID:</strong> {user.id}</p>
          </div>
        ) : (
          <div className="text-center text-gray-500 mb-4">
            No se pudo cargar la información del perfil
          </div>
        )}

        <Button
          label="Cerrar sesión"
          onClick={handleLogout}
          className="w-full"
          loading={loading}
          severity="secondary"
        />
      </Card>
    </div>
  );
};

export default ProfilePage;