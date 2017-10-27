<template lang="pug">
  tbody(v-if="archive")
    tr
      td.day(colspan="4")
        span.date {{ archive.date | dateTimeToDate }}
        span.separator |
        span.duration {{archiveDuration | secToHM }}
        span.separator |
        span.pomodoros {{archivePomodoros}}
        span p.s
    tr(v-if="archive.notes")
      td.notes(colspan="4") {{ archive.notes }}
    missions(v-for="mission in archive.missions" :mission="mission" :key="mission.id")
</template>

<script>
import Missions from '@/components/Analyze/Missions'
export default {
  name: 'Archives',
  props: ['archive'],
  components: {
    Missions,
  },
  computed: {
    archivePomodoros() {
      let count = 0
      for (let m of this.archive.missions) {
        count += m.count
      }
      return count
    },
    archiveDuration() {
      let count = this.archivePomodoros
      let settings = this.$store.state.Settings.user
      let result = 0
      if (count) {
        result =
          settings.pomodoroMin * 60 * count +
          settings.shortBreakMin * 60 * (count - 1) +
          (settings.longBreakMin - settings.shortBreakMin) *
            60 *
            Math.floor((count - 1) / settings.longBreakPoint)
      }
      return result
    },
  },
}
</script>

<style lang="stylus" scoped>
  .day
    margin-left: 2em
    background: #e0e0e0
  .date
    font-size: 1.2em
    font-weight: bold
  .duration
    font-size: 1.2em
    font-weight: bold
  .pomodoros
    font-size: 1.2em
    font-weight: bold
  .separator
    margin-left: 1em
    margin-right: 1em
  .notes
    background: #eeeeee
    margin-left: 2em
    white-space: pre-wrap
</style>
