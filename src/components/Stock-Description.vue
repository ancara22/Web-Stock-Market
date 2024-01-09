<template>
    <div id="descr-container">
        <!-- Stock data, chart and prices -->
        <div id="stock-data">
            <div id="stock-descr">
                <div id="stock-id">
                    <span>IBM</span>
                </div>
                <div id="company-name">
                    <span>International Business machine</span>
                </div>
            </div>
            
            <div id="chart-data">
                <div>
                    <div id="current-price"><span>Current Price: </span>£233.32</div>
                    <div id="day-move">+1.23%</div>
                </div>
                <div id="chart-box">
                    <ChartElement :chartData="this.descriptionData.chartData.chart" :detailed="true"/> 
                </div>
            </div>
        </div>

        <!-- Emotions and predictions boxes -->
        <div id="analys-box">
            <div id="emotions-box"></div>
            <div id="prediction-box"></div>
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


export default {
    name: "StockDescriptopnPage",
    components: {
        ChartElement,
        NewsElement
    },

    computed: {
        descriptionData() {
            return this.$store.getters.getDescrPageData;
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
</style>