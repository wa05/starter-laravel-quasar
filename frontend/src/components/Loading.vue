<template>
  <q-inner-loading :showing="loading">
    <q-spinner-gears size="50px" color="primary" />
  </q-inner-loading>
</template>

<script>

  export default {
    name: 'Loading',
    components: {},
    props: {
      loading: {
        type: Boolean,
        default: false,
        required: true
      }
    },
    data() {
      return {
        showModal: false
      }
    },
    methods: {},
    events: {}
  }
</script>

<style scoped>

</style>
