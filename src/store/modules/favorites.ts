import _ from "lodash";

import { Label } from "@/interfaces/Label";
import { Note } from "@/interfaces/Note";
import NotesService from "@/services/NotesService";
import { types } from "@/types/types";

const noteService = new NotesService();

const state = () => ({
  favorites: []
});

const actions = {
  async addFavorite({ commit }: any, payload: any) {
    await commit(types.ADD_FAVORITE, payload);
  },
  async deleteFavorite({ commit }: any, payload: any) {
    await commit(types.ADD_FAVORITE, payload);
  }
};

const mutations = {
  async [types.ADD_FAVORITE](state: any, { note }: any): Promise<void> {
    await noteService.setFavorite(note);
  }
};

const getters = {
  getFavorites: (state: any, getters: any, rootState: any) => {
    const notes = rootState.NotesModule.notes;
    const labels: Label[] = rootState.LabelsModule.labels;

    const favorites: Note[] = _.filter(notes, { favorite: true });

    return favorites.map((note: Note) => {
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

export const FavoritesModule = {
  namespace: true,
  state,
  actions,
  mutations,
  getters
};
