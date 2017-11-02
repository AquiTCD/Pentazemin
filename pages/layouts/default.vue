<template lang="pug">
  div
    navbar
    nuxt
    global-footer
</template>

<script>
import Navbar from '~/components/Navbar.vue'
import GlobalFooter from '~/components/Footer.vue'

export default {
  components: {
    Navbar,
    GlobalFooter,
  },
  methods: {
    path(url) {
      return this.$i18n.locale === 'en' ? url : '/' + this.$i18n.locale + url
    },
  },
}
</script>

<style lang="stylus">
@import '../css/variables.styl'
@import '../css/mixins.styl'
// :root
//   font-size: $font-size-root
//   +media-query(media-larger)
//     font-size: $font-size-root-pc
body
  font-family: $font-family-base
  font-feature-settings: 'pkna'
  word-wrap: break-word
  letter-spacing: $letter-spacing-base
  font-smoothing: subpixel-antialiased
  // vertical-rhythm: true
img // for missing image
  height: auto
  position: relative
  text-align: center
  max-width: 100%
  &:after
    overflow: hidden
    border: 1px dashed gray
    content: "\f1c5" attr(alt) " Image not found"
    font-size: 1rem
    font-family: FontAwesome
    color: darkgray
    position: absolute
    top: 0
    left: 0
    z-index: 2
    width: 100%
    height: 100%
    background-color: lightgray
</style>
