module.exports = {
  modules: [
    // ['nuxt-i18n', { // this is responsible for the routing crash
    //   // nuxt-i18n overrides Nuxt default routes to add locale prefixes to every URL.
    //   locales: [
    //     {
    //       name: 'Greek',
    //       code: 'gr',
    //       iso: 'gr-GR',
    //       file: 'gr-GR.js'
    //     },
    //     {
    //       name: 'English',
    //       code: 'en',
    //       iso: 'en-US',
    //       file: 'en-US.js'
    //     },
    //   ],
    //   lazy: true, //[vue-i18n] Cannot translate the value of keypath 'hello'. Use the value of keypath as default.
    //   langDir: 'lang/',
    //   parsePages: false,
    //   pages: {
    //     'page/_page': false, // disabled i18n for this dynamic route
    //     'index':{
    //       gr: '/'
    //     }
    //   },
    //   defaultLocale: 'en'
    // }],
    ['nuxtdown',{}]
  ],
  plugins: [{
    src: "~/plugins/mixins"
  }, {
    src: "~/plugins/lightgallery.client.js",
    ssr: false
  },{
    src: "~/plugins/youtube.js",
    ssr: false
  },{
    src: "~/plugins/click.outside.js"
  }],
  env: {
    BASE_URL: process.env.BASE_URL || 'http://localhost:3000'
  },
  /*
   ** Headers of the page
   */
  head: {
    htmlAttrs: {
      lang: 'en',
    },
    title: "My Website",
    meta: [{
        charset: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        hid: "description",
        name: "description",
        content: "Welcome to my website."
      }
    ],
    link: [{
      rel: "icon",
      type: "image/x-icon",
      href: "/favicon.ico"
    }]
  },
  /*
   ** Customize the progress bar color
   */
  loading: {
    color: "#FFBB43"
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLint on save
     */
    extend(config, {
      isDev
    }) {
      if (isDev && process.client) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        });
      }
    }
  }
};
