<template>
  <span :class="propClass">
    <q-input
      dense
      filled
      :label="propLabel"
      :value="value"
      @input="(value) => $emit(`update:${propKey}`, value)"
      mask="date"
      :hint="hintToShow"
      :error="error"
      :rules="['date']"
    >
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
            <q-date
              :error="error"
              :locale="myLocale"
              :options="checkDate"
              :value="value"
              @input="sendInput"
            />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </span>
</template>

<script>
  import {QDate, QInput, QPopupProxy} from 'quasar'
  import moment from 'moment'

  export default {
    name: 'DatePicker',
    components: {
      QDate, QInput, QPopupProxy
    },
    props: {
      propKey: {
        type: String,
        required: true
      },
      disabledDays: {
        type: Array,
        default: () => [],
        required: false,
      },
      fromDate: {
        type: String,
        required: false,
        default: 'tomorrow'
      },
      propLabel: {
        type: String,
        required: false,
        default: 'Selecccione fecha'
      },
      value: {
        required: true,
        default: null
      },
      propClass: {
        required: false,
        default: ''
      },
      error: {
        required: false,
        default: false
      },
      minDate: {
        required: false,
        default: null
      },
      maxDate: {
        required: false,
        default: null
      },
    },
    data() {
      return {
        myLocale: {
          /* starting with Sunday */
          days: 'Domingo_Lunes_Martes_Miércoles_Jueves_Viernes_Sábado'.split('_'),
          daysShort: 'Dom_Lun_Mar_Mié_Jue_Vie_Sáb'.split('_'),
          months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
          monthsShort: 'Ene_Feb_Mar_Abr_May_Jun_Jul_Ago_Sep_Oct_Nov_Dic'.split('_'),
          firstDayOfWeek: 1,
          enabled: true // todelete
        }
      }
    },
    computed: {
      hintToShow() {
        const maxDate = this.maxDate ? `Disponible hasta ${this.momented(this.maxDate).format('YYYY/MM/DD')}` : ''
        const minDate = this.minDate ? `Disponible desde ${this.momented(this.minDate).format('YYYY/MM/DD')}` : ''
        if (this.propLabel === 'Fecha hasta') {
          return maxDate
        }
        return minDate
      },
      todayDate() {
        if(this.minDate) {
          return moment(this.minDate).format('YYYY/MM/DD')
        }
        return moment().format('YYYY/MM/DD')
      }
    },
    methods: {
      momented(value) {
        return moment(value)
      },
      sendInput(value) {
        this.$emit(`update:${this.propKey}`, value)
        this.$refs.qDateProxy.hide()
      },
      checkDate(date) {
        try {
          let dateToReturn = true

          const momentedDate = moment(date)
          const momentedToday = moment()
          let minDate = null
          if (this.minDate) {
            minDate = moment(this.minDate)
          }
          switch (this.fromDate) {
            case 'today':
              dateToReturn = momentedDate >= momentedToday
              break
            case 'tomorrow':
              dateToReturn = momentedDate > momentedToday
              break
          }
          if (!dateToReturn && this.propLabel === 'Fecha desde') {
            return false
          }
          if (this.disabledDays && this.disabledDays.length) {
            dateToReturn = !this.disabledDays.includes(date);
            if (!dateToReturn) {
              return false
            }
          }

          if (minDate) {
            dateToReturn = momentedDate > minDate
          }
          if (!dateToReturn) {
             return false
          }
          if (this.maxDate && this.propLabel === 'Fecha hasta') {
            dateToReturn = momentedDate < moment(this.maxDate)
          }

          return dateToReturn
        } catch (e) {
          return false
        }
      }
    },
    events: {}
  }
</script>

<style scoped>

</style>
