<template>
  <div id="app">
    <Navbar />
    <div class="container">
      <router-view/>
    </div>

  </div>
</template>

<script>
  import Navbar from '@/components/Navbar'
  export default {
      components: {
          Navbar
      },
      // data () => {
      //
      // }
  }
</script>

<style lang="scss">
@import "~materialize-css/dist/css/materialize.min.css";

#app {
  //font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}


  @media only screen and (min-width: 768px) {
    .container { width: 750px; }
  }

  @media only screen and (min-width: 993px) {
    .container { width: 980px; }
  }

  @media only screen and (min-width: 1201px) {
    .container { width: 1180px; }
  }

</style>
