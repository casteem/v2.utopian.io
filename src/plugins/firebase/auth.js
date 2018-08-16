/**
 * Whenever the authentication state is changed this method is called
 * it occurs when
 *   - firebase is initiated it then load the current user that is locally stored
 *   - a user is login into the app
 *
 * @param {firebase.app.App}  firebase  Firebase application instance to configure.
 * @param {Store}             store     Vuex store instance.
 */

const configureAuth = (firebase, store) => {
  firebase.auth().onAuthStateChanged(async (user) => {
    if (user && user.uid) {
      const login = firebase.functions().httpsCallable('api/auth/login')
      const response = await login(user.toJSON())
      store.commit('auth/setUser', {
        id: response.data.id,
        displayName: response.data.displayName,
        photoURL: response.data.photoURL
      })
      store.dispatch('prepareEncryption')
        .then(() => store.dispatch('auth/loadCredentials', null, { root: true }))
        .catch(() => {})
    }
  })
}

export default configureAuth
