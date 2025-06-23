import React, { useEffect, useState, useRef } from "react";
import "../../Styles/Querys/Querys.css";
import { fetchACS } from "../../services/api";

const TabletBines = ({ bin, tranx, top_bin }) => {
  const [hits, setHits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const bodyACS = {
      size: 10000,
      from: 0,
      query: {
        bool: {
          filter: [
            { match: { "TDS_TRANSACTION.issuerId": "041" } },
            {
              range: {
                "TDS_TRANSACTION.createdAt": {
                  gte: "2025-01-01T00:00:00",
                  lte: "2025-06-30T20:10:11"
                }
              }
            }
          ]
        }
      },
      _source: [
        "TDS_AREQ.merchantName",
        "TDS_TRANSACTION.brand"
      ],
      sort: [
        { "TDS_TRANSACTION.createdAt": { order: "desc" } },
        "_score"
      ]
    };

    fetchACS(bodyACS)
      .then(setHits)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);
  const agrupadoPorComercio = {};
  hits.forEach(hit => {
    const s = hit._source || {};
    const comercio = s.TDS_AREQ?.merchantName ?? "—";
    agrupadoPorComercio[comercio] = (agrupadoPorComercio[comercio] || 0) + 1;
  });

  const totalGlobal = Object.values(agrupadoPorComercio).reduce((a, b) => a + b, 0);

  const tablaFinal = Object.entries(agrupadoPorComercio)
    .map(([comercio, cantidad]) => ({
      comercio,
      cantidad,
      porcentaje: totalGlobal > 0 ? ((cantidad / totalGlobal) * 100).toFixed(2) : "0.00"
    }))
    .sort((a, b) => b.cantidad - a.cantidad);

  if (loading) return <p className="p-4">Cargando datos…</p>;
  if (error) return <p className="p-4 text-red-600">Error: {error}</p>;
  return (
    <div className="tabletBines">
      <div className="scroll-container">
        <table className="table">
          <thead>
            <tr className="trhead">
              <th className="acquirer"></th>
              <th className="QT"></th>
              <th className="QXT"></th>
            </tr>
          </thead>
          <tbody>
            {tablaFinal.map((item, idx) => (
              <tr key={idx} className="tbody">
                <td style={{ fontSize: "10px" }}>{item.comercio}</td>
                <td>{item.cantidad}</td>
                <td>{item.porcentaje}%</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
};

export default TabletBines;
