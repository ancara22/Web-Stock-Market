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
    data() {
        return {
            news_api_key: "cmc3uq9r01qpbvb54f90cmc3uq9r01qpbvb54f9g",
            news_url: `https://finnhub.io/api/v1/news?category=${this.news_api_key}`, //General News
        }
    },

    computed: {
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