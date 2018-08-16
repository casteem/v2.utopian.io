export const setUser = (state, user = null) => {
  state.user = user ? JSON.parse(JSON.stringify(user)) : user
}

export const setCredentials = (state, credentials = null) => {
  state.credentials = credentials
}

export const clear = (state) => {
  state.user = null
  state.credentials = []
}
