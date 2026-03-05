const API_URL = "http://localhost:8000/api/genres";

export async function getGenres() {
  const res = await fetch(API_URL);
  return res.json();
}

export async function getGenreById(id) {
  const res = await fetch(`${API_URL}/${id}`);
  return res.json();
}

export async function createGenre(data) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  return res.json();
}

export async function updateGenre(id, data) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  return res.json();
}


export async function deleteGenre(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });
    return res.json();
}