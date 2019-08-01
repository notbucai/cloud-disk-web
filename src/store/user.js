const user = {
  namespaced: true,
  state: {
    user: {
      username: '计协'
    },
    token: localStorage.getItem('token')
  },
  mutations: {
    TOKEN(store, data) {
      store.token = data;
    },
    USER(store, data) {
      store.user = data;
    }
  },
  actions: {
    setToken({ commit }, token) {
      commit('TOKEN', token);
    },
    setUser({ commit }, data) {
      commit('USER', data);
    },
    handleQuit({ commit }) {
      commit('TOKEN', null);
      localStorage.setItem('token', '');
    }
  },
  getters: {}
};

export default user;