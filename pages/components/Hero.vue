<template lang="pug">
  .hero.is-dark.is-bold.is-fullhd
    .hero-body
      .container
        .columns
          .column.mainTitle
            h1.title.logo Pentazemin
            h2.subtitle An app for task shooting. Helps keeping focus with time and todo management.
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
</style>
