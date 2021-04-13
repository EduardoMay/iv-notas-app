import _ from "lodash";
import { createStore } from "vuex";

import { deleteFavorite, getFavorites } from "@/helpers/favorites";
import { getLabelById, getLabels, updateLabel } from "@/helpers/labels";
import { Label } from "@/interfaces/Label";
import { Note } from "@/interfaces/Note";
import { types } from "@/types/types";
import NotesService from "@/services/NotesService";
import LabelsService from "@/services/LabelsService";

const noteService = new NotesService();
const labelService = new LabelsService();

export const store = createStore({
  state() {
    return {
      notesLabels: [],
      notes: [],
      colorLabel: "#92949c",
      favorites: getFavorites(),
      labelSelected: 0
    };
  },

  // ACTIONS (asynchronous)
  actions: {
    // NOTES
    getNotes({ commit }): void {
      commit(types.GET_NOTES);
    },
    addNote({ commit }, payload): void {
      commit(types.ADD_NOTE, payload);
    },
    updateNote({ commit }, payload): void {
      commit(types.UPDATE_NOTE, payload);
    },
    deleteNote({ commit }, payload): void {
      commit(types.DELETE_NOTE, payload);
    },

    // LABELS
    addLabel({ commit }, payload) {
      commit(types.ADD_LABEL, payload);
    },
    deleteLabel({ commit }, payload) {
      commit(types.DELETE_LABEL, payload);
    },

    // FAVORITES
    addFavorite({ commit }, payload) {
      commit(types.ADD_FAVORITE, payload);
    },
    deleteFavorite({ commit }, payload) {
      commit(types.DELETE_FAVORITE, payload);
    }
  },

  // MUTATIONS (set the state)
  mutations: {
    // NOTES
    async [types.GET_NOTES](state: any) {
      state.notes = await noteService.getNotes();
    },
    [types.ADD_NOTE](state: any, payload) {
      state.notes = [...state.notes, payload.note];

      delete payload.note.id;
      noteService.saveNote(payload.note);
    },
    async [types.UPDATE_NOTE](state: any, { note }: any) {
      await noteService.update(note);

      state.notes = await noteService.getNotes();
    },
    async [types.DELETE_NOTE](state: any, payload: any) {
      await noteService.deleteNote(payload.id);

      state.notes = await noteService.getNotes();
    },

    // LABELS
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
    [types.UPDATE_LABEL](state: any, payload): void {
      updateLabel(payload.label);

      state.notesLabels = getLabels();
      state.colorLabel = "#92949c";
      state.labelSelected = 0;
    },

    // FAVORITES
    async [types.ADD_FAVORITE](state: any, payload: any): Promise<void> {
      await noteService.setFavorite(payload.note);

      state.notes = await noteService.getNotes();
    },
    [types.DELETE_FAVORITE](state: any, payload: any): void {
      state.favorites = state.favorites.filter(
        (e: Note) => e._id !== payload.id
      );

      deleteFavorite(payload.id);
    }
  },

  // Getters
  getters: {
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
    },
    getNoteBydId: () => async (id: string) => {
      return await noteService.getNoteById(id);
    }
  }
});
