<template lang="pug">
  .body
    navbar.menu
    router-view.main
    timer.timer
</template>

<script>
import Navbar from '@/components/Global/Navbar'
import Timer from '@/components/Global/Timer'
export default {
  name: 'App',
  components: {
    Navbar,
    Timer,
  },
}
</script>

<style lang="scss">
  $fa-font-path: "~font-awesome/fonts";
  // force desktop mode to disable mobile layout
  $desktop: 1px;
  // @import "~bulma/sass/utilities/_all";
  @import "~bulma";
  @import "~buefy/src/scss/buefy";
  @import "~font-awesome/scss/font-awesome.scss";
  @import '~vue-multiselect/dist/vue-multiselect.min.css';
</style>
<style lang="stylus">
  body::-webkit-scrollbar
    display: none
  .body
    min-height: 100vh
    display: flex
    flex-flow: column nowrap
  .menu
    width: 100vw
    z-index: 100
    position: fixed
    top: 0
    left: 0
  .main
    margin-top: 50px
    margin-bottom: 88px
    flex: 1
  .timer
    width: 100vw
    z-index: 100
    position: fixed
    bottom: 0
    left: 0
    height: 64px
    background: hsl(0, 0%, 4%)
</style>
