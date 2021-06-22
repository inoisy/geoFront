<template>
    <div>
        <LazyHydrate when-idle>
            <service-header
                :breadcrumbs="breadcrumbs"
                :header="service.name"
                :subheader="service.subheader"
                :icon="service.icon"
            >
            </service-header>
        </LazyHydrate>
        <section class="sectionWrapper">
            <v-container>
                <div class="pa-3">
                    <LazyHydrate when-visible>
                        <mobile-aside-menu
                            class="mb-14 hidden-md-and-up"
                            :services="children"
                            :slug="service.slug"
                        />
                    </LazyHydrate>
                    <LazyHydrate when-visible>
                        <desktop-aside-menu :services="children" :slug="service.slug" />
                    </LazyHydrate>
                    <!-- <LazyHydrate when-visible> -->
                    <content-wrapper :content="service.content" />
                    <!-- </LazyHydrate> -->
                </div>
            </v-container>
        </section>
        <LazyHydrate
            v-for="(child, i) in children"
            :key="`service-${i}`"
            when-visible
        >
            <service-feature
                :header="child.name"
                :content="child.description"
                :img-url="child.img"
                :slug="`/services/${service.slug}/${child.slug}`"
                :is-with-gray="true"
                :name="child.name"
            />
        </LazyHydrate>
    </div>
</template>

<script>
import gql from 'graphql-tag';
import LazyHydrate from 'vue-lazy-hydration';
import { calculateImageUrl } from '~/utils/images';

export default {
    components: {
        LazyHydrate,
    },
    async asyncData({ params, app, error }) {
        const {
            data: { services },
        } = await app.apolloProvider.defaultClient.query({
            variables: {
                slug: params.parent,
            },
            query: gql`
        query ServiceQuery($slug: String!) {
          services(where: { slug: $slug }) {
            _id
            name
            slug
            description
            subheader
            metaDescrtiption
            content
            icon {
              url
            }
            child(sort: "name:asc") {
              name
              slug
              description
              img {
                url
                formats
              }
            }
          }
        }
      `,
        });

        if (!services || !services.length) {
            return error({
                statusCode: 404,
                message: 'Информацию не удалось получить',
            });
        }
        const { child, ...service } = services[0];

        return {
            service,
            children: child.reduce((acc, val) => {
                acc.push({
                    ...val,
                    img: calculateImageUrl(val.img),
                });
                return acc;
            }, []),
            breadcrumbs: [
                {
                    text: 'Главная',
                    to: '/',
                },
                {
                    text: 'Услуги',
                    to: '/services',
                },
                {
                    text: service.name,
                    to: service.slug,
                },
            ],
        };
    },
    head() {
        return {
            title: this.service.name,
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: this.service.metaDescrtiption,
                },
                {
                    hid: 'og:url',
                    property: 'og:url',
                    content: `${this.$config.siteUrl}/services/${this.service.name}`,
                },
                {
                    hid: 'og:title',
                    property: 'og:title',
                    content: this.service.name,
                },
                {
                    hid: 'og:description',
                    property: 'og:description',
                    content: this.service.metaDescrtiption,
                },
            ],
            link: [
                {
                    rel: 'canonical',
                    href: `${this.$config.siteUrl}/services/${this.service.name}`,
                },
            ],
        };
    },
};
</script>
