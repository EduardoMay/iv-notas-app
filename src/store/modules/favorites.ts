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
    await commit(types.GET_NOTES);
  },
  async deleteFavorite({ commit }: any, payload: any) {
    await commit(types.ADD_FAVORITE, payload);
    await commit(types.GET_NOTES);
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

    const favorites = notes.filter((note: Note) => note.favorite && note);

    return favorites;
  }
};

export const FavoritesModule = {
  namespace: true,
  state,
  actions,
  mutations,
  getters
};
