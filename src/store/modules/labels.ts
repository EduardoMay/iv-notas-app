import _ from "lodash";

import { Label } from "@/interfaces/Label";
import LabelsService from "@/services/LabelsService";
import { types } from "@/types/types";

const labelService = new LabelsService();

const state = () => ({
  labels: [],
  colorLabel: "#92949c",
  labelSelected: ""
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
    state.labels = await labelService.getLabels();
  },
  async [types.ADD_LABEL](state: any, payload: any) {
    await labelService.saveLabel(payload.label);

    state.labels = await labelService.getLabels();
  },
  async [types.DELETE_LABEL](state: any, { _id }: any): Promise<any> {
    await labelService.deleteLabel(_id);

    state.labels = await labelService.getLabels();
  },
  [types.SET_COLOR_LABEL](state: any, payload: any): void {
    state.colorLabel = payload.color;
  },
  async [types.LABEL_SELECTED](state: any, payload: any): Promise<void> {
    const label = await labelService.getLabelById(payload.id);

    state.labelSelected = payload.id;
    state.colorLabel = label.color;
  },
  async [types.UPDATE_LABEL](state: any, { label }: any): Promise<void> {
    await labelService.updateLabel(label);
  }
};

const getters = {
  getLabelById: (state: any) => (id: any) => {
    const label: Label = { description: "", color: "#92949c" };

    if (id === 0) return label;

    const obj = _.find(state.labels, { _id: id });

    if (obj) {
      return obj;
    } else {
      return label;
    }
  },
  getLabelsByIdNote: (state: any, getters: any, rootState: any) => (
    id: any
  ) => {
    const notes = rootState.NotesModule.notes;

    const notesSelected = _.filter(notes, { label: id });

    return notesSelected;
  }
};

export const LabelsModule = {
  namespace: true,
  state,
  actions,
  mutations,
  getters
};
