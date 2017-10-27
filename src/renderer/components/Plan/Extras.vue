<template lang="pug">
  tr(v-bind:class="{isComplete: extra.isComplete}")
    td.index(@click="modalOpen") -
    td.name(@click="modalOpen") {{ extra.name }}
    td.project(@click="modalOpen")
      b-tag(v-if="projectTag" type="is-primary") {{ projectTag }}
    td.min(colspan="2" @click="modalOpen") {{ extra.min }} min
    .modal(v-bind:class="{ 'is-active': this.isActive }" @keyup.esc="modalClose"  @keyup.ctrl.enter="updateExtra(editingExtra)" v-if="editingExtra")
      .modal-background(@click="modalClose")
      .modal-card
        header.modal-card-head
          p.modal-card-title Edit Extra
          button.delete(aria-label='close' @click="modalClose")
        section.modal-card-body
          b-field(label="Extra Name")
            b-input.extra-name(v-model.trim="editingExtra.name" size="is-medium")
          b-field(grouped)
            b-field(label="Min")
              b-input(v-model.trim.number="editingExtra.min" type="number" min="1" max="1440" size="is-normal")
            b-field(label="Repeat")
              b-checkbox(v-model="editingExtra.isRepeat")
            b-field(label="Tags" expanded)
              multiselect(
                v-model="editingExtra.tags",
                tag-placeholder="Add this as new tag",
                placeholder="Search or add a tag",
                label="name",
                track-by="code",
                :options="allTags",
                :multiple="true",
                :taggable="true",
                @tag="addTag"
                @keyup.ctrl.enter="updateExtra(editingExtra)")
          b-field(label="Notes for Extra")
            b-input(type="textarea" v-model="editingExtra.notes" rows="5" size="is-normal")
        footer.modal-card-foot
          button.button.is-danger.is-left.delete-extra(@click="deleteExtra(extra)")
            b-icon(icon="trash")
            span Delete
          button.button.is-warning.toggle-extra(@click="toggleExtra(extra)")
            div(v-if="extra.isComplete")
              b-icon(icon="undo")
              span Incomplete
            div(v-else)
              b-icon(icon="check")
              span Complete
          button.button.is-success.update-extra(@click="updateExtra(editingExtra)")
            b-icon(icon="edit")
            span Save
</template>

<script>
import Multiselect from 'vue-multiselect'
import { mapActions } from 'vuex'
export default {
  name: 'Extras',
  data() {
    return {
      isActive: false,
      editingExtra: {},
    }
  },
  components: {
    Multiselect,
  },
  props: ['extra'],
  computed: {
    projectTag(extra) {
      return this.$store.getters['Datastore/projectTag'](this.extra)
    },
    allTags() {
      return this.$store.getters['Datastore/allTags']
    },
  },
  methods: {
    modalOpen() {
      this.isActive = true
    },
    modalClose() {
      this.isActive = false
    },
    updateExtra(extra) {
      let valid = extra.name.length > 0
      if (valid) {
        this.$store.dispatch('Datastore/UPDATE_EXTRA', extra)
        this.modalClose()
      }
    },
    toggleExtra(extra) {
      this.$store.dispatch('Datastore/TOGGLE_EXTRA', extra)
      this.modalClose()
    },
    addTag(newTag) {
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor(Math.random() * 10000000),
      }
      this.editingExtra.tags.push(tag)
    },
    ...mapActions({
      deleteExtra: 'Datastore/DELETE_EXTRA',
    }),
  },
  created() {
    this.editingExtra = this.$store.getters['Datastore/editingExtra'](
      this.extra
    )
  },
}
</script>
<style lang="stylus" scoped>
  .isComplete
    color: grey
    .name
      text-decoration: line-through
  .modal
    z-index: 200
  .modal-card-head, .modal-card-body
    padding-top: 10px
    padding-bottom: 10px
  .field.is-grouped
    margin-bottom: 0.25rem
  .modal-card-foot
    justify-content: flex-end
    .is-left
      margin-right: auto
</style>
