<template lang="pug">
  section
    hero
    lead
    features
    voices
    info
</template>

<script>
import Hero from '~/components/Hero.vue'
import Lead from '~/components/Lead.vue'
import Features from '~/components/Features.vue'
import Voices from '~/components/Voices.vue'
import Info from '~/components/Info.vue'

export default {
  components: {
    Hero,
    Lead,
    Features,
    Voices,
    Info,
  },
}
</script>

<style lang="stylus" scoped>

</style>
