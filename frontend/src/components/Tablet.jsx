import React from "react";
import Echarts4 from "./Echarts4";
// import Echarts3 from './Echarts3';
import "./Querys.css";
import Echarts2 from "./Echarts2";
import ECharts1 from "./Echarts";
import Lista from "../view/Lista";

const tablet = () => {
  return (
    <>
      <div className="tablet">
        <div className="lista">
          <Lista />
        </div>
        <div className="barras">
          <Echarts4 />
        </div>
        <div></div>
      </div>
      <div className="tablet2">
        <div>
          <Echarts2 />
        </div>
        <div>
          <ECharts1 />
        </div>
      </div>
    </>
  );
};

export default tablet;
