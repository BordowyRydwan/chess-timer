<template>
  <button>
    <img :src="require('../assets/darkmode_btn.png')" alt="GitHub">
  </button>
</template>

<script>
export default {
  name: 'DarkModeButton',
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
  }

  img{
    width: 80px;
    height: 80px;
  }
</style>