<template lang="pug">
  .content
    //- p {{ $t('changeLang.title') }}
    .field.is-grouped
      .control
        a.button(href="./") {{ $t('changeLang.en') }}
      .control
        a.button(href="./ja/") {{ $t('changeLang.ja') }}
</template>

<script>
export default {}
</script>

<style lang="stylus" scoped>
</style>
