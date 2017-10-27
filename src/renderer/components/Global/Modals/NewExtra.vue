<template lang="pug">
  section
    .modal-card-body
      b-field(label="Extra Name")
        b-input(v-model.trim="name" placeholder="add" size="is-medium")#focusNewExtra
      b-field(grouped)
        b-field(label="Min")
          b-input(v-model.trim.number="min" placeholder="Minutes" type="number" min="1" max="1440" size="is-normal")
        b-field(label="Repeat")
          b-checkbox(v-model="isRepeat")
        b-field(label="Tags" expanded)
          multiselect(
            v-model="tags",
            tag-placeholder="Add this as new tag",
            placeholder="Search or add a tag",
            label="name",
            track-by="code",
            :options="allTags",
            :multiple="true",
            :taggable="true",
            @tag="addTag"
            @keyup.ctrl.enter="createExtra")
      b-field(label="Notes for Mission")
        b-input(type="textarea" v-model="notes" placeholder="notes for new Mission" rows="5" size="is-normal")
    footer.modal-card-foot
      button.button.is-danger.is-outlined(@click="initForm")
        b-icon(icon="remove")
        span Clear
      button.is-half.button.is-success(@click="createExtra")
        b-icon(icon="check")
        span Add
</template>

<script>
import Multiselect from 'vue-multiselect'
export default {
  name: 'NewExtra',
  data() {
    return {
      isActive: false,
      name: '',
      min: '',
      isRepeat: false,
      tags: [],
      notes: '',
    }
  },
  components: {
    Multiselect,
  },
  computed: {
    allTags() {
      return this.$store.getters['Datastore/allTags']
    },
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
    createExtra() {
      if (this.name !== '' && this.min > 0) {
        let newExtra = {
          name: this.name,
          min: this.min,
          isRepeat: this.isRepeat,
          tags: this.tags,
          notes: this.notes,
        }
        this.$store.dispatch('Datastore/CREATE_EXTRA', newExtra)
        this.initForm()
      }
    },
    initForm() {
      this.name = ''
      this.min = ''
      this.isRepeat = false
      this.tags = []
      this.notes = ''
      this.focusToDefault()
    },
    focusToDefault() {
      document.querySelector('#focusNewExtra').focus()
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
</style>
