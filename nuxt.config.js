// const LRU = require("lru-cache")

const siteUrl = process.env.SITE_URL || "https://geoworksmsk.ru"
const backendUrl = process.env.BACKEND_URL || "https://api.geoworksmsk.ru"
// BACKEND_URL = http://localhost:1337 "http://localhost:1337"; 
const companyName = 'GeoWorks'
const description = `Инженерные изыскания в Москве и МО. Геодезические, геологические изыскания, кадастровые услуги "под ключ" для проектирования и строительства.`

const axios = require('axios')

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
module.exports = async () => {
  const isDev = process.env.NODE_ENV !== 'production'

  return {
    // target: "server",
    // target: isDev ? "server" : process.env.TARGET || "static",
    // generate: {
    //   // fallback: '404.html',
    //   // subFolders: false,
    //   dir: process.env.GENERATE_DIR || "/var/www/front",
    //   routes
    // },
    loading: {
      color: 'rgb(0, 126, 255)',
      throttle: 30,
      duration: 3000,
      continuous: true,
      failedColor: "white"
    },
    publicRuntimeConfig: {
      siteUrl,
      baseUrl: backendUrl,
      imageBaseUrl: process.env.IMAGE_BACKEND_URL || backendUrl,
      yandexMetrikaID: process.env.YANDEX_ID,
      googleAnalytics: {
        id: process.env.GOOGLE_ANALYTICS_ID
      }
    },
    privateRuntimeConfig: {
      yandexMapID: process.env.MAP_KEY
    },
    // Global page headers (https://go.nuxtjs.dev/config-head)
    head: {
      htmlAttrs: {
        lang: 'ru'
      },
      titleTemplate: `%s - ${companyName}`,
      title: companyName,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: description },
        { property: "og:image:width", content: "740" },
        { property: "og:image:height", content: "300" },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'icon', type: "image/png", sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: "image/png", sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
      ],
    },

    // Global CSS (https://go.nuxtjs.dev/config-css)
    css: [
      '~/assets/global.scss',
    ],

    // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
    // plugins: [
      // { src: '~/plugins/ymapPlugin.js', mode: 'client' },
      // '~/plugins/cachedApi.js',
      // '~/plugins/cache.js',
    // ],

    // Auto import components (https://go.nuxtjs.dev/config-components)
    components: true,

    // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
    buildModules: [
      '@nuxtjs/google-analytics',
      '~/modules/hook.js',
      // https://go.nuxtjs.dev/eslint
      // '@nuxtjs/eslint-module',
      // https://go.nuxtjs.dev/vuetify
      '@nuxtjs/vuetify',
      // https://github.com/nuxt-community/style-resources-module
      '@nuxtjs/style-resources',
      ['@aceforth/nuxt-optimized-images', {
        inlineImageLimit: 1000,
        imagesName: ({ isDev }) => isDev ? '[path][name][hash:optimized].[ext]' : 'img/[contenthash:7].[ext]',
        responsiveImagesName: ({ isDev }) => isDev ? '[path][name]--[width][hash:optimized].[ext]' : 'img/[contenthash:7]-[width].[ext]',
        handleImages: ['jpeg', 'png', 'svg', 'webp'],
        optimizeImages: true,
        optimizeImagesInDev: true, // TODO
        defaultImageLoader: 'img-loader',
        mozjpeg: {
          quality: 80,
        },
        optipng: {
          optimizationLevel: 3,
        },
        pngquant: false,
        // gifsicle: {
        //   interlaced: true,
        //   optimizationLevel: 3,
        // },
        svgo: {
          // enable/disable svgo plugins here
        },
        webp: {
          preset: 'default',
          quality: 75,
        },
      },]
    ],
    // dev: false,
    // Modules (https://go.nuxtjs.dev/config-modules)
    modules: [
      [
        // "~/modules/metrika/index.js", // TODO
        "@nuxtjs/yandex-metrika",
        {
          id: process.env.YANDEX_ID,
          clickmap: true,
          trackLinks: true,
          accurateTrackBounce: true,
          webvisor: true,
          useCDN: false,
          // dev: false
          // defer: true,
          // useLocal:true
        }],

      '@nuxtjs/svg-sprite',
      'nuxt-webfontloader',
      ['@nuxtjs/apollo', {
        clientConfigs: {
          default: '~/graphql/config/config.js'
          // {
          //   httpEndpoint: backendUrl + '/graphql',
          // },
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
        Sitemap: siteUrl + "/sitemap.xml"
      }],
      ['nuxt-social-meta', {
        url: siteUrl,
        title: companyName,
        description: description,
        img: "/social.jpg",
        locale: 'ru_RU',
        themeColor: '#151317'
      }],


      //  ['@nuxtjs/redirect-module', process.env.REDIRECT_ROUTES],
      // ['@nuxtjs/google-analytics', {
      //   id: process.env.GOOGLE_ID
      // }],
      //  ['@nuxtjs/sentry', {
      //     dsn: process.env.SENTRY_DSN, // Enter your project's DSN here
      //     config: {}, // Additional config
      //   }] 
    ],
    // googleAnalytics: {
    //   id: process.env.GA_ID
    // },

    svgSprite: {
      input: '~/assets/icons/'
    },
    webfontloader: {
      google: {
        families: ['Montserrat:400,500,700']
      }
    },
    styleResources: {
      // your settings here
      scss: [
        './assets/styles/_mixins/*.scss',
        './assets/styles/_vars/*.scss',
      ]
    },
    // Axios module configuration (https://go.nuxtjs.dev/config-axios)
    // axios: {
    //   baseURL: backendUrl
    // },

    // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
    vuetify: {
      customVariables: ["~/assets/variables.scss"],
      treeShake: true,
      options: {
        customProperties: true
      },
      theme: {
        disable: true,
        //   dark: true,
        //   // options: { themeCache },
        //   themes: {
        //     dark: {
        //       accent: "#1867c0"
        //     },
        //     light: {
        //       accent: "#1867c0"
        //     }
        //   }
      },
      defaultAssets: false,
      optionsPath: './vuetify.options.js'
    },

    // Build Configuration (https://go.nuxtjs.dev/config-build)
    build: {
      // babel: {
      //   sourceType: 'unambiguous',
      //   presets: [
      //     ["@nuxt/babel-preset-app", {
      //       corejs: {
      //         version: 2
      //       }
      //     }],
      //   ]
      // },
      transpile: ["@nuxtjs/apollo", "@nuxtjs/vuetify", /^@nuxtjs.*/, "vue-lazy-hydration", "vue-the-mask", "vue-yandex-maps", "vuelidate", "nuxt-social-meta", "graphql-tag", "vuelidate"]
    }
  }
}