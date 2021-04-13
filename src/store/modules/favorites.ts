import NotesService from "@/services/NotesService";
import { types } from "@/types/types";

const noteService = new NotesService();

const state = () => ({
  favorites: []
});

const actions = {
  async addFavorite({ commit }: any, payload: any) {
    await commit(types.ADD_FAVORITE, payload);
    await commit(types.GET_NOTES);
  },
  deleteFavorite({ commit }: any, payload: any) {
    commit(types.ADD_FAVORITE, payload);
  }
};

const mutations = {
  async [types.ADD_FAVORITE](state: any, { note }: any): Promise<void> {
    await noteService.setFavorite(note);
  }
};

export const FavoritesModule = {
  namespace: true,
  state,
  actions,
  mutations
};
