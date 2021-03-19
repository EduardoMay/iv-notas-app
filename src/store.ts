import { createStore } from "vuex";
import { getLabels, saveLabel } from "./helpers/labels";

export const store = createStore({
  state() {
    return {
      notesLabels: getLabels()
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

      saveLabel(payload.label);
    }
  }
});
