export default{
  addTime({ commit }, {player, time}){
    commit('addTime', {player, time});
  },

  subtractTime({ commit }, {player, time}){
    commit('subtractTime', {player, time});
  },

  setTime({ commit }, {player, time}){
    commit('setTime', {player, time});
  },

  switchTurn({ commit }){
    commit('setTurn');
  }
}