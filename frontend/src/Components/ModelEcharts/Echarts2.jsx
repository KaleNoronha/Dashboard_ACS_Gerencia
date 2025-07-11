import { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import '../../Styles/Querys/Querys.css'
import { fetchACS } from '../../services/api';

const AreaChartHighchartsStyle = () => {
  const [hits, setHits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
                  lte: "2025-06-30T20:10:11"
                }
              }
            }
          ]
        }
      },
      _source: [
        "TDS_ARES.transStatus",
        "TDS_TRANSACTION.createdAt"
      ],
      sort: [
        { "TDS_TRANSACTION.createdAt": { order: "desc" } },
        "_score"
      ]
    };

    fetchACS(bodyACS)
      .then(setHits)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  // Agrupar por mes y status
  const resumenPorMesYStatus = {};
      hits.forEach(hit => {
        const s = hit._source || {};
        const fecha = s['TDS_TRANSACTION']?.createdAt || '';
        const status = s['TDS_ARES']?.transStatus || '—';
        if (!fecha) return;
        // Extrae "2025-01" del campo fecha
        const mes = fecha.substring(0, 7);
        if (!resumenPorMesYStatus[mes]) resumenPorMesYStatus[mes] = {};
        resumenPorMesYStatus[mes][status] = (resumenPorMesYStatus[mes][status] || 0) + 1;
    });
    const codigosStatus = ['Y', 'N', 'U'];
    const nombresStatus = { 'Y': 'Aceptadas', 'N': 'Negadas', 'U': 'Incompletas' };
    const coloresStatus = { 'Y': '#09E377', 'N': '#FE1515', 'U': '#F7FF00' };

    // Meses ordenados (X)
    const meses = Object.keys(resumenPorMesYStatus).sort();

    // Series para el gráfico
    const series = codigosStatus.map(codigo => ({
        name: nombresStatus[codigo],
        type: 'line',
        smooth: false,
        symbol: 'circle',
        symbolSize: 6,
        areaStyle: { opacity: 0.5, color: coloresStatus[codigo] },
        itemStyle: { color: coloresStatus[codigo] },
        lineStyle: { color: coloresStatus[codigo], width: 1 },
        emphasis: { lineStyle: { width: 10, opacity: 0 }, focus: 'series', blurScope: 'coordinateSystem' },
        data: meses.map(mes => resumenPorMesYStatus[mes]?.[codigo] || 0)
    }));
  const option = {
    title: {
      text: "Cantidad de transacciones por Mes",
      left: 'center',
    },
    subtitle: {
      text: 'Cant TRX',
      color: '#000000',
      left: 'center',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line',
        snap: true
      }
    },
    dataZoom: {
      type: 'inside',
      start: 0,
      end: 100
    },
    legend: {
      bottom: 0,
      backgroundColor: '#FFFFFF',
      itemGap: 10,
    },
    grid: {
      left: '5%',
      right: '5%',
      bottom: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: meses
    },
    yAxis: {
      type: 'value',
    },
    series,
  };

  if (loading) return <p className="p-4">Cargando datos…</p>;
    if (error) return <p className="p-4 text-red-600">Error: {error}</p>;
  return (
    <div className="w-full max-w-4xl mx-auto p-2">
      <ReactECharts option={option} style={{ height: '340px', width: '100%' }} className="w-full" />
    </div>
  );
};

export default AreaChartHighchartsStyle;
