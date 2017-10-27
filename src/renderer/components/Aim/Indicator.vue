<template lang="pug">
  .container.is-fluid.adjust-top-margin
    .columns.is-mobile
      .column.is-half
        .main-indicator.has-text-centered
          div(v-if='currentMission')
            p Now Aiming On
            p.title.is-marginless.is-one-line {{ currentMission.name }}
            Doughnut(:data="currentChartData")
            b-taglist.is-marginless(v-if='currentMission.tags')
              b-tag(v-for="tag in currentMission.tags" :key="tag.code" type="is-dark") {{ tag.name }}
            p.notes(v-if='currentMission.notes') {{ currentMission.notes }}
          div(v-else)
            p No Remaining Pomodoro
            p.title.is-marginless.is-invisible --
      .column.is-half
        .main-indicator.has-text-centered.is-fullheight
          div(v-if='allPomodoros.length && remainingPomodoros.length')
            p will Finish at
            p.title.is-marginless {{ remainingPomodorosDuration | secToTimeFromNow }}
            Doughnut(:data="dayChartData" v-if='remainingPomodoros.length')
            p.notes(v-if="dayNotes") {{ dayNotes }}
          div(v-else)
            p No Remaining Missions
            p.title.is-marginless.is-invisible --:--
            p.notes(v-if="dayNotes") {{ dayNotes }}
    .columns.is-mobile
      .column.is-one-third
        .sub-indicator.has-text-centered
          p Remaining
          p.title {{ remainingPomodoros.length }}
          p.subtitle {{ remainingPomodorosDuration | secToHM }}
      .column.is-one-third.centerd
        .sub-indicator.has-text-centered
          p Done
          p.title.is-3 {{ completePomodoros.length }}
          p.subtitle.is-pulled {{ completePomodorosDuration | secToHM }}
      .column.is-one-third
        .sub-indicator.has-text-centered
          p All
          p.title {{ allPomodoros.length }}
          p.subtitle {{ allPomodorosDuration | secToHM }}
</template>

<script>
import Doughnut from '@/components/Aim/Doughnut'
export default {
  name: 'Indicator',
  data() {
    return {
      dummyChartData: [
        {
          name: '',
          value: 1,
          color: 'lightgrey',
        },
      ],
    }
  },
  components: {
    Doughnut,
  },
  computed: {
    currentChartData() {
      return this.$store.getters['Datastore/currentChartData']
    },
    allPomodoros() {
      return this.$store.getters['Datastore/allPomodoros']
    },
    allPomodorosDuration() {
      let sec = this.$store.getters['Datastore/allPomodorosTime']
      return sec >= 0 ? sec : ''
    },
    completePomodoros() {
      return this.$store.getters['Datastore/completePomodoros']
    },
    completePomodorosDuration() {
      let sec = this.$store.getters['Datastore/completeTime']
      return sec >= 0 ? sec : ''
    },
    remainingPomodoros() {
      return this.$store.getters['Datastore/incompletePomodoros']
    },
    remainingPomodorosDuration() {
      let sec = this.$store.getters['Datastore/remainingTime']
      return sec >= 0 ? sec : ''
    },
    currentMission() {
      return this.$store.getters['Datastore/currentMission']
    },
    dayChartData() {
      return this.$store.getters['Datastore/dayChartData']
    },
    dayNotes() {
      return this.$store.state.Datastore.notes
    },
  },
}
</script>

<style lang="stylus" scoped>
  .adjust-top-margin
    margin-top: 1rem
  .notes
    text-align: left
    white-space: pre-wrap
  .is-one-line
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis
  .main-indicator
    height: 100%
    background-color: #eceff1
    border-radius: 3px
    padding: 0.5rem 1rem
    position: relative
  .sub-indicator
    height: 100%
    background-color: #cfd8dc
    border-radius: 3px
    padding: 0.5rem 1rem
    position: relative
  .is-invisible
    visibility: hidden
</style>
