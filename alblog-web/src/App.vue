<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import store from '@/vuex/store'
export default {
  name: 'app',
  store,
  created() {
    let that = this
    that.$STORE.set('author', 'falost@fedte')
  }
}
</script>

<style>
  #app {
    min-height: 100%;
  }
  .tac{
    text-align: center
  }
</style>
