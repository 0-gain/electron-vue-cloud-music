import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'
import playList from './modules/playList'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules:{
        playList
    },
    getters
})

export default store