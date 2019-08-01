const cos = {
  namespaced: true,
  state: {
    objs: {}
  },
  mutations: {
    OBJS(state, data) {
      state.objs = data;
    }
  },
  actions: {
    async setAllObjs({ commit }, data) {
      commit('OBJS', data);
    }
  },
  getters: {}
};

export default cos;