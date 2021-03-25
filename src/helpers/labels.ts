import _ from "lodash";

import { LabelInterface } from "@/interfaces/LabelInterface";
import { NoteInterface } from "@/interfaces/NoteInterface";

import { getNotes } from "./notes";

export const getLabels = (): Array<LabelInterface> => {
	return localStorage.notesLabels ? JSON.parse(localStorage.notesLabels) : [];
};

// TODO PASAR ESTAR FUNCIÓN EN LOS GETTER DEL STORE
export const getLabelById = (id: number): LabelInterface => {
	const label: LabelInterface = { id: 0, name: "", color: "#92949c" };

	if (id === 0) return label;

	const obj = _.find(getLabels(), { id });

	if (obj) {
		return obj;
	} else {
		return label;
	}
};

export const saveLabel = (label: LabelInterface): void => {
	const labels = [...getLabels(), label];

	localStorage.setItem("notesLabels", JSON.stringify(labels));
};

export const deleteLabel = (label: LabelInterface): void => {
	const labels = getLabels().filter((e) => e.id !== label.id);

	localStorage.setItem("notesLabels", JSON.stringify(labels));
};

export const selectNotesByIdLabel = (id: number): NoteInterface[] => {
	return getNotes().filter((note) => note.label === id);
};
