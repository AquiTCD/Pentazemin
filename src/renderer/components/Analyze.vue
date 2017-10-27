<template lang="pug">
  main
    table.table.is-narrow.is-fullwidth.table-layout
      thead
        tr
          th.name Archives Name
          th.project Project
          th.pomodoros P.s
          th.quadrant Q.
      tbody(v-if="!archives.length")
        tr
          td.placeholder(colspan="5") no archives
      archives(v-for="archive in archives" :archive="archive" :key="archive.id")
</template>

<script>
import Archives from '@/components/Analyze/Archives'
export default {
  name: 'Analyze',
  components: {
    Archives,
  },
  computed: {
    archives() {
      return this.$store.getters['Archives/allArchives']
    },
  },
}
</script>

<style lang="stylus" scoped>
  .table
    border-bottom: 2px solid lightgrey
  .container
    margin-top: 1rem
  .extra
    border-top: 1px solid lightgrey
  .placeholder
    text-align: center
    background: lightgrey
  .table-layout
    table-layout: fixed
    .index
      text-align: right
      width: 3em
    .name
      width: auto
    .project
      width: 25%
    .pomodoros
      text-align: right
      width: 5em
    .quadrant
      text-align: center
      width: 3em
</style>
