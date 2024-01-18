import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

//import newsJson from "./assets/news.json";
//import stockJson from './assets/data.json';

export default new Vuex.Store({
    state: {
        currentPage: 'stock',
        stockData: [],
        newsData: [],

        descrPage: {
            symbol: "",
            stock: [],
            newsData: []

        }
    },

    mutations: {
        changePage(state, newPage) {
            state.currentPage = newPage;
        },

        setStockData(state, newData) {
            state.stockData = newData;
        },

        setStockNews(state, newData) {
            state.newsData = newData;
        },

        setDescrPage(state, newStock) {
                state.descrPage.symbol = newStock.symbol;
                state.descrPage.stock = newStock;

                state.descrPage.newsData = state.newsData.filter(news => {
                    return news.symbol == newStock.symbol;
                });

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