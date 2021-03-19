import { createStore } from "vuex";

export const store = createStore({
  state() {
    return {
      notesLabels: localStorage.notesLabels
        ? JSON.parse(localStorage.notesLabels)
        : []
    };
  },

  // ACTIONS (asynchronous)
  actions: {
    addLabel({ commit }, payload) {
      commit("addLabel", payload);
    }
  },

  // MUTATIONS (set the state)
  mutations: {
    addLabel(state: any, payload: any) {
      state.notesLabels = [...state.notesLabels, payload.label];
    }
  }
});
