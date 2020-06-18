<template>
  <div v-if="!isLandscape" :class="$parent.isDarkMode ? 'timer--no-landscape--dark' : 'timer--no-landscape'">
    <p>Switch your viewport into landscape</p>
    <p>Enjoy your play ;)</p>
  </div>
  <div class="timer" v-else>
    <button class="timer__switch" name="left" :disabled="turnPlayer1 || isPaused || !isStarted" @click="switchTurn()"></button>
    <button class="timer__switch" name="right" :disabled="turnPlayer2 || isPaused || !isStarted" @click="switchTurn()"></button>

    <div class="timer__counter-container">
      <p name="time_left">
        {{displayTimeLeft}} <span class="miliseconds">{{displayMsLeft}}</span>
      </p>
      <p name="time_right">
        {{displayTimeRight}} <span class="miliseconds">{{displayMsRight}}</span>
      </p>
    </div>
    <div class="timer__buttons">
      <button name="time_substract" @click="subtractMinute" :disabled="turnPlayer1 || turnPlayer2">-</button>
      <button name="time_add" @click="addMinute" :disabled="turnPlayer1 || turnPlayer2">+</button>
      <button name="pause" @click="handleStartButton" :class="isPaused ? 'paused' : ''">&#x23EF;</button>
      <button name="stop" @click="resetGame">&#x23F9;</button>
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
      intervalRight: null,
      isPaused: false,
      isStarted: false,
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth
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

    isLandscape: function () {
      return this.windowWidth > this.windowHeight;
    },

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
      'switchTurn',
      'resetTurns'
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
        time: MILISECONDS_IN_MINUTE / 2
      });

      this.addTime({
        player: 2,
        time: MILISECONDS_IN_MINUTE / 2
      });
    },

    subtractMinute: function () {
      if(this.timeLeft <= MILISECONDS_IN_MINUTE){
        this.setTime({
          player: 1,
          time: MILISECONDS_IN_MINUTE / 2
        });
      }
      else{
        this.subtractTime({
          player: 1,
          time: MILISECONDS_IN_MINUTE / 2
        });
      }

      if(this.timeRight <= MILISECONDS_IN_MINUTE){
        this.setTime({
          player: 2,
          time: MILISECONDS_IN_MINUTE / 2
        });
      }
      else{
        this.subtractTime({
          player: 2,
          time: MILISECONDS_IN_MINUTE / 2
        });
      }
    },

    resetGame: function () {
      clearInterval(this.intervalLeft);
      clearInterval(this.intervalRight);

      this.setTime({
        player: 1,
        time: 5 * MILISECONDS_IN_MINUTE
      });

      this.setTime({
        player: 2,
        time: 5 * MILISECONDS_IN_MINUTE
      });

      this.resetTurns();
      this.removeFocus();
      this.isPaused = false;
      this.isStarted = false;
    },

    handleStartButton: function (){
      if(this.turnPlayer1 === false && this.turnPlayer2 === false){
        this.switchTurn();
        this.isStarted = true;
      }
      else if((this.turnPlayer1 === true || this.turnPlayer2 === true) && this.isPaused === false){
        clearInterval(this.intervalLeft);
        clearInterval(this.intervalRight);

        this.isPaused = true;
      }
      else if((this.turnPlayer1 === true || this.turnPlayer2 === true) && this.isPaused === true){
        this.isPaused = false;

        if(this.turnPlayer1 === true && this.turnPlayer2 === false){
          this.intervalLeft = setInterval(() => {
            this.subtractTime({
              player: 1,
              time: 10
            })
          }, 10)
        }

        if(this.turnPlayer1 === false && this.turnPlayer2 === true){
          this.intervalRight = setInterval(() => {
            this.subtractTime({
              player: 2,
              time: 10
            })
          }, 10)
        }
      }
      else{
        clearInterval(this.intervalLeft);
        clearInterval(this.intervalRight);
      }

      this.removeFocus();
    },

    removeFocus: function(){
      window.focus();
      
      if (document.activeElement) {
        document.activeElement.blur();
      }
    }
  },

  watch: {
    turnPlayer1: function () {
      const button = document.querySelector('.timer__switch[name="left"]');

      if(this.turnPlayer1 === true){
        button.style.height = "10px";
        button.style.top = "-10px"

        clearInterval(this.intervalRight);

        this.intervalLeft = setInterval(() => {
          this.subtractTime({
            player: 1,
            time: 10
          })
        }, 10);
        }
      else{
        button.style.height = '40px';
        button.style.top = "-40px"
      }

    },

    turnPlayer2: function () {
      const button = document.querySelector('.timer__switch[name="right"]');

      if(this.turnPlayer2 === true){
        button.style.height = "10px";
        button.style.top = "-10px"

        clearInterval(this.intervalLeft);

        this.intervalRight = setInterval(() => {
          this.subtractTime({
            player: 2,
            time: 10
          })
        }, 10);
      }
      else{
        button.style.height = "40px";
        button.style.top = "-40px"
      }

    }
  },

  mounted: function() {
    document.addEventListener('keypress', e => {
      if(e.code === 'Space' && this.isPaused === false){
        this.switchTurn();
        this.isStarted = true;
      }
    });

    document.addEventListener('keypress', e => {
      if(e.code === 'Enter'){
        this.resetGame();
      }
    });

    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth;
      this.windowHeight = window.innerHeight;
    });
  }
}
</script>

