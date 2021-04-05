import { addNote, deleteNote, getNotes, updateNote } from "@/helpers/notes";
import { NoteInterface } from "@/interfaces/NoteInterface";
import { types } from "@/types/types";

const state = () => ({
  notes: getNotes(),
  labelSelected: 0
});

const actions = {
  getNotes({ commit }: any): void {
    commit(types.GET_NOTES);
  },
  addNote({ commit }: any, payload: any): void {
    commit(types.ADD_NOTE, payload);
  },
  updateNote({ commit }: any, payload: any): void {
    commit(types.UPDATE_NOTE, payload);
  },
  deleteNote({ commit }: any, payload: any): void {
    commit(types.DELETE_NOTE, payload);
  }
};

const mutations = {
  [types.GET_NOTES](state: any) {
    state.notes = getNotes();
  },
  [types.ADD_NOTE](state: any, payload: any) {
    state.notes = [...state.notes, payload.note];

    addNote(payload.note);
  },
  [types.UPDATE_NOTE](state: any, { note }: any) {
    state.notes = state.notes.map((n: NoteInterface) => {
      if (n.id === note.id) {
        n.title = note.title;
        n.description = note.description;
      }

      return n;
    });

    updateNote(note);
  },
  [types.DELETE_NOTE](state: any, payload: any) {
    state.notes = state.notes.filter((e: NoteInterface) => e.id !== payload.id);

    deleteNote(payload.id);
  }
};

export default {
  namespace: true,
  state,
  actions,
  mutations
};
