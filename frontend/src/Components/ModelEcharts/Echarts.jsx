import { useEffect, useRef, useState } from "react";
import ReactECharts from "echarts-for-react";
import { fetchACS } from "../../services/api";
import '../../Styles/Querys/Querys.css'

const STATUS_MAP = {
  Y: "Correcta",
  N: "Cancelada",
  U: "Incompleta",
};
const COLORS = {
  Correcta: "#2CAFFE",
  Cancelada: "#FF5E5E",
  Incompleta: "#FFA500",
};

const EChartsMasterDetail = () => {
  const [rawData, setRawData] = useState({});
  const [filteredData, setFilteredData] = useState({});
  const [range, setRange] = useState([null, null]);
  const masterRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const bodyACS = {
        size: 10000,
        from: 0,
        query: {
          bool: {
            filter: [
              { match: { "TDS_TRANSACTION.issuerId": "041" } },
              {
                range: {
                  "TDS_TRANSACTION.createdAt": {
                    gte: "2024-01-01T00:00:00",
                    lte: "2024-06-30T20:10:11"
                  }
                }
              }
            ]
          }
        },
        _source: [
          "TDS_ARES.transStatus",
          "TDS_TRANSACTION.createdAt",
          "TDS_AREQ.purchaseAmount",
        ],
        sort: [
          { "TDS_TRANSACTION.createdAt": { order: "desc" } },
          "_score"
        ]
      };

      try {
        const data = await fetchACS(bodyACS);

        // Agrupar por categoría (status traducido) y día
        const groupedByCategory = {};
        data.forEach(hit => {
          const s = hit._source || {};
          const rawStatus = s.TDS_ARES?.transStatus;
          const categoria = STATUS_MAP[rawStatus];
          const date = s.TDS_TRANSACTION?.createdAt?.slice(0, 10);
          const monto = parseFloat(s.TDS_AREQ?.purchaseAmount) || 0;
          if (!categoria || !date) return;

          if (!groupedByCategory[categoria]) groupedByCategory[categoria] = {};
          if (!groupedByCategory[categoria][date]) groupedByCategory[categoria][date] = [];
          groupedByCategory[categoria][date].push(monto);
        });

        // Calcula el promedio diario por categoría
        const averagedByCategory = {};
        Object.entries(groupedByCategory).forEach(([categoria, data]) => {
          averagedByCategory[categoria] = Object.entries(data)
            .map(([date, montos]) => {
              const avg = montos.reduce((a, b) => a + b, 0) / montos.length;
              return { value: [new Date(date).getTime(), +avg.toFixed(2)] };
            })
            .sort((a, b) => a.value[0] - b.value[0]);
        });

        setRawData(averagedByCategory);

        // Inicializa rango con los últimos 100 de "Correcta"
        const refCat = "Correcta";
        const initial = averagedByCategory[refCat]?.slice(-100) || [];
        setRange([
          initial[0]?.value[0] || null,
          initial[initial.length - 1]?.value[0] || null,
        ]);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!range[0] || !range[1]) return;
    const filtered = {};
    Object.entries(rawData).forEach(([cat, data]) => {
      filtered[cat] = data.filter(
        ({ value }) => value[0] >= range[0] && value[0] <= range[1]
      );
    });
    setFilteredData(filtered);
  }, [range, rawData]);

  useEffect(() => {
    const resize = () => {
      masterRef.current?.getEchartsInstance().resize();
    };
    window.addEventListener("resize", resize);
    setTimeout(resize, 300);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const legendKeys = ["Correcta", "Cancelada", "Incompleta"];

  const getSeries = (data) =>
    legendKeys.map((cat) => ({
      name: cat,
      type: "line",
      smooth: true,
      data: (data[cat] || []).map((p) => p.value),
      symbol: "none",
      lineStyle: { width: 2, color: COLORS[cat] },
      areaStyle: { opacity: 0.3, color: COLORS[cat] },
      showSymbol: false,
    }));

  const detailOption = {
    tooltip: {
      trigger: "axis",
      formatter: (params) => {
        const d = new Date(params[0].value[0]);
        return `${d.toDateString()}<br/>${params
          .map((p) => `${p.seriesName}: S/. ${p.value[1].toFixed(2)}`)
          .join("<br/>")}`;
      },
    },
    legend: {
      top: 30,
      data: legendKeys,
    },
    grid: {
      top: 80,
      left: 70,
      right: 60,
      bottom: 20,
    },
    xAxis: {
      type: "time",
      min: range[0],
      max: range[1],
    },
    yAxis: {
      type: "value",
      name: "Soles (S/.)",
      axisLabel: {
        formatter: function (value) {
          if (value >= 1e6) return (value / 1e6).toFixed(1).replace(/\.0$/, "") + "M";
          if (value >= 1e3) return (value / 1e3).toFixed(1).replace(/\.0$/, "") + "K";
          return value;
        },
      },
    },
    dataZoom: {
      type: 'inside',
      start: 0,
      end: 100
    },
    series: getSeries(filteredData),
  };

  const masterOption = {
    title: { text: "", show: false },
    tooltip: { show: false },
    xAxis: {
      type: "time",
      boundaryGap: false,
    },
    yAxis: {
      type: "value",
      show: false,
    },
    dataZoom: [
      {
        type: "slider",
        show: true,
        height: 40,
        bottom: 20,
        start: 0,
        end: 100,
        xAxisIndex: 0,
        handleSize: "100%",
        throttle: 0,
      },
      {
        type: "inside",
        xAxisIndex: 0,
        throttle: 0,
      },
    ],
    series: [
      {
        name: "Vista General",
        type: "line",
        smooth: true,
        data: Object.values(rawData)
          .flat()
          .map((p) => p.value),
        symbol: "none",
        lineStyle: { width: 1, color: "#999" },
        areaStyle: { opacity: 0.3, color: "#999" },
      },
    ],
  };

  const onMasterChartReady = (chart) => {
    chart.on("dataZoom", () => {
      const zoom = chart.getOption().dataZoom[0];
      const startValue = zoom.startValue;
      const endValue = zoom.endValue;
      if (startValue && endValue) {
        setRange([startValue, endValue]);
      }
    });
  };

  return (
    <div className="contenedor">
      <div>
        <div>
          <ReactECharts option={detailOption} className="detalles" />
        </div>
        <div
          style={{ width: "100%", marginTop: '-30px' }}
          className="contenedor-master"
        >
          <ReactECharts
            ref={masterRef}
            option={masterOption}
            onChartReady={onMasterChartReady}
            style={{ height: "100px", width: "100%" }}
            className="master"
          />
        </div>
      </div>
    </div>
  );
};

export default EChartsMasterDetail;
