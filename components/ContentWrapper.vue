<script>
export default {
    name: 'ContentWrapper',
    functional: true,
    props: {
        content: {
            type: String,
            default: '',
        },
    },
    render(createElement, { props }) {
        return createElement('div', {
            key: 'contentWrapper',
            class: 'contentWrapper',
            domProps: {
                innerHTML: props.content,
            },
        });
    },
};
</script>
<style lang="scss">
    .contentWrapper {
        color: $black;

        a {
            text-decoration: none;
            color: $black;

            &:hover {
                color: $accent;
            }
        }

        h2 {
            margin-bottom: 2rem;
        }

        h3 {
            margin-bottom: 1rem;
        }

        ul,
        ol {
            li {
                margin-bottom: 1rem;
            }
        }

        ol {
            padding-left: 40px;
            list-style: none;
            counter-reset: my-awesome-counter;

            li {
                position: relative;
                margin-bottom: 1rem;
                counter-increment: my-awesome-counter;

                &:before {
                    $size: 1.8rem;

                    content: counter(my-awesome-counter);
                    position: absolute;
                    top: 0;
                    left: calc(-1 * #{$size} - 10px);
                    width: #{$size};
                    height: #{$size};
                    border-radius: 50%;
                    background: $black;
                    text-align: center;
                    font-size: 1.1rem;
                    font-weight: bold;
                    line-height: #{$size};
                    color: white;
                    box-shadow: 1px 1px 0 #999;
                }
            }
        }

        ul {
            padding-left: 5px !important;
            list-style: square inside url("~assets/icons/bullet_min.svg");
        }

        h2:not(:first-child) {
            margin-top: 3rem;
        }

        table {
            width: 100%;
            max-width: 100%;
            border-spacing: 0;

            tr:not(:last-child) td {
                border-bottom: 1px solid rgba(0, 0, 0, .12);
            }

            tr td:not(:last-child),
            td:only-child {
                border-right: 1px solid rgba(0, 0, 0, .12);
            }

            tr {
                td {
                    padding-top: 10px;
                    padding-right: 16px;
                    padding-bottom: 10px;
                }

                td:only-child:not([rowspan]) {
                    padding-left: 16px;
                }

                td:not(:first-child) {
                    padding-left: 16px;
                }
            }

            td,
            th {
                height: 36px;
            }
        }
    }
</style>
