<template lang="pug">
  .container.content
    .columns
      .column
        .title {{ $t('features.title') }}
    .columns
      .column
        .subtitle.has-text-weight-bold {{ $t('features.feature1.subtitle') }}
        p {{ $t('features.feature1.body') }}
      .column
        .subtitle.has-text-weight-bold {{ $t('features.feature2.subtitle') }}
        p {{ $t('features.feature2.body') }}
      .column
        .subtitle.has-text-weight-bold {{ $t('features.feature3.subtitle') }}
        p {{ $t('features.feature3.body') }}
      .column
        .subtitle.has-text-weight-bold {{ $t('features.feature4.subtitle') }}
        p {{ $t('features.feature4.body') }}
</template>

<script>
export default {}
</script>

<style lang="stylus" scoped>

</style>
