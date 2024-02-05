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
        detailed: { type: Boolean },  //True to show the graph scales, false to show minumum details
        graph: { type: String },      
        coloredChart: { type: Boolean } //Chart Color
    },

    data() {
        return {
            chart: null,        //The future chart object
            displayGrid: true,  //Chart detailing controler
            pointRadoius: 1,    //Chart points size
            borderWidth: 2,     //Border width
            chartData: [],      //Chart Data
            timestamps: [],     //Time labesls
            color: ''           //Chart color
        }
    },

    //On Component Mounted
    mounted: function() {
        this.chartData = this.stock.chart[this.graph];
        this.timestamps = this.stock.timestamp;
        
        //Set the detailing
        if(!this.detailed) {
            this.displayGrid = false
            this.pointRadoius = 0
            this.borderWidth = 1
        }

        //Set the chart color
        let tempData = Object.values(this.chartData);

        if(tempData[0] < tempData[tempData.length -1] && this.coloredChart){
            this.color = 'rgb(3, 193, 3)'
        } else if(tempData[0] > tempData[tempData.length -1] && this.coloredChart) {
            this.color = 'red'
        } else {
            this.color = 'rgb(3, 193, 3)'
        }

        //Render the chart
        this.renderChart(); 
    },

    methods: {
        //Render the Chart
        renderChart: function() {
            //Get the output box
            const ctxt = this.$refs.chartBox.getContext('2d');     

            //Set the chart
            this.chart = new Chart(ctxt, {
                type: 'line',
                data: {
                    labels: Object.keys(this.timestamps),
                    datasets: [{
                            label: 'Stock Price',
                            data: Object.values(this.chartData),
                            borderColor: this.color,
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