<template>
  <div id="app">
    <dark-mode-button />
    <h1>
      CHESS TIMER
    </h1>
    <h2>
      SPACE - switch between players, ENTER - finish game (checkmate, draw)
    </h2>

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

  height: 100%;
  min-height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
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
</style>
