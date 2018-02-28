<template>
  <div id="app">
    <!--<v-banner></v-banner>-->
    <router-view></router-view>
  </div>
</template>

<script>
  import banner from './components/common/banner'
  export default {
    name: 'app',
    data() {
      return {

      };
    },
    components: {
      'v-banner':banner
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin: 0;
  }
  *{
    margin:0;
    padding:0;
  }
  a:link,a:hover,a:visited{
    text-decoration: none;
  }


  html{
    height: 100%;
  }
  body{
    margin: 0;
    height: 100%;
  }
  textarea{
    /*border: 1px solid #000;*/
    resize:none;
  }



</style>
