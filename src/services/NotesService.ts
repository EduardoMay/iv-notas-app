import Axios from "@/hooks/Axios";
import { Note } from "@/interfaces/Note";

export default class NotesService {
  axios = new Axios();

  public async getNotes(): Promise<Note[]> {
    const { data } = await this.axios.get("notes");

    return data;
  }

  /**
   * name
   */
  public async getNoteById(id: string): Promise<Note> {
    const { data } = await this.axios.get(`notes/${id}`);

    return data;
  }

  public async saveNote(note: Note): Promise<any> {
    const res = await this.axios.post("notes", note);

    console.log(res);
  }

  public async deleteNote(id: string): Promise<any> {
    const res = await this.axios.delete("notes", id);

    console.log(res);
  }

  public async update(note: Note): Promise<any> {
    const { _id } = note;

    const res = await this.axios.put("notes", String(_id), note);

    console.log(res);
  }

  public async setFavorite(note: Note): Promise<any> {
    const res = await this.axios.put("favorites", String(note._id), note);

    console.log(res);
  }
}
