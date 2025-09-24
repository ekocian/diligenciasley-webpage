const API_URL = "https://tu-api.onrender.com"; // la URL que Render te da

async function loadUsers() {
  const res = await fetch(`${API_URL}/users`);
  const users = await res.json();
  const list = document.getElementById("user-list");
  list.innerHTML = "";
  users.forEach(u => {
    const li = document.createElement("li");
    li.textContent = u.name;
    list.appendChild(li);
  });
}

async function addUser() {
  const name = document.getElementById("nameInput").value;
  await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name })
  });
  document.getElementById("nameInput").value = "";
  loadUsers();
}

// cargar usuarios al inicio
loadUsers();
