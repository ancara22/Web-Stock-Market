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
        sentimentsData: [],

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

        setNewsSentiments(state, newSentiments) {
            state.sentimentsData = newSentiments;
        },

        setDescrPage(state, newStock) {
                state.descrPage.symbol = newStock.symbol;
                state.descrPage.stock = newStock;

                state.descrPage.newsData = state.newsData.filter(news => {
                    return news.symbol == newStock.symbol;
                });
        },

        updateStockElement(state, newData) {
            const symbol = newData.symbol;
            const index = state.stockData.findIndex(element => element.symbol === symbol);
            
            if (index !== -1) {
                //Update the value of the element in the array
                state.stockData[index] = newData;
            } else {
                state.stockData.push(newData);
            }
        },

        updateStockNewsElement(state, newData) {
            const index = state.newsData.findIndex(element => element.title === newData.title);
            
            if (index == -1) {
                state.stockData.push(newData);
            }
        },


    },

    actions: {

    },

    getters: {
        getCurrentPage: state => state.currentPage,
        getStockData: state => state.stockData,
        getStockNewsAll: state => state.newsData,
        getDescrPageData: state => state.descrPage,
        getAllNewsSentiments: state => state.sentimentsData
    }
});