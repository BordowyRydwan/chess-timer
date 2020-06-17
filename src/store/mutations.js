export default {
  addTime(state, {player, time}){
    if(player === 1){
      state.timeLeft += time;
    }
    else if(player === 2){
      state.timeRight += time;
    }
    else{
      return;
    }
  },

  subtractTime(state, {player, time}){
    if(player === 1){
      state.timeLeft -= time;
    }
    else if(player === 2){
      state.timeRight -= time;
    }
    else{
      return;
    }
  },

  setTime(state, {player, time}){
    if(player === 1){
      state.timeLeft = time;
    }
    else if(player === 2){
      state.timeRight = time;
    }
    else{
      return;
    }
  },
  
  switchTurn(state){
      state.turnPlayer2 = state.turnPlayer1;
      state.turnPlayer1 = !state.turnPlayer1;
  }
}