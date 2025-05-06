import React, { useEffect, useState } from "react";
import '../Styles/Querys.css'

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
    <div className="contenedor-lista">
      <div className="selects">
        <select name="" id=""></select>
        <select name="" id=""></select>
      </div>
      <h3 style={{textAlign:"center",padding:'0px',margin:'0px'}}>{totaltransaccion()}</h3>
      <h5 style={{ textAlign: "center" }}>Transacciones</h5>
      <table className="table">
        <thead style={{marginBottom:"10px"}} >
          <tr className="trhead">
            <th >Estado </th>
            <th>Q TRX</th>
            <th>%Q TRX</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr className={index%2===0 ? "tbody1 patron":"tbody1 patron1"} key={index}>
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
