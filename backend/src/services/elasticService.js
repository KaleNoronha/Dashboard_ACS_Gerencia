import dotenv from "dotenv";
dotenv.config();

import fetch from "node-fetch"; // Si usas Node >=18, puedes quitar esto y usar el fetch global

const ES_HOST = process.env.ES_HOST;
const ES_AUTH = process.env.ES_AUTH;

export async function search(body, indexPath) {
  const url = `${ES_HOST}${indexPath}`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: ES_AUTH,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`ES error ${res.status}: ${text}`);
    }

    // Asegura que siempre haya contenido antes de intentar parsear
    const text = await res.text();
    if (!text) {
      throw new Error("Respuesta vacía de Elasticsearch");
    }

    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      throw new Error("Respuesta de Elasticsearch no es JSON válido");
    }

    // Devuelve hits.hits si existe, sino un array vacío
    return data.hits && data.hits.hits ? data.hits.hits : [];
  } catch (e) {
    // Cualquier error, relanza para que tu ruta lo maneje como JSON de error
    throw e;
  }
}
