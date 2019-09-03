//Global vars
export const state = () => ({
  lang: 'en', // default language
});

export const mutations = {
  SET_LANG(state, value) {
    console.log('SET_LANG', value);
    state.lang = value;
  }
};
