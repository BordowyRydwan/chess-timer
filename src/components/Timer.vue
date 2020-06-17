<template>
  <div class="timer">
    <button class="timer__switch" name="left"></button>
    <button class="timer__switch" name="right"></button>

    <div class="timer__counter-container">
      <p name="time_left">
        {{displayTimeLeft}} <span class="miliseconds">{{displayMsLeft}}</span>
      </p>
      <p name="time_right">
        {{displayTimeRight}} <span class="miliseconds">{{displayMsRight}}</span>
      </p>
    </div>
    <div class="timer__buttons">
      <button name="time_substract" @click="subtractMinute">-</button>
      <button name="time_add" @click="addMinute">+</button>
      <button name="pause" @click="handleStartButton">⏯︎</button>
      <button name="stop" @click="resetGame">⏹︎</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

const MILISECONDS_IN_HOUR = 1000 * 60 * 60;
const MILISECONDS_IN_MINUTE = 1000 * 60;
const MILISECONDS_IN_SECOND = 1000;

export default {
  name: 'Timer',
  data(){
    return{
      intervalLeft: null,
      intervalRight: null
    }
  },
  computed: {
    ...mapState(
      [
        'timeLeft',
        'timeRight',
        'turnPlayer1',
        'turnPlayer2',
      ]
    ),

    displayTimeLeft: function () {
      return this.timeFromMiliseconds(this.timeLeft).time;
    },

    displayMsLeft: function () {
      return this.timeFromMiliseconds(this.timeLeft).ms;
    },

    displayTimeRight: function () {
      return this.timeFromMiliseconds(this.timeRight).time;
    },

    displayMsRight: function () {
      return this.timeFromMiliseconds(this.timeRight).ms;
    } 
  },
  methods: {
    
    ...mapActions([
      'addTime',
      'subtractTime',
      'setTime',
      'switchTurn'
    ]),

    timeFromMiliseconds: function (totalMiliseconds) {
      const hours = this.fillString(Math.floor(totalMiliseconds / MILISECONDS_IN_HOUR), 2);
      const minutes = this.fillString(Math.floor(totalMiliseconds / MILISECONDS_IN_MINUTE) % 60, 2);
      const seconds = this.fillString(Math.floor(totalMiliseconds / MILISECONDS_IN_SECOND) % 60, 2);
      const miliseconds = this.fillString(totalMiliseconds % 1000, 3);

      return {
        time: `${hours}:${minutes}:${seconds}`,
        ms: miliseconds
      };
    },

    fillString: function (num, size) { 
      const diff = size - num.toString().length;

      if(diff >= 0){
        return '0'.repeat(diff) + num;
      }
      else {
        throw new Error('Size has to be greater or equal to num');

      }
    },

    addMinute: function () {
      this.addTime({
        player: 1,
        time: MILISECONDS_IN_MINUTE
      });

      this.addTime({
        player: 2,
        time: MILISECONDS_IN_MINUTE
      });
    },

    subtractMinute: function () {
      if(this.timeLeft <= MILISECONDS_IN_MINUTE){
        this.setTime({
          player: 1,
          time: 0
        });
      }
      else{
        this.subtractTime({
          player: 1,
          time: MILISECONDS_IN_MINUTE
        });
      }

      if(this.timeRight <= MILISECONDS_IN_MINUTE){
        this.setTime({
          player: 2,
          time: 0
        });
      }
      else{
        this.subtractTime({
          player: 2,
          time: MILISECONDS_IN_MINUTE
        });
      }
    },

    resetGame: function () {
      this.setTime({
        player: 1,
        time: 5 * MILISECONDS_IN_MINUTE
      });

      this.setTime({
        player: 2,
        time: 5 * MILISECONDS_IN_MINUTE
      });
    },

    handleStartButton: function (){
      if(this.turnPlayer1 === false && this.turnPlayer2 === false){
        this.intervalLeft = setInterval(() => {
          this.setTime(1, this.timeLeft - 10)
        }, 10)
      }
    }
  },

  watch: {
    turnPlayer1: function () {
      const button = document.querySelector('.timer__switch[name="left"]');

      if(this.turnPlayer1 === true){
        button.style.top = "-20px";
      }
      else{
        button.style.top = "-50px";
      }
    },
    turnPlayer2: function () {
      const button = document.querySelector('.timer__switch[name="right"]');

      if(this.turnPlayer2 === true){
        button.style.top = "-20px";
      }
      else{
        button.style.top = "-50px";
      }
    }
  }
}
</script>

<style lang="scss" scoped>

  .timer{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;

    width: 65vw;
    height: 45vh;

    background-color: #5B5B5B;
    position: relative;

    margin-top: 18vh;
  }

  .timer__switch[name="left"]{
    width: 20%;
    height: 100px;

    background-color: #C70808;

    position: absolute;
    top: -50px;
    left: 10%;

    z-index: -1;
  }

  .timer__switch[name="right"]{
    width: 20%;
    height: 100px;

    background-color: #C70808;

    position: absolute;
    top: -50px;
    right: 10%;

    z-index: -1;
  }

  .timer__counter-container{
    display: flex;
    justify-content: space-between;
    width: 90%;
    height: 60%;

    color: white;

    p{
      background-color: #343434;
      width: 40%;

      display: flex;
      justify-content: center;
      align-items: center;

      font-size: 3rem;
    }
  }

  .miliseconds{
    font-size: 0.8rem;
    text-decoration: underline;
    transform: translateY(-50%);
  }

  .timer__buttons{
    display: flex;
    flex-direction: row;
    justify-content: space-around;

    width: 90%;
    height: 20%;
    padding: 15px 0;

    background-color: #343434;

    button{
      box-shadow: 0;
      background-color: #A1A1A1;
      color: black;
      border: 0;

      width: 10%;
      height: 100%;

      font-size: 1.15rem;

      display: flex;
      align-items: center;
      justify-content: center;

      &:nth-child(1),
      &:nth-child(2){
        font-size: 1.5rem;
      }
    }
  }
  

</style>