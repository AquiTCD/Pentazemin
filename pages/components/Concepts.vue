<template lang="pug">
  .container.content
    .columns
      .column
        .title {{ $t('concepts.title') }}
    .message.is-warning
      .message-body
        .columns
          .column.content
            .subtitle.has-text-weight-bold {{ $t('concepts.todoProblem.title') }}
            ol
              li {{ $t('concepts.todoProblem.line1') }}
              li {{ $t('concepts.todoProblem.line2') }}
              li {{ $t('concepts.todoProblem.line3') }}
          .column.content
            .subtitle.has-text-weight-bold {{ $t('concepts.pomodoroProblem.title') }}
            ol
              li {{ $t('concepts.pomodoroProblem.line1') }}
              li {{ $t('concepts.pomodoroProblem.line2') }}
              li {{ $t('concepts.pomodoroProblem.line3') }}
    .message.is-success
      .message-body
        .columns
          .column
            .subtitle.has-text-weight-bold {{ $t('concepts.point1.title') }}
              br
              span {{ $t('concepts.point1.subtitle') }}
            p {{ $t('concepts.point1.body') }}
          .column
            .subtitle.has-text-weight-bold {{ $t('concepts.point2.title') }}
              br
              span {{ $t('concepts.point2.subtitle') }}
            p {{ $t('concepts.point2.body') }}
          .column
            .subtitle.has-text-weight-bold {{ $t('concepts.point3.title') }}
              br
              span {{ $t('concepts.point3.subtitle') }}
            p {{ $t('concepts.point3.body') }}
</template>

<script>
export default {}
</script>

<style lang="stylus" scoped>

</style>
