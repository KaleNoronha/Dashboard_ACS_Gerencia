import React, { useState, useEffect } from "react";
import { fetchACS } from "../../services/api";
import {Transaction} from "../../Icons/Transaction"


export default function TotalTransaccionesACS() {
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
            .then(hits => setTotal(hits.length))
            .catch((e) => setError(e.message))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <span>Cargando…</span>;
    if (error) return <span className="text-red-600">Error: {error}</span>;

    // Solo muestra el número (puedes retornarlo como prop, estado, etc.)
    return (
        <div className="flex items-center justify-around">
            <span className="font-bold text-2xl text-blue-700 ml-[20px]">
                {total !== null ? total.toLocaleString() : 0}
            </span>
            <Transaction />
        </div>
    );
}
