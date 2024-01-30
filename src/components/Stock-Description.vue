<template>
    <div id="descr-container" :key="this.descriptionData.stock.symbol">
        <!-- Stock data, chart and prices -->
        <div id="stock-data">
            <div id="stock-descr">
                <div id="stock-id">
                    <span><span>Stock Symbol:</span> {{ this.descriptionData.stock.symbol }}</span>
                </div>
            </div>
            
            <div id="chart-data">
                <div>
                    <div id="current-price"><span>Current Price: </span>${{ this.descriptionData.stock.meta.chartPreviousClose }}</div>
                    <div id="day-move">{{ this.calculateChangePercents(this.descriptionData.stock)}}%</div>
                </div>
                <div id="chart-box">
                    <ChartElement :graph="'close'" :stock="this.descriptionData.stock" :detailed="true" :key="this.descriptionData.stock.symbol"/> 
                </div>
            </div>
        </div>

        <!-- Emotions and predictions boxes -->
        <div id="analys-box" :key="this.descriptionData.stock.symbol">
            <div id="emotions-box" >
                <i :class="this.emodji"></i>
                <span>Stock sentiment: {{ this.sentiment }}</span>
                <p>{{ this.sentimentsCounter }}</p>
            </div>
            <div id="prediction-box">
                <canvas ref="predictionChart" ></canvas>
            </div>
        </div>
        
        <!-- News box -->
        <div id="news-box">
            <NewsElement v-for="news in descriptionData.newsData"  :news="news" :key="news.id"/>    
        </div>

    </div>
</template>

<script>
import ChartElement from "./stock-elements/Chart.vue";
import NewsElement from "./stock-elements/News-Element.vue"
import Chart from 'chart.js/auto';


export default {
    name: "StockDescriptopnPage",
    components: {
        ChartElement,
        NewsElement
    },

    data() {
        return {
            sentimentsCounter: '',
            sentiment: '---',
            emodji: '',
            chart: null,
            update: true
        }
    },

    mounted: function() {
        this.getAllSymbolSentiment();
        this.createPredictionChart();
    },

    computed: {
        descriptionData() {
            return this.$store.getters.getDescrPageData;
        },

    },

    watch: {
        'descriptionData.stock.symbol': function () {
            this.getAllSymbolSentiment();
            this.createPredictionChart();
          
        },

    },

    methods: {
        calculateChangePercents: function(stock) {
            let diference = stock.meta.chartPreviousClose - stock.chart.close[0];
            let percents = (diference/ stock.meta.chartPreviousClose *100).toFixed(2);

            if(percents > 0) {
                return  "+" + percents;
            } else {
                return percents;
            }
        },

        getAllSymbolSentiment() {
            let newsSentiments = this.$store.getters.getAllSymbolSentiment(this.descriptionData.stock.symbol);

            let sentimentsCounter = [0, 0, 0];
           
            newsSentiments.forEach(element => {
                if(element.sentiment == "Positive") {
                    sentimentsCounter[0]++;
                } else if(element.sentiment == "Negative") {
                    sentimentsCounter[1]++;
                } else {
                    sentimentsCounter[2]++;
                }
            });

            this.sentimentsCounter = "Positive: " +  sentimentsCounter[0] + "   Negative: " +  sentimentsCounter[1] + "\t   Neutral: " + sentimentsCounter[2];

            let newSentiment, newEmodji;

            if(sentimentsCounter[0] > sentimentsCounter[1]  ) {
                newSentiment = "Positive";
                newEmodji = 'fa fa-smile back_green';
            } else  if(sentimentsCounter[1] > sentimentsCounter[0]) {
                newSentiment = "Negative";
                newEmodji = 'fa-solid fa-face-frown back_red';
            } else {
                newSentiment = "Neutral";
                newEmodji = 'fa-solid fa-face-meh back_gray';
            }
    
            this.sentiment = newSentiment;
            this.emodji = newEmodji;
        },

        createPredictionChart() {
            const ctx = this.$refs.predictionChart.getContext('2d');
            
            let realData = this.descriptionData.stock.chart['close'];
            let predictionMean = this.descriptionData.prediction.mean;
        
            let prediction10th = this.descriptionData.prediction.low;
            let prediction90th = this.descriptionData.prediction.high;

            console.log('first', predictionMean)

            //Combine real and predicted data
            const labels = Array.from({ length: realData.length + predictionMean.length }, (_, i) => `Day ${i + 1}`);

            const data = {
                labels: labels,
                datasets: [
                    {
                        label: 'Real Stock Data',
                        borderColor: 'green',
                        data: realData,
                        fill: true,
                        backgroundColor: "rgba(3, 226, 3, 0.21)",
                        borderWidth: 1,
                        pointRadius: 0,
                    },
                    {
                        label: 'Mean',
                        borderColor: 'gray',
                        data: Array(realData.length).fill(null).concat(predictionMean),
                        fill: false,
                        borderWidth: 1,
                        pointRadius: 0,
                        yAxisID: 'prediction-axe'
                    },
                    {
                        label: 'Low',
                        borderColor: 'orange',
                        data: Array(realData.length).fill(null).concat(prediction10th),
                        fill: false,
                        borderWidth: 1,
                        pointRadius: 0,
                        yAxisID: 'prediction-axe'
                    },
                    {
                        label: 'High',
                        borderColor: 'blue',
                        data: [...Array(realData.length).fill(null), ...prediction90th],
                        fill: false,
                        borderWidth: 1,
                        pointRadius: 0,
                        yAxisID: 'prediction-axe'
                    }
                ],
            };

            //Chart configuration
            const options = {
                responsive: true,
                maintainAspectRatio: false,
            }


            //Create the chart
            this.chart = new Chart(ctx, {
                type: 'line',
                data: data,
                options: options,
            });

        }
    }

    
}

