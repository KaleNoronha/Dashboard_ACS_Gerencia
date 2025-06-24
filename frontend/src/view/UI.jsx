import React from "react";
import "../Styles/interfaces/UI.css";
import Echart from "../Components/ModelEcharts/Echarts";
import Echarts4 from "../Components/ModelEcharts/Echarts4";
import Echarts2 from "../Components/ModelEcharts/Echarts2";
import Lista from "../Components/ModelTables/Lista";
import TableBines from "../Components/ModelTables/TabletBines";
import Total from "../Components/ModelTables/TotalTransactions";
import KPIMonto from "../Components/ModelTables/KPI_monto";
import KPI_Y from "../Components/ModelTables/KPI_Y";
import KPI_N from "../Components/ModelTables/KPI_N";
const UI = () => {

  return (
    <div className="conteiner">
      <aside className="conteiner-filtro">
        <div className="filtro-card">
          <KPI_N />

        </div>
        <div className="filtro-card">
          <KPI_Y />

        </div>
        <div className="filtro-card-text-exter">

          <KPIMonto />
        </div>
        <div className="filtro-card-text-exter">
          <Total />
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
              {/* <select
                id="bin-select"
                className="card-tablas2-select"
                value={""}
                onChange={(e) => setSelectedBin(e.target.value)}
              >
                <option value="">BIN</option>
                {bins?.map((b) => (
                  <option key={b.bin_prefix} value={b.bin_prefix}>
                    {b.bin_prefix}
                  </option>
                ))}
              </select> */}
            </div>
            <div className="titulo-tablas">
              <h5>AcquirerMerchantID</h5>
              <h5>Q TRX</h5>
              <h5>%Q TRX</h5>
            </div>
            <div>
              <TableBines
              // bin={selectedBin}
              // tranx={selectedTranx}
              // top_bin={topBin ? "1" : "0"}
              />
            </div>
          </div>
          <div className="card-graficos2">
            <div>
              <Echart />
            </div>
          </div>
        </article>
      </section>
    </div>
  );
};

export default UI;
