<template lang="pug">
  section
    .modal-card-body(@keyup.ctrl.enter="createMission")
      b-field(label="Mission Name")
        b-input.name(v-model.trim="name" placeholder="add new pomodoro" size="is-medium" )#focusNewMission
      b-field(grouped)
        //- NOTE: Tooltip will destroy Styles
        //- b-tooltip(
        //- label="'Pomodoros' will be number of pomodoros. a Pomodoro(pomodoro) have 1 pomodoro duration of minutes(defalt is 25mins)"
        //- type="is-dark" multilined)
        b-field(label="P.s")
          b-select.pomodoros(v-model.number="pomodoros" size="is-normal")
            option(v-for="value in selectablePomodoros" :value="value") {{value}}
        //- b-tooltip(
        //- label="'Quadrant' is based on '7 habits'. It is a kind of category. 1st: Urgent/Important, 2nd: Not Urgent/Importnt, 3rd: Urgent/Not Important, 4th: Not Urgent/Not Important"
        //- type="is-dark" multilined)
        b-field(label="Q.")
          b-select.quadrant(v-model.number="quadrant" size="is-normal")
            option(value="0") none
            option(value="1") 1st
            option(value="2") 2nd
            option(value="3") 3rd
            option(value="4") 4th
        //- b-tooltip(
        //- label="if you make like '@ProjectName'(the tag name starts at @), it is project name tag. that is show on list"
        //- type="is-dark" multilined)
        b-field(label="Tags" expanded)
          multiselect.tags(
            v-model="tags",
            tag-placeholder="Add this as new tag",
            placeholder="Search or add a tag",
            label="name",
            track-by="code",
            :options="allTags",
            :multiple="true",
            :taggable="true",
            @tag="addTag"
            @keyup.ctrl.enter="createMission")
      b-field(label="Notes for Mission")
        b-input.notes(type="textarea" v-model="notes" placeholder="notes for new Mission" rows="5" size="is-normal")
    footer.modal-card-foot
      button.button.is-danger.is-outlined(@click="initForm")
        b-icon(icon="remove")
        span Clear
      button.createMission.is-half.button.is-success(@click="createMission")
        b-icon(icon="check")
        span Add(⌃+↩)
</template>

<script>
import Multiselect from 'vue-multiselect'
export default {
  name: 'NewMission',
  data() {
    return {
      isActive: false,
      name: '',
      pomodoros: 0,
      quadrant: 0,
      tags: [],
      notes: '',
    }
  },
  computed: {
    allTags() {
      return this.$store.getters['Datastore/allTags']
    },
    selectablePomodoros() {
      return this.$store.state.Settings.user.maxPomodoros
    },
  },
  components: {
    Multiselect,
  },
  methods: {
    addTag(newTag) {
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor(Math.random() * 10000000),
      }
      this.tags.push(tag)
    },
    modalClose() {
      this.isActive = false
    },
    createMission() {
      if (this.name !== '') {
        let newMission = {
          name: this.name,
          pomodoros: this.pomodoros,
          quadrant: this.quadrant,
          tags: this.tags,
          notes: this.notes,
        }
        this.$store.dispatch('Datastore/CREATE_MISSION', newMission)
        this.initForm()
      }
    },
    initForm() {
      this.name = ''
      this.pomodoros = this.$store.state.Settings.user.defaultPomodoros
      this.quadrant = this.$store.state.Settings.user.defaultQuadrant
      this.tags = []
      this.notes = ''
      this.focusToDefault()
    },
    focusToDefault() {
      document.querySelector('#focusNewMission').focus()
    },
  },
}
</script>

<style lang="stylus" scoped>
  .modal-card-body
    padding-top: 10px
    padding-bottom: 10px
  .field.is-grouped
    margin-bottom: 0.25rem
  .modal-card-foot
    justify-content: flex-end
  .modal-card-tabs
    background: white
</style>
