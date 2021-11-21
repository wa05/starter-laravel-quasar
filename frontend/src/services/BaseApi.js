import Vue from 'vue'
import {
  Loading,
  Notify
} from 'quasar'


export default {
  get(url, params) {
    Loading.show()
    return Vue.prototype.$axios({
        method: 'GET',
        url: url,
        params: params,
      })
      .then((resp) => {
        if (!resp.data) {
          return null
        }
        return resp.data
      }).catch((err) => {
        console.log(err)
        // show alert
      })
      .finally(() => {
        Loading.hide()
        Vue.prototype.$events.fire('unblock-ui')
      })
  },
  post(url, params) {
    Loading.show()
    return Vue.prototype.$axios.post(
      url, params
    )
      .then((resp) => {
        if (!resp.data) {
          return null
        }
        return resp.data
      }).catch((err) => {
        if (err.response && err.response.data && err.response.data.errors &&
          err.response.data.errors.email) {
          if (err.response.data.errors.email[0] === "The email has already been taken.") {
            Notify.create({
              message: 'El email ya se encuentra registrado.'
            })
          }
        }
        console.log(err)
        // show alert
      })
      .finally(() => {
        Loading.hide()

        Vue.prototype.$events.fire('unblock-ui')
      })
  },
  delete(url) {
    return Vue.prototype.$axios.delete(url)
      .then((resp) => {
        if (!resp.data) {
          return null
        }
        return resp.data
      }).catch((err) => {
        console.log(err)
        // show alert
      })
      .finally(() => {
        Vue.prototype.$events.fire('unblock-ui')
      })
  }
}
