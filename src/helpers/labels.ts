import _ from "lodash";

import { Label } from "@/interfaces/Label";
import { Note } from "@/interfaces/Note";

import { getNotes } from "./notes";

/**
 * Get Labels
 *
 * @return  {Array<Label>}
 */
export const getLabels = (): Array<Label> => {
  return localStorage.notesLabels ? JSON.parse(localStorage.notesLabels) : [];
};

/**
 * Get Label By Id
 *
 * @param   {number}          id
 *
 * @return  {Label}
 */
export const getLabelById = (id: number): Label => {
  const label: Label = { _id: 0, description: "", color: "#92949c" };

  if (id === 0) return label;

  const obj = _.find(getLabels(), { _id: id });

  if (obj) {
    return obj;
  } else {
    return label;
  }
};

/**
 * Save Label
 *
 * @param   {Label}  label
 *
 * @return  {void}
 */
export const saveLabel = (label: Label): void => {
  const labels = [...getLabels(), label];

  localStorage.setItem("notesLabels", JSON.stringify(labels));
};

/**
 * Delete Label
 *
 * @param   {Label}  label
 *
 * @return  {void}
 */
export const deleteLabel = (label: Label): void => {
  const labels = getLabels().filter((e) => e._id !== label._id);

  localStorage.setItem("notesLabels", JSON.stringify(labels));
};

/**
 * Select Notes By Id Label
 *
 * @param   {number[]}         id
 *
 * @return  {Note[]}
 */
export const selectNotesByIdLabel = (id: number): Note[] => {
  return getNotes().filter((note) => note.label === id);
};

/**
 * Updated Label
 *
 * @param   {Label}  label
 *
 * @return  {void}
 */
export const updateLabel = (label: Label): void => {
  const labels: Array<Label> = getLabels().map((l) => {
    if (l._id === label._id) {
      l.description = label.description;
      l.color = label.color;
    }

    return l;
  });

  localStorage.setItem("notesLabels", JSON.stringify(labels));
};
