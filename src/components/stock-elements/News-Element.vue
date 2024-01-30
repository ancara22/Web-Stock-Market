<template>
    <div class="news" @click="openUrl()">
        <div class="image">
            <img :src="this.news.banner_image ? this.news.banner_image : './news_default.jpg'" alt="">
        </div>
        <div class="news-descr">
            <div class="title">{{ this.news.title }}</div>
            <div class="short_body">{{ this.news.summary }}</div>
        </div>
        <div class="sentiment-box">
            <div class="time_published"><span>Published:</span>{{ formatTime(this.news.time_published) }}</div>
            <span class="sentiment"> {{ this.sentiment }}</span>
            <div class="smile">
                <i :class="this.emodji"></i>
            </div>
        </div>
    </div>
</template>


<script>
import 'font-awesome/css/font-awesome.css';

export default {
    name: "NewsElement",

    props: {
        news: {
            type: Object
        }
    },

    mounted: function() {
        this.getSentiment();
    },

    data() {
        return {
            sentiment: '',
            emodji: '',
        }
    },
   
    methods: {
        openUrl: function() {
            window.open(this.news.url);
        },

        formatTime: function(date) {
            const year = date.substring(0, 4);
            const month = date.substring(4, 6);
            const day = date.substring(6, 8);
            const hour = date.substring(9, 11);
            const minute = date.substring(11, 13);
            const formattedDateTime = `${month}-${day}-${year} ${hour}:${minute}`;

            return formattedDateTime;
        },

        getSentiment() {
            this.sentiment = this.$store.getters.getSentiment(this.news.title).sentiment;

            if(this.sentiment  == "Negative") {
                this.emodji = 'fa-solid fa-face-frown back_red';
            } else if(this.sentiment  == "Positive") {
                this.emodji = 'fa fa-smile back_green';
            } else {
                this.emodji = 'fa-solid fa-face-meh back_gray';
            }


        }

    }
}
</script>


<style scoped>

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
    padding-right: 30px;
}

.news:hover {
    transform: scale(1.05);
    transition: all 0.1s ease-in;
}

.news .title {
    font-weight: bold;
    margin-bottom: 15px;
    text-align: justify;
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

.sentiment-box .smile i {
    font-size: 20px;
}

.short_body {
    font-size: 14px;
    color: rgb(113, 113, 113);
    text-align: justify;
}

.time_published {
        position: absolute;
        width: 200px;
        right: 360px;
        font-size: 14px;
        color: rgb(166, 166, 166);
}

.back_green {
    color: rgb(1, 212, 1);
}

.back_red {
    color: rgb(251, 32, 32);
}

.back_gray {
    color: rgb(169, 169, 169);
}

@media only screen and (max-width: 500px) {
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