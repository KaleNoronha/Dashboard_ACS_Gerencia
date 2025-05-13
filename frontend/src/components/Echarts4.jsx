import React from "react";
import ReactEcharts from "echarts-for-react";
import "../Styles/Querys.css";

const Echarts4 = () => {
  function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  var data = Array.from({ length: 10 }, () => random(99000, 100000));
  var data2 = Array.from({ length: 10 }, () => random(100000, 300000));
  var data3 = Array.from({ length: 10 }, () => random(200000, 500000));
  const option = {
    title: {
      text: "Total de Transacciones Bancarias",
      left: "center",
      subtext: "Transacciones por marca",
    },
    tooltip: {},
    xAxis: {
      position: "left",
      max: 1000000,
      axisLabel: {
        formatter: function (value) {
          if (value >= 1000000) {
            return "1M";
          } else {
            return value / 1000 + "K";
          }
        },
      },
    },
    yAxis: {
      type: "category",
      data: [
        "Ripley",
        "Entel",
        "Banbif",
        "interbank",
        "banco\nfalabella",
        "banco\npichincha",
      ],
    },
    legend:{
      show:true,
      top:"93%"
    },
    series: [
      {
        name: "Mastercard",
        type: "bar",
        stack: "total",
        data: data2,
        color: "#EB001B",
        label: {
          show: false,
          position: "inside",
          formatter: "{a}",
        },
      },

      {
        name: "Visa",
        type: "bar",
        data: data3,
        stack: "total",
        color: "#142688",
        label: {
          show: false,
          position: "inside",
          formatter: "{a}",
        },
      },
      {
        name: "Amex",
        type: "bar",
        stack: "total",
        data: data,
        color: "#2E77BC",
        label: {
          show: false,
          position: "inside",
          formatter: "{a}",
        },
      },
      {
        name: "Total",
        type: "bar",
        stack: "total",
        data: data3.map(() => 0), // No añade volumen
        label: {
          show: true,
          position: "right",
          formatter: function (params) {
            const i = params.dataIndex;
            const totalValue = data[i] + data2[i] + data3[i];
            return totalValue.toLocaleString();
          },
          color: "#7D818D",
          fontWeight: "bold",
        },
        itemStyle: {
          color: "transparent",
        },
      },
    ],
  };
  return (
    <div className="contenedor-echart">
      <ReactEcharts option={option} className="contenedor-echart" />
    </div>
  );
};

export default Echarts4;
