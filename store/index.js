// import gql from "graphql-tag";
import data from '~/static/data.json'
import gql from "graphql-tag";

export const state = () => ({
    services: [],
    info: {
        phone: "",
        email: "",
        accessTime: "",
        address: "",
        companyName: "",
        descriptor: ""
    },
    dialog: {
        name: "",
        isShow: false
    }
})
export const getters = {
    menuItems: (state) => {
        return [
            // {
            //     name: "Главная",
            //     slug: "/",
            // },
            {
                name: "Услуги",
                slug: "services",
                items: state.services,
                disable: true
            },
            {
                name: "Цены",
                slug: "prices",
            },
            {
                name: "О компании",
                slug: "about",
            },
            {
                name: "Контакты",
                slug: "contacts",
            },
        ];
    }
}
export const mutations = {
    init(state, data) {
        state.info = data.info
        state.services = data.services
    },
    dialog(state, data) {
        state.dialog = data
    }
}
export const actions = {
    async nuxtServerInit(state) {
        state.commit("init", data);
        // const cache = await this._vm.$getCachedData(), { app }
        // // console.log("cache", cache)
        // if (cache) {
        //     await state.commit("init", cache)
        // } else {
        // console.log(this.app.context)
        const client = this.app.apolloProvider.defaultClient;
        const query = gql`
        {
            services(where:{isMain:true}) {
                name
                slug
                child(sort: "name:asc") {
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
        //     `
        const {
            data: generalData
        } = await client.query({
            query
        })
        //     // if (data.services && data.services.length) {
        state.commit("init", generalData);
        //     // }
        // }
    },
    // async fetchMainPage(state) {
    //     const client = this.app.apolloProvider.defaultClient;
    //     const query = gql`{
    //         mainPage {
    //             title
    //             metaDescription
    //             content
    //             benefits {
    //             header
    //             content
    //             icon {
    //                 url
    //             }
    //             }
    //             steps {
    //             header
    //             content
    //             icon {
    //                 url
    //             }
    //             order
    //             }
    //         }
    //         }`
    //     const {
    //         data
    //     } = await client.query({
    //         query
    //     })
    //     return data
    // },
    showDialog(state, data) {
        state.commit("dialog", data)
    }
}
