import React, { useState, useEffect } from "react";
import { fetch3DS } from "../services/api";

export default function Test() {
    const [hits, setHits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const body = {
            from: 0,
            size: 10,
            query: {
                bool: {
                    must: [{
                        match: {
                            "authentication_log_response.response_content.vci": "TSYS"
                        }
                    }],
                    filter: [
                        {
                            term: {
                                "TDS_PARQ.acquirerBIN": "4444",

                            },
                        },

                        {
                            range: {
                                "versioning_log_request.creationDate": {
                                    gte: "2025/01/01 00:00:00",
                                    lt: "2025/06/27 00:00:00"
                                },
                            },
                        },
                    ],
                },
            },
            _source: [
                "authentication_log_response.response_content.vci",
                "TDS_PARQ.acquirerBIN",
                "TDS_PARQ.merchantName",
                "TDS_PARQ.purchaseAmount",
                "versioning_log_request.creationDate",
                "versioning_log_request.authorization_key",
            ],
            sort: [{ "versioning_log_request.creationDate": { order: "desc" } }],
        };
        fetch3DS(body)
            .then(setHits)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p className="p-4">cargando datos</p>;
    if (error) return <p className="p-4 text-red-600">Error: {error}</p>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Resultados Tabla Personalizada</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full border text-xs">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-2 border">#</th>
                            <th className="p-2 border">BIN</th>
                            <th className="p-2 border">VCI</th>
                            <th className="p-2 border">Empresa</th>
                            <th className="p-2 border">Monto</th>
                            <th className="p-2 border">Fecha</th>
                        </tr>
                    </thead>
                    <tbody>
                        {hits.map((hit, i) => {
                            const s = hit._source || {};
                            const parq = s.TDS_PARQ || {};
                            const version = s.versioning_log_request || {};
                            const authLog = s.authentication_log_response?.response_content || {};
                            return (
                                <tr key={i} className="odd:bg-white even:bg-gray-50">
                                    <td className="p-2 border text-center">{i + 1}</td>
                                    <td className="p-2 border">{parq.acquirerBIN ?? "—"}</td>
                                    <td className="p-2 border">{authLog.vci ?? "—"}</td>
                                    <td className="p-2 border">{parq.merchantName ?? "—"}</td>
                                    <td className="p-2 border">{parq.purchaseAmount ?? "—"}</td>
                                    <td className="p-2 border">{version.creationDate ? 
                                        new Date(version.creationDate.replace(/\//g, "-")).toLocaleString("es-PE") : "—"}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
