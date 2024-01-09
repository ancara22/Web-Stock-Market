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

    computed: {
        page() {
            return this.$store.getters.getCurrentPage;
        }
    }
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
