import React,{ useEffect, useState } from "react";
import "../Styles/UI.css";
import Echart from "./Echarts";
import Echarts4 from "./Echarts4";
import Echarts2 from "./Echarts2";
import Lista from "../view/Lista";
import TableBines from "../view/TabletBines";
import { Transaction } from "../Icons/Transaction";

const UI = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/api/tabla")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log("error de obtencion de datos", err));
  }, []);

    const [data1, setData2] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/api/total_trans")
      .then((res) => res.json())
      .then((data1) => setData2(data1))
      .catch((err) => console.log("error de obtencion de datos", err));
  }, []);
  
  function totaltransaccion() {
    var total = data1;
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
        <div className="filtro-card"></div>
        <div className="filtro-card-text-exter">
          <div>
            <h5 className="filtro-card-text-inter">Transacciones</h5>
            {data1.map((item,index)=>(
              <h3 className="filtro-card-text-inter" key={index}>{item.total.toLocaleString()}</h3>
            ))}
            
          </div>
          <div>
            <Transaction />
          </div>
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
            <div>
              <h3>Protocolos</h3>
            </div>
            <div className="titulo-tablas">
              <h5 className="">Estado</h5>
              <h5 className="">Q TRX</h5>
              <h5 className="">%Q TRX</h5>
            </div>
            <div>
              <Lista />
            </div>
          </div>
        </article>
        <article className="conteiner-inferior">
          <div className="card-tablas2">
            <div>
              <h3>Bines</h3>
              <select name="" id="" className="card-tablas2-select">
                <option value="">Option 1</option>
              </select>
            </div>
            <div className="titulo-tablas">
              <h5 className="">AcquirerMerchantID</h5>
              <h5 className="">Q TRX</h5>
              <h5 className="">%Q TRX</h5>
            </div>
            <div>
              <TableBines />
            </div>
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
