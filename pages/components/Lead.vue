<template lang="pug">
  .container.content
    .columns
      .column
        img(src="~/assets/images/main.png")
        h2.title {{ $t('lead.title') }}
        blockquote.has-text-weight-bold {{ $t('lead.maxim') }}
        //- p.subtitle
        p.body {{ $t('lead.body') }}
</template>

<script>
export default {}
</script>

<style lang="stylus" scoped>
  .body
    white-space: pre-wrap
</style>
