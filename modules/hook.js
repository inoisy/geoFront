
const axios = require("axios")
const fs = require('fs')
const path = require('path')

// async function downloadImage(url, dir, name) {
//     const downloadPath = path.resolve(__dirname, dir, name)
//     const writer = fs.createWriteStream(downloadPath)

//     const response = await axios({
//         url: encodeURI(url),
//         method: 'GET',
//         responseType: 'stream'
//     })

//     response.data.pipe(writer)

//     return new Promise((resolve, reject) => {
//         writer.on('finish', resolve)
//         writer.on('error', reject)
//     })
// }
const query = `
      {
      services(where:{isMain:true}) {
          name
          slug
          child {
            id
            name
            slug
          }
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
export default async function (ctx) {
  // console.log("🚀 ~ file: hook.js ~ line 50 ~ p", Object.keys(ctx));

  this.nuxt.hook('build:before', async ({ options }) => {
    try {

      const apiUrl = options.publicRuntimeConfig.baseUrl
      if (!apiUrl) {
        throw Error("no apiUrl")
      }
      // console.log("🚀 ~ file: hook.js ~ line 45 ~ nuxt", options.publicRuntimeConfig.baseUrl);
      // const query = 
      const { data: { data: { info, services } } } = (await axios({
        url: apiUrl + '/graphql',
        method: 'post',
        data: {
          query: query
        }
      }))
      // // console.log("data: ", contact)
      // for (let manufacturer of manufacturers) {
      //     // console.log(manufacturer.img)
      //     await downloadImage(apiUrl + manufacturer.img.url, "../assets/images/manufacturers", manufacturer.slug + manufacturer.img.ext)
      // }
      await fs.writeFileSync(
        path.resolve(__dirname, "../static/data.json"),
        JSON.stringify({ info, services }),
      );
    } catch (e) {
      throw new Error(e)
    }
  })
}

