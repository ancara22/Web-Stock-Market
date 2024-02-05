<template>
    <div id="news-page-box">
        <NewsElement v-for="news in newsData" :news="news" :key="news.id"/>    
    </div>
</template>


<script>
import NewsElement from "./stock-elements/News-Element.vue"

export default {
    name: "NewsPage",
    components: {
        NewsElement
    },

    computed: {
        //Get news data from the store
        newsData() {
            return this.$store.getters.getStockNewsAll;
        }
    },

}
</script>


<style scoped>
#news-page-box {
    margin-top: 80px;
    width: 90%;
    margin: 0 auto;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
}

@media only screen and (max-width: 500px) {
    #news-page-box {
        width: 100%
    }
}
</style>