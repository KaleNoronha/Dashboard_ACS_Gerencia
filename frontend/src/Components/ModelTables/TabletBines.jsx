import React ,{useState}from "react";
import "../../Styles/Querys/Querys.css";
import { useFetch } from "../../hooks";

const TabletBines = ({ bin, tranx, top_bin }) => {
  // Construye la URL dinámica según el parámetro `bin`
const params = new URLSearchParams();
  if (bin)   params.append('bin', bin);
  if (tranx) params.append('trax', tranx);
  params.append('top_bin', top_bin);

  const url = `http://localhost:3001/api/transacciones-por-bin?${params.toString()}`;

  // 2) Disparar la petición con useFetch
  const { data = [], loading, error } = useFetch(url);

  if (loading) 
    return <div className="tabletBines">Cargando datos...</div>;
  if (error)   
    return <div className="tabletBines">Error al cargar datos</div>;
  if (!data.length) 
    return <div className="tabletBines">Sin datos para este BIN</div>;

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
          {data.map((item, idx) => (
            <tr  key={`${item.idcomercio}-${idx}`} className="tbody">
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
