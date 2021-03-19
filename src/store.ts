import { createStore } from "vuex";
import { deleteLabel, getLabels, saveLabel } from "./helpers/labels";
import { LabelInterface } from "@/interfaces/LabelInterface";
import { types } from "@/types/types";

export const store = createStore({
  state() {
    return {
      notesLabels: getLabels()
    };
  },

  // ACTIONS (asynchronous)
  actions: {
    addLabel({ commit }, payload) {
      commit(types.ADD_LABEL, payload);
    },
    deleteLabel({ commit }, payload) {
      commit(types.DELETE_LABEL, payload);
    }
  },

  // MUTATIONS (set the state)
  mutations: {
    [types.ADD_LABEL](state: any, payload: any) {
      state.notesLabels = [...state.notesLabels, payload.label];

      saveLabel(payload.label);
    },
    [types.DELETE_LABEL](state: any, payload: any): void {
      state.notesLabels = state.notesLabels.filter(
        (e: LabelInterface) => e.id !== payload.label.id
      );

      deleteLabel(payload.label);
    }
  }
});
