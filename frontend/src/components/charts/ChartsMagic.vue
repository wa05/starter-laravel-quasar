<template>
  <div class="row">
    <div v-if="loading" class="col-xs-12 text-center" style="min-height: 100px;">
      <Loading :loading="loading"></Loading>
    </div>
    <div v-if="compChartRows.length" class="col-xs-12">
      <div v-for="(row, rowIndex) in compChartRows"
           :key="rowIndex" class="row" :style="row.style">
        <div v-for="(col, colIndex) in row.cols" :key="colIndex"
             class="col-md-3" :class="col.class">
          <dynamic-component
              :type="col.type"
              :comp-props="col.props"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DynamicComponent from './DynamicChartsComponent'
import Loading from '../Loading'

export default {
  components: {
    DynamicComponent,
    Loading
  },
  props: {
    loading: {
      type: Boolean,
      required: false,
      default: false
    },
    section: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      chartRows: [],
      localLoading: false
    }
  },
  computed: {
    compChartRows() {
      let rows = []
      if (this.chartRows) {
        rows = this.chartRows
      }
      return rows
    }
  },
  mounted() {
    try {
      this.getDynamicCharts({
        section: this.section
      })
    } catch (e) {
      //
    }
  },
  watch: {
    section(oldValue, newValue) {
      this.getDynamicCharts({
        section: this.section
      })
    }
  },
  methods: {
    async getDynamicCharts(params) {
      try {
        this.loadingCharts = true

        const resp = await this.$axios.post('api/v1/charts/getDynamicCharts', params)
        this.chartRows = resp.data.chart_rows
        this.$events.fire('loaded-charts')
      } catch (e) {
        this.$events.fire('show-toast', 'error', 'Ha ocurrido un error obteniendo los datos')
      } finally {
        this.loadingCharts = false
      }
    },
    loader(type) {
      try {
        this.localLoading = true
        const comp = () => import(`./chartComponents/${this.type}`)
        return comp
      } catch (e) {
        return () => import('./chartComponents/DefaultDynamic')
      } finally {
        this.localLoading = false
      }
    }
  },
  events: {
    'reload-charts-magic'(extraParams) {
      this.getDynamicCharts({
        section: this.section,
        extra_params: extraParams
      })
    }
  }
}
</script>

<style scoped>

</style>
