import { useState } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const showMessage = (text: string) => {
    setMessage(text);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      showMessage('El email es requerido');
      return;
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showMessage('Por favor ingresa un email válido');
      return;
    }

    setLoading(true);
    
    try {
      await authService.requestPasswordReset(email);
      showMessage(
        'Se ha enviado un enlace de restablecimiento de contraseña a tu email. Revisa tu bandeja de entrada.'
      );
      setIsSubmitted(true);
    } catch (error: any) {
      showMessage(
        error.response?.data?.message || 'Hubo un error al procesar tu solicitud. Inténtalo de nuevo.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="main-container">
      <Card className="auth-card">
        <div className="auth-header">
          <img src="/assets/preview.png" alt="DiligenciasLey Logo" className="auth-logo" />
          <h1 className="auth-title">Recuperar Contraseña</h1>
        </div>

                {message && (
          <div className="flex justify-content-center">
            <Message 
              severity="success" 
              text={message}
              className="auth-info-text"
              style={{ marginBottom: '1rem' }}
            />
          </div>
        )}

        {!isSubmitted ? (
          <form onSubmit={handleSubmit}>
            <div className="form-field">
              <label htmlFor="email">Email</label>
              <InputText
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu-email@ejemplo.com"
                className="w-full p-inputtext-lg"
                disabled={loading}
                size="large"
                autoFocus
              />
            </div>

            <Button
              type="submit"
              label="Enviar enlace de recuperación"
              className="w-full p-button-lg mb-3"
              loading={loading}
              size="large"
            />
          </form>
        ) : (
          <div className="text-center mb-3">
            <i className="pi pi-check-circle" style={{ fontSize: '3rem', color: 'var(--green-500)', marginBottom: '1rem' }}></i>
            <h3>Solicitud enviada</h3>
            <p className="text-600" style={{ 
              fontSize: '14px', 
              lineHeight: '1.5', 
              maxWidth: '100%', 
              margin: '0 auto',
              padding: '0 1rem' 
            }}>
              Revisa tu email para continuar con el proceso de recuperación de contraseña.
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

        <div className="text-center mt-4">
          <p className="text-sm text-600">
            ¿Recordaste tu contraseña?{' '}
            <a 
              href="/login" 
              className="text-primary hover:underline"
              style={{ color: 'var(--primary-color)', textDecoration: 'none' }}
              onMouseOver={(e) => e.currentTarget.style.textDecoration = 'underline'}
              onMouseOut={(e) => e.currentTarget.style.textDecoration = 'none'}
            >
              Iniciar sesión
            </a>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default ForgotPasswordPage;