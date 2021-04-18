import _ from "lodash";

import { Label } from "@/interfaces/Label";
import { Note } from "@/interfaces/Note";
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
  async addNote({ commit }: any, { note }: any): Promise<void> {
    await noteService.saveNote(note);

    commit(types.GET_NOTES);
    commit(types.GET_LABELS);
  },
  async updateNote({ commit }: any, { note }: any): Promise<void> {
    await noteService.update(note);

    commit(types.GET_NOTES);
    commit(types.GET_LABELS);
  },
  deleteNote({ commit }: any, payload: any): void {
    commit(types.DELETE_NOTE, payload);
  }
};

const mutations = {
  async [types.GET_NOTES](state: any) {
    state.notes = await noteService.getNotes();
  },
  async [types.DELETE_NOTE](state: any, payload: any) {
    await noteService.deleteNote(payload.id);

    state.notes = await noteService.getNotes();
  }
};

const getters = {
  getNoteBydId: (state: any) => (id: string) => {
    return _.find(state.notes, { _id: id });
  },
  notes: (state: any, getters: any, rootState: any) => {
    const notes: Note[] = state.notes;
    const labels: Label[] = rootState.LabelsModule.labels;

    return notes.map((note: Note) => {
      const { label: idLabel } = note;

      const label = _.find(labels, { _id: idLabel });

      if (label) {
        note.labelDescription = label.description;
        note.labelColor = label.color;
      }

      return note;
    });
  }
};

export const NotesModule = {
  namespace: true,
  state,
  actions,
  mutations,
  getters
};
