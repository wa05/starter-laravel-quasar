<template>
  <q-select
    dense
    use-input
    input-debounce="200"
    clearable
    :label="placeholder"
    :options="mappedData"
    filled
    :value="value"
    :disable="disable"
    @filter="filterFn"
    @input="(value) => $emit(`update:${propKey}`, value)"
    :error="hasError"
  >
  </q-select>
</template>

<script>
  import {QSelect} from 'quasar'

  export default {
    components: {
      QSelect
    },
    data() {
      return {
        optionsData: []
      }
    },
    props: {
      disable: {
        type: Boolean,
        default: false,
        required: false
      },
      hasError: {
        default: false,
        required: false
      },
      placeholder: {
        type: String,
        required: false,
        default: 'Seleccionar'
      },
      propKey: {
        type: String,
        required: true
      },
      options: {
        required: false,
        type: Array,
        default: () => []
      },
      value: {
        required: false
      }
    },
    computed: {
      mappedData() {
        if (!this.optionsData.length) {
          return this.options
        }
        return this.optionsData
      },
    },
    methods: {
      filterFn(val, update) {
        if (val === '') {
          update(() => {
            this.optionsData = this.options
          })
          return
        }
        update(() => {
          this.optionsData = this.options.filter((item) => item.name.toLowerCase().includes(val.toLowerCase()))
        })
      }
    }
  }
</script>

<style scoped>

</style>
