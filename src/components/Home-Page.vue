<template>
    <div>
        <div id="content">
            <div id="left-box" >
                <div class="titles">
                    <h3>Top Day Moves</h3>
                    <div>
                        <span>Open</span>
                        <span>Volume</span>
                        <span>Price</span>
                    </div>
                </div>
                <div id="stock-box"  >
                    <StockElement class="stock-element" v-for="stock in stockData" :stock="stock" v-bind:key="stock.symbol"/>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import StockElement from "./stock-elements/Stock-Element.vue";

export default {
    name: "HomePage",

    components: {
        StockElement,
    },

    computed: {
        stockData() {
            let data = this.$store.getters.getStockData;
            
            return data;
        }
    }
}

</script>

<style>

#content {
    margin-top: 50px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;  
}

#left-box {
    background-color: white;
    height: 75vh;
    width: 90%;
    border-radius: 10px;
    min-width: 1070px;
    margin-bottom: 50px;
    overflow-y: scroll;
}

#rigth-box {
    height: 75vh;
    width: 40%;
    margin-left: 20px;
}

#stock-box {
    padding-top: 120px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    
}

.stock-element {
    cursor: pointer;
}

.stock-element:hover {
    background-color: rgb(255, 247, 235);
}

.titles {
    border-bottom: 1px solid rgb(234, 234, 234);
    width: inherit;
    min-width: inherit;
    position: absolute;
    background-color: white;
    border-radius: 10px;
}

.titles h3 {
    margin: 50px 0px 10px 20px;
    text-align: left;
    padding-left: 70px;
}

.titles div {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
   
}

.titles div span {
    width: 16.5%;
    margin-right: 4%;
    color: rgb(144, 144, 144);
    font-size: 14px;
}

@media only screen and (max-width: 500px) {
    #left-box {
        width: 100%;
        border-radius: 0;
        min-width: 100%;
        overflow-y: scroll;
    }
   
    .titles h3 {
        margin: 50px 0px 10px 0px;
    }


}
</style>