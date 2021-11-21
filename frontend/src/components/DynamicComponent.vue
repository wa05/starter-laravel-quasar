<template>
  <div :class="propClass">
    <component
      v-if="component"
      :is="component"
      :type="type"
      :name="name"
      :index="index"
      :value="value"
      :main-filter-ref="mainFilterRef"
      :label="label"
      @update:filters="(val) => $emit('update:filters', val)"
      v-bind="compProps"
    />
  </div>
</template>
<script>
  export default {
    name: 'DynamicComponent',
    props: {
      value: {},
      type: {
        type: String,
        required: true,
      },
      compProps: {
        default: () => {
        }
      },
      index: {
        required: true
      },
      mainFilterRef: {
        required: true
      },
      propClass: {
        type: String,
        required: false,
      },
      label: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        component: null,
      }
    },
    computed: {
      loader() {
        if (!this.type) {
          return null
        }
        return () => import(`./${this.type}`)
      },
    },
    mounted() {
      this.loader()
        .then(() => {
          this.component = () => this.loader()
        })
        .catch(() => {
          this.component = () => import('./charts/chartComponents/DefaultDynamic')
        })
    },
  }
</script>
