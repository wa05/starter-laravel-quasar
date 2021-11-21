<template>
  <div class="row q-col-gutter-sm q-mb-xs">
    <div class="col-xs-11">
      <div class="row q-col-gutter-sm">
        <div v-for="(filter, index) in filtersBag"
             :key="`${index} ${filter.name}`"
             class="col" :class="filter.class">
          <q-select
            v-if="filter.type === 'select' && !filter.externalComp"
            dense :name="filter.name"
            :disabled="!filter.options.length"
            :options="filter.options"
            :label="filter.label" filled
            tabindex="-1"
            @input="(val) => $emit('update:filters',index, val)"
            :value="filter.value">
          </q-select>
          <!--                          @input=""-->
          <q-select
            v-if="filter.type === 'select' && !filter.externalComp &&
                    filter.secondCombo && filter.value"
            dense :name="filter.name"
            :disable="!filter.value"
            :options="filter.value.secondComboData.options"
            :label="filter.labelSecond"
            tabindex="-1"
            :value="filter.value">
          </q-select>

          <q-btn
            v-if="filter.type === 'button' && !filter.externalComp"
            :size="filter.size" :color="filter.color"
            :disable="filter.disable"
            :label="filter.label"
            tabindex="-1"
            :icon="filter.icon || null"
            @click="$events.fire(filter.event)"
          >
          </q-btn>

          <q-input v-if="filter.type === 'date' && !filter.externalComp" dense
                   :label="filter.label"
                   tabindex="-1"
                   @input="(val) => $emit('update:filters',index, val)"
                   :name="filter.name" filled :value="filter.value"
                  >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy :ref="`qDateProxy${filter.name}`"
                               transition-show="scale" transition-hide="scale">
                  <q-date :value="filter.value" mask="DD-MM-YYYY"
                          @input="(val) => $emit('update:filters',index, val)"/>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

          <q-input
            v-if="filter.type === 'input' || filter.type === 'number'"
            :name="filter.name" dense filled
            :type="filter.type === 'number' ? 'number' : 'text'"
            :label="filter.label"
            :value="filter.value"
            @keyup.enter="(event) => $emit('update:filters',index, event.target.value)"
          />

          <div class="q-gutter-sm"
               v-if="filter.type === 'radio' && !filter.externalComp">
            <q-radio v-for="option in filter.options" :key="option.value"
                     size="sm" :value="filter.value"
                     :val="option.value" :label="option.label"
                     @input="(val) => $emit('update:filters',index, val)"/>
          </div>
          <div class="q-gutter-sm"
               v-if="filter.type === 'checkbox' && !filter.externalComp">
            <q-checkbox v-for="option in filter.options" :key="option.value"
                        :value="option.value" :label="option.label"/>
          </div>

          <dynamic-component
            v-if="filter.externalComp"
            :index="index"
            :main-filter-ref="mainFilterRef"
            :prop-class="filter.class"
            :value="filter.value"
            :type="filter.type"
            :name="filter.name"
            :multiple="filter.multiple || false"
            :label="filter.label"
            :comp-props="filter.props"
            @update:filters="(val) => $emit('update:filters', index, val)"
          ></dynamic-component>
        </div> <!-- filters end -->
      </div>
    </div>
    <div class="col-xs-1" v-if="filtersBag.length">
      <!--        <q-btn-->
      <!--          @click="reloadTable"-->
      <!--          flat round dense size="sm"-->
      <!--          :icon="'search'"-->
      <!--          class="q-ml-md q-mt-sm"-->
      <!--        />-->
      <!--        <q-btn-->
      <!--          @click="resetFilters"-->
      <!--          flat round dense size="sm"-->
      <!--          :icon="'close'"-->
      <!--          class="q-ml-md q-mt-sm"-->
      <!--        />-->
    </div>
  </div>
</template>

<script>
  import {
    QRadio,
    QCheckbox,
    QDate
  } from 'quasar'
  import DynamicComponent from './DynamicComponent'
  import globalMixin from '../mixins/globlalMixin'

  export default {
    name: 'MainFilter',
    components: {
      QDate,
      QRadio,
      QCheckbox,
      DynamicComponent
    },
    mixins: [globalMixin],
    props: {
      mainFilterRef: {
        type: String,
        required: true,
      },
      filtersBag: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        form: {
          from: null,
          to: null,
          filter: null,
          value: null
        }
      };
    },
    mounted() {

    },
    methods: {
      reloadTable() {
        this.$emit('reload-table')
      },
      resetFilters() {
        this.filtersBag.forEach((item, index) => this.$emit('update:filters', index, null))
        this.reloadTable()
      }
    },
    events: {
      // 'dynamic-filter-update'(ref, index, value) {
      //   if (this.ref === ref) {
      //     this.$events.fire('update:filters', index, value)
      //   }
      // }
    }
  };
</script>

<style scoped>
  .top-button {
    margin-top: 16px;
  }
</style>
