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
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        })
      }
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
