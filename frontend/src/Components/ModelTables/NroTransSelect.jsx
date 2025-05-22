export const pageSize = 50;

export async function loadNroTransOptions(search, prevOptions, { page }) {
  // page = 0, 1, 2, …
  const offset = page * pageSize;
  const res = await fetch(
    `http://localhost:3001/api/search-transacciones` +
      `?q=${encodeURIComponent(search || "")}` +
      `&offset=${offset}` +
      `&limit=${pageSize}`
  );
  const data = await res.json();
  return {
    options: [
      { label: "Todos", value: "" }, 
      ...data.map((d) => ({ label: d.id_tra, value: d.id_tra })),
    ],
    hasMore: data.length === pageSize,
    additional: { page: page + 1 },
  };
}
