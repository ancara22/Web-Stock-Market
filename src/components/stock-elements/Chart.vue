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
        stock: { type: Object },      //Chart data
        detailed: { type: Boolean },      //True to show the graph scales, false to show minumum details
        graph: { type: String }
    },

    data() {
        return {
            chart: null,        //The future chart object
            displayGrid: true, //Chart detailing controler
            pointRadoius: 2,     //Chart points size
            borderWidth: 3,
            chartData: [],
            timestamps: []
        }
    },

    mounted: function() {
        this.chartData = this.stock.chart[this.graph];
        this.timestamps = this.stock.timestamp;
        
        //Set the detailing
        if(!this.detailed) {
            this.displayGrid = false
            this.pointRadoius = 0
            this.borderWidth = 1
        }

        this.renderChart(); //Render the chart
    },

    methods: {
        //Chart rendering
        renderChart: function() {
            const ctxt = this.$refs.chartBox.getContext('2d');      //Get the output box

            //Set the chart
            this.chart = new Chart(ctxt, {
                type: 'line',
                data: {
                    labels: Object.keys(this.timestamps),
                    datasets: [{
                            label: 'Stock Price',
                            data: Object.values(this.chartData),
                            borderColor: 'rgb(3, 193, 3)',
                            borderWidth: this.borderWidth,
                            fill: false,
                            pointRadius: this.pointRadoius,
                        }]
                    },
                    options: {
                        plugins: {
                            legend: { display: false }
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

    }
}
</script>


<style scoped>
.chart {
    width: inherit;
    display: flex;
    justify-content: center;
}

</style>