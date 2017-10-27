<template lang="pug">
  main
    indicator
    next-mission
</template>

<script>
import Indicator from '@/components/Aim/Indicator'
import NextMission from '@/components/Aim/NextMission'
export default {
  name: 'Aim',
  components: {
    Indicator,
    NextMission,
  },
}
</script>

<style lang="stylus" scoped>
</style>
