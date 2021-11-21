import apiModel from '../../services/api/Cultivo'

export async function getCultivosForSelect(context, params) {
  const resp = await apiModel.forSelect(params)
  context.commit('FOR_SELECT', resp)
}

