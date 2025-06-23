import React, { useState } from "react";
import "../Styles/interfaces/UI.css";
import Echart from "../Components/ModelEcharts/Echarts";
import Echarts4 from "../Components/ModelEcharts/Echarts4";
import Echarts2 from "../Components/ModelEcharts/Echarts2";
import Lista from "../Components/ModelTables/Lista";
import TableBines from "../Components/ModelTables/TabletBines";
import { useFetch } from "../hooks";
import { AsyncPaginate } from "react-select-async-paginate";
import { loadNroTransOptions } from "../Components/ModelTables/NroTransSelect";
import Total from "../Components/ModelTables/TotalTransactions";

const UI = () => {
  const {
    data: tabla,
    loading: cargandoTabla,
    error: errTabla,
  } = useFetch("http://localhost:3001/api/tabla");

  // 2) Fetch total transacciones
  const {
    data: totalTrans,
    loading: cargandoTotal,
    error: errTotal,
  } = useFetch("http://localhost:3001/api/total_trans");

  // 3) Fetch lista de BINs
  const {
    data: bins,
    loading: cargandoBins,
    error: errorBins,
  } = useFetch("http://localhost:3001/api/bins");

  // 5) Estado local para el filtro de BIN y transacción
  const [selectedTranx, setSelectedTranx] = useState("");
  const [selectedBin, setSelectedBin] = useState("");
  const [topBin, setTopBin] = useState(false);

  // 6) Mostrar loading o error global
  if (cargandoTabla || cargandoTotal || cargandoBins)
    return <p>Cargando datos…</p>;
  if (errTabla || errTotal || errorBins) return <p>Error al cargar datos.</p>;


  return (
    <div className="conteiner">
      <aside className="conteiner-filtro">
        <div className="filtro-card">
          <AsyncPaginate
            id="tranx-select"
            value={
              selectedTranx
                ? { label: selectedTranx, value: selectedTranx }
                : null
            }
            loadOptions={loadNroTransOptions}
            onChange={(opt) => setSelectedTranx(opt?.value || "")}
            additional={{ page: 0 }}
            defaultOptions
            placeholder="Buscar transacción..."
            debounceTimeout={300}
          />
  
        </div>
        <div className="filtro-card">
          <select name="" id="" className="card-select">
            <option value="">Opción Extra</option>
          </select>

        </div>
        <div className="filtro-card">
          <label>
            <input
              type="checkbox"
              checked={topBin}
              onChange={(e) => setTopBin(e.target.checked)}
              className=""
            />
            Ordenar por Top BIN
          </label>
        </div>
        <div className="filtro-card-text-exter">
          <h5>Total de transacciones</h5>
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
              <select
                id="bin-select"
                className="card-tablas2-select"
                value={selectedBin}
                onChange={(e) => setSelectedBin(e.target.value)}
              >
                <option value="">BIN</option>
                {bins?.map((b) => (
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
              <TableBines
                bin={selectedBin}
                tranx={selectedTranx}
                top_bin={topBin ? "1" : "0"}
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
