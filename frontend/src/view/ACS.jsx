import { useEffect, useState } from 'react';
import { fetchACS } from '../services/api';

export default function App() {
    const [hits, setHits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const bodyACS = {
            size: 10,
            from: 0,
            query: {
                bool: {
                    filter: [
                        { match: { "TDS_TRANSACTION.issuerId": "041" } },
                        {
                            range: {
                                "TDS_TRANSACTION.createdAt": {
                                    gte: "2025-04-22T20:10:11",
                                    lte: "2025-05-22T20:10:11"
                                }
                            }
                        }
                    ]
                }
            },
            _source: [
                "TDS_AREQ.merchantName",
                "TDS_AREQ.acquirerMerchantID",
                "TDS_AREQ.purchaseAmount",
                "TDS_AREQ.purchaseCurrency",
                "TDS_AREQ.deviceChannel",
                "TDS_AREQ.acctNumber",
                "TDS_TRANSACTION.threeDSServerTransID",
                "TDS_TRANSACTION.acsTransID",
                "TDS_TRANSACTION.dsTransID",
                "TDS_TRANSACTION.brand",
                "TDS_TRANSACTION.bin",
                "TDS_TRANSACTION.endPan",
                "TDS_TRANSACTION.transStatus",
                "TDS_TRANSACTION.createdAt",
                "TDS_TRANSACTION.rbaDataRequest.cardStatus",
                "TDS_TRANSACTION.externalMessagingDatetime",
                "TDS_ARES.eci",
                "TDS_RREQ.eci",
                "TDS_ARES.transStatusReason",
                "TDS_RREQ.transStatusReason",
                "TDS_RISK.valueRisk",
                "TDS_ARES.messageVersion",
                "TDS_ARES.transStatus",
                "TDS_ARES.createdAt",
                "TDS_RREQ.createdAt",
                "TDS_ARES.whiteListStatus"
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

    if (loading) return <p className="p-4">Cargando…</p>;
    if (error) return <p className="p-4 text-red-600">Error: {error}</p>;

    return (
        <div className="p-4 max-w-screen-md mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-blue-800 drop-shadow">Transacciones ACS</h2>
            <div className="overflow-x-auto rounded-xl shadow-lg border border-blue-300">
                <table className="min-w-full text-xs sm:text-sm bg-white">
                    <thead>
                        <tr className="bg-gradient-to-r from-blue-700 to-blue-500 text-white uppercase text-[13px]">
                            <th className="px-1 py-2">#</th>
                            <th className="px-1 py-2">Merchant</th>
                            <th className="px-1 py-2">Monto</th>
                            <th className="px-1 py-2">Device</th>
                            <th className="px-1 py-2">Status</th>
                            <th className="px-1 py-2">Creada</th>
                            <th className="px-1 py-2">BIN</th>
                            <th className="px-1 py-2">Masked PAN</th>
                        </tr>
                    </thead>
                    <tbody>
                        {hits.map((hit, i) => {
                            const s = hit._source || {};
                            const areq = s.TDS_AREQ || {};
                            const tx = s.TDS_TRANSACTION || {};
                            console.log(hits)
                            return (
                                <tr key={i} className={i % 2 ? "bg-blue-50" : ""}>
                                    <td className="border px-1 py-1 text-center font-semibold text-blue-700">{i + 1}</td>
                                    <td className="border px-1 py-1 truncate max-w-[380px]" title={areq.merchantName}>
                                        {areq.merchantName ?? "—"}
                                    </td>
                                    <td className="border px-1 py-1">
                                        {areq.purchaseAmount ?? "—"} {areq.purchaseCurrency ?? ""}
                                    </td>
                                    <td className="border px-1 py-1">{areq.deviceChannel ?? "—"}</td>
                                    <td className="border px-1 py-1">{tx.transStatus ?? "—"}</td>
                                    <td className="border px-1 py-1">
                                        {tx.createdAt
                                            ? new Date(tx.createdAt).toLocaleDateString("es-PE")
                                            : "—"}
                                    </td>
                                    <td className="border px-1 py-1">{tx.bin ?? "—"}</td>
                                    <td className="border px-1 py-1">{tx.endPan ?? "—"}</td>
                                </tr>
                            );
                        })}
                        
                    </tbody>
                </table>
            </div>
            <p className="text-gray-400 text-xs mt-2">Mostrando {hits.length} resultados</p>
        </div>
    );
}
