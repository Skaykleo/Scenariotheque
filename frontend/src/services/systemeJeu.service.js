const API_URL = "http://localhost:8000/api/systemes-jeu";

export async function getSystemesJeu() {
  const res = await fetch(API_URL);
  return res.json();
}

export async function getSystemeJeuById(id) {
  const res = await fetch(`${API_URL}/${id}`);
  return res.json();
}

export async function createSystemeJeu(data) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  return res.json();
}

export async function updateSystemeJeu(id, data) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  return res.json();
}


export async function deleteSystemeJeu(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });
    return res.json();
}