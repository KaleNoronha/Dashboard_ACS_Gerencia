import React, { useEffect, useRef, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import '../Styles/Querys.css';



const EChartsMasterDetail = () => {
  const [rawData, setRawData] = useState({});
  const [filteredData, setFilteredData] = useState({});
  const [range, setRange] = useState([null, null]);
  const [categoryFilter, setCategoryFilter] = useState({
    correcta: true,
    cancelada: false,
    incompleta: false,
  });
  const masterRef = useRef(null);

  useEffect(() => {
    const loadData = async () => {
      const response = await fetch('http://localhost:3001/api/transacciones');
      const jsonData = await response.json();
  
      const fromDate = new Date(2024, 0, 1);   // 1 Enero 2024
      const toDate = new Date(2024, 7, 15);    // 31 Julio 2024
  
      const groupedByCategory = {};
  
      jsonData.forEach(row => {
        const date = new Date(row.fecha);
  
        if (date >= fromDate && date <= toDate) {  // 🎯 Filtrar solo 2024 Enero a Julio
          const categoria = row.categoria;
          const dayKey = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
          const monto = parseFloat(row.monto);
  
          if (!groupedByCategory[categoria]) groupedByCategory[categoria] = {};
          if (!groupedByCategory[categoria][dayKey]) groupedByCategory[categoria][dayKey] = [];
          groupedByCategory[categoria][dayKey].push(monto);
        }
      });
  
      const averagedByCategory = {};
  
      Object.entries(groupedByCategory).forEach(([categoria, data]) => {
        averagedByCategory[categoria] = Object.entries(data).map(([timestamp, montos]) => {
          const avg = montos.reduce((a, b) => a + b, 0) / montos.length;
          return { value: [parseInt(timestamp), parseFloat(avg.toFixed(2))] };
        }).sort((a, b) => a.value[0] - b.value[0]);
      });
  
      setRawData(averagedByCategory);
  
      const refCat = 'correcta';
      const initial = averagedByCategory[refCat]?.slice(-100) || [];
      setRange([initial[0]?.value[0] || null, initial[initial.length - 1]?.value[0] || null]);
    };
    loadData();
  }, []);
  
  useEffect(() => {
    if (!range[0] || !range[1]) return;
    const filtered = {};
    Object.entries(rawData).forEach(([cat, data]) => {
      if (categoryFilter[cat]) {
        filtered[cat] = data.filter(({ value }) =>
          value[0] >= range[0] && value[0] <= range[1]
        );
      }
    });
    setFilteredData(filtered);
  }, [range, rawData, categoryFilter]);

  const getSeries = (data) => {
    const colors = {
      correcta: '#2CAFFE',
      cancelada: '#FF5E5E',
      incompleta: '#FFA500',
    };

    return Object.entries(data).map(([cat, points]) => ({
      name: `${cat.charAt(0).toUpperCase() + cat.slice(1)} (Promedio Diario)`,
      type: 'line',
      smooth: true,
      data: points.map(p => p.value),
      symbol: 'none',
      lineStyle: { width: 2, color: colors[cat] },
    }));
  };
  useEffect(() => {
    const resize = () => {
      masterRef.current?.getEchartsInstance().resize();
    };
  
    window.addEventListener('resize', resize);
    setTimeout(resize, 300); 
  
    return () => window.removeEventListener('resize', resize);
  }, []);
  

  const detailOption = {
    title: {
      text: 'Transacciones Promedio Diario: Enero a Julio 2024',
      left: 'center',
      size:15
    },
    tooltip: {
      trigger: 'axis',
      formatter: (params) => {
        const d = new Date(params[0].value[0]);
        return `${d.toDateString()}<br/>${params
          .map(p => `${p.seriesName}: S/. ${p.value[1].toFixed(2)}`)
          .join('<br/>')}`;
      },
    },
    legend: {
      top: 30,
      data: Object.keys(filteredData).map(cat => `${cat.charAt(0).toUpperCase() + cat.slice(1)} (Promedio Diario)`),
    },
    grid: {
      top: 100,
      left: 50,
      right: 30,
      bottom: 30,
    },
    xAxis: {
      type: 'time',
      min: range[0],
      max: range[1],
    },
    yAxis: {
      type: 'value',
      name: 'Soles (S/.)',
    },
    series: getSeries(filteredData),
  };

  const masterOption = {
    title: { text: '', show: false },
    tooltip: { show: false },
    xAxis: {
      type: 'time',
      boundaryGap: false,
    },
    yAxis: {
      type: 'value',
      show: false,
    },
    dataZoom: [
      {
        type: 'slider',
        show: true,
        height: 40,
        bottom: 20,
        start: 80,
        end: 100,
        xAxisIndex: 0,
        handleSize: '100%',
        throttle: 0,
      },
      {
        type: 'inside',
        xAxisIndex: 0,
        throttle: 0,
      },
    ],
    series: [
      {
        name: 'Vista General',
        type: 'line',
        smooth: true,
        data: Object.values(rawData).flat().map(p => p.value),
        symbol: 'none',
        lineStyle: { width: 1, color: '#999' },
        areaStyle: { opacity: 0.3, color: '#999' },
      },
    ],
  };

  const onMasterChartReady = (chart) => {
    chart.on('dataZoom', () => {
      const zoom = chart.getOption().dataZoom[0];
      const startValue = zoom.startValue;
      const endValue = zoom.endValue;
      if (startValue && endValue) {
        setRange([startValue, endValue]);
      }
    });
  };

  const toggleCategory = (cat) => {
    setCategoryFilter(prev => ({ ...prev, [cat]: !prev[cat] }));
  };

  return (
    <div className='contenedor'>
      <div>
        {['correcta', 'cancelada', 'incompleta'].map(cat => (
          <button
            key={cat}
            onClick={() => toggleCategory(cat)}
            style={{backgroundColor: categoryFilter[cat] ? '#007bff' : '#ccc'}}
            className='botones'
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>
      <ReactECharts option={detailOption} className='detalles' />
      <div style={{ width:'90%', marginTop: '-30px' }} className='contenedor-master'>
        <ReactECharts
          ref={masterRef}
          option={masterOption}
          onChartReady={onMasterChartReady}
          style={{ height: '100px', width: '100%'}}
          className='master'
        />
      </div>
    </div>
  );
};

export default EChartsMasterDetail;
