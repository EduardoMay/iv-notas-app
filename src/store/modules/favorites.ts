import NotesService from "@/services/NotesService";
import { types } from "@/types/types";
import _ from "lodash";

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

    return _.filter(notes, { favorite: true });
  }
};

export const FavoritesModule = {
  namespace: true,
  state,
  actions,
  mutations,
  getters
};
