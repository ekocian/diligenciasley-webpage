async function verifyAccount() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  const statusEl = document.getElementById("status");

  if (!code) {
    statusEl.textContent = "Código de verificación inválido.";
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
      statusEl.textContent = "Cuenta verificada ✅ Redirigiendo...";
      setTimeout(() => {
        window.location.href = "/perfil.html";
      }, 1500);
    } else {
      const error = await res.json();
      statusEl.textContent = "Error: " + (error.error || "No se pudo verificar la cuenta.");
    }
  } catch (err) {
    statusEl.textContent = "Error de conexión: " + err.message;
  }
}

verifyAccount();