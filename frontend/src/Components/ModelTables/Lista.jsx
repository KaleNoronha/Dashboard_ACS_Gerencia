import React, { useEffect, useState } from "react";
import "../../Styles/Querys/Querys.css";

const Lista = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/api/tabla")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log("error de obtencion de datos", err));
  }, []);
  return (
    <div className="contenedor-lista">
      <div className="scroll-container">
        <table className="table-lista">
          <thead className="thead-lista">
            <tr>
              <th className="col"></th>
              <th className="col"></th>
              <th className="col"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr className="tbody" key={index}>
                <td>{item.Estado}</td>
                <td>{item.Q_TRX.toLocaleString()}</td>
                <td>{item.Porcentaje_TRX.toFixed(2)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Lista;
