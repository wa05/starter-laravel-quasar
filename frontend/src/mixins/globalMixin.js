import moment from 'moment'

moment.locale('es')

export default {
  methods: {
    momentPlusFrom (date) {
      return date ? moment(date).format('DD/MM/YYYY') +
        '<br><small>' + moment(date).fromNow() + '<small>' : ' - '
    },
    imageFullPath(userId, imageName) {
      return `${this.appPath}/img/users/${userId}/${imageName}`
    },
    parseDate(datae, withHour = true, format = 'D-M-Y') {
      if (withHour) {
        return moment(datae).format('D-M-Y H:m')
      }
      return moment(datae).format(format)
    },
    toDate (date) {
      // console.log(date)
      return date ? moment(date).format('DD/MM/YYYY') : ''
    },
    parseDesc(string, max, ifnot) {
      if(string) {
        if(string.length > max) {
          return `${string.substr(0, max)} ...`
        } else {
          return string
        }
      }
      return ifnot
    },
    toTime: (date) => date ? moment(date).format('HH:mm:ss') : '',

  },
  filters: {
    momentPlusFrom (date) {
      return date ? moment(date).format('DD/MM/YYYY') +
        ' (' + moment(date).fromNow() + ')' : ''
    }
  }
}
