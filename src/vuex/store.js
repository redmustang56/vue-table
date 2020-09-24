import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        users: [],
        searchValue: ''
    },
    mutations: {
        SET_USERS: (state, users) => {
            state.users = users
        },
        SET_SEARCH_VALUE: (state, value) => {
            state.searchValue = value
        }
    },
    actions: {
        GET_USERS({commit}) {
            return axios('http://www.filltext.com/?rows=1000&fullname=%7BfirstName%7D~%7BlastName%7D&uname=%7Busername%7D&company=%7Bbusiness%7D&email=%7Bemail%7D&address=%7BaddressObject%7D', {
                method: 'GET'
            })
                .then((users) => {
                    commit('SET_USERS', users.data)
                })
                .catch((error) => {
                    console.log(error)
                    return error
                })
        },
        GET_SEARCH_VALUE({commit}, value) {
            commit('SET_SEARCH_VALUE', value)
        }
    },
    getters: {
        USERS(state) {
            return state.users
        },
        SEARCH_VALUE(state) {
            return state.searchValue
        },
    },
});

export default store;