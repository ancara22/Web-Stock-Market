import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import newsJson from "./assets/news.json";
import stockJson from './assets/data.json';

export default new Vuex.Store({
    state: {
        currentPage: 'stock',
        stockData: stockJson,
        newsData: newsJson,

        descrPage: {
            id: 1,
            chartData: stockJson[0],
            newsData: newsJson

        }
    },

    mutations: {
        changePage(state, newPage) {
            state.currentPage = newPage;
        }
    },

    actions: {

    },

    getters: {
        getCurrentPage: state => state.currentPage,
        getStockData: state => state.stockData,
        getStockNewsAll: state => state.newsData,
        getDescrPageData: state => state.descrPage,
    }
});