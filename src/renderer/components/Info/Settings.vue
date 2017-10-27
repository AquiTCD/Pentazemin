<template lang="pug">
  .container.is-fluid
    p.title.is-center Preferences
    p.subtitle.is-center Pomodoro
    .columns.is-mobile.is-middle
      .column.is-half.is-narrow
        p.name Pomodoro Duration:
      .column.is-half.is-narrow
        b-field.pomodoro-min
          b-input.minutes(v-model.number="editingSettings.pomodoroMin" :placeholder="defaultSettings.pomodoroMin" type="number" min="1" max="255")
          p.control
            span.button.is-static Minutes
    .columns.is-mobile.is-middle
      .column.is-half.is-narrow
        p.name Extend Duration:
      .column.is-half.is-narrow
        b-field.extend-min
          b-input.minutes(v-model.number="editingSettings.extendMin" :placeholder="defaultSettings.extendMin" type="number" min="1" max="255")
          p.control
            span.button.is-static Minutes
    p.subtitle.is-center Mission
    .columns.is-mobile.is-middle
      .column.is-half.is-narrow
        p.name Max Pomodoros Count:
      .column.is-half.is-narrow
        b-field.max-pomodoros
          b-input.minutes(v-model.number="editingSettings.maxPomodoros" :placeholder="defaultSettings.maxPomodoros" type="number" min="1" max="255")
    .columns.is-mobile.is-middle
      .column.is-half.is-narrow
        p.name Default Pomodoro Count:
      .column.is-half.is-narrow
        b-field.default-pomodoros
          b-input.minutes(v-model.number="editingSettings.defaultPomodoros" :placeholder="defaultSettings.defaultPomodoros" type="number" min="1" :max="editingSettings.maxPomodoros")
    .columns.is-mobile.is-middle
      .column.is-half.is-narrow
        p.name Default Quadrant:
      .column.is-half.is-narrow
        b-field.default-quadrant
          b-select(v-model.number="editingSettings.defaultQuadrant" size="is-normal")
            option(value="0") none
            option(value="1") 1st
            option(value="2") 2nd
            option(value="3") 3rd
            option(value="4") 4th
    p.subtitle.is-center Notification
    .columns.is-mobile.is-middle
      .column.is-half.is-narrow
        p.name Use warning notice:
      .column.is-half.is-narrow
        b-field.use-warning
          b-switch(v-model="editingSettings.useWarning")
    .columns.is-mobile.is-middle
      .column.is-half.is-narrow
        p.name Warning at:
      .column.is-half.is-narrow
        b-field.warning-min
          b-input.minutes(v-model.number="editingSettings.warningMin" :placeholder="defaultSettings.warningMin" type="number" min="1" max="255" :disabled="!editingSettings.useWarning")
          p.control
            span.button.is-static Minutes before finish
    .columns.is-mobile.is-middle
      .column.is-half.is-narrow
        p.name Try Notification:
      .column
        button.button.is-dark.is-outlined.is-small(@click="fsnotify_dim")
          span DIMMER
      .column
        button.button.is-dark.is-outlined.is-small(@click="fsnotify_flash")
          span FLASHER
    p.subtitle.is-center Short Break
    .columns.is-mobile.is-middle
      .column.is-half.is-narrow
        p.name Short Break Name:
      .column.is-half.is-narrow
        b-field.short-break-name
          b-input(v-model="editingSettings.shortBreakName" :placeholder="defaultSettings.shortBreakName" type="text")
    .columns.is-mobile.is-middle
      .column.is-half.is-narrow
        p.name Short Break Duration:
      .column.is-half.is-narrow
        b-field.short-break-min
          b-input.minutes(v-model.number="editingSettings.shortBreakMin" :placeholder="defaultSettings.shortBreakMin" type="number" min="1" max="255")
          p.control
            span.button.is-static Minutes
    p.subtitle.is-center Long Break
    .columns.is-mobile.is-middle
      .column.is-half.is-narrow
        p.name Use Long Break:
      .column.is-half.is-narrow
        b-field.use-long-break
          b-switch(v-model="editingSettings.useLongBreak")
    .columns.is-mobile.is-middle
      .column.is-half.is-narrow
        p.name Long Break Name:
      .column.is-half.is-narrow
        b-field.long-break-name
          b-input(v-model="editingSettings.longBreakName" :placeholder="defaultSettings.longBreakName" :disabled="!editingSettings.useLongBreak")
    .columns.is-mobile.is-middle
      .column.is-half.is-narrow
        p.name Take Long Break once in:
      .column.is-half.is-narrow
        b-field.long-break-point
          b-input.minutes(v-model.number="editingSettings.longBreakPoint" :placeholder="defaultSettings.longBreakPoint" type="number" min="1" max="255" :disabled="!editingSettings.useLongBreak")
          p.control
            span.button.is-static Breaks
    .columns.is-mobile.is-middle
      .column.is-half.is-narrow
        p.name Long Break Duration:
      .column.is-half.is-narrow
        b-field.long-break-min
          b-input.minutes(v-model.number="editingSettings.longBreakMin" :placeholder="defaultSettings.longBreakMin" type="number" min="1" max="255" :disabled="!editingSettings.useLongBreak")
          p.control
            span.button.is-static Minutes
    .columns.is-mobile
      .column.is-center
        button.button.is-dark.update(@click="update")
          b-icon(icon="check")
          span Save and Apply Settings
    .columns.is-mobile
      .column.is-center
        button.button.reset(@click="reset")
          b-icon(icon="undo")
          span Reset to Default
    .columns.is-mobile
      .column.is-center
        button.button.is-danger.quit(@click="quitApp")
          b-icon(icon="power-off")
          span Quit Pentazemin
</template>

<script>
import { ipcRenderer } from 'electron'
export default {
  name: 'Settings',
  computed: {
    editingSettings() {
      return this.$store.getters['Settings/user']
    },
    defaultSettings() {
      return this.$store.state.Settings.default
    },
  },
  methods: {
    update() {
      let t = this.editingSettings
      let valid =
        t.pomodoroMin <= 0
          ? false
          : t.extendMin <= 0
            ? false
            : typeof t.useWarning !== 'boolean'
              ? false
              : t.warningMin <= 0
                ? false
                : t.shortBreakName.length <= 0
                  ? false
                  : t.shortBreakMin < 0
                    ? false
                    : typeof t.useLongBreak !== 'boolean'
                      ? false
                      : t.longBreakPoint <= 0
                        ? false
                        : t.longBreakName.length <= 0
                          ? false
                          : t.longBreakMin <= 0
                            ? false
                            : t.menubarTitle.length <= 0
                              ? false
                              : t.maxPomodoros <= 0
                                ? false
                                : t.defaultPomodoros <= 0
                                  ? false
                                  : !(t.defaultQuadrant < 0)
      if (valid) {
        this.$store.dispatch('Settings/UPDATE', this.editingSettings)
      }
    },
    reset() {
      this.$store.dispatch('Settings/RESET')
    },
    quitApp() {
      ipcRenderer.send('quit-app')
    },
    fsnotify_dim() {
      this.$store.dispatch('Datastore/FS_NOTIFY', 'dimmer')
    },
    fsnotify_flash() {
      this.$store.dispatch('Datastore/FS_NOTIFY', 'flasher')
    },
  },
}
</script>

<style lang="stylus" scoped>
  .is-center
    text-align: center
    justify-content: center
  .is-middle
    align-items: center
  .name
    vertical-align: bottom
    font-weight: bold
    text-align: right
  .minutes
    width: 4.5em
</style>
