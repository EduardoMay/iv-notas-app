import _ from "lodash";

import {
	deleteLabel,
	getLabelById,
	getLabels,
	saveLabel,
	updateLabel
} from "@/helpers/labels";
import { LabelInterface } from "@/interfaces/LabelInterface";
import { NoteInterface } from "@/interfaces/NoteInterface";
import { types } from "@/types/types";

const state = () => ({
	notesLabels: getLabels(),
	colorLabel: "#92949c",
	labelSelected: 0
});

const actions = {
	addLabel({ commit }: any, payload: any) {
		commit(types.ADD_LABEL, payload);
	},
	deleteLabel({ commit }: any, payload: any) {
		commit(types.DELETE_LABEL, payload);
	}
};

const mutations = {
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
	[types.UPDATE_LABEL](state: any, payload: any): void {
		updateLabel(payload.label);

		state.notesLabels = getLabels();
		state.colorLabel = "#92949c";
		state.labelSelected = 0;
	}
};

const getters = {
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
};

export default {
	namespaced: true,
	state,
	actions,
	mutations,
	getters
};
