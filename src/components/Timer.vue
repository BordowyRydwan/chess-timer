<template>
  <div class="timer">
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
      <button name="pause">⏯︎</button>
      <button name="stop">⏹︎</button>
    </div>
  </div>
</template>

<script>
const MILISECONDS_IN_HOUR = 1000 * 60 * 60;
const MILISECONDS_IN_MINUTE = 1000 * 60;
const MILISECONDS_IN_SECOND = 1000;

export default {
  name: 'Timer',
  data(){
    return{
      timeLeft: 300000,
      timeRight: 300000,
      turn: 0,
    }
  },
  computed: {
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
      this.timeLeft += MILISECONDS_IN_MINUTE;
      this.timeRight += MILISECONDS_IN_MINUTE;
    },

    subtractMinute: function () {
      if(this.timeLeft <= MILISECONDS_IN_MINUTE){
        this.timeLeft = 0;
      }
      else{
        this.timeLeft -= MILISECONDS_IN_MINUTE;
      }

      if(this.timeRight <= MILISECONDS_IN_MINUTE){
        this.timeRight = 0;
      }
      else{
        this.timeRight -= MILISECONDS_IN_MINUTE;
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

    &::before{
      content: '';
      width: 20%;
      height: 100px;

      background-color: #C70808;

      position: absolute;
      top: -50px;
      left: 10%;

      z-index: -1;
    }

    &::after{
      content: '';
      width: 20%;
      height: 100px;

      background-color: #C70808;

      position: absolute;
      top: -50px;
      right: 10%;

      z-index: -1;
    }
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