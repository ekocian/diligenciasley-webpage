const API_URL = "https://diligenciasley-backend.onrender.com"; // la URL que Render te da

const el = {
  regUsername: document.getElementById("regUsername"),
  regEmail: document.getElementById("regEmail"),
  regPassword: document.getElementById("regPassword"),
  btnRegister: document.getElementById("btnRegister"),

  email: document.getElementById("email"),
  password: document.getElementById("password"),
  btnLogin: document.getElementById("btnLogin"),

  btnPerfil: document.getElementById("btnPerfil"),
  btnLogout: document.getElementById("btnLogout"),
  status: document.getElementById("status"),
  output: document.getElementById("output")
};

function setStatus(text, ok = true) {
  el.status.textContent = "Estado: " + text;
  el.status.style.color = ok ? "" : "crimson";
}

function showOutput(obj) {
  el.output.style.display = "block";
  el.output.textContent = JSON.stringify(obj, null, 2);
}

function clearOutput() {
  el.output.style.display = "none";
  el.output.textContent = "";
}

// ---- Registro ----
async function register() {
  const username = el.regUsername.value.trim();
  const email = el.regEmail.value.trim();
  const password = el.regPassword.value;

  if (!username || !email || !password) {
    setStatus("Todos los campos son obligatorios", false);
    return;
  }

  setStatus("registrando...", true);
  el.btnRegister.disabled = true;

  try {
    const res = await fetch(API_URL + "/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ username, email, password })
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setStatus("registro fallido", false);
      showOutput({ status: res.status, body: data });
    } else {
      setStatus("usuario registrado", true);
      showOutput(data);
    }
  } catch (err) {
    setStatus("error de red: " + err.message, false);
    showOutput({ error: err.message });
  } finally {
    el.btnRegister.disabled = false;
  }
}

// ---- Login ----
async function login() {
  const email = el.email.value.trim();
  const password = el.password.value;
  if (!email || !password) {
    setStatus("completa email y contraseña", false);
    return;
  }
  setStatus("iniciando...", true);
  el.btnLogin.disabled = true;

  try {
    const res = await fetch(API_URL + "/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password })
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setStatus("login fallido", false);
      showOutput({ status: res.status, body: data });
    } else {
      setStatus("logueado (cookie recibida)", true);
      clearOutput();
    }
  } catch (err) {
    setStatus("error de red: " + err.message, false);
    showOutput({ error: err.message });
  } finally {
    el.btnLogin.disabled = false;
  }
}

// ---- Perfil ----
async function getPerfil() {
  setStatus("consultando perfil...", true);
  el.btnPerfil.disabled = true;
  try {
    const res = await fetch(API_URL + "/perfil", {
      method: "GET",
      credentials: "include"
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setStatus("no autorizado", false);
      showOutput({ status: res.status, body: data });
    } else {
      setStatus("perfil obtenido", true);
      showOutput(data);
    }
  } catch (err) {
    setStatus("error de red: " + err.message, false);
    showOutput({ error: err.message });
  } finally {
    el.btnPerfil.disabled = false;
  }
}

// ---- Logout ----
async function logout() {
  setStatus("cerrando sesión...", true);
  el.btnLogout.disabled = true;
  try {
    const res = await fetch(API_URL + "/logout", {
      method: "POST",
      credentials: "include"
    });

    if (res.ok) {
      setStatus("sesión cerrada", true);
      clearOutput();
    } else {
      const data = await res.json().catch(()=>({}));
      setStatus("error al cerrar", false);
      showOutput({ status: res.status, body: data });
    }
  } catch (err) {
    setStatus("error de red: " + err.message, false);
    showOutput({ error: err.message });
  } finally {
    el.btnLogout.disabled = false;
  }
}

// Event listeners
el.btnRegister.addEventListener("click", register);
el.btnLogin.addEventListener("click", login);
el.btnPerfil.addEventListener("click", getPerfil);
el.btnLogout.addEventListener("click", logout);

setStatus("desconectado");