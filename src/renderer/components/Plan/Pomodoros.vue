<template lang="pug">
  tr(v-bind:class="{isComplete: pomodoro.isComplete}" v-if="missionOfPomodoro" @click="modalOpen")
    td.index(v-bind:class="quadrantClass") {{ pomodoro.index }}
    td.name {{ missionOfPomodoro.name }}
    td.project
      b-tag(v-if="projectTag" type="is-primary") {{ projectTag }}
    td.pomodoros
      span.warning(aria-hidden="true" v-if="ordinalNumber > this.$store.state.Settings.user.maxPomodoros")
      span {{ordinalNumber}}/{{missionOfPomodoro.pomodoros}}
    td.quadrant {{ displayQuadrant }}
</template>

<script>
import _ from 'lodash'
export default {
  name: 'Pomodoros',
  data() {
    return {
      editingMission: {},
    }
  },
  props: ['pomodoro'],
  computed: {
    missionOfPomodoro() {
      return this.$store.getters['Datastore/parentMission'](this.pomodoro)
    },
    projectTag(mission) {
      return this.$store.getters['Datastore/projectTag'](
        this.$store.getters['Datastore/parentMission'](this.pomodoro)
      )
    },
    ordinalNumber() {
      return (
        _.findIndex(
          this.$store.getters['Datastore/brotherPomodoros'](this.pomodoro),
          {
            id: this.pomodoro.id,
          }
        ) + 1
      )
    },
    displayQuadrant() {
      if (this.missionOfPomodoro.quadrant === 0) {
        return '-'
      } else {
        return this.missionOfPomodoro.quadrant
      }
    },
    quadrantClass() {
      let missionOfPomodoro = this.$store.getters['Datastore/parentMission'](
        this.pomodoro
      )
      if (missionOfPomodoro) {
        return {
          isNoQs: missionOfPomodoro.quadrant === 0,
          isQs1: missionOfPomodoro.quadrant === 1,
          isQs2: missionOfPomodoro.quadrant === 2,
          isQs3: missionOfPomodoro.quadrant === 3,
          isQs4: missionOfPomodoro.quadrant === 4,
        }
      }
    },
  },
  methods: {
    modalOpen() {
      this.$emit('form-open', this.pomodoro)
    },
  },
}
</script>

<style lang="stylus" scoped>
  .isComplete
    color: grey
    .name
      text-decoration: line-through
  .isNoQs
    background: hsl(0, 0%, 96%)
  .isQs1
    background: hsl(348, 100%, 61%)
  .isQs2
    background: hsl(141, 71%, 48%)
  .isQs3
    background: hsl(48, 100%, 67%)
  .isQs4
    background: hsl(48, 100%, 67%)
  .modal-card-head, .modal-card-body
    padding-top: 10px
    padding-bottom: 10px
  .field.is-grouped
    margin-bottom: 0.25rem
  .modal-card-foot
    justify-content: flex-end
  .index
    text-align: right
  .name
    text-align: left
  .project
    text-align: left
  .pomodoros
    text-align: right
  .quadrant
    text-align: center
  .warning:before
    font-family: FontAwesome
    content: '\f071'
    margin-right: 0.2em
</style>
