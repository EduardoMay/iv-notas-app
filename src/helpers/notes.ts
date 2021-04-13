import { Note } from "@/interfaces/Note";

/**
 * Get all notes
 *
 * @return  {Array<Note>}
 */
export const getNotes = (): Array<Note> => {
  return localStorage.notas ? JSON.parse(localStorage.notas) : [];
};

/**
 * Get note
 *
 * @param   {number}         id
 *
 * @return  {Note | undefined}
 */
export const getNote = (id: string): Note => {
  const note: Note | any = getNotes().find((e: Note) => e._id === id);

  return note;
};

/**
 * Add note
 *
 * @param   {Note}  note
 *
 * @return  {void}
 */
export const addNote = (note: Note): void => {
  const notes: Note[] = [...getNotes(), note];

  localStorage.setItem("notas", JSON.stringify(notes));
};

/**
 * Update note
 *
 * @param   {Note}  note
 *
 * @return  {void}
 */
export const updateNote = (note: Note): void => {
  const notes: Array<Note> = getNotes().map((n: Note) => {
    if (n._id === note._id) {
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
export const deleteNote = (id: string): void => {
  const notes = getNotes().filter((e) => e._id !== id);

  localStorage.setItem("notas", JSON.stringify(notes));
};
