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
  // ::v-deep table + h3 {
  //   margin-top: 25px;
  // }
  // ::v-deep figcaption {
  //   &:not(:nth-of-type(n + 1)) {
  //     margin-top: 25px;
  //   }
  // }
  ::v-deep table {
    border-spacing: 0;
    max-width: 100%;
    width: 100%;
    line-height: 125%;
    font-size: 0.875rem;
    @include md {
      font-size: 1rem;
    }
    tr:not(:last-child) td {
      border-bottom: thin solid rgba(0, 0, 0, 0.12);
    }

    tr td:not(:last-child),
    td:only-child {
      border-right: thin solid rgba(0, 0, 0, 0.12);
    }

    // tbody > tr:hover {
    //   background: #eee;
    // }
    thead {
      tr {
        th {
          border-bottom: thin solid rgba(0, 0, 0, 0.12);
          padding: 0.2rem 0.8rem;
          transition: height 0.2s cubic-bezier(0.4, 0, 0.6, 1);
          height: 48px;
          user-select: none;
          color: rgba($black, 0.75) !important;
          span {
            color: rgba($black, 0.75) !important;
          }
          &:last-child {
            text-align: right;
            white-space: nowrap;
            padding-right: 2px;
          }
          &:first-child {
            text-align: left;
            padding-left: 2px;
          }
          &:not(:last-child) {
            border-right: thin solid rgba(0, 0, 0, 0.12);
          }
        }
      }
    }
    // td,
    // th {
    //   height: 36px;
    // }
    tbody {
      tr {
        &:hover {
          background: var(--content-color, #eee);
        }
        td {
          p {
            margin-bottom: 0;
          }
          padding: 0.3rem 0.8rem;
          transition: height 0.2s cubic-bezier(0.4, 0, 0.6, 1);
          height: 48px;
          text-align: center;
          min-width: 90px;
          &:last-child {
            text-align: right;
            // white-space: break;
            padding-right: 2px;
          }
          &:first-child {
            text-align: left;
            padding-left: 2px;
          }
        }

        // td:only-child:not([rowspan]) {
        //   padding-left: 16px;
        //   // padding-right: 16px;
        // }

        // td:not(:first-child) {
        //   padding-left: 16px;
        //   // padding-right: 16px;
        // }
      }
    }
  }
}
</style>
