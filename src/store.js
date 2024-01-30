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
        stockPrediction: [],

        descrPage: {
            symbol: "",
            stock: [],
            newsData: [],
            prediction: []

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

        setStockPrediction(state, newPredictions) {
            state.stockPrediction = newPredictions;
        },

        setDescrPage(state, newStock) {
                state.descrPage.symbol = newStock.symbol;
                state.descrPage.stock = newStock;

                state.descrPage.newsData = state.newsData.filter(news => {
                    return (news.symbol).toLowerCase() == (newStock.symbol).toLowerCase();
                });

                state.descrPage.prediction = state.stockPrediction.filter(data => {
                    return (data.symbol).toLowerCase() == (newStock.symbol).toLowerCase();
                })[0];
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
        getAllNewsSentiments: state => state.sentimentsData,
    
        getSentiment: state => title => {
            return state.sentimentsData.filter(sentiment => {
                return sentiment.title == title;
            })[0];
        },

        getAllSymbolSentiment: state => symbol => {
            let news = state.newsData.filter(news => {
                return news.symbol.toLowerCase() == symbol.toLowerCase();
            });

            let sentimentArray = [];

            news.forEach(element => {
                let sentiment = state.sentimentsData.filter(sentiment => {
                    return sentiment.title == element.title;
                })[0];

                sentimentArray.push(sentiment);
            })

                return sentimentArray;
               
        },

        
    }
});