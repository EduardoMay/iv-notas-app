import NotesService from "@/services/NotesService";
import { types } from "@/types/types";

const noteService = new NotesService();

const state = () => ({
  notes: []
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
  async [types.GET_NOTES](state: any) {
    state.notes = await noteService.getNotes();
  },
  async [types.ADD_NOTE](state: any, payload: any) {
    await noteService.saveNote(payload.note);

    state.notes = await noteService.getNotes();
  },
  async [types.UPDATE_NOTE](state: any, { note }: any) {
    await noteService.update(note);

    state.notes = await noteService.getNotes();
  },
  async [types.DELETE_NOTE](state: any, payload: any) {
    await noteService.deleteNote(payload.id);

    state.notes = await noteService.getNotes();
  }
};

const getters = {
  getNoteBydId: () => async (id: string) => {
    return await noteService.getNoteById(id);
  }
};

export const NotesModule = {
  namespace: true,
  state,
  actions,
  mutations,
  getters
};
