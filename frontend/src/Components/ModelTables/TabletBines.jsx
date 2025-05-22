import React, { useEffect, useState, useRef } from "react";
import "../../Styles/Querys/Querys.css";

const TabletBines = ({ bin, tranx, top_bin }) => {
  const [offset, setOffset] = useState(0);
  const [rows, setRows] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const limit = 7;
  const sentinelRef = useRef();

  // Construye la URL dinámica según el parámetro `bin`
  const buildURL = () => {
    const params = new URLSearchParams();
    if (bin) params.append("bin", bin);
    if (tranx) params.append("tranx", tranx);
    params.append("top_bin", top_bin);
    return `http://localhost:3001/api/transacciones-por-bin?${params.toString()}`;
  };
  useEffect(() => {
    const fetchMore = async () => {
      setLoading(true);
      const res = await fetch(buildURL());
      const data = await res.json();

      // 👇 IMPORTANTE
      setRows((prev) => {
        const ids = new Set(prev.map((i) => i.idcomercio));
        const nuevos = data.filter((i) => !ids.has(i.idcomercio));
        return offset === 0 ? data : [...prev, ...nuevos];
      });

      setHasMore(data.length === limit);
      setLoading(false);
    };

    fetchMore();
  }, [offset, bin, tranx, top_bin]);

  // Reset si cambia filtro
  useEffect(() => {
    setOffset(0);
    setRows([]);
    setHasMore(true);
  }, [bin, tranx, top_bin]);

  useEffect(() => {
    if (!sentinelRef.current) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore && !loading) {
        setOffset((prev) => prev + limit);
      }
    });
    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [sentinelRef, hasMore, loading]);

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
            {rows.map((item, idx) => (
              <tr key={idx} className="tbody">
                <td>{item.idcomercio}</td>
                <td>{item.Q_trx.toLocaleString()}</td>
                <td>{item.PQ_trx}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div >
          <div ref={sentinelRef} style={{ height: "1px", width: "100%" }} />
          {loading && <p style={{ textAlign: "center" }}>Cargando más…</p>}
        </div>
        
      </div>
    </div>
  );
};

export default TabletBines;
