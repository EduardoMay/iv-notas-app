import _ from "lodash";

import { LabelInterface } from "@/interfaces/LabelInterface";
import { NoteInterface } from "@/interfaces/NoteInterface";

import { getNotes } from "./notes";

/**
 * Get Labels
 *
 * @return  {Array<LabelInterface>}
 */
export const getLabels = (): Array<LabelInterface> => {
	return localStorage.notesLabels ? JSON.parse(localStorage.notesLabels) : [];
};

/**
 * Get Label By Id
 *
 * @param   {number}          id
 *
 * @return  {LabelInterface}
 */
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

/**
 * Save Label
 *
 * @param   {LabelInterface}  label
 *
 * @return  {void}
 */
export const saveLabel = (label: LabelInterface): void => {
	const labels = [...getLabels(), label];

	localStorage.setItem("notesLabels", JSON.stringify(labels));
};

/**
 * Delete Label
 *
 * @param   {LabelInterface}  label
 *
 * @return  {void}
 */
export const deleteLabel = (label: LabelInterface): void => {
	const labels = getLabels().filter((e) => e.id !== label.id);

	localStorage.setItem("notesLabels", JSON.stringify(labels));
};

/**
 * Select Notes By Id Label
 *
 * @param   {number[]}         id
 *
 * @return  {NoteInterface[]}
 */
export const selectNotesByIdLabel = (id: number): NoteInterface[] => {
	return getNotes().filter((note) => note.label === id);
};

/**
 * Updated Label
 *
 * @param   {LabelInterface}  label
 *
 * @return  {void}
 */
export const updateLabel = (label: LabelInterface): void => {
	const labels: Array<LabelInterface> = getLabels().map((l) => {
		if (l.id === label.id) {
			l.name = label.name;
			l.color = label.color;
		}

		return l;
	});

	localStorage.setItem("notesLabels", JSON.stringify(labels));
};
