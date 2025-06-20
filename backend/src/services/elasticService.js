import dotenv from "dotenv";
dotenv.config();

import fetch from "node-fetch"; // si tu Node ya tiene fetch global, omite esta línea

const ES_HOST = process.env.ES_HOST;
const ES_AUTH = process.env.ES_AUTH;

export async function search(body, indexPath) {
  const url = `${ES_HOST}${indexPath}`;
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
  const data = await res.json();
  return data.hits.hits;
}
