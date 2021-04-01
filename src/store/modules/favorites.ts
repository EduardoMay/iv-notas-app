import { addFavorite, deleteFavorite, getFavorites } from "@/helpers/favorites";
import { NoteInterface } from "@/interfaces/NoteInterface";
import { types } from "@/types/types";

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
};

export default {
	namespaced: true,
	state,
	actions,
	mutations
};
