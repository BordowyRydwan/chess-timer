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
    if(state.turnPlayer1 === true){
      state.turnPlayer1 = false;
      state.turnPlayer2 = true;
    }
    else if(state.turnPlayer2 === true){
      state.turnPlayer2 = false;
      state.turnPlayer1 = true;
    }
    else{
      state.turnPlayer2 = false;
      state.turnPlayer1 = true;
    }
  },

  resetTurns(state){
    state.turnPlayer1 = false;
    state.turnPlayer2 = false;
  }
}