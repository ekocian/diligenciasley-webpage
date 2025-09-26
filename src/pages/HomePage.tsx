const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-column align-items-center justify-content-center p-4">
      <div className="text-center mb-6">
        <h1 className="text-6xl font-bold text-primary mb-3">🚧</h1>
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Diligencias Ley</h2>
        <p className="text-xl text-gray-600 mb-2">Sitio web en construcción</p>
        <p className="text-gray-500 mb-6">
          Estamos trabajando duro para traerte el mejor servicio.<br />
          Por favor, vuelve pronto.
        </p>
      </div>

      {/* <Card className="w-full max-w-md">
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Acceso a la Plataforma
          </h3>
          <p className="text-gray-600 mb-4">
            Si ya tienes una cuenta, puedes acceder a la plataforma de gestión.
          </p>
          <Button
            label="Acceder a la Plataforma"
            icon="pi pi-sign-in"
            onClick={goToPlatform}
            className="w-full"
            size="large"
          />
        </div>
      </Card> */}

      <div className="text-center mt-6">
        <p className="text-sm text-gray-400">
          <strong>Fecha estimada de finalización:</strong> Próximamente
        </p>
        <p className="text-sm text-gray-400 mt-2">
          ¡Gracias por tu paciencia!
        </p>
      </div>
    </div>
  );
};

export default HomePage;