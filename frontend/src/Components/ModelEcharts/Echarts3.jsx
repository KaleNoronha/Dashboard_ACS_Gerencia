import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import '../../Styles/Querys/Querys.css';
const LiveDataChart = () => {
  const chartRef = useRef(null);
  const [dataPoints, setDataPoints] = useState([]);

  
  const generateInitialData = () => {
    const now = new Date();
    const initialData = [];
    
    const noiseGenerator = (i) => {
      
      return (
        Math.sin(i * 0.3) * 0.4 +  
        Math.cos(i * 0.5) * 0.3 +   
        Math.random() * 0.3 +       
        0.5                          
      );
    };

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

    
    const chartInstance = echarts.init(chartRef.current);

    // Configuración del gráfico
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
      xAxis: {
        type: 'time',
      },
      yAxis: {
        type: 'value',
        min: 0,
        max: 1.5,
      },
      series: [{
        name: 'Datos Dinámicos',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 7,
        itemStyle: {
          color: '#09E377'
        },
        lineStyle: {
          width: 2,
        },
        data: initialData
      }],
      animationEasing: 'elasticOut',
      animationDuration: 1000
    };

    // Establecer opción inicial
    chartInstance.setOption(option);

    // Intervalo de actualización con generación de datos más compleja
    const timer = setInterval(() => {
      setDataPoints(prevPoints => {
        const now = new Date();
        
        // Generador de ruido más sofisticado
        const generateNoise = () => {
          const timestamp = now.getTime();
          return (
            Math.sin(timestamp * 0.001) * 0.4 +  
            Math.cos(timestamp * 0.002) * 0.3 +  
            Math.random() * 0.3 +                
            0.5                                  
          );
        };

        const newValue = Math.max(0, Math.min(1.5, generateNoise()));
        
        const newPoint = {
          name: now,
          value: [now, newValue]
        };

        // Eliminar el primer punto y agregar el nuevo
        const updatedData = [...prevPoints.slice(1), newPoint];

        // Actualizar gráfico
        chartInstance.setOption({
          series: [{
            data: updatedData
          }]
        });

        return updatedData;
      });
    }, 60000);

    // Limpieza
    return () => {
      clearInterval(timer);
      chartInstance.dispose();
    };
  }, []);

  return (
    <div 
      ref={chartRef} 
      className='contenedor-Echart3'
    />
  );
};

export default LiveDataChart;