<template>
  <div id="app">
    <dark-mode-button :isDarkMode="isDarkMode" />
    <header>
      <h1>
        CHESS TIMER
      </h1>
      <h2>
        SPACE - switch between players, ENTER - finish game (checkmate, draw)
      </h2>
    </header>
    <timer />
    <site-footer />
  </div>
</template>

<script>
import Timer from './components/Timer';
import DarkModeButton from './components/DarkModeButton';
import SiteFooter from './components/SiteFooter';

export default {
  name: 'App',
  components: {
    Timer,
    DarkModeButton,
    SiteFooter
  },
  data(){
    return{
      isDarkMode: false,
    }
  },
  watch: {
    isDarkMode: function(){
      document.querySelector('h1').classList.toggle('h1--dark');
      document.querySelector('h2').classList.toggle('h2--dark');
      document.querySelector('#app').classList.toggle('app--dark');
      document.querySelector('footer').classList.toggle('footer--dark');
    }
  },
}
</script>

<style lang="scss">

@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;700&display=swap');

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: 'Poppins', sans-serif;

  height: 100vh;
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  transition-duration: 0.1s;
}

h1, h2{
  text-align: center;
}

h1{
  font-size: 3.5rem;
  margin-top: 20px;
}

h2{
  font-size: 0.9rem;
  margin-top: -15px;
  color: #6D6D6D;
  font-weight: normal;
}

.h1--dark{
  color: white;
  transition-duration: 0.2s;
}

.h2--dark{
  color: white;
  transition-duration: 0.2s;
}

.app--dark{
  background-color: rgb(49, 49, 49);
}

@media (max-height: 500px){
  footer{
    display: none;
  }

  h1{
    font-size: 2.5rem;
  }

  h2{
    font-size: 0.7rem;
  }
}

@media (max-width: 800px){
  h1{
    font-size: 2.5rem;
  }

  h2{
    display: none;
  }
}

@media (max-height: 300px){
  h1{
    visibility: hidden;
  }
}
</style>
