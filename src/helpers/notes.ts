import { NoteInterface } from "@/interfaces/NoteInterface";

/**
 * Get all notes
 *
 * @return  {Array<NoteInterface>}
 */
export const getNotes = (): Array<NoteInterface> => {
  return localStorage.notas ? JSON.parse(localStorage.notas) : [];
};

/**
 * Get note
 *
 * @param   {number}         id
 *
 * @return  {NoteInterface | undefined}
 */
export const getNote = (id: number): NoteInterface => {
  const note: NoteInterface | any = getNotes().find(
    (e: NoteInterface) => e.id === id
  );

  return note;
};

/**
 * Add note
 *
 * @param   {NoteInterface}  note
 *
 * @return  {void}
 */
export const addNote = (note: NoteInterface): void => {
  const notes: NoteInterface[] = [...getNotes(), note];

  localStorage.setItem("notas", JSON.stringify(notes));
};

/**
 * Update note
 *
 * @param   {NoteInterface}  note
 *
 * @return  {void}
 */
export const updateNote = (note: NoteInterface): void => {
  const notes: Array<NoteInterface> = getNotes().map((n: NoteInterface) => {
    if (n.id === note.id) {
      n.title = note.title;
      n.description = note.description;
      n.label = note.label;
    }

    return n;
  });

  localStorage.setItem("notas", JSON.stringify(notes));
};

/**
 * Delete note
 *
 * @param   {number}  id
 *
 * @return  {void}
 */
export const deleteNote = (id: number): void => {
  const notes = getNotes().filter((e) => e.id !== id);

  localStorage.setItem("notas", JSON.stringify(notes));
};
