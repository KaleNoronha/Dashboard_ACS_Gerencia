import React, { useEffect, useState } from "react";

const Lista = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/api/tabla")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log("error de obtencion de datos", err));
  }, []);

  function totaltransaccion(){
    var total = 0;
    for(var i=0;i<data.length;i++){
      total +=data[i].Q_TRX;
    }
    return total.toLocaleString();
  }

  return (
    <div
      style={{
        width: "80%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        
      }}
    >
      <h3 style={{textAlign:"center"}}>{totaltransaccion()}</h3>
      <h5 style={{ textAlign: "center" }}>Transacciones</h5>
      <table style={{ width: "100%",textAlign:"center" }}>
        <thead style={{borderBottom:"1px solid black",marginBottom:"10px"}}>
          <tr>
            <td>Estado </td>
            <td>Q TRX</td>
            <td>%Q TRX</td>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.Estado}</td>
              <td>{item.Q_TRX.toLocaleString()}</td>
              <td>{item.Porcentaje_TRX.toFixed(2)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Lista;
