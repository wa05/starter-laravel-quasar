<template>
    <div class="row">
      <div class="col-12 bg-indigo text-white q-pa-xs text-center"
           style="border-radius: 15px;">
        <br>
        {{ title }}
        <h3 class="q-mt-xs q-mt-xs bolder">{{ value }}</h3>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'Ibox',
    props: {
      value: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true
      },
    },
    components: {},
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
