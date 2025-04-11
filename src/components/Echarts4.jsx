import React from 'react';
import ReactEcharts from 'echarts-for-react';


const Echarts4 = () => {

    function random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    var data = Array.from({ length: 10 }, () => random(99000, 100000));
    var data2 = Array.from({ length: 10 }, () => random(100000, 300000));
    var data3 = Array.from({ length: 10 }, () => random(200000, 500000));
    const option = {
        title: {
            text: 'Venta por Categoría',
            left: 'center',
            subtext: 'tipos de prendas ',

        },
        tooltip: {},
        xAxis: {
            position: 'left',
            max: 1000000,
            axisLabel: {
                formatter: '{value}',
            }
        },
        yAxis: {
            type: 'category',
            data: ['Ripley', 'Entel', 'Banbif', 'interbank', 'banco falabella', 'banco pichincha'],

        },
        series: [
            {
                name: 'Mastercard',
                type: 'bar',
                stack: 'total',
                data: data2,
                color: '#f53015',
                label: {
                    show: true,
                    position: 'inside',
                    formatter:'{a}'
                }
            },
            {
                name: 'Amex',
                type: 'bar',
                stack: 'total',
                data: data,
                color: '#f8ff22',
                label: {
                    show: true,
                    position: 'inside',
                    formatter: '{a}',
                }
            },
            {
                name: 'Visa',
                type: 'bar',
                data: data3,
                stack: 'total',
                color: '#1460e7',
                label: {
                    show: true,
                    position: 'inside',
                    formatter: '{a}',
                }
            },



        ],

    };
    return <ReactEcharts option={option} style={{ width: '100%', marginLeft: '12%' }} />;
}

export default Echarts4;