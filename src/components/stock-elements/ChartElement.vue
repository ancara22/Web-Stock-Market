<template>
    <div class="chart">
        <canvas ref="chartBox"></canvas>
    </div>
</template>

<script>
import Chart from 'chart.js/auto';

export default {
    name: "ChartElement",
    props: {
        chartData: {
            type: Array
        }, 
        detailed: {
            type: Boolean
        }
    },

    data() {
        return {
            chart: null,
            displayGrid: false,
            pointRadoius: 0
        }
    },

    mounted: function() {
        if(this.detailed) {
            this.displayGrid = true
            this.pointRadoius = 1
        }

        this.renderChart();
    },

        


    methods: {
        renderChart: function() {
            const ctxt = this.$refs.chartBox.getContext('2d');

            const timestamps = this.chartData.map(item => item.timestamp);
            const closePrices = this.chartData.map(item => item.data.close);


            this.chart = new Chart(ctxt, {
                type: 'line',
                data: {
                    labels: Object.keys(timestamps),
                    datasets: [{
                            label: 'Stock Price',
                            data: Object.values(closePrices),
                            borderColor: 'rgb(3, 193, 3)',
                            borderWidth: 1,
                            fill: false,
                            pointRadius: this.pointRadoius,
                        }]
                    },
                    options: {
                        plugins: {
                            legend: {
                                display: false
                            }
                        },
                        scales: {
                            x: { 
                                type: 'linear',
                                display: this.displayGrid
                            },
                            y: { 
                                beginAtZero: false,
                                display: this.displayGrid
                            },
                        },
                    },
                    tooltips: {
                        callbacks: {
                            label: function(tooltipItem) {
                                    return tooltipItem.yLabel;
                            }
                        
                        }
                    }
            })
        },

        formattedData: function() {
            let dataCopy = this.chartData;
           
            
            dataCopy.map(([timestamp, values]) => {
                return {
                    x: new Date(timestamp).getTime(),
                    y: parseFloat(values['close']),
                };
            });

            return dataCopy;
        }

        
    
    }
}
</script>


<style scoped>
.chart {
    width: inherit;
}

</style>