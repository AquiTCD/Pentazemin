<template lang="pug">
  .timerIndicator
    .timerButton(v-if="isPomodoroRemaining")
      .div(v-if="!timer.isCounting")
        a.button.is-large.is-black(@click="startTimer")
          b-icon(icon="play-circle" size="is-large")
      .div(v-else)
        a.button.is-large.is-black(@click="stopTimer")
          b-icon(icon="pause-circle" size="is-large")
    .timerDisplay(v-if="isPomodoroRemaining")
      span.remainingSeconds.is-size-3.has-text-white {{ time | secToMMSS }}
      span.currentMissionName.has-text-light.is-size-5(v-if="currentMission") {{ currentMission.name }}
      .timerControl
        a.button.is-medium.is-black.extend-timer(@click="extendTimer")
          b-icon(icon="plus-circle" size="is-medium")
        a.button.is-medium.is-black.force-complete-timer(@click="forceCompleteTimer")
          b-icon(icon="check-circle" size="is-medium")
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'Timer',
  computed: {
    isPomodoroRemaining() {
      return this.$store.getters['Datastore/incompletePomodoros'].length
    },
    currentMission() {
      return this.$store.getters['Datastore/currentMission']
    },
    timer() {
      return this.$store.state.Datastore.timer
    },
    time() {
      if (this.$store.getters['Datastore/currentMission'] != null) {
        let sec = this.$store.getters['Datastore/currentMission'].remainingSec
        if (Number.isInteger(sec) && sec >= 0) {
          return sec
        }
      }
    },
  },
  methods: {
    ...mapActions({
      startTimer: 'Datastore/START_TIMER',
      stopTimer: 'Datastore/STOP_TIMER',
      extendTimer: 'Datastore/EXTEND_TIMER',
      forceCompleteTimer: 'Datastore/FORCE_COMPLETE_TIMER',
    }),
  },
}
</script>

<style lang="stylus" scoped>
  .timerIndicator
    padding: 5px 8px
  .timerButton
    float: left
    margin-right: 8px
  .remainingSeconds
    margin-right: 8px
    font-family: Menlo, Courier, monospace;
    font-weight: bold
  .currentMissionName
    padding-left: 8px
    border-left: 1px solid white
  .timerControl
    float: right
</style>
