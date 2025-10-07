import React, { useEffect, useState } from 'react';
import { contactService, type ContactFormData } from '../services/api';

const HomePage = () => {
  const [formState, setFormState] = useState({
    isLoading: false,
    message: '',
    isError: false,
    isRateLimit: false
  });

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const contactData: ContactFormData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
    };

    // Reset previous state
    setFormState({
      isLoading: true,
      message: '',
      isError: false,
      isRateLimit: false
    });

    try {
      await contactService.sendEmail(contactData);
      
      setFormState({
        isLoading: false,
        message: '¡Mensaje enviado exitosamente! Te responderemos a la brevedad.',
        isError: false,
        isRateLimit: false
      });
      form.reset(); // Limpiar formulario
      
    } catch (error) {
      let errorMessage = 'Error al enviar el mensaje. Por favor, intenta nuevamente o contáctanos directamente.';
      let isRateLimit = false;
      
      if (error instanceof Error) {
        // Detectar rate limit
        if (error.message.includes('demasiadas consultas')) {
          errorMessage = error.message;
          isRateLimit = true;
        } else if (error.message.includes('Error de conexión')) {
          errorMessage = 'No se pudo conectar con el servidor. Verifica tu conexión a internet e intenta nuevamente.';
        } else {
          errorMessage = 'Error desconocido. Por favor, intenta nuevamente.';
        }
      }
      
      setFormState({
        isLoading: false,
        message: errorMessage,
        isError: !isRateLimit, // Rate limit se muestra como warning, no error
        isRateLimit: isRateLimit
      });
    }
  };

  // Smooth scroll para los enlaces internos
  useEffect(() => {
    const handleSmoothScroll = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const targetId = target.getAttribute('href')?.substring(1);
        if (targetId) {
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            const headerHeight = 80; // Altura del header fijo
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
          }
        }
      }
    };

    // Agregar event listener a todos los enlaces
    document.addEventListener('click', handleSmoothScroll);

    // Cleanup
    return () => {
      document.removeEventListener('click', handleSmoothScroll);
    };
  }, []);

  return (
    <div>
      {/* Header */}
      <header className="site-header">
        <div className="main-header">
          <div className="container">
            <div className="logo">
              <a href="#" className="logo-link">
                <img src="/assets/preview.png" alt="DiligenciasLey Logo" className="logo-image" />
                <div className="logo-text">
                  DILIGENCIAS LEY
                  <span className="logo-subtitle">Servicios Profesionales</span>
                </div>
              </a>
            </div>
            
            <div className="header-right">
              <nav className="main-nav">
                <ul>
                  <li><a href="#servicios">Servicios</a></li>
                  <li><a href="#oficinas">Oficinas</a></li>
                  <li><a href="#contacto">Contacto</a></li>
                </ul>
              </nav>
              
              <a href="/consulta" className="btn-header">Consulta Trámite</a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-badges">
              <span className="hero-badge">Más de 30 años de experiencia</span>
              <span className="hero-badge">Consultas online 24/7</span>
              <span className="hero-badge">Oficinas en Córdoba y CABA</span>
            </div>
            <h1>SERVICIOS DE DILIGENCIAS PROFESIONALES</h1>
            <p className="subtitle">
              Servicios profesionales en gestiones, diligencias, y otros servicios judiciales y registrales
            </p>
            <div className="cta-buttons">
              <a href="/consulta" className="btn-primary">CONSULTAR TRÁMITE</a>
              <a href="/cotizar" className="btn-secondary">COTIZAR DILIGENCIA</a>
            </div>
          </div>
        </div>
      </section>

      {/* Highlight Section */}
      <section className="highlight-section">
        <div className="container">
          <h2>CONSULTÁ EN TIEMPO REAL EL ESTADO DE TU TRÁMITE</h2>
          <p>
            Accedé a nuestro sistema de consulta de trámites online y verificá el estado de tu diligencia, 
            solo con un click, las 24 horas. Además si registras tu email te avisaremos por correo electrónico 
            automáticamente cuando tu trámite cambie de estado y cuando se encuentre listo para retirar.
          </p>
          <a href="/registrarse" className="btn-primary">REGISTRATE AHORA</a>
        </div>
      </section>

      {/* Experience Section */}
      <section className="content-section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <p style={{ fontSize: '18px', color: 'var(--muted)', lineHeight: '1.6' }}>
              <strong>DILIGENCIAS LEY</strong> cuenta con más de 30 años de experiencia brindando 
              servicios profesionales en gestiones y diligencias.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="content-section">
        <div className="container">
          <h2 className="section-title">NUESTROS SERVICIOS</h2>
          <div className="services-grid">
            <div className="service-card">
              <h3>Cédulas</h3>
              <p>Ley 22.172 - Notificaciones judiciales</p>
            </div>
            <div className="service-card">
              <h3>Oficios y Mandamientos</h3>
              <p>Ley 22.172 - Gestiones oficiales</p>
            </div>
            <div className="service-card">
              <h3>Exhortos</h3>
              <p>Judiciales y administrativos</p>
            </div>
            <div className="service-card">
              <h3>Registro de la Propiedad</h3>
              <p>Trámites inmobiliarios</p>
            </div>
            <div className="service-card">
              <h3>Registro Automotor</h3>
              <p>Trámites vehiculares</p>
            </div>
            <div className="service-card">
              <h3>Registros Civiles</h3>
              <p>Cámara Electoral - ReNaPer</p>
            </div>
            <div className="service-card">
              <h3>Expedientes</h3>
              <p>Procuración y seguimiento</p>
            </div>
            <div className="service-card">
              <h3>Legalizaciones</h3>
              <p>Apostillas y certificaciones</p>
            </div>
            <div className="service-card">
              <h3>Agrimensura</h3>
              <p>Catastro y mensuras</p>
            </div>
            <div className="service-card">
              <h3>Domicilio Legal</h3>
              <p>Casillero postal</p>
            </div>
          </div>
        </div>
      </section>

      {/* Offices Section */}
      <section id="oficinas" className="content-section">
        <div className="container">
          <h2 className="section-title">NUESTRAS OFICINAS</h2>
          <div className="offices-grid">
            <div className="office-card">
              <h3>Oficina Córdoba</h3>
              <p>
                <strong>Dirección:</strong> Arturo M. Bas 144<br />
                Ciudad de Córdoba<br />
                <strong>Teléfono:</strong> (0351) 4216292<br />
                <strong>Horario:</strong> Lun-Vie 8:30–14:30<br />
                Lun-Jue 15:00–16:30
              </p>
            </div>
            <div className="office-card">
              <h3>Oficina Capital Federal</h3>
              <p>
                <strong>Dirección:</strong> San Martín 655<br />
                Ciudad de Buenos Aires<br />
                <strong>Teléfono:</strong> (011) 4314 5396<br />
                <strong>Horario:</strong> Lun-Vie 8:30–14:30<br />
                Lun-Jue 15:00–16:30
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="content-section">
        <div className="container">
          <h2 className="section-title">CONTACTANOS</h2>
          <div className="contact-grid">
            <div className="contact-form">
              <h3>Envíenos su consulta</h3>
              
              {/* Mensaje de estado */}
              {formState.message && (
                <div className={`form-message ${
                  formState.isRateLimit 
                    ? 'warning' 
                    : formState.isError 
                      ? 'error' 
                      : 'success'
                }`}>
                  {formState.message}
                </div>
              )}
              
              <form onSubmit={handleFormSubmit}>
                <label htmlFor="name">Nombre</label>
                <input 
                  id="name" 
                  name="name"
                  type="text" 
                  required 
                  disabled={formState.isLoading}
                />
                
                <label htmlFor="email">Correo electrónico</label>
                <input 
                  id="email" 
                  name="email"
                  type="email" 
                  required 
                  disabled={formState.isLoading}
                />
                
                <label htmlFor="message">Mensaje</label>
                <textarea 
                  id="message" 
                  name="message"
                  rows={5}
                  disabled={formState.isLoading}
                ></textarea>
                
                <button 
                  type="submit" 
                  className="btn-primary"
                  disabled={formState.isLoading}
                >
                  {formState.isLoading ? (
                    <>
                      <span className="spinner"></span>
                      ENVIANDO...
                    </>
                  ) : (
                    'ENVIAR CONSULTA'
                  )}
                </button>
              </form>
            </div>
            
            <div className="contact-info">
              <h3>Datos de contacto</h3>
              <div style={{ display: 'grid', gap: '15px' }}>
                <div>
                  <strong>Email:</strong><br />
                  <a href="mailto:consultas@diligenciasley.com.ar">
                    consultas@diligenciasley.com.ar
                  </a>
                </div>
                <div>
                  <strong>Teléfono Córdoba:</strong><br />
                  (0351) 4216292
                </div>
                <div>
                  <strong>Teléfono CABA:</strong><br />
                  (011) 4314 5396
                </div>
                <div>
                  <strong>Horario Corrido:</strong><br />
                  de 8.30 a 17.30 hs
                </div>
                <div>
                  <strong>Web:</strong><br />
                  www.diligenciasley.com.ar
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer">
        <div className="container">
          <div className="footer-content">
            <p>
              © 2025 Todos los derechos reservados<br />
              <a href="http://www.paintmyfence.com.ar" target="_blank" rel="noopener noreferrer">
                Diseñado y desarrollado por Terabyte
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;