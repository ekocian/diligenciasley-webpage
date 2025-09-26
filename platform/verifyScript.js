async function verifyAccount() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  const statusEl = document.getElementById("status");

  if (!statusEl) return;

  if (!code) {
    statusEl.innerHTML = `
      <p class="error">No se pudo verificar la cuenta</p>
      <p>Código de verificación inválido.</p>
      <a href="/">Ir al inicio</a>
    `;
    return;
  }

  try {
    const res = await fetch("https://diligenciasley-backend.onrender.com/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // necesario para recibir cookie
      body: JSON.stringify({ code })
    });

    if (res.ok) {
      statusEl.innerHTML = `
        <p class="success">Cuenta Verificada</p>
        <p>Tu cuenta ha sido verificada exitosamente.</p>
        <a href="/">Ir al inicio para iniciar sesión</a>
      `;
    } else {
      const error = await res.json();
      statusEl.innerHTML = `
        <p class="error">No se pudo verificar la cuenta</p>
        <p>${error.error || "Error desconocido"}</p>
        <a href="/">Ir al inicio</a>
      `;
    }
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Error desconocido";
    statusEl.innerHTML = `
      <p class="error">No se pudo verificar la cuenta</p>
      <p>Error de conexión: ${errorMessage}</p>
      <a href="/">Ir al inicio</a>
    `;
  }
}

verifyAccount();