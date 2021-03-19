import { LabelInterface } from "@/interfaces/LabelInterface";

export const getLabels = (): Array<LabelInterface> => {
  return localStorage.notesLabels ? JSON.parse(localStorage.notesLabels) : [];
};

export const saveLabel = (label: LabelInterface): void => {
  const labels = [...getLabels(), label];

  localStorage.setItem("notesLabels", JSON.stringify(labels));
};

export const deleteLabel = (label: LabelInterface): void => {
  const labels = getLabels().filter((e) => e.id !== label.id);

  localStorage.setItem("notesLabels", JSON.stringify(labels));
};
