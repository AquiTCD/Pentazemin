<template lang="pug">
  .container.last-section.content
    .columns
      .column
        .title {{ $t('info.title') }}
        .field.is-grouped
          .control
            a.button(href="https://github.com/AquiTCD/Pentazemin/releases/download/v0.1.0/Pentazemin-Setup-0.1.0.exe") {{ $t('info.windows') }}
          .control
            a.button(href="https://github.com/AquiTCD/Pentazemin/releases/download/v0.1.0/Pentazemin-0.1.0.dmg") {{ $t('info.mac') }}
          .control
            a.button(href="https://github.com/AquiTCD/Pentazemin/releases/download/v0.1.0/Pentazemin-0.1.0-x86_64.AppImage") {{ $t('info.linux') }}
      .column
        .title {{ $t('info.usersguide.title') }}
        p {{ $t('info.usersguide.link') }}
</template>

<script>
export default {}
</script>

<style lang="stylus" scoped>
  .last-section
    padding-bottom: 3em
</style>
