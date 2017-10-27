<template lang="pug">
  main
    about
    settings
</template>

<script>
import About from '@/components/Info/About'
import Settings from '@/components/Info/Settings'

export default {
  name: 'Info',
  components: { About, Settings },
}
</script>

<style scoped>
</style>
