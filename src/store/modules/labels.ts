import _ from "lodash";

import { getLabelById, getLabels, updateLabel } from "@/helpers/labels";
import { Label } from "@/interfaces/Label";
import { Note } from "@/interfaces/Note";
import LabelsService from "@/services/LabelsService";
import { types } from "@/types/types";

const labelService = new LabelsService();

const state = () => ({
  notesLabels: [],
  colorLabel: "#92949c",
  labelSelected: 0
});

const actions = {
  addLabel({ commit }: any, payload: any) {
    commit(types.ADD_LABEL, payload);
  },
  deleteLabel({ commit }: any, payload: any) {
    commit(types.DELETE_LABEL, payload);
  }
};

const mutations = {
  async [types.GET_LABELS](state: any) {
    state.notesLabels = await labelService.getLabels();
  },
  async [types.ADD_LABEL](state: any, payload: any) {
    await labelService.saveLabel(payload.label);

    state.notesLabels = await labelService.getLabels();
  },
  async [types.DELETE_LABEL](state: any, { _id }: any): Promise<any> {
    await labelService.deleteLabel(_id);

    state.notesLabels = await labelService.getLabels();
  },
  [types.SET_COLOR_LABEL](state: any, payload: any): void {
    state.colorLabel = payload.color;
  },
  [types.LABEL_SELECTED](state: any, payload: any): void {
    state.labelSelected = payload.id;
    state.colorLabel = getLabelById(payload.id)?.color;
  },
  [types.UPDATE_LABEL](state: any, payload: any): void {
    updateLabel(payload.label);

    state.notesLabels = getLabels();
    state.colorLabel = "#92949c";
    state.labelSelected = 0;
  }
};

const getters = {
  getNotesByIdLabel: (state: any) => {
    return state.notesLabels.map((label: Label) => {
      label.count = state.notes.filter(
        (note: Note) => note.label === label._id
      ).length;

      return label;
    });
  },
  getLabelById: (state: any) => (id: any) => {
    const label: Label = { _id: 0, description: "", color: "#92949c" };

    if (id === 0) return label;

    const obj = _.find(state.notesLabels, { id });

    if (obj) {
      return obj;
    } else {
      return label;
    }
  }
};

export const LabelsModule = {
  namespace: true,
  state,
  actions,
  mutations,
  getters
};
