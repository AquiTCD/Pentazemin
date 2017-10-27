<template lang="pug">
  main
    table.table.is-striped.is-narrow.is-fullwidth.table-layout
      thead
        tr
          th.index #
          th.name Name
          th.project Project
          th.pomodoros P.s
          th.quadrant Q.
      tbody(v-if="!pomodoros.length && !extras.length")
        tr
          td.placeholder(colspan="5") Add your missions
      draggable(v-model="pomodoros" :element="'tbody'")
        pomodoro(v-for="pomodoro in pomodoros" :pomodoro="pomodoro" :key="pomodoro.id" @form-open='formOpen')
      tbody.extra
        extra(v-for="extra in extras" :extra="extra" :key="extra.id")
    .container.is-fluid
      notes
    edit-form(:form="form" :pomodoro="selectedPomodoro" @form-close='formClose' v-if="form.isOpen")
</template>

<script>
import Pomodoro from '@/components/Plan/Pomodoros'
import Extra from '@/components/Plan/Extras'
import EditForm from '@/components/Plan/EditForm'
import Notes from '@/components/Plan/Notes'
import draggable from 'vuedraggable'
export default {
  name: 'Plan',
  data() {
    return {
      form: {
        isOpen: false,
      },
      selectedPomodoro: null,
    }
  },
  components: {
    Pomodoro,
    Extra,
    EditForm,
    Notes,
    draggable,
  },
  computed: {
    pomodoros: {
      get() {
        return this.$store.getters['Datastore/allPomodoros']
      },
      set(value) {
        this.$store.dispatch('Datastore/UPDATE_POMODOROS_ORDER', value)
      },
    },
    extras() {
      return this.$store.getters['Datastore/allExtras']
    },
  },
  methods: {
    formOpen(pomodoro) {
      this.selectedPomodoro = pomodoro
      this.form.isOpen = true
    },
    formClose() {
      this.form.isOpen = false
    },
  },
}
</script>
<style lang="stylus">
  .is-checked
    color: grey
    td[data-label="Name"]
      text-decoration: line-through
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
