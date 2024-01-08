<template>
    <div id="navigation_bar">
        <h2>{{ this.label }}</h2>
        <div class="line"></div>
        <div id="menu">
            <button @click="emitChangePageEvent('stock')" :class="{ active: this.currentPage=='stock'}" >Stock</button>
            <button @click="emitChangePageEvent('news')" :class="{ active: this.currentPage=='news' }">News</button>
        </div>
        <div id="nav_stock_box">
            <NavStockElement v-for="stock in stockDataArray" :chartData="stock.chart" :stockDescr="stock.descr" :key="stock.descr.id"/>
           
           
        </div>
    </div>
</template>


<script>
import NavStockElement from "./stock-elements/NavStockElement.vue";
import stockJson from '../data.json';

export default {
    name: "NavigationBar",
    components: {
        NavStockElement
    },

    data() {
        return {
            stockDataArray: stockJson,
            currentPage: 'stock',
            label: ''
        }
    },


    mounted: function() {
        if(this.currentPage == "stock") 
                this.label = "STOCK MARKET";
            else this.label = "MARKET NEWS";
    },

    methods: {
        emitChangePageEvent(newPage) {
            newPage == "stock" ? this.label = "STOCK MARKET" : this.label =  "MARKET NEWS";

            this.currentPage = newPage;
            this.$emit('changePage', newPage);
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
    background-color:rgb(255, 161, 29);
}

.active {
    font-weight: bold;
    text-decoration: overline;
}

#nav_stock_box {
    margin-top: 10px;
    display: flex;
    overflow: hidden;
    justify-content: center;
   
}

@media only screen and (max-width: 500px) {
    #nav_stock_box {
        overflow-x: scroll;
    }

    button:hover {

        background-color: white;
    }
}
</style>