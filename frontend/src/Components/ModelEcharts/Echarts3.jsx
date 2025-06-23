import { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';

const LiveDataChart = () => {
  const chartRef = useRef(null);
  const [dataPoints, setDataPoints] = useState([]);

  // Generador de datos iniciales
  const generateInitialData = () => {
    const now = new Date();
    const initialData = [];
    const noiseGenerator = (i) => (
      Math.sin(i * 0.3) * 0.4 +
      Math.cos(i * 0.5) * 0.3 +
      Math.random() * 0.3 +
      0.5
    );

    for (let i = -19; i <= 0; i += 1) {
      const timestamp = new Date(now.getTime() + i * 1000);
      const value = Math.max(0, Math.min(1.5, noiseGenerator(i)));
      initialData.push({
        name: timestamp,
        value: [timestamp, value]
      });
    }
    return initialData;
  };

  useEffect(() => {
    const initialData = generateInitialData();
    setDataPoints(initialData);

    // Inicializar gráfico
    const chartInstance = echarts.init(chartRef.current);

    // Opciones del gráfico
    const option = {
      title: {
        text: 'Flujo de Datos Dinámicos',
        subtext: 'Análisis de Variabilidad',
        left: 'center',
        textStyle: {
          color: '#333',
          fontWeight: 'bold',
          align: 'center'
        }
      },
      grid: {
        top: 80,
        bottom: 50,
        left: 50,
        right: 50,
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params) => {
          const param = params[0];
          return `
            <div style="color:#666;">
              <strong>Timestamp:</strong> ${new Date(param.value[0]).toLocaleString()}<br/>
              <strong>Valor:</strong> ${param.value[1].toFixed(3)}
            </div>
          `;
        }
      },
      xAxis: { type: 'time' },
      yAxis: { type: 'value', min: 0, max: 1.5 },
      series: [{
        name: 'Datos Dinámicos',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 7,
        itemStyle: { color: '#09E377' },
        lineStyle: { width: 2 },
        data: initialData
      }],
      animationEasing: 'elasticOut',
      animationDuration: 1000
    };

    chartInstance.setOption(option);

    // Actualización periódica
    const timer = setInterval(() => {
      setDataPoints(prevPoints => {
        const now = new Date();
        const generateNoise = () => (
          Math.sin(now.getTime() * 0.001) * 0.4 +
          Math.cos(now.getTime() * 0.002) * 0.3 +
          Math.random() * 0.3 +
          0.5
        );
        const newValue = Math.max(0, Math.min(1.5, generateNoise()));
        const newPoint = { name: now, value: [now, newValue] };
        const updatedData = [...prevPoints.slice(1), newPoint];
        chartInstance.setOption({
          series: [{ data: updatedData }]
        });
        return updatedData;
      });
    }, 60000);

    // Responsive con ResizeObserver
    const resizeObserver = new window.ResizeObserver(() => {
      chartInstance.resize();
    });
    if (chartRef.current) {
      resizeObserver.observe(chartRef.current);
    }

    // Limpieza
    return () => {
      clearInterval(timer);
      resizeObserver.disconnect();
      chartInstance.dispose();
    };
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <div
        ref={chartRef}
        className="w-full h-[350px] md:h-[420px] bg-white rounded-2xl shadow-lg"
      />
    </div>
  );
};

export default LiveDataChart;
