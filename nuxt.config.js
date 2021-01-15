import colors from 'vuetify/es5/util/colors';
import os from "os";

const siteUrl = process.env.SITE_URL || "https://geoworksmsk.ru"
const backendUrl = process.env.BACKEND_URL || "https://api.geoworksmsk.ru"
console.log("siteUrl", siteUrl)
console.log("process.env.YANDEX_ID", process.env.YANDEX_ID)

const companyName = 'GeoWorks'
const axios = require('axios')
// const backendUrl = process.env.BACKEND_URL || "https://api.prodaem-kolbasu.ru"

async function routes() {
  let routes = []
  const {
    data: services
  } = await axios.get(backendUrl + '/services?_limit=99999')
  for (let service of services) {
    if (service.parent.length) {
      continue
    }
    routes.push(`/services/${service.slug}`)
    if (service.child.length) {
      for (let child of service.child) {
        routes.push(`/services/${service.slug}/${child.slug}`)
      }
    }
  }

  return routes
}
// module.exports = main

export default {
  loading: {
    color: 'rgb(0, 126, 255)'
  },
  publicRuntimeConfig: {
    baseUrl: backendUrl,
    imageBaseUrl: process.env.IMAGE_BACKEND_URL || backendUrl
  },
  // env: {
  //   baseUrl: process.env.BACKEND_URL || backendUrl,
  //   imageBaseUrl: process.env.IMAGE_BACKEND_URL || process.env.BACKEND_URL || backendUrl
  // },
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: `%s - ${companyName}`,
    title: companyName,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      { rel: 'icon', type: "image/png", sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', type: "image/png", sizes: '16x16', href: '/favicon-16x16.png' },
      { rel: 'manifest', href: '/site.webmanifest' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '@/assets/styles/index.scss',
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: '~/plugins/ymapPlugin.js', mode: 'client' }
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
    // https://www.npmjs.com/package/@nuxtjs/svg-sprite
    '@nuxtjs/svg-sprite',
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
    // ['vue-yandex-maps/nuxt', ],
    ['@nuxtjs/sitemap', {
      hostname: siteUrl,
      gzip: true,
      routes
    }],
    ['@nuxtjs/robots', {
      UserAgent: '*',
      Allow: '/',
      Sitemap: "/sitemap.xml"
    }],
    ['nuxt-social-meta', {
      // url: sitename,
      title: companyName,
      // description: description,
      // img: imageUrl + "/uploads/031ba5905e18488794851c8d512b1227.jpg",
      locale: 'ru_RU',
      themeColor: '#d50000'
    }],
    ...(process.env.REDIRECT_ROUTES && process.env.REDIRECT_ROUTES.length ? ['@nuxtjs/redirect-module', process.env.REDIRECT_ROUTES] : []),

    ...(process.env.GOOGLE_ID ?
      ['@nuxtjs/google-analytics', {
        id: process.env.GOOGLE_ID
      }] : []),

    ['@nuxtjs/yandex-metrika',
      {
        id: process.env.YANDEX_ID,
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: true
      }],
    ...(process.env.SENTRY_DSN ? ['@nuxtjs/sentry', {
      dsn: process.env.SENTRY_DSN, // Enter your project's DSN here
      config: {}, // Additional config
    }] : [])


  ],
  // sentry: ,
  svgSprite: {
    input: '~/assets/icons/'
  },
  webfontloader: {
    google: {
      families: ['Castoro:400', 'Montserrat:300,400,500,600,700'],
      urls: [
        // for each Google Fonts add url + options you want
        // here add font-display option
        "https://fonts.googleapis.com/css2?family=Castoro&display=swap",
        'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap'
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
  axios: {
    baseURL: backendUrl
  },

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
