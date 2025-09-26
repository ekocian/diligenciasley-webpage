import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { TabView, TabPanel } from 'primereact/tabview';
import { authService } from '../services/api';

const LoginPage = () => {
  const navigate = useNavigate();
  
  // Estados para el formulario de registro
  const [regUsername, setRegUsername] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  
  // Estados para el formulario de login
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  // Estados de UI
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | 'info'>('info');
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(1); // Empezar en Login (index 1)

  const showMessage = (text: string, type: 'success' | 'error' | 'info' = 'info') => {
    setMessage(text);
    setMessageType(type);
  };

  const handleRegister = async () => {
    if (!regUsername.trim() || !regEmail.trim() || !regPassword) {
      showMessage('Todos los campos son obligatorios', 'error');
      return;
    }

    setLoading(true);
    try {
      await authService.register(regUsername.trim(), regEmail.trim(), regPassword);
      showMessage('Registro exitoso. Revisa tu email para verificar tu cuenta.', 'success');
      setRegUsername('');
      setRegEmail('');
      setRegPassword('');
    } catch (error) {
      showMessage(error instanceof Error ? error.message : 'Error en el registro', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!username.trim() || !password) {
      showMessage('Username y contraseña son obligatorios', 'error');
      return;
    }

    setLoading(true);
    try {
      await authService.login(username.trim(), password);
      showMessage('Login exitoso', 'success');
      navigate('/platform/perfil');
    } catch (error) {
      showMessage(error instanceof Error ? error.message : 'Error en el login', 'error');
    } finally {
      setLoading(false);
    }
  };

  const checkProfile = async () => {
    setLoading(true);
    try {
      const user = await authService.getProfile();
      showMessage(`Perfil obtenido: ${user.username} - ${user.email}`, 'success');
    } catch (error) {
      showMessage(error instanceof Error ? error.message : 'Error al obtener perfil', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await authService.logout();
      showMessage('Sesión cerrada', 'success');
    } catch (error) {
      showMessage(error instanceof Error ? error.message : 'Error al cerrar sesión', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-container">
      <Card className="auth-card">
        <h1 className="auth-title">Gestión de sesión</h1>

        {message && (
          <Message
            severity={messageType}
            text={message}
            className="w-full mb-3"
          />
        )}

        <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
          {/* Tab de Registro */}
          <TabPanel header="Registro">
            <div className="form-field">
              <label htmlFor="regUsername">Username</label>
              <InputText
                id="regUsername"
                value={regUsername}
                onChange={(e) => setRegUsername(e.target.value)}
                placeholder="nombre de usuario"
                className="w-full p-inputtext-lg"
                disabled={loading}
                size="large"
              />
            </div>

            <div className="form-field">
              <label htmlFor="regEmail">Email</label>
              <InputText
                id="regEmail"
                type="email"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                placeholder="usuario@ejemplo.com"
                className="w-full p-inputtext-lg"
                disabled={loading}
                size="large"
              />
            </div>

            <div className="form-field">
              <label htmlFor="regPassword">Contraseña</label>
              <Password
                id="regPassword"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full"
                inputClassName="w-full p-inputtext-lg"
                disabled={loading}
                feedback={false}
                toggleMask
              />
            </div>

            <Button
              label="Registrar"
              onClick={handleRegister}
              className="w-full p-button-lg"
              loading={loading}
              size="large"
            />
          </TabPanel>

          {/* Tab de Login */}
          <TabPanel header="Login">
            <div className="form-field">
              <label htmlFor="username">Username</label>
              <InputText
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="nombre de usuario"
                className="w-full p-inputtext-lg"
                disabled={loading}
                size="large"
              />
            </div>

            <div className="form-field">
              <label htmlFor="password">Contraseña</label>
              <Password
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full"
                inputClassName="w-full p-inputtext-lg"
                disabled={loading}
                feedback={false}
                toggleMask
              />
            </div>

            <Button
              label="Iniciar sesión"
              onClick={handleLogin}
              className="w-full p-button-lg"
              loading={loading}
              size="large"
            />
          </TabPanel>
        </TabView>

        {/* Botones de acción */}
        <div className="flex gap-2 mb-3 mt-4">
          <Button
            label="Obtener perfil"
            onClick={checkProfile}
            className="flex-1"
            severity="secondary"
            disabled={loading}
          />
          <Button
            label="Cerrar sesión"
            onClick={handleLogout}
            className="flex-1"
            severity="secondary"
            disabled={loading}
          />
        </div>

        <div className="text-xs text-gray-500 text-center">
          Nota: este ejemplo usa <code>credentials: "include"</code> para enviar cookies HttpOnly al backend.
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;