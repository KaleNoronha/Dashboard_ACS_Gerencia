
export async function fetch3DS(body) {
  const res = await fetch("http://localhost:4000/api/es/ssm", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Error ${res.status}: ${text}`);
  }

  return res.json(); // Esto será un array de hits
}
export async function fetchACS(body) {
  const res = await fetch('http://localhost:4000/api/es/scm', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Error ${res.status}: ${text}`)};
  return res.json();
}
