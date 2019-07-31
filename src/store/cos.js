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
    async getAllObjs({ commit }) {
      commit('OBJS', {});
    }
  },
  getters: {}
};

export default cos;