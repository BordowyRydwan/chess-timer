<template>
  <button @click="toggleDarkMode" class="darkmode_switch">
    <img :src="require(`../assets/${imageName}`)" alt="GitHub">
  </button>
</template>

<script>
export default {
  name: 'DarkModeButton',
  props: {
    isDarkMode: Boolean,
  },
  methods: {
    toggleDarkMode: function () {
      this.$parent.isDarkMode = !this.$parent.isDarkMode;

      window.focus();
      
      if (document.activeElement) {
        document.activeElement.blur();
      }
    }
  },
  computed: {
    imageName: function () {
      if(this.isDarkMode === true){
        return 'lightmode_btn.png';
      }
      else{
        return 'darkmode_btn.png';
      }
    }
  },
}
</script>

<style lang="scss" scoped>
  button{
    width: 80px;
    height: 80px;

    position: fixed;
    top: 10px;
    left: 15px;

    box-shadow: 0;
    background: none;
    border: 0;

    cursor: pointer;
    transition-duration: .2s;

    &:hover{
      transform: scale(0.95);
    }
  }

  img{
    width: 80px;
    height: 80px;
  }

  @media (max-width: 800px){
    button, img{
      width: 50px;
      height: 50px;
    }
  }
</style>