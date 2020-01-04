<template>
  <div id="app">
  <TicTacToe :property="property"/>
  </div>
</template>

<script>
import TicTacToe from "./components/TicTacToe";

export default {
  name: 'app',
  components: {
    TicTacToe
  },
  data() {
    return {
      property: {
        magnification: 1
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Noto Mono',sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
