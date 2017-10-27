<template lang="pug">
  .control(@keyup.esc="modalClose")
    button.is-half.button.is-outlined(@click="modalOpen")
      b-icon(icon="check-square")
    .modal(v-bind:class="{ 'is-active': this.isActive }" @keyup.ctrl.enter="createMission")
      .modal-background(@click="modalClose")
      .modal-card
        header.modal-card-head
          p.modal-card-title Archive
          button.delete(aria-label='close' @click="modalClose")
        section.modal-card-body
          .columns.is-mobile
            .column.is-half.is-narrow
              p.subTitile.is-center Select Archive Date
                b-datepicker.picker(v-model="date" placeholder="Click to select..." icon="today" :max-date="new Date()" :min-date="minDate" :first-day-of-week="1" size="is-small" inline)
            .column.is-half.is-narrow
              p.title CAUTION!
              p Are you sure to archive all complete Pomodoros and daily notes?
              p (can not undo)
        footer.modal-card-foot
          button.button(@click="modalClose")
            b-icon(icon="undo")
            span Cancel
          button.button.is-danger(@click="archive_pomodoros")
            b-icon(icon="check-square")
            span Archive
</template>

<script>
export default {
  name: 'Archive',
  data() {
    return {
      isActive: false,
      date: new Date(),
    }
  },
  computed: {
    minDate() {
      return this.$store.getters['Archives/allArchives'].length
        ? this.$store.getters['Archives/allArchives'][0].date
        : null
    },
  },
  methods: {
    modalOpen() {
      this.isActive = true
    },
    modalClose() {
      this.isActive = false
    },
    archive_pomodoros() {
      let canArchive =
        this.$store.getters['Datastore/completePomodoros'].length ||
        this.$store.getters['Datastore/completeExtras'].length ||
        this.$store.state.Datastore.notes
      if (canArchive) {
        let y = this.date.getFullYear()
        let m = this.date.getMonth()
        let d = this.date.getDate()
        let date = new Date(`${y}/${m + 1}/${d}`)
        this.$store.dispatch('Archives/ARCHIVE_COMPLETE_POMODOROS', date)
      }
      this.isActive = false
    },
  },
}
</script>

<style lang="stylus" scoped>
  .modal-card-head, .modal-card-body
    padding-top: 10px
    padding-bottom: 10px
  .field.is-grouped
    margin-bottom: 0.25rem
  .modal-card-foot
    justify-content: flex-end
  .is-center
    text-align: center
</style>
