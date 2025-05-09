import React from "react";
import "../Styles/UI.css";
import Echart from "./Echarts";
import Echarts4 from "./Echarts4";
import Echarts2 from "./Echarts2";
import Lista from "../view/Lista";
import TableBines from "../view/TabletBines";
import { useEffect, useState } from "react";

const UI = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/api/tabla")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log("error de obtencion de datos", err));
  }, []);
  function totaltransaccion() {
    var total = 0;
    for (var i = 0; i < data.length; i++) {
      total += data[i].Q_TRX;
    }
    return total.toLocaleString();
  }
  return (
    <div className="conteiner">
      <aside className="conteiner-filtro">
        <div className="filtro-card">
          <select name="" id="" className="card-select">
            <option value="">option 1</option>
          </select>
          <select name="" id="" className="card-select">
            <option value="">option 1</option>
          </select>
        </div>
        <div className="filtro-card">
          <select name="" id="" className="card-select">
            <option value="">
              <option value="">option 1</option>
            </option>
          </select>
          <select name="" id="" className="card-select">
            <option value="">option 1</option>
          </select>
        </div>
        <div className="filtro-card">
          <select name="" id="" className="card-select">
            <option value="">option 1</option>
          </select>
        </div>
        <div className="filtro-card">
          <h3 style={{ textAlign: "center", padding: "0px", margin: "0px" }}>
            {totaltransaccion()}
          </h3>
          <h5 style={{ textAlign: "center", padding: "0px", margin: "0px" }}>Transacciones</h5>
        </div>
      </aside>
      <section className="conteiner-graficos">
        <article className="conteiner-superior">
          <div className="card-graficos">
            <Echarts4 />
          </div>
          <div className="card-graficos">
            <Echarts2 />
          </div>
          <div className="card-tablas">
            <Lista />
          </div>
        </article>
        <article className="conteiner-inferior">
          <div className="card-tablas2">
            <TableBines />
          </div>
          <div className="card-graficos2">
            <Echart />
          </div>
        </article>
      </section>
    </div>
  );
};

export default UI;
