<template>
    <div class="element-box"  @click="openElementDescriptionPage()">
        <div class="names">
            <span class="stock-id">{{ this.stock.symbol }}</span>
        </div>
        <div class="prices">
            <span class="stock-change" :style="{ color: textColor }">{{  this.calculateDiference(this.stock) }}</span>
            <span class="stock-change-percent" :style="{ color: textColor }">{{  this.calculateChangePercents(this.stock) }}%</span>
        </div>
        <div class="line"> </div>
        <div class="chart-box">
            <div class="label">Open</div>
            <ChartElement :graph="'close'" :stock="this.stock" :detailed="false" :coloredChart="true"/> 
        </div>
        
        <div class="line"> </div>
        <div class="chart-box">
            <div class="label">Volume</div>
            <ChartElement :graph="'volume'" :stock="this.stock" :detailed="false" :coloredChart="false"/> 
        </div>
        <div class="line"> </div>
        <div class="current-price">
            <span>£{{ this.stock.meta.chartPreviousClose }}</span>
        </div>
    </div>
</template>


<script>
import ChartElement from "./Chart.vue";

export default {
    name: "StockElement",
    components: {
        ChartElement
    },

    props: {
        stock: { type: Object },
    },

    data() {
        return {
            color: 'rgb(3, 193, 3)',    //Chart color
            textColor: 'rgb(3, 193, 3)' //Text color
        }
    },

    methods: {
        //Open Element Description page event handler
        openElementDescriptionPage: function() {
            this.$store.commit('changePage', 'descr');
            this.$store.commit('setDescrPage', this.stock);
        },

        //Calculate stock move diference
        calculateDiference: function(stock) {
            let diference = (stock.meta.chartPreviousClose - stock.chart.close[0]).toFixed(2);

            //Set the colors
            if(diference > 0) {
                this.color = 'rgb(3, 193, 3)';
                this.textColor = 'rgb(3, 193, 3)';
                return  "+" + diference + "$"
            } else {
                this.textColor = 'red';
                this.color = 'red';
                return diference;
            }
        },

        //Calculate move diference in percents
        calculateChangePercents: function(stock) {
            let diference = stock.meta.chartPreviousClose - stock.chart.close[0];
            let percents = (diference/ stock.meta.chartPreviousClose *100).toFixed(2);

            if(percents > 0) {
                return  "+" + percents;
            } else {
                return percents;
            }
        }
    }
}
</script>


<style scoped>
.element-box {
    border-bottom: 1px solid rgb(243, 243, 243);
    margin-top: 10px;
    display: flex;
    justify-content: space-around;
    padding: 0 80px 0 80px;
    
}

.names {
    display: flex;
    flex-direction: column;
    text-align: left;
}

.stock-id {
    font-weight: bold;
}

.stock-name {
    color: rgb(176, 176, 176);
    font-size: 13px;
}

.names {
    min-width: 100px;
    max-width: 100px;
    justify-content: center;
}

.prices {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 12px;
    margin-left: 15px;
    min-width: 120px;
    max-width: 120px;
    color: rgb(2, 164, 2);
}

.chart-box {
    padding: 5px;
    width: 130px;
    display: flex;
    margin-right: 50px;
}

.chart-box div {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    margin-right: 15px;
    color: rgb(170, 170, 170);
}



.current-price {
    width: 100px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
}

.current-price span {
    font-weight: 400;
}


.line {
    height: inherit;
    border-right: 1px solid rgb(234, 234, 234);
    width: 1px;
}

@media only screen and (max-width: 500px) {
    .names {
        min-width: 20%;
    }

    .prices {
        margin-left: 2%;
        width: 10%;
        min-width: 10%;
    }

    .chart-box {
        padding: 6%;
        width: 90px; 

    }

    .current-price {
        width: 6%;
    }
}

</style>