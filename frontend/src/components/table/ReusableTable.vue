<template>
  <div class="row">
    <div class="col-12">
      <q-card class="my-card full-width">
        <q-card-section class="q-pa-sm">
          <div class="row">
            <div class="col-md-4">
              <h3 class="q-ma-xs text-h5">{{title}}</h3>
            </div>
            <div class="col-md-8 text-right">
              <q-btn v-if="createRoute" icon="add" color="primary"
                @click="$events.fire('create-treatment')"
              :label="createLabel"
              class="q-mb-md"></q-btn>
            </div>
          </div>
        </q-card-section>
        <q-card-section class="q-pa-sm">
          <main-filter
            :main-filter-ref="tableName"
            :filters-bag="filtersBag"
            @update:filters="filterUpdate"
          ></main-filter>
        </q-card-section>
      </q-card>

      <q-table
        class="q-mt-md"
        :data="playersData"
        dense :loading="loading"
        loading-label="Cargando resultados..."
        :columns="columns"
        rows-per-page-label="Resultados por página"
        row-key="id"
        :pagination.sync="moreParams"
        selection="multiple"
        :selected.sync="moreParams.selected"
        @request="changePagination"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td>
              <q-checkbox v-model="props.selected" />
            </q-td>
            <q-td v-for="column in columns"
                  :key="column.field"
                  :props="props"
                  :style="column.col_style">
            <span v-if="column.type === 'text'"
                  v-text="props.row[column.field]"></span>

              <img v-if="column.type === 'image'" alt="we" style="width: 50px;"
                   :src="props.row[column.field]" :style="column.style" />

              <span v-if="column.type === 'badge'">
                 <q-badge transparent align="middle" class="q-pa-sm"
                          :color="props.row[column.field] === 'Tratamiento' ? 'indigo' : 'blue'">
                   {{props.row[column.field]}}
                </q-badge>
              </span>

              <span v-if="column.type === 'actions'">
                <q-btn v-for="(button, index) in column.buttons" :key="`${index} ${props.row.id}`"
                      :color="button.color" :size="button.size" :icon="button.icon"
                      :flat="button.flat"
                      @click="$emit(button.event, button.eventParams, props.row)">
                </q-btn>
              </span>

            </q-td>
          </q-tr>
        </template>
        <template slot="pagination">
          <!--        <q-btn-->
          <!--            v-if="scope.pagesNumber > 2"-->
          <!--            icon="first_page"-->
          <!--            color="grey-8"-->
          <!--            round-->
          <!--            dense-->
          <!--            flat-->
          <!--            :disable="scope.isFirstPage"-->
          <!--            @click="scope.firstPage"-->
          <!--        />-->

          <q-btn
            icon="chevron_left"
            color="grey-8"
            round
            dense
            flat
            @click="restPage"
          />

          <q-btn
            icon="chevron_right"
            color="grey-8"
            round
            dense
            flat
            @click="addPage"
          />
        </template>
      </q-table>
    </div>
  </div>
</template>

<script>
import {
  QTable,
  QTr,
  QBadge,
  QCheckbox,
  QTd,
} from 'quasar'
import MainFilter from "../MainFilter";

export default {
  name: 'ReusableTable',
  components: {
    QTable,
    QTr,
    QCheckbox,
    QBadge,
    QTd,
    MainFilter
  },
  props: {
    title: {
      String,
      required: true
    },
    createRoute: {
      type: String,
      required: false
    },
    createLabel: {
      type: String,
      required: false
    },
    tableName: {
      String,
      required: true
    },
    apiUrl: {
      type: String,
      required: true
    },
  },
  data () {
    return {
      loading: false,
      filtersBag: [],
      playersData: [],
      columns: [],
      moreParams: {
        selected: [],
        sortBy: 'desc',
        descending: false,
        page: 1,
        rowsNumber: 10,
        rowsPerPage: 10,
        total: 100
        // rowsNumber: xx if getting data from a server
      },
    }
  },
  mounted() {
    this.getTableStructure()
  },
  methods: {

    async getData() {
      try {
        const newObject = {}

        for(let i = 0; i < this.filtersBag.length; i += 1) {
          newObject[this.filtersBag[i].name] = this.filtersBag[i].value
        }
        const mergedParams = { ...this.moreParams, ...newObject }

        this.loading = true
        const resp = await this.$axios.get(this.apiUrl, {
          params: mergedParams
        })
        this.playersData = resp.data.data
        this.moreParams.total = resp.data.last_page
      } catch (e) {
        //
      } finally {
        this.loading = false
      }
    },
    filterUpdate(index, value) {
      this.filtersBag[index].value = value
      this.getData()
    },
    changePagination(val) {
      this.moreParams.rowsNumber = val.pagination.rowsPerPage
      this.moreParams.rowsPerPage = val.pagination.rowsPerPage
      this.getData()
    },
    addPage() {
      this.moreParams.page += 1
      this.getData()
    },
    restPage() {
      if (this.moreParams.page !== 1) {
        this.moreParams.page -= 1
        this.getData()
      }
    },
    async getTableStructure() {
      try {
        const resp = await this.$axios.get('api/v1/getTableStructure', {
          params: {
            table_name: this.tableName,
          }
        })
        this.columns = resp.data.columns
        this.filtersBag = resp.data.filters
        this.getData()
      } catch (e) {
        //
      }
    },
  },
  events: {
    'get-data'() {
      this.getData()
    }
  }
}
</script>
