import React, { useState, useEffect } from "react";
import { fetchACS } from "../services/api";

export default function TablaStatusTransaccionesACS() {
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
                "TDS_ARES.transStatus",
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

    // Agrupar por status
    const agrupadoPorStatus = {};
    hits.forEach(hit => {
        const s = hit._source || {};
        const status = s.TDS_ARES?.transStatus ?? "—";
        agrupadoPorStatus[status] = (agrupadoPorStatus[status] || 0) + 1;
    });

    const totalGlobal = Object.values(agrupadoPorStatus).reduce((a, b) => a + b, 0);

    const tablaFinal = Object.entries(agrupadoPorStatus)
        .map(([status, cantidad]) => ({
            status,
            cantidad,
            porcentaje: totalGlobal > 0 ? ((cantidad / totalGlobal) * 100).toFixed(2) : "0.00"
        }))
        .sort((a, b) => b.cantidad - a.cantidad);

    if (loading) return <p className="p-4">Cargando datos…</p>;
    if (error) return <p className="p-4 text-red-600">Error: {error}</p>;

    return (
        <div className="overflow-x-auto shadow-lg rounded-lg border border-blue-200 bg-white max-w-screen-md mx-auto my-6">
            <h2 className="text-2xl font-bold mb-4 text-blue-900 px-4 pt-4">
                Resumen de Transacciones por Status (ACS)
            </h2>
            <div className="max-h-[500px] overflow-y-auto">
                <table className="min-w-full text-sm">
                    <thead className="sticky top-0 z-10 bg-blue-600 text-white">
                        <tr>
                            <th className="px-3 py-2 text-left">Status</th>
                            <th className="px-3 py-2 text-center">Cantidad</th>
                            <th className="px-3 py-2 text-center">% del Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tablaFinal.map((row, i) => (
                            <tr key={i} className={i % 2 === 0 ? "bg-blue-50" : ""}>
                                <td className="px-3 py-2 font-semibold">{row.status}</td>
                                <td className="px-3 py-2 text-center">{row.cantidad}</td>
                                <td className="px-3 py-2 text-center">{row.porcentaje}%</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <p className="text-xs text-gray-400 mt-2 ml-2 pb-4">
                Total general: <span className="font-semibold">{totalGlobal}</span> transacciones.
            </p>
        </div>
    );
}
