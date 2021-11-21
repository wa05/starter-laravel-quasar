import moment from 'moment'

moment.locale('es')

export default {
  methods: {
    focusOn(toFocus) {
      if (document.getElementById(toFocus)) {
        document.getElementById(toFocus).focus()
      }
    },
    zfill(number, width) {
      const numberOutput = Math.abs(number); /* Valor absoluto del número */
      const length = number.toString().length; /* Largo del número */
      const zero = '0'; /* String de cero */

      if (width <= length) {
        if (number < 0) {
          return (`-${numberOutput.toString()}`)
        }
        return numberOutput.toString();
      }
      if (number < 0) {
        return (`-${(zero.repeat(width - length)) + numberOutput.toString()}`);
      }
      return ((zero.repeat(width - length)) + numberOutput.toString());
    },
    currencyFormat(num, toFixed = 2) {
      if (typeof num === 'string') {
        // num = num.replace(',', '|')
        // num = num.replace('.', ',')
        // num = num.replace('|', '.')
        num = parseFloat(num)
      }
      if (!num && num !== 0) {
        return ''
      }
      return (
        num
          .toFixed(toFixed) // always two decimal digits
          .replace('.', ',') // replace decimal point character with ,
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
      ) // use . as a separator
    },
    convertToNumber(value) {
      if (typeof value === 'number') {
        return value
      }
      if (value.includes(',')) {
        value = value.replace(',', '.')
      }
      return parseFloat(value)
    },
    async getDataFromSection(section, fields = []) {
      try {
        this.loading = true
        const resp = await this.$axios.get(`api/v1/parameters/fromSection/${section}`,
          {
            params: {
              fields: fields
            }
          })
        if (fields.length) {
          for (let i = 0; i < resp.data.section_data.length; i += 1) {
            for (let j = 0; j < fields.length; j += 1) {
              if (fields[j] === resp.data.section_data[i].description) {
                this.form[fields[j]] = resp.data.section_data[i].value
              }
            }
            if (typeof this.form[resp.data.section_data[i].description] !== 'undefined') {
              this.form[resp.data.section_data[i].description] = resp.data.section_data[i].value
            }
          }
        } else {
          for (let i = 0; i < resp.data.section_data.length; i += 1) {
            if (typeof this.form[resp.data.section_data[i].description] !== 'undefined') {
              this.form[resp.data.section_data[i].description] = resp.data.section_data[i].value
            }
          }
        }
      } catch (e) {
        //
      } finally {
        this.loading = false
      }
    },
    momentPlusFrom(date) {
      return date ? `${moment(date).format('DD/MM/YYYY HH:mm')}` : ''
      // ${moment(date).fromNow()
    },
    toDate(date) {
      // console.log(date)
      return date ? moment(date).format('DD/MM/YYYY') : ''
    },
    parseDesc(string, max, ifnot) {
      if (string) {
        if (string.length > max) {
          return `${string.substr(0, max)} ...`
        }
        return string
      }
      return ifnot
    },
    parsedText(text, large = 27) {
      if (!text) {
        return ''
      }
      let value = text
      if (value.length > large) {
        value = text.substr(0, large)
        value = `${value} ...`
      }
      return value
    },
    filterChange(index, val) {
      this.filtersBag[index].value = val
      if (typeof this.moreParams[this.filtersBag[index].name] !== 'undefined') {
        this.moreParams[this.filtersBag[index].name] = val
      }
      if (this.pagination && this.pagination.page) {
        this.pagination.page = 1
      }
      this.$events.fire('reload-table', `${this.model}-table`)
    },
    toTime: (date) => moment(date).format('HH:mm:ss'),
  },
  filters: {
    momentPlusFrom(date) {
      return date ? `${moment(date).format('DD/MM/YYYY')} <br><small> ${moment(date).fromNow()}</small>` : ''
    },
  },
  events: {
  }
}
