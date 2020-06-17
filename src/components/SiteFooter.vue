<template>
  <footer>
    <div class="social-icons">
      <a href="https://github.com/BordowyRydwan">
        <img :src="require('../assets/gh.png')" alt="GitHub">
      </a>
      <a href="https://linkedin.com/dawid-wijata">
        <img :src="require('../assets/linkedin.png')" alt="LinkedIn">
      </a>
      <a href="https://dawidwijata.tech">
        <img :src="require('../assets/website.png')" alt="My website">
      </a>
    </div>
    <p>
      © 2020 Dawid Wijata | All rights reserved
    </p>
  </footer>
</template>

<script>
export default {
  name: 'SiteFooter',
}
</script>

<style lang="scss" scoped>
  footer{
    position: fixed;
    bottom: 0;
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;

    color: #3F3E3E;

    padding-bottom: 20px;
    font-size: 0.9rem;
  }

  .social-icons{
    display: flex;
    justify-content: space-between;
    
    img{
      height: 30px;
      margin: 0 15px;
      width: auto;

      transition-duration: 0.2s;

      &:hover{
        transform: translateY(-4px);
      }
    }
  }
</style>