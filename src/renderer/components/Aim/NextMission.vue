<template lang="pug">
  .container.is-fluid(v-if='nextMission')
    b-panel.next-mission(:collapsible="isCollapsible" :open="false")
      strong(slot="header") Next: {{ nextMission.name }}
      b-taglist
        b-tag(v-for="tag in nextMissionTags" :key="tag.code" type="is-primary") {{ tag.name }}
      p.notes {{ nextMission.notes }}
</template>

<script>
export default {
  name: 'NextMission',
  data() {
    return {
      isCollapsible: true,
    }
  },
  computed: {
    nextMission() {
      return this.$store.getters['Datastore/nextMission']
    },
    nextMissionTags() {
      return this.$store.getters['Datastore/nextMission'].tags
    },
  },
}
</script>

<style lang="stylus" scoped>
  .container
    margin-top: 1.5rem
  .notes
    white-space: pre-wrap
</style>
