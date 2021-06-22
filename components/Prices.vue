<template>
    <div class="wrapper" v-html="content" />
</template>

<script>
export default {
    props: {
        content: {
            type: String,
            default: null,
        },
    },
};
</script>

<style lang="scss" scoped>
    .wrapper {
        ::v-deep h3 {
            margin-bottom: 1rem;
        }

        ::v-deep .table {
            & + * {
                margin-top: 3.5rem;
            }

            & + .table {
                margin-top: 2.5rem;
            }

            overflow-x: auto;
            overflow-y: hidden;
        }

        ::v-deep table {
            width: 100%;
            max-width: 100%;
            border-spacing: 0;
            font-size: .875rem;
            line-height: 125%;

            @include md {
                font-size: 1rem;
            }

            tr:not(:last-child) td {
                border-bottom: thin solid rgba(0, 0, 0, .12);
            }

            tr td:not(:last-child),
            td:only-child {
                border-right: thin solid rgba(0, 0, 0, .12);
            }

            thead {
                tr {
                    th {
                        height: 48px;
                        padding: .2rem .8rem;
                        border-bottom: thin solid rgba(0, 0, 0, .12);
                        color: rgba($black, .75) !important;
                        transition: height .2s cubic-bezier(.4, 0, .6, 1);
                        user-select: none;

                        span {
                            color: rgba($black, .75) !important;
                        }

                        &:last-child {
                            padding-right: 2px;
                            text-align: right;
                            white-space: nowrap;
                        }

                        &:first-child {
                            padding-left: 2px;
                            text-align: left;
                        }

                        &:not(:last-child) {
                            border-right: thin solid rgba(0, 0, 0, .12);
                        }
                    }
                }
            }

            tbody {
                tr {
                    &:hover {
                        background: var(--content-color, #eee);
                    }

                    td {
                        p {
                            margin-bottom: 0;
                        }

                        min-width: 90px;
                        height: 48px;
                        padding: .3rem .8rem;
                        text-align: center;
                        transition: height .2s cubic-bezier(.4, 0, .6, 1);

                        &:last-child {
                            padding-right: 2px;
                            text-align: right;
                        }

                        &:first-child {
                            padding-left: 2px;
                            text-align: left;
                        }
                    }
                }
            }
        }
    }
</style>
