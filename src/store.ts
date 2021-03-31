import _ from "lodash";
import { createStore } from "vuex";

import { addFavorite, deleteFavorite, getFavorites } from "@/helpers/favorites";
import {
	deleteLabel,
	getLabelById,
	getLabels,
	saveLabel,
	updateLabel
} from "@/helpers/labels";
import { addNote, deleteNote, getNotes, updateNote } from "@/helpers/notes";
import { LabelInterface } from "@/interfaces/LabelInterface";
import { NoteInterface } from "@/interfaces/NoteInterface";
import { types } from "@/types/types";

export const store = createStore({
	state() {
		return {
			notesLabels: getLabels(),
			notes: getNotes(),
			colorLabel: "#92949c",
			favorites: getFavorites(),
			labelSelected: 0
		};
	},

	// ACTIONS (asynchronous)
	actions: {
		// NOTES
		getNotes({ commit }): void {
			commit(types.GET_NOTES);
		},
		addNote({ commit }, payload): void {
			commit(types.ADD_NOTE, payload);
		},
		updateNote({ commit }, payload): void {
			commit(types.UPDATE_NOTE, payload);
		},
		deleteNote({ commit }, payload): void {
			commit(types.DELETE_NOTE, payload);
		},

		// LABELS
		addLabel({ commit }, payload) {
			commit(types.ADD_LABEL, payload);
		},
		deleteLabel({ commit }, payload) {
			commit(types.DELETE_LABEL, payload);
		},

		// FAVORITES
		addFavorite({ commit }, payload) {
			commit(types.ADD_FAVORITE, payload);
		},
		deleteFavorite({ commit }, payload) {
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
		[types.LABEL_SELECTED](state: any, payload: any): void {
			state.labelSelected = payload.id;
			state.colorLabel = getLabelById(payload.id)?.color;
		},
		[types.UPDATE_LABEL](state: any, payload): void {
			updateLabel(payload.label);

			state.notesLabels = getLabels();
			state.colorLabel = "#92949c";
			state.labelSelected = 0;
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
				label.count = state.notes.filter(
					(note: NoteInterface) => note.label === label.id
				).length;

				return label;
			});
		},
		getLabelById: (state: any) => (id: any) => {
			const label: LabelInterface = { id: 0, name: "", color: "#92949c" };

			if (id === 0) return label;

			const obj = _.find(state.notesLabels, { id });

			if (obj) {
				return obj;
			} else {
				return label;
			}
		}
	}
});
