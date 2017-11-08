<template lang="pug">
  .hero.is-dark.is-bold.is-fullhd
    .hero-body
      .container
        .columns
          .column.mainTitle
            h1.title.logo {{ $t('globals.appName') }}
            h2.subtitle.description {{ $t('globals.description') }}
          .column.mainLogo.has-text-right
            img(src="~/assets/images/icon.png")
</template>

<script>
export default {}
</script>

<style lang="stylus" scoped>
  @import '../css/variables'
  .logo
    font-family: $font-family-logo
  .description
    white-space: pre-wrap
</style>
