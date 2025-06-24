import { useState, useEffect } from "react";
import { fetch3DS } from "../services/api";

export default function App() {
    const [hits, setHits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const body = {
            from: 0,
            size: 10,
            query: {
                bool: {
                    // must: [
                    //     {
                    //         match: {
                    //             "versioning_log_request.authorization_key":
                    //                 "3HoBhxh3rN3eDQSg.YQ4antdegbkv4Ngyc5M0521iWbSoZtX6I7jIrFH1Xu06FjbLNiYUolCGRltyapfG",
                    //         },
                    //     },
                    // ],
                    filter: [
                        
                        {
                            range: {
                                "versioning_log_request.creationDate": {
                                    gte: "2025/01/01 00:00:00",
                                    lt: "2025/06/30 00:00:00"
                                },
                            },
                        },
                    ],
                },
            },
            _source: [
                "versioning_log_request.authorization_key",
                "TDS_PARQ.acquirerBIN",
                "TDS_PARQ.merchantName",
                "TDS_PARQ.acquirerMerchantID",
                "TDS_PARQ.purchaseCurrency",
                "TDS_PARQ.purchaseNumber",
                "TDS_PARQ.purchaseAmount",
                "TDS_PARQ.purchaseExponent",
                "TDS_PARQ.threeDSRequestorChallengeInd",
                "TDS_PARQ.createdAt",
                "TDS_PARQ.deviceChannel",
                "TDS_RREQ.createdAt",
                "TDS_ARES.createdAt",
                "TDS_RREQ.vci",
                "TDS_PARS.vci",
                "authentication_log_response.response_content.vci",
                "versioning_log_response.response_json.brand_code",
                "versioning_log_request.request_acctNumber",
                "TDS_RREQ.dsTransID",
                "TDS_PARS.dsTransID",
                "TDS_RRES.dsTransID",
                "TDS_ARES.dsTransID",
                "TDS_RREQ.acsTransID",
                "TDS_PARS.acsTransID",
                "TDS_RRES.acsTransID",
                "TDS_ARES.acsTransID",
                "TDS_RREQ.eci",
                "TDS_PARS.eci",
                "versioning_log_response.response_json.vci",
                "TDS_ARES.transStatus",
                "TDS_ARES.whiteListStatus",
                "TDS_PARQ.messageVersion",
                "versioning_log_request.creationDate",
            ],
            sort: [
                { "versioning_log_request.creationDate": { order: "desc" } },
                "_score",
            ],
        };

        fetch3DS(body)
            .then(setHits)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p className="p-4">Cargando datos…</p>;
    if (error) return <p className="p-4 text-red-600">Error: {error}</p>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Resultados 3DS</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full border text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-2 border">#</th>
                            <th className="p-2 border">Acct #</th>
                            <th className="p-2 border">Req Date</th>
                            <th className="p-2 border">BIN</th>
                            <th className="p-2 border">Merchant</th>
                            <th className="p-2 border">Amount</th>
                            <th className="p-2 border">Device</th>
                            <th className="p-2 border">Exponent</th>
                            <th className="p-2 border">Challenge Ind</th>
                            <th className="p-2 border">VCI Auth</th>
                            <th className="p-2 border">Status</th>
                            <th className="p-2 border">WhiteList</th>
                        </tr>
                    </thead>
                    <tbody>
                        {hits.map((hit, i) => {
                            const s = hit._source || {};
                            const vlr = s.versioning_log_request || {};
                            const parq = s.TDS_PARQ || {};
                            const ares = s.TDS_ARES || {};
                            const auth = s.authentication_log_response?.response_content || {};
                            return (
                                <tr key={i} className="odd:bg-white even:bg-gray-50">
                                    <td className="p-2 border text-center">{i + 1}</td>
                                    <td className="p-2 border">{vlr.request_acctNumber ?? "—"}</td>
                                    <td className="p-2 border">
                                        {vlr.creationDate
                                            ? new Date(vlr.creationDate.replace(/\//g, "-")).toLocaleString("es-PE")
                                            : "—"}
                                    </td>
                                    <td className="p-2 border">{parq.acquirerBIN ?? "—"}</td>
                                    <td className="p-2 border">{parq.merchantName ?? "—"}</td>
                                    <td className="p-2 border">
                                        {parq.purchaseAmount ?? "—"} {parq.purchaseCurrency ?? ""}
                                    </td>
                                    <td className="p-2 border">{parq.deviceChannel ?? "—"}</td>
                                    <td className="p-2 border">{parq.purchaseExponent ?? "—"}</td>
                                    <td className="p-2 border">{parq.threeDSRequestorChallengeInd ?? "—"}</td>
                                    <td className="p-2 border">{auth.vci ?? "—"}</td>
                                    <td className="p-2 border">{ares.transStatus ?? "—"}</td>
                                    <td className="p-2 border">{ares.whiteListStatus ?? "—"}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
