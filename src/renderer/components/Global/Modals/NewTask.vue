<template lang="pug">
  .control(@keyup.esc="modalClose")
    button.is-half.button.is-outlined(@click="modalOpen")
      b-icon(icon="plus-circle")
    .modal(v-bind:class="{ 'is-active': this.isActive }")
      .modal-background(@click="modalClose")
      .modal-card
        header.modal-card-head
          p.modal-card-title Create New Task
          button.delete(aria-label='close' @click="modalClose")
        p.panel-tabs.modal-card-tabs
          a(v-bind:class="{ 'is-active': currentTab === 'Mission' }" @click="selectMissionTab") Mission
          a(v-bind:class="{ 'is-active': currentTab === 'Extra' }" @click="selectExtraTab") Extra
        new-mission(v-if="currentTab === 'Mission'" ref="NewMission")
        new-extra(v-if="currentTab === 'Extra'" ref="NewExtra")
</template>

<script>
import NewMission from '@/components/Global/Modals/NewMission'
import NewExtra from '@/components/Global/Modals/NewExtra'
export default {
  name: 'NewTask',
  data() {
    return {
      isActive: false,
      currentTab: 'Mission',
    }
  },
  components: {
    NewMission,
    NewExtra,
  },
  methods: {
    modalOpen() {
      this.isActive = true
      this.$nextTick(function() {
        this.$refs.NewMission.initForm()
      })
    },
    modalClose() {
      this.isActive = false
    },
    selectMissionTab() {
      this.currentTab = 'Mission'
      this.$nextTick(function() {
        this.$refs.NewMission.initForm()
      })
    },
    selectExtraTab() {
      this.currentTab = 'Extra'
      this.$nextTick(function() {
        this.$refs.NewExtra.initForm()
      })
    },
  },
}
</script>

<style lang="stylus" scoped>
  .modal-card-head
    padding-top: 10px
    padding-bottom: 10px
    text-align: center
  .modal-card-tabs
    background: white
</style>
