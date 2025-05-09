import React, { useEffect, useState } from "react";
import "../Styles/Querys.css";

const TabletBines = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/api/comercios")
      .then((res) => res.json())
      .then((data) => {
        console.log("🚀 data del endpoint:", data);
        setData(data);
      })
      .catch((err) => console.log("Error de obtención de datos", err));
  }, []);



  return (
    <div className="tabletBines">
      {/* <div className="selects">
        <select name="nombre" id=""></select>
        <select name="bin" id=""></select>
        <select name="threeDSServerTransID" id=""></select>
      </div> */}
      <table className="table">
        <thead>
          <tr className="trhead">
            <th className="acquirer">AcquirerMerchantID</th>
            <th className="QT">Q TRX</th>
            <th className="QXT">%Q TRX</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr className="tbody" key={index}>
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
