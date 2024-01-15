import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import newsJson from "./assets/news.json";
import stockJson from './assets/data.json';

export default new Vuex.Store({
    state: {
        currentPage: 'stock',
        stockData: [],
        newsData: [],

        descrPage: {
            id: 1,
            chartData: stockJson[0],
            newsData: newsJson

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

        setDescrPage(state, newId) {
            let result = state.stockData.filter(item => {
                return item.descr.id == newId;
            });

            if(result.length == 1) {
                
                state.descrPage = {
                    id: result[0].id,
                    chartData: result[0],
                    newsData: newsJson

                }
            } else {
                state.descrPage = {
                    id: "Undefined",
                    chartData: {},
                    newsData: {}

                }
            }
            
            
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