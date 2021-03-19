import { LabelInterface } from "@/interfaces/LabelInterface";

export const getLabels = (): Array<LabelInterface> => {
  return localStorage.notesLabels ? JSON.parse(localStorage.notesLabels) : [];
};

export const saveLabel = (label: LabelInterface): void => {
  const labels = [...getLabels(), label];

  localStorage.setItem("notesLabels", JSON.stringify(labels));
};
