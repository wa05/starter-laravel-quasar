import baseApi from '../BaseApi';

export default {
  async forSelect(params = {}) {
    return await baseApi.post('api/v1/cultivos/forSelect', params)
  },
  async index(params = {}) {
    return await baseApi.get('api/v1/cultivos/resource', params)
  },
}
