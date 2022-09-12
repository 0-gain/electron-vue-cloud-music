import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'
import playList from './modules/playList'
import user from './modules/user'


Vue.use(Vuex)

const store = new Vuex.Store({
    modules:{
        playList,
        user
    },
    getters
})

export default store