export function MY_SERVICES (state, data) {
  state.myServices.data = data
  state.myServices.loading = false
}
export function HOME_SERVICES (state, data) {
  state.homeServices.data = data
  state.homeServices.loading = false
}
export function BY_CITIES_MAP (state, data) {
  state.mapServices.data = data
  state.mapServices.loading = false
}

export function SET_LOADING_BY_CITIES(state, data) {
  state.mapServices.loading = data
}

export function GET_PUBLICATION_DETAIL (state, data) {
  state.publicationDetail.data = data
  state.publicationDetail.loading = false
}
export function TOGGLE_DELETE_MODAL (state, id) {
  state.myServices.data.data.find((item) => item.id === id).show_delete =
    !state.myServices.data.data.find((item) => item.id === id).show_delete
}

