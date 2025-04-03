import React from 'react';
import ReactECharts from 'echarts-for-react';

const AreaChartHighchartsStyle = () => {
  const option = {
    title: {
      text: "Born persons, by boys' name"
    },
    subtitle: {
      text: '* Missing data for Yasin in 2019',
      right: 10,
      bottom: 10
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
      left: 150,
      top: 60,
      backgroundColor: '#FFFFFF',
      borderWidth: 1
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
      name: 'Amount'
    },
    series: [
      {
        name: 'Arvid',
        type: 'line',
        smooth: false,
        symbol: 'circle',
        symbolSize: 6, // se corrige SymbolSize -> symbolSize
        areaStyle: { opacity: 0.5, color: '#3399FF' },
        itemStyle: { color: '#3399FF' },
        lineStyle: { color: '#3399FF', width: 1 },
        emphasis: {
          // Aumenta grosor y pone opacity=0 para ampliar la zona de hover
          lineStyle: { width: 10, opacity: 0 },
          focus: 'series',
          blurScope: 'coordinateSystem'
        },
        data: [11, 11, 8, 13, 12, 14, 4, 12]
      },
      {
        name: 'Yasin',
        type: 'line',
        smooth: false,
        symbol: 'circle',
        symbolSize: 6, // si deseas el mismo tamaño de punto
        areaStyle: { opacity: 0.5, color: '#6633FF' },
        itemStyle: { color: '#6633FF' },
        lineStyle: { color: '#6633FF', width: 1 },
        // Agrega lo mismo en emphasis si quieres igual “zona de hover”
        emphasis: {
          lineStyle: { width: 10, opacity: 0 },
          focus: 'series',
          blurScope: 'coordinateSystem'
        },
        data: [10, 10, 8, null, 8, 6, 4, 8]
      }
    ]
  };

  return <ReactECharts option={option} style={{ height: '380px', width: '100%' }} />;
};

export default AreaChartHighchartsStyle;
