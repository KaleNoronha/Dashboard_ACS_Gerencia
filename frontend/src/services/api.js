const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:4000";

export async function fetch3DS(body) {
  const res = await fetch(`${API_BASE_URL}/api/es/ssm`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Error ${res.status}: ${text}`);
  }

  return res.json();
}

export async function fetchACS(body) {
  const res = await fetch(`${API_BASE_URL}/api/es/scm`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Error ${res.status}: ${text}`);
  }
  return res.json();
}
