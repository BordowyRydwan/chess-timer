import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex);

const MILISECONDS_IN_MINUTE = 1000 * 60;

export default new Vuex.Store({
  state: {
    timeLeft: 5 * MILISECONDS_IN_MINUTE,
    timeRight: 5 * MILISECONDS_IN_MINUTE,
    turnPlayer1: false,
    turnPlayer2: false,
  },
  actions,
  mutations,
});