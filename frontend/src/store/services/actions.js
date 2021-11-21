import services from '../../services/api/Service'

export async function getMyServices(context, params) {
  const resp = await services.myServices(params)
  context.commit('MY_SERVICES', resp)
}

export async function filterServices(context, params) {
  const resp = await services.filterServices(params)
  context.commit('HOME_SERVICES', resp.data)
}
export async function servicesByCity(context, params) {
  context.commit('BY_CITIES_MAP', [])
  context.commit('SET_LOADING_BY_CITIES', true)

  const resp = await services.servicesByCity(params)
  context.commit('BY_CITIES_MAP', resp.data)
  context.commit('SET_LOADING_BY_CITIES', false)
}

export async function getPublicationDetail(context, params) {
  const resp = await services.getPublicationDetail(params)
  context.commit('GET_PUBLICATION_DETAIL', resp.data)
  return resp.data
}

export async function toggleDelete(context, id) {
  context.commit('TOGGLE_DELETE_MODAL', id)
}

export async function deleteService({dispatch}, id) {
  const resp = await services.deleteService(id)
  dispatch('getMyServices')
}

export async function requestService(context, params) {
  const resp = await services.requestService(params)
  context.commit('RELOAD_SERVICE_DATA')
}