<style lang="scss" scoped>

  .timer{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;

    width: 70vw;
    height: 45vh;

    background-color: #5B5B5B;
    position: relative;

    margin-top: 10vh;
  }

  .timer--no-landscape{
    text-align: center;

    p{
      margin: 5px;
      color: #313030;

      font-size: 4vw;
    }
  }

  .timer--no-landscape--dark{
    text-align: center;

    p{
      margin: 5px;
      color: #dbdbdb;

      font-size: 4vw;
    }
  }

  .timer__switch{
    width: 20%;
    height: 40px;

    background-color: #C70808;
    
    box-shadow: 0;
    border: 0;

    cursor: pointer;

    &:disabled{
      cursor: default; 
    }

    transition-duration: 0.1s;
  }

  .timer__switch[name="left"]{
    position: absolute;
    top: -40px;
    left: 10%;
  }

  .timer__switch[name="right"]{
    position: absolute;
    top: -40px;
    right: 10%;
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

      font-size: 4vw;
    }
  }

  .miliseconds{
    font-size: 1.5vw;
    text-decoration: underline;
    transform: translateY(-50%);
  }

  .timer__buttons{
    display: flex;
    flex-direction: row;
    justify-content: space-around;

    width: 90%;
    height: 20%;
    padding: 12px 0;

    background-color: #343434;

    button{
      box-shadow: 0;
      background-color: #A1A1A1;
      color: black;
      border: 0;

      width: 10%;
      height: 100%;

      font-size: 1.15rem;
      transition-duration: 0.1s;

      display: flex;
      align-items: center;
      justify-content: center;

      &:nth-child(1),
      &:nth-child(2){
        font-size: 1.5rem;
        font-weight: bold;
      }

      &:disabled{
        background-color: #636363;
        cursor: default;
      }

      cursor: pointer;
    }

    .paused{
      background-color: #d6c45e;
    }
  }

  @media (max-width: 800px){
    .timer{
      width: 85vw;
    }
  }
  
  @media (max-height: 500px){
    .timer{
      height: 55vh;
      margin-bottom: 20px;
    }
  }

  @media (max-height: 400px){
    .timer__buttons{
      padding: 6px 0;

      button{
        font-size: 0.8rem;

        &:nth-child(1),
        &:nth-child(2){
          font-size: 1.2rem;
        }
      }
    }  
  }
</style>