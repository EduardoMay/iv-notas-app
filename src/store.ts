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
    addLabel({ commit }) {
      commit("addLabel");
    }
  },

  // MUTATIONS (set the state)
  mutations: {
    addLabel(state: any, payload: any) {
      console.log(payload);
      state.notesLabels = [...state.notesLabels, payload.label];
    }
  }
});
