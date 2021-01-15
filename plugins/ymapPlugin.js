import Vue from 'vue'
import YmapPlugin from 'vue-yandex-maps'

const settings = {
    apiKey: process.env.MAP_KEY,
    lang: 'ru_RU',
    coordorder: 'latlong',
    version: '2.1'
} // plugin settings

Vue.use(YmapPlugin, settings);