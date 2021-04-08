import _ from "lodash";
import { createStore } from "vuex";

import { addFavorite, deleteFavorite, getFavorites } from "@/helpers/favorites";
import {
  deleteLabel,
  getLabelById,
  getLabels,
  saveLabel,
  updateLabel
} from "@/helpers/labels";
import { updateNote } from "@/helpers/notes";
import { LabelInterface } from "@/interfaces/LabelInterface";
import { NoteInterface } from "@/interfaces/NoteInterface";
import { types } from "@/types/types";
import NotesService from "@/services/NotesService";

const noteService = new NotesService();

export const store = createStore({
  state() {
    return {
      notesLabels: getLabels(),
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
    [types.ADD_LABEL](state: any, payload: any) {
      state.notesLabels = [...state.notesLabels, payload.label];

      saveLabel(payload.label);
    },
    [types.DELETE_LABEL](state: any, payload: any): void {
      state.notesLabels = state.notesLabels.filter(
        (e: LabelInterface) => e.id !== payload.label.id
      );

      deleteLabel(payload.label);
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
    [types.ADD_FAVORITE](state: any, payload: any): void {
      state.favorites = [...state.favorites, payload.favorite];

      addFavorite(payload.favorite);
    },
    [types.DELETE_FAVORITE](state: any, payload: any): void {
      state.favorites = state.favorites.filter(
        (e: NoteInterface) => e.id !== payload.id
      );

      deleteFavorite(payload.id);
    }
  },

  // Getters
  getters: {
    getNotesByIdLabel: (state: any) => {
      return state.notesLabels.map((label: LabelInterface) => {
        label.count = state.notes.filter(
          (note: NoteInterface) => note.label === label.id
        ).length;

        return label;
      });
    },
    getLabelById: (state: any) => (id: any) => {
      const label: LabelInterface = { id: 0, name: "", color: "#92949c" };

      if (id === 0) return label;

      const obj = _.find(state.notesLabels, { id });

      if (obj) {
        return obj;
      } else {
        return label;
      }
    },
    getNoteBydId: (state: any) => async (id: string) => {
      return await noteService.getNoteById(id);
    }
  }
});
