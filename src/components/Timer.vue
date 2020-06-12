<template>
  <div class="timer">
    <div class="timer__counter-container">
      <p name="time_left">
        21:37:05
      </p>
      <p name="time_right">
        21:37:05
      </p>
    </div>
    <div class="timer__buttons">
      <button name="time_substract">-</button>
      <button name="time_add">+</button>
      <button name="pause">PAUSE</button>
      <button name="stop">STOP</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Timer',
  data(){
    return{
      timeLeft: 360,
      timeRight: 360
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