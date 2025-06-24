import { useState, useEffect } from "react";
import { fetchACS } from "../../services/api";
import { Negadas } from "../../Icons/Negadas";

function formatAbbreviatedNumber(num) {
    if (num === null || num === undefined) return "0";
    if (num >= 1e6) return (num / 1e6).toFixed(1) + "M";
    if (num >= 1e3) return (num / 1e3).toFixed(1) + "K";
    return num.toLocaleString();
}

export default function KPI_N() {
    const [total, setTotal] = useState(null);
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
                        { match: { "TDS_ARES.transStatus": "N" } },
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
                "TDS_TRANSACTION.brand"
            ],
            sort: [
                { "TDS_TRANSACTION.createdAt": { order: "desc" } },
                "_score"
            ]
        };

        fetchACS(bodyACS)
            .then(hits => setTotal(hits.length))
            .catch((e) => setError(e.message))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <span>Cargando…</span>;
    if (error) return <span className="text-red-600">Error: {error}</span>;

    return (
        <div className="flex items-center">
            <div className="flex-1">
                <div className="text-gray-500 text-sm">Transacciones Negativas</div>
                <div className="text-3xl font-bold text-black mt-1">
                    {formatAbbreviatedNumber(total)}
                </div>
            </div>
            <div className="ml-4">
                <Negadas />
            </div>
        </div>
    );
}