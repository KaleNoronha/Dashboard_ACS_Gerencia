import React from "react";
import Echarts4 from "./Echarts4";
import "../Styles/Querys.css";
import Echarts2 from "./Echarts2";
import ECharts1 from "./Echarts";
import Lista from "../view/Lista";
import TabletBines from "../view/TabletBines";

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
        <div>
          <TabletBines />
        </div>
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
