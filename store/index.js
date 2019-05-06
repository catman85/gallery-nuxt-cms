//Global vars
export const state = () => ({
  lang: null,
})

export const mutations = {
  SET_LANG(state, value) {
    console.log('SET_LANG', value)
    state.lang = value
  }
}
