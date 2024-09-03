import { createStore } from "vuex";

export default createStore({
  state: {
    id:'',
    product: '',
  },
  getters: {
    getProduct(state) {
      return state.product;
    },
  },
  mutations: {
    setProduct(state, value) {
      state.product = value;
    },
  },
  actions: {},
  modules: {},
});
