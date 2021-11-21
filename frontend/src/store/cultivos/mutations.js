/*
export function someMutation (state) {
}
*/
export function FOR_SELECT (state, data) {
  state.forSelect.data = data
  state.forSelect.loading = false
}
