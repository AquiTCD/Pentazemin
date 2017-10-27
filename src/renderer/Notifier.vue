<template lang="pug">
  .wrapper
    .fullscreenNotifier
      transition(name="dimmer")
        .dim.is-centered(v-if="dim")
          p.message Complete!
      transition(name="flasher")
        .flash.is-centered(v-if="flash")
          p.message
</template>

<script>
export default {
  name: 'Notifier',
  computed: {
    dim() {
      return this.$store.state.Notifiers.dimmer.isActive
    },
    flash() {
      return this.$store.state.Notifiers.flasher.isActive
    },
  },
}
</script>

<style lang="stylus">
  html
    background: transparent
    &::-webkit-scrollbar
      display: none
    font-family: 'Avenir Next', sans-serif
  html, body, .wrapper
    margin: 0
    padding: 0
    height: 100%
    width: 100%
  .fullscreenNotifier
    height: 100%
    width: 100%
    > div
      height: 100%
      width: 100%
    .message
      font-family: 'Avenir Next' sans-serif
      font-weight: bold
      font-size: 144px
      color: white
      text-shadow: #000000 2px 0,  #000000 -2px 0, #000000 0 -2px, #000000 0 2px, #000000 2px 2px , #000000 -2px 2px, #000000 2px -2px, #000000 -2px -2px, #000000 1px 2px,  #000000 -1px 2px, #000000 1px -2px, #000000 -1px -2px, #000000 2px 1px,  #000000 -2px 1px, #000000 2px -1px, #000000 -2px -1px
    .is-centered
      text-align: center
      justify-content: center
      align-items: center
      display: flex
    .dim
      background-color: rgba(0, 0, 0, 0.5)
    .flash
      background-color: rgba(255, 255, 255, 0.8)
  // setting of transitions
  // enter | during transison on
  // enter-active | at the 1F of start of transition on
  // enter-to | at the 1F of end of transition on
  // leave | during transison off
  // leave-active | at the 1F of start of transition off
  // leave-to | at the 1F of end of transition off
  .dimmer-enter-active, .dimmer-leave-active
    transition: opacity 1s
  .dimmer-enter, .dimmer-leave-to
    opacity: 0
  // .flasher-enter-active, .flasher-leave-active
  //   transition: opacity .1s
  .dimmer-enter, .dimmer-leave-to
    opacity: 0
</style>
