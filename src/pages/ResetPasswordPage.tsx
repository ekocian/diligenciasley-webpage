import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { ProgressSpinner } from 'primereact/progressspinner';
import { authService } from '../services/api';

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const resetCode = searchParams.get('code');

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | 'info'>('info');
  const [loading, setLoading] = useState(false);
  const [validatingCode, setValidatingCode] = useState(true);
  const [isValidCode, setIsValidCode] = useState(false);
  const [isResetComplete, setIsResetComplete] = useState(false);

  const showMessage = (text: string, type: 'success' | 'error' | 'info' = 'info') => {
    setMessage(text);
    setMessageType(type);
  };

  // Validar el código al cargar la página
  useEffect(() => {
    const validateCode = async () => {
      if (!resetCode) {
        showMessage('Código de reset no válido. Solicita un nuevo enlace.', 'error');
        setValidatingCode(false);
        return;
      }

      try {
        const response = await authService.validateResetCode(resetCode);
        if (response.valid) {
          setIsValidCode(true);
          showMessage(`Código válido. Puedes crear tu nueva contraseña para: ${response.email || 'tu cuenta'}.`, 'success');
        } else {
          showMessage(response.message || 'Código inválido o expirado.', 'error');
        }
      } catch (error) {
        showMessage('Error al validar el código. Intenta con un nuevo enlace.', 'error');
      } finally {
        setValidatingCode(false);
      }
    };

    validateCode();
  }, [resetCode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      showMessage('Ambos campos de contraseña son requeridos', 'error');
      return;
    }

    if (newPassword.length < 6) {
      showMessage('La contraseña debe tener al menos 6 caracteres', 'error');
      return;
    }

    if (newPassword !== confirmPassword) {
      showMessage('Las contraseñas no coinciden', 'error');
      return;
    }

    setLoading(true);
    try {
      const response = await authService.resetPassword(resetCode!, newPassword);
      if (response.success) {
        setIsResetComplete(true);
        showMessage('¡Contraseña actualizada exitosamente! Ya puedes iniciar sesión con tu nueva contraseña.', 'success');
        
        // Redirigir al login después de 3 segundos
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        showMessage(response.message || 'Error al actualizar la contraseña', 'error');
      }
    } catch (error) {
      showMessage(
        error instanceof Error ? error.message : 'Error al actualizar la contraseña. Intenta nuevamente.',
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  const handleRequestNewReset = () => {
    navigate('/forgot-password');
  };

  // Pantalla de validación
  if (validatingCode) {
    return (
      <div className="main-container">
        <Card className="auth-card">
          <div className="auth-header">
            <img src="/assets/preview.png" alt="DiligenciasLey Logo" className="auth-logo" />
            <h1 className="auth-title">Validando enlace...</h1>
          </div>
          <div className="text-center p-4">
            <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="3" />
            <p className="mt-3 text-600">Verificando tu enlace de recuperación</p>
          </div>
        </Card>
      </div>
    );
  }

  // Código inválido
  if (!isValidCode) {
    return (
      <div className="main-container">
        <Card className="auth-card">
          <div className="auth-header">
            <img src="/assets/preview.png" alt="DiligenciasLey Logo" className="auth-logo" />
            <h1 className="auth-title">Enlace no válido</h1>
          </div>

          {message && (
            <div className="message-container">
              <Message
                severity={messageType}
                text={message}
                className="w-full"
                style={{ 
                  padding: '1rem 1.25rem',
                  marginBottom: '1.5rem',
                  borderRadius: '10px'
                }}
              />
            </div>
          )}

          <div className="text-center mb-4">
            <i className="pi pi-exclamation-triangle" style={{ fontSize: '3rem', color: 'var(--orange-500)', marginBottom: '1rem' }}></i>
            <p className="text-600" style={{ 
              fontSize: '14px', 
              lineHeight: '1.5', 
              maxWidth: '100%', 
              margin: '0 auto',
              padding: '0 1rem' 
            }}>
              El enlace de recuperación ha expirado o no es válido.<br />
              Los enlaces expiran después de 30 minutos por seguridad.
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              label="Solicitar nuevo enlace"
              onClick={handleRequestNewReset}
              className="flex-1"
              severity="secondary"
            />
            <Button
              label="Ir al login"
              onClick={handleBackToLogin}
              className="flex-1"
              outlined
            />
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="main-container">
      <Card className="auth-card">
        <div className="auth-header">
          <img src="/assets/preview.png" alt="DiligenciasLey Logo" className="auth-logo" />
          <h1 className="auth-title">Nueva Contraseña</h1>
        </div>

        {message && (
          <div className="message-container">
            <Message
              severity={messageType}
              text={message}
              className="w-full"
              style={{ 
                padding: '1rem 1.25rem',
                marginBottom: '1.5rem',
                borderRadius: '10px'
              }}
            />
          </div>
        )}

        {!isResetComplete ? (
          <form onSubmit={handleSubmit}>
            <div className="form-field">
              <label htmlFor="newPassword">Nueva Contraseña</label>
              <Password
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full"
                inputClassName="w-full p-inputtext-lg"
                disabled={loading}
                feedback={true}
                toggleMask
                promptLabel="Ingresa una contraseña"
                weakLabel="Débil"
                mediumLabel="Medio"
                strongLabel="Segura"
              />
              <small className="text-600">Mínimo 6 caracteres</small>
            </div>

            <div className="form-field">
              <label htmlFor="confirmPassword">Confirmar Contraseña</label>
              <Password
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full"
                inputClassName="w-full p-inputtext-lg"
                disabled={loading}
                feedback={false}
                toggleMask
              />
            </div>

            <Button
              type="submit"
              label="Actualizar contraseña"
              className="w-full p-button-lg mb-3"
              loading={loading}
              size="large"
            />
          </form>
        ) : (
          <div className="text-center mb-3">
            <i className="pi pi-check-circle" style={{ fontSize: '3rem', color: 'var(--green-500)', marginBottom: '1rem' }}></i>
            <h3>¡Contraseña actualizada!</h3>
            <p className="text-600" style={{ 
              fontSize: '14px', 
              lineHeight: '1.5', 
              maxWidth: '100%', 
              margin: '0 auto',
              padding: '0 1rem' 
            }}>
              Tu contraseña ha sido cambiada exitosamente.<br />
              Serás redirigido al login en unos segundos...
            </p>
          </div>
        )}

        <Button
          label="Volver al login"
          onClick={handleBackToLogin}
          className="w-full"
          severity="secondary"
          outlined
          disabled={loading}
        />
      </Card>
    </div>
  );
};

export default ResetPasswordPage;