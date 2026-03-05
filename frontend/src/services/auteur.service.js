const API_URL = "http://localhost:8000/api/auteurs";

export async function getAuteurs() {
  const res = await fetch(API_URL);
  return res.json();
}

export async function getAuteurById(id) {
  const res = await fetch(`${API_URL}/${id}`);
  return res.json();
}

export async function createAuteur(data) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  return res.json();
}

export async function updateAuteur(id, data) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  return res.json();
}


export async function deleteAuteur(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });
    return res.json();
}