<template>
    <div class="nav-stocks-box">
        <div class="name">
            <span>{{ this.stockDescr.id }}</span>
        </div>
        <div class="current-price">
            <span>£{{ this.stockDescr.current_price }}</span>
        </div>
        <div class="low_box">
            <span >{{ this.stockDescr.change_percent }}%</span>
            <div class="chart-box">
                <ChartElement :chartData="chartData" :detailed="false"/> 
            </div>
        </div>
        
        
    </div>
</template>


<script>
import ChartElement from "./ChartElement.vue";

export default {
    name: "StockElement",
    components: {
        ChartElement
    },

    props: {
        chartData: { type: Array },
        stockDescr: { type: Object } 
    }, 

}
</script>


<style scoped>
.nav-stocks-box {
    background-color: white;
    border-right: 1px solid rgb(207, 207, 207);
    width: 150px;
    min-width: 150px;
    height: 60px;
    padding: 5px;
    padding-left: 20px;
    position: relative;
    padding-bottom: 10px;

    
}

.chart-box {
    position: absolute;
    top: 20px;
    right: -20px;
    width: 86px;
}

.name, .current-price, .low_box {
    text-align: left;
}

.name span {
    font-size: 13px;
}

.current-price span {
    font-weight: bold;
    font-size: 13px;
}

.low_box span {
    font-size: 12px;
    color: rgb(2, 184, 2);
}

</style>