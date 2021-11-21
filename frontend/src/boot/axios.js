import axios from "axios";

export default async ({ app, router, Vue }) => {
  axios.interceptors.response.use(response => response, error => {
    const { status } = error.response
    if (status >= 500) {
      //
    }
    if (status === 422 ) {
      //
    }
    if (status === 400) {
      // router.push({ name: 'login' })
      // Vue.auth.logout({
      //   redirect: 'login'
      // })
    }
    if (status === 401) {
      router.push({ name: 'login' })
    }

    return Promise.reject(error)
  })

  axios.defaults.baseURL = process.env.API_URL;

  Vue.prototype.$axios = axios;
};
