<template lang="pug">
  nav.navbar(role="navigation" aria-label="main navigation")
    .navbar-menu
      .navbar-brand
        a.navbar-item.logo(href="https://aquitcd.github.io/pentazemin/")
          img.icon(src="~/assets/images/icon.png")
          span {{ $t('globals.appName') }}
      //- a.navbar-item Users Guide
      .navbar-end
        .navbar-item
          .field.is-grouped
            p.control
              a.bd-tw-button.button(data-social-network="github" data-social-action="Github" data-social-target="https://github.com/AquiTCD/pentazemin" target="_blank" href="https://github.com/AquiTCD/pentazemin")
                span.icon
                  i.fa.fa-github
                span {{ $t('navbar.buttons.github') }}
            //- p.control
            //-   a.bd-tw-button.button(data-social-network="Twitter" data-social-action="tweet" data-social-target="https://bulma.io" target="_blank" href="")
            //-     span.icon
            //-       i.fa.fa-twitter
            //-     span {{ $t('navbar.buttons.twitter') }}
            p.control
              a.button.is-primary(href="https://github.com/AquiTCD/pentazemin/releases/latest")
                span.icon
                  i.fa.fa-download
                span {{ $t('navbar.buttons.download') }}
</template>

<script>
export default {}
</script>

<style lang="stylus" scoped>
@import '../css/variables'
.logo
  font-family: $font-family-logo
.icon
  margin-right: 0.5em
</style>
