<template>
  <div id="app">
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
            socket: null
        }
    },

    computed: {
        page() {
            return this.$store.getters.getCurrentPage;
        }
    },

    beforeMount() {
        this.socket = new WebSocket("wss://8ddccgze1l.execute-api.us-east-1.amazonaws.com/production/");

        this.socket.onopen = (event) => {
            console.log('New user connected: ', event);
            this.socket.send(JSON.stringify({"action": "provideData"}));
        }

        this.socket.onmessage = (event) => {
            if(event.data != "") {
                try {
                    console.log('event', event)
                    let data = JSON.parse(event.data);

                    if(data.action == "init-connection-stock") {
                        this.$store.commit('setStockData', data.stockData);
                    } else if (data.action == "init-connection-news") {
                        this.$store.commit('setStockNews', data.stockNews);
                    } else if(data.action == "init-connection-sentiment") {
                        this.$store.commit('setNewsSentiments', data.newsSentiment);
                    } else if(data.eventName == "INSERT" || data.eventName == "UPDATE") {
                        if(data.action == "update-stock-data") {
                            this.$store.commit('updateStockElement', data.data);
                        } else if(data.action == "update-stock-news") {
                            this.$store.commit('updateStockNewsElement', data.data);
                        }
                        console.log('insert')
                    } 
        
                    console.log('Message from the server: ', data);

                } catch(err) {
                    console.log('Server Error: ', err)
                }
            }
            
        }

        this.socket.onerror = function(event) {
            console.log('Error: ', event);
        }

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

@media only screen and (max-width: 500px) {
  body {
    min-width: 300px;
    width: 100%;
  }
}
</style>

