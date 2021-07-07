import gql from 'graphql-tag';
import data from '~/static/data.json';

export const state = () => ({
    services: [],
    info: {
        phone: '',
        email: '',
        accessTime: '',
        address: '',
        companyName: '',
        descriptor: '',
    },
    dialog: {
        name: '',
        isShow: false,
    },
});
export const getters = {
    menuItems: state => [
        // {
        //     name: "Главная",
        //     slug: "/",
        // },
        {
            name: 'Услуги',
            slug: 'services',
            items: state.services,
            disable: true,
        },
        {
            name: 'Цены',
            slug: 'prices',
        },
        {
            name: 'О компании',
            slug: 'about',
        },
        {
            name: 'Контакты',
            slug: 'contacts',
        },
    ],
};
export const mutations = {
    init(state, data) {
        state.info = data.info;
        state.services = data.services;
    },
    dialog(state, data) {
        state.dialog = data;
    },
};
export const actions = {
    async nuxtServerInit(state) {
        state.commit('init', data);
        const client = this.app.apolloProvider.defaultClient;
        const query = gql`
        {
            services(where:{isMain:true}) {
                name
                slug
                child(sort: "order:asc") {
                    id
                    name
                    slug
                }
            }
            info{
                email
                accessTime
                address
                companyName
                descriptor
                addressCoords
            }
        }
        `;
        const {
            data: generalData,
        } = await client.query({
            query,
        });
        state.commit('init', generalData);
    },
    showDialog(state, data) {
        state.commit('dialog', data);
    },
};
