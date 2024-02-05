import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        currentPage: 'stock',       //Current page
        stockData: [],              //All Stocks Dataset
        newsData: [],               //All News Dataset
        sentimentsData: [],         //All news sentiments dataset
        stockPrediction: [],        //All stock prediction dataset

        //Content of the description page
        descrPage: {
            symbol: "",     //Stock symbol
            stock: [],      //Stock chart
            newsData: [],   //Stock news
            prediction: []  //Stock prediction

        }
    },

    mutations: {
        //Change the page
        changePage(state, newPage) {
            state.currentPage = newPage;
        },

        //Set stock dataset
        setStockData(state, newData) {
            state.stockData = newData;
        },

        //Set Stocks News Dataset
        setStockNews(state, newData) {
            state.newsData = newData;
        },

        //Set news sentiments dataset
        setNewsSentiments(state, newSentiments) {
            state.sentimentsData = newSentiments;
        },

        //Set stop prediction dataset
        setStockPrediction(state, newPredictions) {
            state.stockPrediction = newPredictions;
        },

        //Set Description page content
        setDescrPage(state, newStock) {
                state.descrPage.symbol = newStock.symbol;
                state.descrPage.stock = newStock;

                //Filter news by symbol
                state.descrPage.newsData = state.newsData.filter(news => {
                    return (news.symbol).toLowerCase() == (newStock.symbol).toLowerCase();
                });

                //Filter prediction by symbol
                state.descrPage.prediction = state.stockPrediction.filter(data => {
                    return (data.symbol).toLowerCase() == (newStock.symbol).toLowerCase();
                })[0];
        },

        //Update stock dataset trigered by modificsation of DynamoDb
        updateStockElement(state, newData) {
            const symbol = newData.symbol;
            const index = state.stockData.findIndex(element => element.symbol === symbol);
            
            //Update the value of the element in the array
            if (index !== -1) state.stockData[index] = newData;
            else state.stockData.push(newData);
        },

        //Update news dataset trigered by modificsation of DynamoDb
        updateStockNewsElement(state, newData) {
            const index = state.newsData.findIndex(element => element.title === newData.title);
            
            if (index == -1) state.stockData.push(newData);
        },
    },

    getters: {
        //Store getters
        getCurrentPage: state => state.currentPage,
        getStockData: state => state.stockData,
        getStockNewsAll: state => state.newsData,
        getDescrPageData: state => state.descrPage,
        getAllNewsSentiments: state => state.sentimentsData,
    
        //Get filtered sentiment by title
        getSentiment: state => title => {
            return state.sentimentsData.filter(sentiment => {
                return sentiment.title == title;
            })[0];
        },

        //Get all sentiments by symbol
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