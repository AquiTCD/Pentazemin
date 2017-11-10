module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Pentazemin - Introduction',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Introduction pages for Pentazemin',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  modules: ['@nuxtjs/bulma', '@nuxtjs/font-awesome'],
  /*
  ** Build configuration
  */
  build: {
    vendor: ['vue-i18n'],
    /*
    ** Run ESLint on save
    */
    extend(config, ctx) {
      const rules = config.module.rules
      if (ctx.dev && ctx.isClient) {
        rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        })
      }
      rules.push({
        test: /\.ya?ml$/,
        loader: ['json-loader', 'yaml-loader'],
      })
    },
  },
  plugins: ['~/plugins/buefy', '~/plugins/i18n'],
  router: {
    middleware: 'i18n',
    base: '/Pentazemin/',
  },
  generate: {
    routes: ['/', '/ja'],
  },
}
