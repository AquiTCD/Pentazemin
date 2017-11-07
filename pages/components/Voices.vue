<template lang="pug">
  .container.content
    .columns
      .column
        .title {{ $t('voices.title') }}
    .columns
      .column
        blockquote
          p.subtitle {{ $t('voices.voice1.original') }}
          p {{ $t('voices.voice1.username') }}
      .column
        blockquote
          p.subtitle {{ $t('voices.voice2.original') }}
          p ({{ $t('voices.voice2.translation') }})
          p {{ $t('voices.voice2.username') }}
      .column
        blockquote
          p.subtitle {{ $t('voices.voice3.original') }}
          p ({{ $t('voices.voice3.translation') }})
          p {{ $t('voices.voice3.username') }}
</template>

<script>
export default {}
</script>

<style lang="stylus" scoped>

</style>
