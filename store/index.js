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
export const mutations = {
    // services(state, item) {
    //     state.services = item
    // },
    // info(state, item) {
    //     state.info = item
    // },
    init(state, data) {
        state.info = data.info
        state.services = data.services
    },
    dialog(state, data) {
        state.dialog = data
    }
}
export const actions = {
    async nuxtServerInit(state, ctx) {
        const client = this.app.apolloProvider.defaultClient;
        const query = gql`
        {
            services(where:{isMain:true}) {
                name
                slug
                # description
                # icon{
                #     url
                # }
                # info{
                #     header
                #     content
                #         img{
                #             url
                #         }
                # }
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
        const {
            data
        } = await client.query({
            query
        })
        // console.log("🚀 ~ file: index.js ~ line 60 ~ nuxtServerInit ~ data", data)
        if (data.services && data.services.length) {
            state.commit("init", data);
        }
    },
    async fetchMainPage(state) {
        const client = this.app.apolloProvider.defaultClient;
        const query = gql`{
            mainPage {
                title
                metaDescription
                content
                benefits {
                header
                content
                icon {
                    url
                }
                }
                steps {
                header
                content
                icon {
                    url
                }
                order
                }
            }
            }`
        const {
            data
        } = await client.query({
            query
        })
        // console.log("🚀 ~ file: index.js ~ line 72 ~ fetchMainPage ~ data", data)
        return data
    },
    showDialog(state, data) {
        state.commit("dialog", data)
    }
}
