<template>
    <div id="news-page-box">
        <div class="news" v-for="news in newsData" :key="news.id" @click="openUrl(news.url)">
            <div class="image">
                <img :src="news.image" alt="">
            </div>
            <div class="news-descr">
                <div class="title">{{ news.headline }}</div>
                <div class="short_body">{{ news.summary }}</div>
            </div>
            <div class="sentiment-box">
                <span class="sentiment">POSITIVE</span>
                <div class="smile">
                    <i class="fa fa-smile"></i>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import newsJson from "../news.json";
import 'font-awesome/css/font-awesome.css';


export default {
    name: "NewsPage",
    components: {
    },
    data() {
        return {
            news_api_key: "cmc3uq9r01qpbvb54f90cmc3uq9r01qpbvb54f9g",
            news_url: `https://finnhub.io/api/v1/news?category=${this.news_api_key}`, //General News

            newsData: newsJson,
        }
    },

    methods: {
        openUrl: function(url) {
            console.log('first', url)
                window.open(url);
        }
    }
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

.news-descr {
    background-color: none;
    text-align: left;
    padding-left: 30px;
    width: 550px;
}

.news {
    display: flex;
    justify-content: center;
    padding: 20px;
    background-color: white;
    margin: 10px;
    border-radius: 5px;
    width: 1000px;
    cursor: pointer;
    position: relative;
}

.news:hover {
    transform: scale(1.05);
    transition: all 0.1s ease-in;
}

.news .title {
    font-weight: bold;
    margin-bottom: 15px;
}
.image {
    width: 400px;
}

.image img {
    width: inherit;
}

.sentiment-box {
    position: absolute;
    bottom: 20px;
    right: 40px;
}
.sentiment-box .sentiment {
    margin-right: 20px;
}

.sentiment-box .sentiment {
    color: rgb(169, 169, 169);
    font-size: 12px;
    align-items: center;
    display: flex;
}

.sentiment-box {
    display: flex;
}

.sentiment-box .smile {
    font-size: 20px;
    color: rgb(1, 212, 1);
}

.short_body {
    font-size: 14px;
    color: rgb(113, 113, 113);
}

@media only screen and (max-width: 500px) {
    #news-page-box {
        width: 100%
    }

    .news {
        flex-direction: column;
        width: 96%;
        padding: 2%;

    }

    .image {
        width: 100%;
    }

    .news-descr {
        text-align: justify;
        width: 96%;
        padding: 2%;
        margin: 0;
    }

    .short_body {
        margin-bottom: 30px;
    }

    .news:hover {
        transform: none;
    }
}
</style>