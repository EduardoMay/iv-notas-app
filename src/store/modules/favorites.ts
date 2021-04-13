import { deleteFavorite, getFavorites } from "@/helpers/favorites";
import { Note } from "@/interfaces/Note";
import NotesService from "@/services/NotesService";
import { types } from "@/types/types";

const noteService = new NotesService();

const state = () => ({
  favorites: getFavorites()
});

const actions = {
  addFavorite({ commit }: any, payload: any) {
    commit(types.ADD_FAVORITE, payload);
  },
  deleteFavorite({ commit }: any, payload: any) {
    commit(types.DELETE_FAVORITE, payload);
  }
};

const mutations = {
  async [types.ADD_FAVORITE](state: any, payload: any): Promise<void> {
    await noteService.setFavorite(payload.note);

    state.notes = await noteService.getNotes();
  },
  [types.DELETE_FAVORITE](state: any, payload: any): void {
    state.favorites = state.favorites.filter((e: Note) => e._id !== payload.id);

    deleteFavorite(payload.id);
  }
};

export const FavoritesModule = {
  namespaced: true,
  state,
  actions,
  mutations
};
