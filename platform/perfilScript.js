const API_URL = "https://diligenciasley-backend.onrender.com"; 
const perfilDiv = document.getElementById("perfil");
const btnLogout = document.getElementById("logout");

// Obtener perfil al cargar
async function fetchPerfil() {
    try {
    const res = await fetch(API_URL + "/perfil", {
        method: "GET",
        credentials: "include" // 🔑 manda cookies
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
        perfilDiv.innerHTML = "<p>No autorizado. Volvé a <a href='/'>login</a></p>";
    } else {
        perfilDiv.innerHTML = `
        <p><b>Username:</b> ${data.username}</p>
        <p><b>Email:</b> ${data.email}</p>
        <p><b>Creado:</b> ${data.created_at}</p>
        `;
    }
    } catch (err) {
    perfilDiv.innerHTML = "<p>Error: " + err.message + "</p>";
    }
}

// Logout
btnLogout.addEventListener("click", async () => {
    await fetch(API_URL + "/logout", {
    method: "POST",
    credentials: "include"
    });
    window.location.href = "/";
});

fetchPerfil();