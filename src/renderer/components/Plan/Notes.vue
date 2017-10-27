<template lang="pug">
  div
    b-field()
      textarea.textarea(v-model="notes" placeholder="notes for today" rows="5" size="is-normal")
</template>

<script>
export default {
  name: 'Notes',
  computed: {
    notes: {
      get() {
        return this.$store.state.Datastore.notes
      },
      set(value) {
        this.$store.dispatch('Datastore/UPDATE_NOTES', value)
      },
    },
  },
}
</script>

<style lang="stylus" scoped>

</style>
