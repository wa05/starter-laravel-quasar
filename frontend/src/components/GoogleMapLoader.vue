<template>
  <div>
    <div class="google-map" ref="googleMap"></div>
    <template v-if="Boolean(this.google) && Boolean(this.map)">
      <slot
        :google="google"
        :map="map"
      />
    </template>
  </div>
</template>

<script>
  import GoogleMapsApiLoader from 'google-maps-api-loader'

  export default {
    components: {},
    props: {
      mapConfig: {
        required: true
      }
    },
    data() {
      return {
        google: null,
        map: null,
        apiKey: 'AIzaSyDJiLJVhGcdse5KFUMfYN8dJBz-u9bwtxU',
      }
    },
    async mounted() {
      const googleMapApi = await GoogleMapsApiLoader({
        apiKey: this.apiKey
      })
      this.google = googleMapApi
      this.initializeMap()
    },
    watch: {
      mapConfig: {
        handler: function(val, oldVal) {
          this.initializeMap(true);
        },
        deep: true
      }
    },
    methods: {
      initializeMap(withZoom = false) {
        let settings = this.mapConfig
        if (withZoom) {
          settings.zoom = 7
        }
        const mapContainer = this.$refs.googleMap
        this.map = new this.google.maps.Map(mapContainer, settings)
      },
    },
    events: {
      'reload-map'() {
        this.initializeMap()
      }
    }
  }
</script>

<style scoped>
  /*.google-map {*/
  /*  height: 100vh;*/
  /*  width: 100%;*/
  /*  position: absolute;*/
  /*}*/
  .google-map {
    width: 100%;
    min-height: 100%;
  }
</style>
