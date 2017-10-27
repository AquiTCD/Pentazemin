<template lang="pug">
  section.hero.is-dark
    .hero-body
      .container
        h1
          img.appIcon(src="static/images/icon.png" width="128" heigh="128" alt='icon')
        h2.title.appName {{appName}}
        p.version v{{ version }}
        p.description {{description}}
      .container(v-if="env === 'development'")
        .columns.is-mobile
          .column
            .name Vue.js:
            .value {{ vue }}
          .column
            .name Electron:
            .value {{ electron }}
          .column
            .name Node:
            .value {{ node }}
          .column
            .name Platform:
            .value {{ platform }}
        .columns
          .column
            p Powered by
            img(src="~@/assets/logo.png" alt="electron-vue" width="128")
</template>

<script>
const packageInfo = require('../../../../package.json')
export default {
  name: 'About',
  data() {
    return {
      electron: process.versions['atom-shell'],
      node: process.versions.node,
      path: '/',
      platform: require('os').platform(),
      vue: require('vue/package.json').version,
      env: process.env.NODE_ENV,
      appName: packageInfo.name,
      version: packageInfo.version,
      description: packageInfo.description.replace(/\./, '.\n'),
    }
  },
  methods: {
    open(link) {
      this.$electron.shell.openExternal(link)
    },
  },
}
</script>

<style lang="stylus" scoped>
  .container
    text-align: center
  .appName
    margin-bottom: 0
  .description
    white-space: pre-wrap
</style>
