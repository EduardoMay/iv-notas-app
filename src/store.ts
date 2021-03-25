import {createStore} from "vuex";

import {addFavorite, deleteFavorite, getFavorites} from "@/helpers/favorites";
import {deleteLabel, getLabels, saveLabel} from "@/helpers/labels";
import {addNote, deleteNote, getNotes, updateNote} from "@/helpers/notes";
import {LabelInterface} from "@/interfaces/LabelInterface";
import {NoteInterface} from "@/interfaces/NoteInterface";
import {types} from "@/types/types";

export const store = createStore({
	state() {
		return {
			notesLabels: getLabels(),
			notes: getNotes(),
			colorLabel: "#92949c",
			favorites: getFavorites()
		};
	},

	// ACTIONS (asynchronous)
	actions: {
		// NOTES
		getNotes({commit}): void {
			commit(types.GET_NOTES);
		},
		addNote({commit}, payload): void {
			commit(types.ADD_NOTE, payload);
		},
		updateNote({commit}, payload): void {
			commit(types.UPDATE_NOTE, payload);
		},
		deleteNote({commit}, payload): void {
			commit(types.DELETE_NOTE, payload);
		},

		// LABELS
		addLabel({commit}, payload) {
			commit(types.ADD_LABEL, payload);
		},
		deleteLabel({commit}, payload) {
			commit(types.DELETE_LABEL, payload);
		},

		// FAVORITES
		addFavorite({commit}, payload) {
			commit(types.ADD_FAVORITE, payload);
		},
		deleteFavorite({commit}, payload) {
			commit(types.DELETE_FAVORITE, payload);
		}
	},

	// MUTATIONS (set the state)
	mutations: {
		// NOTES
		[types.GET_NOTES](state: any) {
			state.notes = getNotes();
		},
		[types.ADD_NOTE](state: any, payload) {
			state.notes = [...state.notes, payload.note];

			addNote(payload.note);
		},
		[types.UPDATE_NOTE](state: any, payload: any) {
			state.notes = state.notes.map((n: NoteInterface) => {
				if (n.id === payload.note.id) {
					n.titulo = payload.note.titulo;
					n.nota = payload.note.nota;
				}

				return n;
			});

			updateNote(payload.note);
		},
		[types.DELETE_NOTE](state: any, payload: any) {
			state.notes = state.notes.filter(
				(e: NoteInterface) => e.id !== payload.id
			);

			deleteNote(payload.id);
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
				label.count = state.notes.filter((note: NoteInterface) => note.label === label.id).length;

				return label;
			})
		}
	}
});
