import React, { useState, useEffect } from "react";
import ReactEcharts from 'echarts-for-react';
import { fetchACS } from "../../services/api";

export default function DashboardTransaccionesACS() {
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
                  gte: "2025-01-01T00:00:00",
                  lte: "2025-06-30T20:10:11"
                }
              }
            }
          ]
        }
      },
      _source: [
        "TDS_AREQ.merchantName",
        "TDS_TRANSACTION.brand"
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

  const agrupado = {};
  hits.forEach(hit => {
    const s = hit._source || {};
    const marca = s.TDS_TRANSACTION?.brand ?? "—";
    const comercio = s.TDS_AREQ?.merchantName ?? "—";
    const clave = `${marca}__${comercio}`;
    agrupado[clave] = (agrupado[clave] || 0) + 1;
  });

  // Array para mostrar
  const tabla = Object.entries(agrupado).map(([k, total]) => {
    const [marca, comercio] = k.split('__');
    return { marca, comercio, total };
  });

  // Ordena de mayor a menor total
  tabla.sort((a, b) => b.total - a.total);

  // Obtener todas las marcas únicas para columnas dinámicas
  const marcasUnicas = Array.from(new Set(tabla.map(f => f.marca))).sort();

  // Agrupar por comercio y contar por marca
  const agrupadoPorComercio = {};
  tabla.forEach(({ comercio, marca, total }) => {
    if (!agrupadoPorComercio[comercio]) agrupadoPorComercio[comercio] = {};
    agrupadoPorComercio[comercio][marca] = total;
  });

  // Construir filas para la tabla
  const filas = Object.entries(agrupadoPorComercio).map(([comercio, marcas]) => {
    const fila = { comercio };
    marcasUnicas.forEach(marca => {
      fila[marca] = marcas[marca] || 0;
    });
    // Total por comercio
    fila.total = marcasUnicas.reduce((acc, marca) => acc + (fila[marca] || 0), 0);
    return fila;
  });

  // Ordenar por total descendente (mayor a menor)
  filas.sort((a, b) => b.total - a.total);

  // --- GRÁFICO ---
  const topFilas = filas.slice(0, 10);

  // INVERTIR el orden para que el mayor aparezca arriba en el gráfico
  const topFilasInvertidas = [...topFilas].reverse();
  const comercios = topFilasInvertidas.map(f => f.comercio);

  const brandColorMap = {
    "AMERICAN_EXPRESS": "#2E77BC",
    "DINERS": "#C0A060",
    "MASTERCARD": "#EB001B",
    "VISA": "#142688",
    "Total": "#7D818D",
  };

  const series = marcasUnicas.map((marca, idx) => ({
    name: marca,
    type: "bar",
    stack: "total",
    data: topFilasInvertidas.map(fila => fila[marca] || 0),
    color: brandColorMap[marca] || "#888",
    label: {
      show: false,
      position: "inside",
      formatter: "{a}",
      fontFamily: "inherit",
      fontSize: 14,
      fontWeight: 400
    },
    // Solo el último valor de la barra tiene borderRadius
    itemStyle: idx === marcasUnicas.length - 1
      ? { borderRadius: [0, 10, 10, 0] }
      : undefined,
  }));

  series.push({
    name: "Total",
    type: "bar",
    stack: "total",
    data: topFilasInvertidas.map(() => 0),
    label: {
      show: true,
      position: "right",
      formatter: function (params) {
        const i = params.dataIndex;
        const total = marcasUnicas.reduce((acc, marca) => acc + (topFilasInvertidas[i][marca] || 0), 0);
        return total.toLocaleString();
      },
      color: "#7D818D",
      fontWeight: "bold",
      fontSize: 15
    },
    itemStyle: { color: "transparent" }, // Cambiado a transparente
    silent: true // No interactúa con hover/click
  });

  // Detectar el máximo valor total para ajustar el eje X
  const maxTotal = topFilas.length > 0
    ? Math.max(...topFilas.map(fila => marcasUnicas.reduce((acc, marca) => acc + (fila[marca] || 0), 0)))
    : 0;

  // Redondear el máximo a la siguiente cifra "redonda"
  function roundUpMax(val) {
    if (val <= 1000) return 1000;
    const exp = Math.floor(Math.log10(val));
    const factor = Math.pow(10, exp - 1);
    return Math.ceil(val / factor) * factor;
  }
  const xAxisMax = roundUpMax(maxTotal);

  const option = {
    title: {
      text: "Transacciones por Comercio (TOP 10)",
      left: "center",
      textStyle: {
        fontSize: 18,
        fontWeight: 'bold'
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: function (params) {
        let tooltipText = `<strong>${params[0].axisValue}</strong><br/>`;
        let total = 0;
        params.forEach(param => {
          if (param.seriesName !== 'Total') {
            tooltipText += `${param.marker} ${param.seriesName}: ${param.value.toLocaleString()}<br/>`;
            total += param.value;
          }
        });
        tooltipText += `<strong>Total: ${total.toLocaleString()}</strong>`;
        return tooltipText;
      }
    },
    legend: {
      bottom: 0,
      itemGap: 10,
      selectedMode: true // predeterminado: permite seleccionar/deseleccionar marcas
    },
    grid: {
      left: '0%',
      right: '5%',
      top: '15%',
      bottom: '20%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      max: xAxisMax,
      axisLabel: {
        formatter: function (value) {
          if (value >= 1000000) {
            return (value / 1000000).toFixed(1) + "M";
          } else if (value >= 1000) {
            return (value / 1000).toFixed(1) + "K";
          } else {
            return value;
          }
        },
      },
    },
    yAxis: {
      type: "category",
      data: comercios,
      axisLabel: {
        interval: 0,
        width: 50,
        overflow: 'truncate'
      }
    },
    series
  };

  if (loading) return <p className="p-4">Cargando datos…</p>;
  if (error) return <p className="p-4 text-red-600">Error: {error}</p>;

  // Si no hay datos
  if (hits.length === 0) {
    return <div className="p-4 text-gray-600">No se encontraron datos para el período seleccionado.</div>;
  }

  return (
  
      <div className="contenedor-echart">
        <ReactEcharts option={option} className="contenedor-echart" />
      </div>
  );
}

