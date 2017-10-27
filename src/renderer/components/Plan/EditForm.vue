<template lang="pug">
  .modal(v-bind:class="{ 'is-active': this.form.isOpen }" @keyup.esc="modalClose"  @keyup.ctrl.enter="updateMission(editingMission)")
    .modal-background(@click="modalClose")
    .modal-card
      header.modal-card-head
        p.modal-card-title Edit Mission
        //- button.button()
        //-   b-icon(icon="arrow-up")
        //- button.button()
        //-   b-icon(icon="arrow-down")
        button.delete(aria-label='close' @click="modalClose")
      section.modal-card-body(v-if="editingMission")
        b-field.mission-name(label="Mission Name")
          b-input(v-model.trim="editingMission.name" size="is-medium")#focusEdit
        b-field(grouped)
          b-field(label="P.s")
            div.field.has-addons
              p.control
                button.button.is-normal.remove-pomodoro(@click="decreasePomodoro(pomodoro)")
                  b-icon(icon="minus-square")
                button.button.is-normal(v-if='missionOfPomodoro') {{ editingMission.pomodoros = missionOfPomodoro.pomodoros }}
                button.button.is-normal.add-pomodoro(@click="increasePomodoro(pomodoro)")
                  b-icon(icon="plus-square")
          b-field(label="Q.")
            b-select(v-model.number="editingMission.quadrant" size="is-normal")
              option(value="0") none
              option(value="1") 1st
              option(value="2") 2nd
              option(value="3") 3rd
              option(value="4") 4th
          b-field(label="Tags" expanded)
            multiselect(
              v-model="editingMission.tags",
              tag-placeholder="Add this as new tag",
              placeholder="Search or add a tag",
              label="name",
              track-by="code",
              :options="allTags",
              :multiple="true",
              :taggable="true",
              @tag="addTag"
              )
        b-field(label="Notes for Mission")
          b-input(type="textarea" v-model="editingMission.notes" rows="5" size="is-normal")
      footer.modal-card-foot
        button.button.is-danger.delete-mission(@click="deleteMission(pomodoro)")
          b-icon(icon="trash")
          span Delete
        button.button.is-success.update-mission(@click="updateMission(editingMission)")
          b-icon(icon="edit")
          span Save
</template>

<script>
import Multiselect from 'vue-multiselect'
import { mapActions } from 'vuex'
import _ from 'lodash'
export default {
  name: 'EditForm',
  data() {
    return {
      editingMission: {},
    }
  },
  components: {
    Multiselect,
  },
  props: ['pomodoro', 'form'],
  computed: {
    missionOfPomodoro() {
      return this.$store.getters['Datastore/parentMission'](this.pomodoro)
    },
    allTags() {
      return this.$store.getters['Datastore/allTags']
    },
    removable() {
      return (
        _(
          this.$store.getters['Datastore/brotherPomodoros'](this.pomodoro)
        ).size() > 1 &&
        _.some(
          this.$store.getters['Datastore/brotherPomodoros'](this.pomodoro),
          pomodoro => pomodoro.isComplete === false
        )
      )
    },
  },
  methods: {
    modalClose() {
      this.$emit('form-close', this.pomodoro)
    },
    updateMission(mission) {
      let valid = mission.name.length > 0
      if (valid) {
        this.$store.dispatch('Datastore/UPDATE_MISSION', mission)
        this.modalClose()
      }
    },
    deleteMission(pomodoro) {
      this.$store.dispatch('Datastore/DELETE_MISSION', pomodoro)
      this.modalClose()
    },
    addTag(newTag) {
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor(Math.random() * 10000000),
      }
      this.editingMission.tags.push(tag)
    },
    focusToDefault() {
      document.querySelector('#focusEdit').focus()
    },
    decreasePomodoro(pomodoro) {
      if (this.removable) {
        this.$store.dispatch('Datastore/DECREASE_POMODORO', pomodoro)
      }
    },
    ...mapActions({
      increasePomodoro: 'Datastore/INCREASE_POMODORO',
    }),
  },
  created() {
    this.editingMission = this.$store.getters['Datastore/editingMission'](
      this.pomodoro
    )
    this.$nextTick(function() {
      this.focusToDefault()
    })
  },
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="stylus" scoped>
  .modal
    z-index: 200
  .modal-card-head, .modal-card-body
    padding-top: 10px
    padding-bottom: 10px
  .field.is-grouped
    margin-bottom: 0.25rem
  .modal-card-foot
    justify-content: flex-end
</style>
