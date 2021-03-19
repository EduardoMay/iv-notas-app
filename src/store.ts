import { createStore } from "vuex";
import { deleteLabel, getLabels, saveLabel } from "./helpers/labels";
import { LabelInterface } from "@/interfaces/LabelInterface";

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
    },
    deleteLabel({ commit }, payload) {
      commit("deleteLabel", payload);
    }
  },

  // MUTATIONS (set the state)
  mutations: {
    addLabel(state: any, payload: any) {
      state.notesLabels = [...state.notesLabels, payload.label];

      saveLabel(payload.label);
    },
    deleteLabel(state: any, payload: any): void {
      state.notesLabels = state.notesLabels.filter(
        (e: LabelInterface) => e.id !== payload.label.id
      );

      deleteLabel(payload.label);
    }
  }
});
