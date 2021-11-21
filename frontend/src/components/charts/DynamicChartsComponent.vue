<template>
  <div :class="propClass">
    <component
      v-if="component"
      :is="component"
      :type="type"
      v-bind="compProps"
    />
  </div>
</template>
<script>
  export default {
    name: 'DynamicChartsComponent',
    props: {
      value: {},
      type: {
        type: String,
        required: true
      },
      compProps: {
        default: () => {
        }
      },
      propClass: {
        type: String,
        required: false
      },
    },
    data() {
      return {
        component: null
      }
    },
    computed: {
      loader() {
        if (!this.type) {
          return null
        }
        return () => import(`./chartComponents/${this.type}`)
      }
    },
    mounted() {
      this.loader()
        .then(() => {
          this.component = () => this.loader()
        })
        .catch(() => {
          this.component = () => import('./chartComponents/DefaultDynamic')
        })
    }
  }
</script>
