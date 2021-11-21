<template>
  <div v-if="loading" class="bg-grey-1" :style="`height: ${height};`">
    <q-inner-loading :showing="loading" class="q-ma-mt">
      <q-spinner-gears size="50px" color="primary"/>
    </q-inner-loading>
  </div>
</template>

<script>
  import {
    QSpinnerGears,
    QInnerLoading
  } from 'quasar'

  export default {
    components: {
      QSpinnerGears,
      QInnerLoading
    },
    props: {
      loading: {
        type: Boolean,
        default: false
      },
      height: {
        type: String,
        default: '100%'
      }
    },
    data() {
      return {}
    },
    methods: {},
    events: {}
  }
</script>

<style scoped>
  .bg-grey-1 {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    opacity: 0.7;
    display: block;
    z-index: 33;
  }
</style>
