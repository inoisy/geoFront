import colors from 'vuetify/es5/util/colors'
const backendUrl = "http://api.geoworksmsk.ru"
// console.log("🚀 ~ file: nuxt.config.js ~ line 3 ~ backendUrl", backendUrl)
export default {
  publicRuntimeConfig: {
    baseUrl: process.env.BACKEND_URL || backendUrl,
    imageBaseUrl: process.env.IMAGE_BACKEND_URL || process.env.BACKEND_URL || backendUrl
  },
  // env: {
  //   baseUrl: process.env.BACKEND_URL || backendUrl,
  //   imageBaseUrl: process.env.IMAGE_BACKEND_URL || process.env.BACKEND_URL || backendUrl
  // },
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s - GeoWorks',
    title: 'GeoWorks',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      // {
      //   rel: 'stylesheet',
      //   href: 'https://fonts.googleapis.com/css?family=Material+Icons'
      // }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '@/assets/styles/index.scss',
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    // https://github.com/nuxt-community/style-resources-module
    '@nuxtjs/style-resources',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    "@nuxtjs/svg",
    'nuxt-webfontloader',
    ['@nuxtjs/apollo', {
      // watchLoading: '~/plugins/apollo-watch-loading-handler.js',
      // optional
      // errorHandler: '~/plugins/apollo-error-handler.js',
      clientConfigs: {
        default: {
          httpEndpoint: backendUrl + '/graphql',
        },
      }
    }],
    ['vue-yandex-maps/nuxt', {
      apiKey: process.env.MAP_KEY,
      lang: 'ru_RU',
      coordorder: 'latlong',
      version: '2.1'
    }],
  ],
  webfontloader: {
    google: {
      families: ['Castoro:400', 'Montserrat:300,400,500,600,700', 'Material+Icons'],
      urls: [
        // for each Google Fonts add url + options you want
        // here add font-display option
        "https://fonts.googleapis.com/css2?family=Castoro&display=swap",
        'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap',
        'https://fonts.googleapis.com/css?family=Material+Icons'
      ]
    }
  },
  styleResources: {
    // your settings here
    sass: [],
    scss: [
      './assets/styles/_mixins/*.scss',
      './assets/styles/_vars/*.scss',
    ],
    less: [],
    stylus: []
  },
  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    treeShake: true,
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.blue.accent4,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    },
    defaultAssets: false
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    babel: {
      sourceType: 'unambiguous',
      presets: [
        ["@nuxt/babel-preset-app", {
          corejs: {
            version: 2
          }
        }],
      ]
    },
    transpile: ["@nuxtjs/vuetify", /^aos/, /^@nuxtjs.*/, "nuxt-vuex-localstorage"],
    extend(config, ctx) { }
  }
}
