const API_URL = "http://localhost:8000/api/scenarios";

export async function getScenarios() {
  const res = await fetch(API_URL);
  return res.json();
}

export async function getScenarioById(id) {
  const res = await fetch(`${API_URL}/${id}`);
  return res.json();
}

export default async function createScenario(data) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  return res.json();
}

export async function updateScenario(id, data) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  return res.json();
}


export async function deleteScenario(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });
    return res.json();
}