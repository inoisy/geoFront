import axios from 'axios';

const siteUrl = process.env.SITE_URL || 'https://geoworksmsk.ru';
const backendUrl = process.env.BACKEND_URL || 'https://api.geoworksmsk.ru';
const companyName = 'GeoWorks';
const description = 'Инженерные изыскания в Москве и МО. Геодезические, геологические изыскания, кадастровые услуги "под ключ" для проектирования и строительства.';

async function routes() {
    const routes = [];
    const {
        data: services,
    } = await axios.get(backendUrl + '/services?_limit=99999');
    for (const service of services) {
        if (service.parent.length) {
            continue;
        }
        routes.push(`/services/${service.slug}`);
        if (service.child.length) {
            for (const child of service.child) {
                routes.push(`/services/${service.slug}/${child.slug}`);
            }
        }
    }

    return routes;
}

const devModules = [
    '@nuxtjs/stylelint-module',
    '@nuxtjs/eslint-module',
];

export default async () => {
    const isDev = process.env.NODE_ENV !== 'production';

    return {
        loading: {
            color: 'rgb(0, 126, 255)',
            throttle: 30,
            duration: 3000,
            continuous: true,
            failedColor: 'white',
        },
        publicRuntimeConfig: {
            siteUrl,
            baseUrl: backendUrl,
            imageBaseUrl: process.env.IMAGE_BACKEND_URL || backendUrl,
            yandexMetrikaID: process.env.YANDEX_ID,
            googleAnalytics: {
                id: process.env.GOOGLE_ANALYTICS_ID,
            },
        },
        privateRuntimeConfig: {
            yandexMapID: process.env.MAP_KEY,
        },
        head: {
            htmlAttrs: {
                lang: 'ru',
            },
            titleTemplate: `%s - ${companyName}`,
            title: companyName,
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                { hid: 'description', name: 'description', content: description },
                { property: 'og:image:width', content: '740' },
                { property: 'og:image:height', content: '300' },
            ],
            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
                { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
                { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
                { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
                { rel: 'manifest', href: '/site.webmanifest' },
            ],
        },

        css: [
            '~/assets/global.scss',
        ],

        components: true,

        buildModules: [
            ...(isDev ? devModules : []),
            '@nuxtjs/google-analytics',
            '~/modules/hook.js',
            '@nuxtjs/vuetify',
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
                svgo: {
                    // enable/disable svgo plugins here
                },
                webp: {
                    preset: 'default',
                    quality: 75,
                },
            }],
        ],
        modules: [
            [
                '@nuxtjs/yandex-metrika',
                {
                    id: process.env.YANDEX_ID,
                    clickmap: true,
                    trackLinks: true,
                    accurateTrackBounce: true,
                    webvisor: true,
                    useCDN: false,
                },
            ],

            '@nuxtjs/svg-sprite',
            'nuxt-webfontloader',
            ['@nuxtjs/apollo', {
                clientConfigs: {
                    default: '~/graphql/config/config.js',
                },
            }],
            // ['vue-yandex-maps/nuxt', ],
            ['@nuxtjs/sitemap', {
                hostname: siteUrl,
                gzip: true,
                routes,
            }],
            ['@nuxtjs/robots', {
                UserAgent: '*',
                Allow: '/',
                Sitemap: siteUrl + '/sitemap.xml',
            }],
            ['nuxt-social-meta', {
                url: siteUrl,
                title: companyName,
                description,
                img: '/social.jpg',
                locale: 'ru_RU',
                themeColor: '#151317',
            }],
        ],

        svgSprite: {
            input: '~/assets/icons/',
        },
        webfontloader: {
            google: {
                families: ['Montserrat:400,500,700'],
            },
        },
        styleResources: {
            // your settings here
            scss: [
                './assets/styles/_mixins/*.scss',
                './assets/styles/_vars/*.scss',
            ],
        },
        // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
        vuetify: {
            customVariables: ['~/assets/variables.scss'],
            treeShake: true,
            options: {
                customProperties: true,
            },
            theme: {
                disable: true,
            },
            defaultAssets: false,
            optionsPath: './vuetify.options.js',
        },
        // Stylelint options
        stylelint: {
            files: [
                'assets/**/*.{s?(a|c)ss}',
                '**/components/**/*.{s?(a|c)ss}',
                '**/{components,layouts,services}/**/*.vue',
            ],
        },

        eslint: {
            cache: false,
        },
        build: {
            transpile: ['@nuxtjs/apollo', '@nuxtjs/vuetify', /^@nuxtjs.*/, 'vue-lazy-hydration', 'vue-the-mask', 'vue-yandex-maps', 'vuelidate', 'nuxt-social-meta', 'graphql-tag', 'vuelidate'],
        },
    };
};
