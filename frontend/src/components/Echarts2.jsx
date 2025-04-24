import React from 'react';
import ReactECharts from 'echarts-for-react';

const AreaChartHighchartsStyle = () => {
  const option = {
    title: {
      text: "Cantidad de transacciones por año",
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
    legend: {
      orient: 'vertical',
      left: 100,
      top: 60,
      backgroundColor: '#FFFFFF',
      borderWidth: 0.5
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023']
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: 'Aceptadas',
        type: 'line',
        smooth: false,
        symbol: 'circle',
        symbolSize: 6, 
        areaStyle: { opacity: 0.5, color: '#09E377' },
        itemStyle: { color: '#09E377' },
        lineStyle: { color: '#09E377', width: 1 },
        emphasis: {
          
          lineStyle: { width: 10, opacity: 0 },
          focus: 'series',
          blurScope: 'coordinateSystem'
        },
        data: [11, 11, 8, 13, 12, 14, 4, 12]
      },
      {
        name: 'Incompletas',
        type: 'line',
        smooth: false,
        symbol: 'circle',
        symbolSize: 6, 
        areaStyle: { opacity: 0.5, color: '#edff3c' },
        itemStyle: { color: '#f7ff00' },
        lineStyle: { color: '#f7ff00', width: 1 },
        
        emphasis: {
          lineStyle: { width: 10, opacity: 0 },
          focus: 'series',
          blurScope: 'coordinateSystem'
        },
        data: [3, 6, 7, 4, 4, 5, 3.9, 3]
      },
      {
        name: 'Negadas',
        type: 'line',
        smooth: false,
        symbol: 'circle',
        symbolSize: 6,
        areaStyle: { opacity: 0.5, color: '#fe1515 ' },
        itemStyle: { color: '#fe1515 ' },
        lineStyle: { color: '#fe1515 ', width: 1 },
        
        emphasis: {
          lineStyle: { width: 10, opacity: 0 },
          focus: 'series',
          blurScope: 'coordinateSystem'
        },
        data: [1, 3, 2, 6, 3, 2, 3.5, 1]
      }
    ]
  };

  return <ReactECharts option={option} style={{ height: '500px', width: '100%', maxWidth:'600px' }} />;
};

export default AreaChartHighchartsStyle;
