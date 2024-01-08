<template>
    <div>
        <div id="content">
            <div id="left-box">
                <div class="titles">
                    <h3>Top Day Moves</h3>
                    <div>
                        <span>Day</span>
                        <span>Price</span>
                    </div>
                </div>
                <div id="stock-box">
                    <StockElement v-for="stock in stocksDataArray" :chart="stock.chart" :descr="stock.descr" v-bind:key="stock.descr.id"/>
                </div>
            </div>
            <div id="rigth-box">
                <div id="sentiment-box"></div>
                <div id="news-box"></div>
            </div>
        </div>
    </div>
</template>


<script>
import StockElement from "./stock-elements/StockElement.vue";
import stockJson from '../data.json';

export default {
    name: "HomePage",

    mounted: function() {
        console.log('homePage', this.stocksDataArray)
    },
    
    data() {
        return {
            stocksDataArray: stockJson
        } 
    },

    components: {
        StockElement,
    },
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
    width: 50%;
    border-radius: 10px;
    min-width: 600px;
    margin-bottom: 50px;
    overflow-y: scroll;
}

#rigth-box {
    height: 75vh;
    width: 40%;
    margin-left: 20px;
}

#sentiment-box {
    border-radius: 10px;
    background-color: white;
    width: 100%;
    height: 15vh;
}

#news-box {
    margin-top: 2vh;
    border-radius: 10px;
    background-color: white;
    width: 100%;
    height: 58vh;
}

#stock-box {
    padding-top: 120px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    
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
    padding-left: 40px;
}

.titles div {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
}

.titles div span {
    margin-right: 15%;
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