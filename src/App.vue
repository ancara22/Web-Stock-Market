<template>
  <div id="app">
        <div id="pageLoader" v-if="isPageLoading"></div>
        <NavigationBar/>
        <HomePage v-if="page=='stock'"/>
        <NewsPage v-else-if="page=='news'"/>
        <StockDescriptopnPage v-else-if="page=='descr'"/>
  </div>
</template>

<script>
import NavigationBar from "./components/Navigation-Bar.vue";
import HomePage from "./components/Home-Page.vue";
import NewsPage from "./components/News-Page.vue";
import StockDescriptopnPage from "./components/Stock-Description.vue";
import '@fortawesome/fontawesome-free/css/all.css';

export default {
    name: 'App',
    components: {
        NavigationBar,
        HomePage,
        NewsPage,
        StockDescriptopnPage
    },

    data() {
        return {
            socket: null,
            isPageLoading: true
        }
    },

    computed: {
        //Get tge current page
        page() {
            return this.$store.getters.getCurrentPage;
        }
    },

    //Set the socket before component mounting
    beforeMount() {
        //Set the socket
        this.socket = new WebSocket("wss://8ddccgze1l.execute-api.us-east-1.amazonaws.com/production/");

        //Set the onopen event handler
        this.socket.onopen = (event) => {
            console.log('New user connected: ', event);
            this.socket.send(JSON.stringify({"action": "provideData"}));
        }

        //Set the on message event handler
        this.socket.onmessage = (event) => {
            if(event.data != "") {
                try {
                    //Set the acctions in dependence of type/action of received data
                    let data = JSON.parse(event.data);

                    if(data.action == "init-connection-stock") {
                        this.$store.commit('setStockData', data.stockData);
                    } else if (data.action == "init-connection-news") {
                        this.$store.commit('setStockNews', data.stockNews);
                    } else if(data.action == "init-connection-sentiment") {
                        this.$store.commit('setNewsSentiments', data.newsSentiment);
                    } else if(data.action == "init-connection-prediction") {
                        this.$store.commit('setStockPrediction', data.stockPrediction);
                    } else if(data.eventName == "INSERT" || data.eventName == "UPDATE") {
                        if(data.action == "update-stock-data") {
                            this.$store.commit('updateStockElement', data.data);
                        } else if(data.action == "update-stock-news") {
                            this.$store.commit('updateStockNewsElement', data.data);
                        }
                        console.log('insert')
                    } 

                    //Remove the loading screen
                    setTimeout(() => {
                        this.isPageLoading = false;
                    }, 500)

                } catch(err) {
                    console.log('Server Error: ', err)
                }
            }
        }

        //Set the on error event handler
        this.socket.onerror = function(event) {
            console.log('Error: ', event);
        }

        //Set the on close event handler
        this.socket.onclose = (event) => {
            console.log('WebSocket connection closed:', event);
        };
    },
}
</script>

<style>

body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin: 0 auto;
  overflow-x: hidden;
  min-width: 650px;
}

#app {
    background-color: rgb(239, 239, 239);
    width: 100%;
    min-height: 100vh;
    height: max-content;
}

#pageLoader {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("../public/loading-back2.png");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    background-color: white;
    z-index: 99999;
}

@media only screen and (max-width: 500px) {
  body {
    min-width: 300px;
    width: 100%;
  }
}
</style>

