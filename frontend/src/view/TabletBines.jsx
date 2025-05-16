import React, { useEffect, useState } from "react";
import "../Styles/Querys.css";

const TabletBines = ({ bin }) => {
    const [data,    setData]    = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    // Arrancamos la carga
    setLoading(true);
    setError(null);

    // Construimos la URL con el parámetro bin (si existe)
    const url = new URL('http://localhost:3001/api/transacciones-por-bin');
    if (bin) url.searchParams.append('bin', bin);

    // Fetch al endpoint
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(records => {
        setData(records);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error al cargar transacciones:', err);
        setError(err);
        setLoading(false);
      });
  }, [bin]); // Se vuelve a ejecutar siempre que cambie `bin`

  if (loading) return <div className="tabletBines">Cargando datos...</div>;
  if (error)   return <div className="tabletBines">Error al cargar datos</div>;
  if (!data.length) return <div className="tabletBines">Sin datos para este BIN</div>;

  return (
    <div className="tabletBines">
      <table className="table">
        <thead>
          <tr className="trhead">
            <th className="acquirer"></th>
            <th className="QT"></th>
            <th className="QXT"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              className="tbody"
            >
              <td>{item.idcomercio}</td>
              <td>{item.Q_trx.toLocaleString()}</td>
              <td>{item.PQ_trx}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TabletBines;
