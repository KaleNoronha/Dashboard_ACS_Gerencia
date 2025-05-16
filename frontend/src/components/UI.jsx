import React, { useEffect, useState } from "react";
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

  // Estado para total de transacciones
  const [data1, setData2] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/api/total_trans")
      .then((res) => res.json())
      .then((data1) => setData2(data1))
      .catch((err) => console.log("error de obtencion de datos", err));
  }, []);

  // Estado y fetch de lista de BINs
  const [bins, setBins] = useState([]);
  const [selectedBin, setSelectedBin] = useState("");
  useEffect(() => {
    fetch("http://localhost:3001/api/bins")
      .then((res) => res.json())
      .then((bins) => setBins(bins))
      .catch((err) => console.log("Error al cargar BINs", err));
  }, []);

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
            <option value="">option 1</option>
          </select>
          <select name="" id="" className="card-select">
            <option value="">option 1</option>
          </select>
        </div>
        <div className="filtro-card"></div>
        <div className="filtro-card-text-exter">
          <div>
            <h5 className="filtro-card-text-inter">Transacciones</h5>
            {data1.map((item, index) => (
              <h3 className="filtro-card-text-inter" key={index}
              style={{animationDelay:`${index*0.05}s`}}>
                {item.total.toLocaleString()}
              </h3>
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
              <h5>Estado</h5>
              <h5>Q TRX</h5>
              <h5>%Q TRX</h5>
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
              <select
                id="bines"
                className="card-tablas2-select"
                value={selectedBin}
                onChange={(e) => setSelectedBin(e.target.value)}
              >
                <option value="">BIN</option>
                {bins.map((b) => (
                  <option key={b.bin_prefix} value={b.bin_prefix}>
                    {b.bin_prefix}
                  </option>
                ))}
              </select>
            </div>
            <div className="titulo-tablas">
              <h5>AcquirerMerchantID</h5>
              <h5>Q TRX</h5>
              <h5>%Q TRX</h5>
            </div>
            <div>
              <TableBines bin={selectedBin} />
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