</script>

<style scoped>
#descr-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}


#stock-data {
    width: 80%;
    border-radius: 5px;
    background-color: white;
    height: auto;
    min-width: min-content;
    padding: 0px 50px 50px 50px;
}

#chart-box {
    margin: 0 auto;
    width: 90%;
    margin-left: 10%;
    min-width: 900px;
    margin-bottom: 0px;
}

canvas {
    margin: 0 auto;
    min-width: 500px;
}

#stock-descr {
    width: 100%;
    height: 100px;
    border-bottom: 1px solid rgba(128, 128, 128, 0.195);
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 40px;

    
}

#company-name {
    font-style: italic;
    font-size: 1.1rem;
    color: rgb(123, 123, 123);
}



#stock-id {
    margin-right: 20px;
    font-weight: bold;
    font-size: 1.5rem;
    color: black;
}

#stock-id span span {
    font-weight: 100;
    font-size: 16px;
}


#chart-data div:first-child {
    display: flex;
    justify-content: center;
    align-items: center;
    
}

#current-price {
    font-size: 1.5rem;
    margin-bottom: 40px;
    font-weight: bolder;
    color: rgb(0, 0, 0);
   
}

#current-price span {
    font-size: 1rem;
    color: rgb(123, 123, 123);
    margin-right: 10px;
    font-weight: 100;
    
}

#day-move {
    margin-left: 40px;
    color: rgb(3, 169, 3);
    margin-bottom: 40px;
}

#news-box {
    padding: 10px;
}

#news-box {
    width: min-content;
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
   
}

.back_green {
    color: rgb(1, 212, 1);
}

.back_red {
    color: rgb(251, 32, 32);
}

.back_gray {
    color: rgb(169, 169, 169);
}

#analys-box {
    width: 87%;
    height: 250px;
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
    margin-bottom: 20px;
}

#emotions-box {
    background-color: white;
    width: 30%;
    height: inherit;
    border-radius: 5px;
    padding: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

#prediction-box {
    background-color: white;
    width: 64%;
    height: inherit;
    border-radius: 5px;
    padding: 15px;
}

#emotions-box i {
    font-size: 74px;
    margin: 20px;

}

#emotions-box span {
    font-size: 24px;
    font-weight: bold;
    color: rgb(73, 73, 73);
}

#emotions-box p {
    color: rgb(190, 190, 190);

}


</style>