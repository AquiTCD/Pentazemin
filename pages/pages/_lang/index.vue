<template lang="pug">
  section
    hero
    lead
    concepts
    features
    usage
    voices
    info
</template>

<script>
import Hero from '~/components/Hero.vue'
import Lead from '~/components/Lead.vue'
import Concepts from '~/components/Concepts.vue'
import Features from '~/components/Features.vue'
import Usage from '~/components/Usage.vue'
import Voices from '~/components/Voices.vue'
import Info from '~/components/Info.vue'

export default {
  components: {
    Hero,
    Lead,
    Concepts,
    Features,
    Usage,
    Voices,
    Info,
  },
}
</script>

<style lang="stylus" scoped>

</style>
