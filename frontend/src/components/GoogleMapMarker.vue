<template>
</template>

<script>
  import { POINT_MARKER_ICON_CONFIG } from '../services/mapSettings'

  export default {
    props: {
      google: {
        type: Object,
        required: true
      },
      map: {
        type: Object,
        required: true
      },
      marker: {
        type: Object,
        required: true
      }
    },

    mounted() {
      let marker = new this.google.maps.Marker({
        position: this.marker.position,
        marker: this.marker,
        map: this.map,
        icon: POINT_MARKER_ICON_CONFIG
      })
      const that = this
      marker.addListener('click', function() {
        that.$emit('marker-data', this.marker)
        // this.$events.fire('marker-data', this.marker)
      });
    }
  }
</script>
