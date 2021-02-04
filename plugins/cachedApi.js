import Vue from 'vue'
const apolloFetch = require('apollo-fetch');
const backendUrl = process.env.BACKEND_URL || "https://api.geoworksmsk.ru"

const MyPlugin = {
  install(Vue, options) {
    Vue.prototype.$cachedData
    Vue.prototype.$getCachedData = async function () {
      //   console.log("getCachedData -> getCachedData", Vue.prototype.$cachedData)
      // return async function () {
      if (Vue.prototype.$cachedData) { // get data from cache if exists
        // console.log("data Cached")
        return Vue.prototype.$cachedData
      } else { // else get data from API
        // console.log("else get data from API")

        const query = `
           {
            services(where:{isMain:true}) {
                name
                slug
            }
            info{
                phone
                email
                accessTime
                address
                companyName
                descriptor
                addressCoords
            }
        }
        `
        const fetchApollo = apolloFetch.createApolloFetch({
          uri: backendUrl + '/graphql'
        });

        const {
          data: dataFetched
        } = await fetchApollo({
          query
        })
        if (dataFetched) {
          Vue.prototype.$cachedData = dataFetched
          return dataFetched
          //   resolve(data)
        } else {
          //   reject()
        }
      }
    }
  }
};

Vue.use(MyPlugin)