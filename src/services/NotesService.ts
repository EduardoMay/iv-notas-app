import Axios from "@/hooks/Axios";
import { Note } from "@/interfaces/Note";

export default class NotesService {
  axios = new Axios();

  /**
   * Get all notes
   * @returns  {Array} Array of Note
   */
  public async getNotes(): Promise<Note[]> {
    const { data } = await this.axios.get("notes");

    return data;
  }

  /**
   * Get note by id of label
   * @param {string} id id of label
   * @returns {Array} Object of Note
   */
  public async getNoteById(id: string): Promise<Note> {
    const { data } = await this.axios.get(`notes/${id}`);

    return data;
  }

  /**
   * Save new note
   * @param   {object<Note>}  note
   * @returns  {boolean} status of request
   */
  public async saveNote(note: Note): Promise<boolean> {
    const res = await this.axios.post("notes", note);

    return res.status === 200;
  }

  /**
   * Delete note by id
   * @param   {string}  id  id of notes
   * @returns  {boolean} status of request
   */
  public async deleteNote(id: string): Promise<boolean> {
    const res = await this.axios.delete("notes", id);

    return res.status === 200;
  }

  /**
   * Update note
   * @param   {object<Note>}  note
   * @returns  {boolean} status of request
   */
  public async update(note: Note): Promise<boolean> {
    const { _id } = note;

    const res = await this.axios.put("notes", String(_id), note);

    return res.status === 200;
  }

  /**
   * Add status of favorite into note
   * @param   {object<Note>}  note
   * @returns  {boolean} status of request
   */
  public async setFavorite(note: Note): Promise<boolean> {
    const res = await this.axios.put("favorites", String(note._id), note);

    return res.status === 200;
  }
}
