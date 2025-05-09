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

      <table className="table">
        <thead>
          <tr className="trhead">
            <th className="acquirer"></th>
            <th className="QT"></th>
            <th className="QXT"></th>
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
