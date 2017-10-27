<template lang="pug">
  tr(v-bind:class="quadrantClass" v-if="missionOfArchive")
    td.name {{ missionOfArchive.name }}
    td.project
      b-tag(v-if="projectTag" type="is-primary") {{ projectTag }}
    td.pomodoros
      span.warning(aria-hidden="true" v-if="missionOfArchive.pomodoros > this.$store.state.Settings.user.maxPomodoros")
      span {{ mission.count }}/{{ missionOfArchive.pomodoros }}
    td.quadrant {{ displayQuadrant }}
</template>
<script>
export default {
  name: 'Missions',
  props: ['mission'],
  computed: {
    missionOfArchive(mission) {
      return this.$store.getters['Datastore/mission_by_id'](this.mission.id)
    },
    projectTag(archive) {
      return this.$store.getters['Datastore/projectTag'](this.missionOfArchive)
    },
    displayQuadrant() {
      if (this.missionOfArchive.quadrant === 0) {
        return '-'
      } else {
        return this.missionOfArchive.quadrant
      }
    },
    quadrantClass() {
      return {
        isNoQs: this.missionOfArchive.quadrant === 0,
        isQs1: this.missionOfArchive.quadrant === 1,
        isQs2: this.missionOfArchive.quadrant === 2,
        isQs3: this.missionOfArchive.quadrant === 3,
        isQs4: this.missionOfArchive.quadrant === 4,
      }
    },
  },
}
</script>

<style lang="stylus" scoped>
  .name
    text-align: left
  .project
    text-align: left
  .pomodoros
    text-align: right
    vertical-align: bottom
  .quadrant
    text-align: center
  .isNoQs
    background: hsl(0, 0%, 96%)
  .isQs1
    background: tint(hsl(348, 100%, 61%), 80%)
  .isQs2
    background: tint(hsl(141, 71%, 48%), 80%)
  .isQs3
    background: tint(hsl(48, 100%, 67%), 80%)
  .isQs4
    background: tint(hsl(48, 100%, 67%), 80%)
  .warning:before
    font-family: FontAwesome
    content: '\f071'
    margin-right: 0.2em
</style>
