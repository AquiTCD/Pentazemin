<template lang="pug">
  .container.content
    .columns
      .column
        .title {{ $t('usage.title') }}
    .columns
      .column
        .box
          .title {{ $t('usage.step1.title') }}
          img(src="~/assets/images/step1.png")
          .subtitle.has-text-weight-bold  {{ $t('usage.step1.subtitle') }}
          p.body {{ $t('usage.step1.body') }}
      .column
        .box
          .title {{ $t('usage.step2.title') }}
          img(src="~/assets/images/step2.png")
          .subtitle.has-text-weight-bold  {{ $t('usage.step2.subtitle') }}
          p.body {{ $t('usage.step2.body.lead') }}
          ul
            li {{ $t('usage.step2.body.line1') }}
            li {{ $t('usage.step2.body.line2') }}
            li {{ $t('usage.step2.body.line3') }}
      .column
        .box
          .title {{ $t('usage.step3.title') }}
          img(src="~/assets/images/step3.png")
          .subtitle.has-text-weight-bold  {{ $t('usage.step3.subtitle') }}
          p.body {{ $t('usage.step3.body') }}
      .column
        .box
          .title {{ $t('usage.step4.title') }}
          img(src="~/assets/images/step4.png")
          .subtitle.has-text-weight-bold  {{ $t('usage.step4.subtitle') }}
          p.body {{ $t('usage.step4.body') }}
</template>

<script>
export default {}
</script>

<style lang="stylus" scoped>
  .body
    white-space: pre-wrap
</style>
