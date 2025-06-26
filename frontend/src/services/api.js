const url = 'https://5b7c-190-81-172-25.ngrok-free.app';
const API_BASE_URL = url;

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

  // Leer la respuesta como texto primero
  const text = await res.text();

  // Si la respuesta está vacía, lanza un error personalizado
  if (!text) {
    throw new Error("Respuesta vacía del backend");
  }

  // Intenta parsear el texto como JSON
  try {
    return JSON.parse(text);
  } catch (e) {
    throw new Error("Respuesta del backend no es JSON válido");
  }
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

  // Leer la respuesta como texto primero
  const text = await res.text();

  // Si la respuesta está vacía, lanza un error personalizado
  if (!text) {
    throw new Error("Respuesta vacía del backend");
  }

  // Intenta parsear el texto como JSON
  try {
    return JSON.parse(text);
  } catch (e) {
    throw new Error("Respuesta del backend no es JSON válido");
  }
}
