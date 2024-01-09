<template>
    <div class="element-box"  @click="openElementDescriptionPage()">
        <div class="names">
            <span class="stock-id">{{ this.descr.id }}</span>
            <span class="stock-name">{{ this.descr.name }}</span>
        </div>
        <div class="prices">
            <span class="stock-change">{{ this.descr.change_sum }}</span>
            <span class="stock-change-percent">{{ this.descr.change_percent }}%</span>
        </div>
        <div class="chart-box">
            <ChartElement :chartData="chart" :detailed="false"/> 
        </div>
        <div class="current-price">
            <span>£{{ this.descr.current_price }}</span>
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
        chart: { type: Array },
        descr: { type: Object }
    },

    methods: {
        openElementDescriptionPage: function() {
            this.$store.commit('changePage', 'descr');
        },

        
    }
}
</script>


<style scoped>
.element-box {
    border-bottom: 1px solid rgb(243, 243, 243);
    margin-top: 10px;
    display: flex;
    justify-content: center;
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
    min-width: 150px;
    max-width: 150px;
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
    border-right: 1px solid rgba(192, 192, 192, 0.082);
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