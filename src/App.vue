<template>
  <div id="app">
        <NavigationBar v-on:changePage="handleChangePage"/>
        <HomePage v-if="page=='stock'"/>
        <NewsPage v-else-if="page=='news'"/>

      
  </div>
</template>

<script>
import NavigationBar from "./components/NavigationBar.vue";
import HomePage from "./components/HomePage.vue";
import NewsPage from "./components/NewsPage.vue";

import '@fortawesome/fontawesome-free/css/all.css';


export default {
    name: 'App',
    components: {
        NavigationBar,
        HomePage,
        NewsPage
    },

    data() {
        return {
            page: 'stock',
            //stockNewsList: [],
         
        }
    },

    mounted: function() {

    },

    methods: {
        handleChangePage: function(newPage) {
            this.page = newPage;
        },
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
