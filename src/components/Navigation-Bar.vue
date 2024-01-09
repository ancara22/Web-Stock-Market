<template>
    <div id="navigation_bar">
        <h2>{{ this.label }}</h2>
        <div class="line"></div>
        <div id="menu">
            <button @click="updateCurrentPage('stock')" :class="{ active: this.currentPage=='stock'}" >Stock</button>
            <button @click="updateCurrentPage('news')" :class="{ active: this.currentPage=='news' }">News</button>
        </div>
        <div id="nav_stock_container">
            <div class="nav-stocks-box" v-for="stock in stockDataArray" :key="stock.descr.id" @click="openElementDescriptionPage(stock.descr.id)">
                <div class="name">
                    <span>{{ stock.descr.id }}</span>
                </div>
                <div class="current-price">
                    <span>£{{ stock.descr.current_price }}</span>
                </div>
                <div class="low_box">
                    <span >{{ stock.descr.change_percent }}%</span>
                    <div class="chart-box">
                        <ChartElement :chartData="stock.chart" :detailed="false"/> 
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import ChartElement from "./stock-elements/Chart.vue";

export default {
    name: "NavigationBar",
    components: {
        ChartElement
    },

    data() {
        return {
            label: ''
        }
    },

    computed: {
        currentPage() {
            return this.$store.getters.getCurrentPage;
        },

        stockDataArray() {
            return this.$store.getters.getStockData;
        }
    },


    mounted: function() {
        if(this.currentPage == "stock") 
                this.label = "STOCK MARKET";
            else this.label = "MARKET NEWS";
    },

    methods: {
        
        openElementDescriptionPage: function(id) {
            console.log('id', id)
            this.updateCurrentPage('descr');
        },

        updateCurrentPage: function(newPage) {
            newPage == "stock" ? this.label = "STOCK MARKET" : this.label =  "MARKET NEWS";
            if(newPage == "stock") this.label = "STOK DATA";

            this.$store.commit('changePage', newPage);
        }
    }
}
</script>


<style scoped>
#navigation_bar {
    width: 100%;
    height: fit-content;
    background-color: white;
    border-bottom: 1px solid rgba(128, 128, 128, 0.161);
    margin-bottom: 30px;
}

h2 {
    font-weight: 100;
    margin: 25px;
    color: rgba(151, 151, 151, 0.76)
}

#menu {
    display: flex;
    justify-content:flex-start;
    position: relative;
    left: 10%;
    width: max-content;
    margin-top: 10px;
}

.line {
    margin: 0 auto;
    border-top: 1px solid rgba(128, 128, 128, 0.142);
    width: 80%;
}

button {
    padding: 15px 35px;
    border: none;
    background-color: white;
    font-size: 16px;
    margin-left: 20px;
    color: black;
}

button:hover {
    cursor: pointer;
    background-color:rgba(255, 161, 29, 0.727);
}

.active {
    font-weight: bold;
    text-decoration: overline;
}

#nav_stock_container {
    
    margin-top: 1px;
    display: flex;
    overflow: hidden;
    justify-content: center;
   
}

.nav-stocks-box {
    border-top: 1px solid rgba(128, 128, 128, 0.142);
    background-color: white;
    border-right: 1px solid rgba(207, 207, 207, 0.246);
    width: 150px;
    min-width: 150px;
    height: 60px;
    padding: 5px;
    padding-left: 20px;
    position: relative;
    padding-bottom: 10px;
    cursor: pointer;
}

.nav-stocks-box:hover {
    background: linear-gradient(180deg, rgba(255, 211, 146, 0.511) 0%, rgba(255,255,255,0) 70%);

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
    color: gray;
}

.current-price span {
    font-weight: bold;
    font-size: 13px;
}

.low_box span {
    font-size: 12px;
    color: rgb(2, 184, 2);
}

@media only screen and (max-width: 500px) {
    #nav_stock_container  {
        overflow-x: scroll;
    }

    button:hover {

        background-color: white;
    }
}



</style>