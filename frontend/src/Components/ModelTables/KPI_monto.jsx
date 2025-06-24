
import { KPIMontoIcon } from "../../Icons/Bolsa";
import { useState, useEffect } from "react";
import { fetchACS } from "../../services/api";



export default function KPI_monto() {
  const [totalMonto, setTotalMonto] = useState(0);
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
                  gte: "2024-01-01T00:00:00",
                  lte: "2025-06-30T20:10:11"
                }
              }
            }
          ]
        }
      },
      _source: [
        "TDS_ARES.transStatus",
        "TDS_TRANSACTION.brand",
        "TDS_AREQ.purchaseAmount"
      ],
      sort: [
        { "TDS_TRANSACTION.createdAt": { order: "desc" } },
        "_score"
      ]
    };

    fetchACS(bodyACS)
      .then(hits => {
        // Sumar todos los montos (puede venir string o number)
        const total = hits.reduce((acc, hit) => {
          const monto = parseFloat(hit._source?.TDS_AREQ?.purchaseAmount) || 0;
          return acc + monto;
        }, 0);
        setTotalMonto(total);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <span>Cargando…</span>;
  if (error) return <span className="text-red-600">Error: {error}</span>;

  // Función para abreviar números grandes (ej: 1.2K, 3.4M)
  function formatAbbreviatedNumber(num) {
    if (num >= 1e9) return (num / 1e9).toFixed(2) + "B";
    if (num >= 1e6) return (num / 1e6).toFixed(2) + "M";
    if (num >= 1e3) return (num / 1e3).toFixed(2) + "K";
    return num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  return (
    <div className="flex items-center ">
      <div className="flex-1">
        <div className="text-gray-500 text-sm">Monto Total</div>
        <div className="text-3xl font-bold text-black mt-1">
          ${formatAbbreviatedNumber(totalMonto)}
        </div>
      </div>
      <div className="ml-4">
        <KPIMontoIcon className="w-10 h-10 text-blue-500" />
      </div>
    </div>
  )
}
