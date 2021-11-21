<template>
  <div class="row q-col-gutter-sm">
    <div class="col-xs-12 col-md-4" :class="colClass">
      <na-select
        :options="provinces.data"
        :placeholder="provinceLabel"
        prop-key="province-selected"
        :value="province"
        @update:province-selected="provinceSelected"
        :has-error="provinceError"
      >
      </na-select>
    </div>
    <div class="col-xs-12 col-md-4" :class="colClass">
      <na-select
        :disabled="!departments.data.length"
        :options="departments.data"
        :placeholder="departmentLabel"
        prop-key="department-selected"
        :value="department"
        @update:department-selected="departmentSelected"
        :has-error="departmentError"
      >
      </na-select>
    </div>
    <div class="col-xs-12 col-md-4" :class="colClass">
      <na-select
        :disabled="!cities.data.length"
        :options="cities.data"
        :placeholder="cityLabel"
        prop-key="city-selected"
        :value="city"
        @update:city-selected="(citySelected) => $emit('update:city', citySelected)"
        :has-error="cityError"
      >
      </na-select>
    </div>
  </div>
</template>

<script>
  import NaSelect from './Nexarg/NaSelect'
  import {mapActions, mapGetters} from 'vuex'

  export default {
    components: {
      NaSelect
    },
    mixins: [],
    props: {
      province: {
        default: null,
        required: false
      },
      department: {
        default: null,
        required: false
      },
      provinceLabel: {
        type: String,
        default: 'Seleccionar provincia',
        required: false
      },
      departmentLabel: {
        type: String,
        default: 'Seleccionar departamento / partido',
        required: false
      },
      cityLabel: {
        type: String,
        default: 'Seleccionar ciudad',
        required: false
      },
      city: {
        default: null,
        required: false
      },
      colClass: {
        type: String,
        required: false
      },
      provinceError: {
        required: false,
        default: false
      },
      departmentError: {
        required: false,
        default: false
      },
      cityError: {
        required: false,
        default: false
      },
    },
    data() {
      return {
        loadingView: false
      }
    },
    computed: {
      ...mapGetters({
        provinces: 'locations/provinces',
        departments: 'locations/departments',
        cities: 'locations/cities',
      }),
    },
    mounted() {
      this.initView()
    },
    methods: {
      ...mapActions({
        getProvinces: 'locations/getProvinces',
        getDepartments: 'locations/getDepartments',
        getCities: 'locations/getCities',
        // getServiceSubCategories: 'getServiceSubCategories/forSelect',
      }),
      async initView() {
        this.loadingView = true
        await this.getProvinces()
        this.loadingView = true
      },
      async provinceSelected(selectedProvince) {
        this.$emit('update:province', selectedProvince)
        if (selectedProvince !== null && selectedProvince.id) {
          this.getDepartments({
            province_id: selectedProvince.id
          })
        }
      },
      async departmentSelected(value) {
        this.$emit('update:department', value)
        if (value !== null && value.id) {
          this.getCities({
            department_ids: value.related_ids
          })
        }
      },
    },
    events: {
      'province-selected'(province) {
        this.provinceSelected(province)
      },
      'department-selected'(department) {
        this.departmentSelected(department)
      },

    }
  }
</script>

<style scoped>

</style>
