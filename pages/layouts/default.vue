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
}
</script>

<style lang="stylus">
</style>
