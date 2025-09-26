import { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { authService } from '../services/api';

const VerifyPage = () => {
  const [message, setMessage] = useState('Verificando tu cuenta, por favor espera...');
  const [messageType, setMessageType] = useState<'success' | 'error' | 'info'>('info');
  const [isVerified, setIsVerified] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  const showMessage = (text: string, type: 'success' | 'error' | 'info' = 'info') => {
    setMessage(text);
    setMessageType(type);
  };

  const verifyAccount = async () => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    if (!code) {
      showMessage('Código de verificación inválido.', 'error');
      setIsVerified(false);
      setLoading(false);
      return;
    }

    try {
      console.log('Sending verification request with code:', code);
      await authService.verify(code);
      showMessage('Tu cuenta ha sido verificada exitosamente.', 'success');
      setIsVerified(true);
    } catch (error) {
      console.error('Verification error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      showMessage(`Error: ${errorMessage}`, 'error');
      setIsVerified(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyAccount();
  }, []);

  const handleGoToLogin = () => {
    window.location.href = '/platform';
  };

  return (
    <div className="main-container">
      <Card className="auth-card">
        <h1 className="auth-title">Verificación de cuenta</h1>

        <Message
          severity={messageType}
          text={message}
          className="w-full mb-4"
        />

        {!loading && (
          <>
            {isVerified ? (
              <div className="text-center">
                <h2 className="success-message text-xl mb-3">Cuenta Verificada</h2>
                <Button
                  label="Ir al inicio para iniciar sesión"
                  onClick={handleGoToLogin}
                  className="w-full"
                />
              </div>
            ) : (
              <div className="text-center">
                <h2 className="error-message text-xl mb-3">No se pudo verificar la cuenta</h2>
                <Button
                  label="Ir al inicio"
                  onClick={handleGoToLogin}
                  className="w-full"
                  severity="secondary"
                />
              </div>
            )}
          </>
        )}

        {loading && (
          <div className="text-center">
            <i className="pi pi-spin pi-spinner" style={{ fontSize: '2em' }}></i>
          </div>
        )}
      </Card>
    </div>
  );
};

export default VerifyPage;