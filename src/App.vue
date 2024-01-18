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
        this.socket = new WebSocket("wss://rcw5iur860.execute-api.us-east-1.amazonaws.com/production/");

        this.socket.onopen = (event) => {
            console.log('New user connected: ', event);
            this.socket.send(JSON.stringify({"action": "wsProvideData"}));
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
                    } else if(data.action == "INSERT") {
                        console.log('insert')
                    } else if(data.action == "UPDATE") {
                        console.log('update')
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

