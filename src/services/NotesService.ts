import Axios from "@/hooks/Axios";

export default class NotesService {
  axios = new Axios();

  public async getNotes(): Promise<any> {
    const res = await this.axios.get("notes");

    console.log(res);
  }
}
