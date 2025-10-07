import React from 'react';
import { useNavigate } from 'react-router-dom';

interface UnderConstructionPageProps {
  feature?: string;
}

const UnderConstructionPage: React.FC<UnderConstructionPageProps> = ({ feature = "Esta funcionalidad" }) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div className="under-construction-page">
      <div className="construction-container">
        <div className="construction-content">
          {/* Logo */}
          <div className="construction-logo">
            <h2 className="logo-text">DILIGENCIAS LEY</h2>
            <span className="logo-subtitle">Servicios Profesionales</span>
          </div>

          {/* Construction Icon */}
          <div className="construction-icon">
            🚧
          </div>

          {/* Main Message */}
          <h1 className="construction-title">
            {feature} está en construcción
          </h1>
          
          <p className="construction-message">
            Estamos trabajando duro para traerte esta funcionalidad.
          </p>

          {/* Features List */}
          <div className="available-features">
            <h3>¿Qué puedes hacer mientras tanto?</h3>
            <ul>
              <li>📞 Contactarnos directamente por teléfono</li>
              <li>✉️ Enviarnos una consulta por email</li>
              <li>📍 Visitar nuestras oficinas en Córdoba o CABA</li>
              <li>📋 Conocer más sobre nuestros servicios</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="quick-contact">
            <div className="contact-item">
              <strong>📞 Córdoba:</strong> (0351) 4216292
            </div>
            <div className="contact-item">
              <strong>📞 CABA:</strong> (011) 4314 5396
            </div>
            <div className="contact-item">
              <strong>✉️ Email:</strong> 
              <a href="mailto:consultas@diligenciasley.com.ar">
                consultas@diligenciasley.com.ar
              </a>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="construction-actions">
            <button onClick={handleGoBack} className="btn-primary">
              Volver al Inicio
            </button>
            <a href="mailto:consultas@diligenciasley.com.ar" className="btn-secondary">
              Contactar por Email
            </a>
          </div>

          {/* Footer */}
          <div className="construction-footer">
            <p>
              <strong>Fecha estimada:</strong> Próximamente<br />
              ¡Gracias por tu paciencia!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnderConstructionPage;