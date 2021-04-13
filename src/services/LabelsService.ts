import Axios from "@/hooks/Axios";
import { Label } from "@/interfaces/Label";

export default class LabelsService {
  axios = new Axios();

  /**
   * Get all labels
   * @return  Promise <Label[]>
   */
  public async getLabels(): Promise<Label[]> {
    const { data } = await this.axios.get("labels");

    return data;
  }

  /**
   * Save label
   * @param   Label    label
   * @return  Promise
   */
  public async saveLabel(label: Label): Promise<any> {
    const res = await this.axios.post("labels", label);

    console.log(res);
  }

  /**
   * Delete label
   * @param   string  id
   * @return  Promise
   */
  public async deleteLabel(id: string): Promise<any> {
    const res = await this.axios.delete("labels", id);

    console.log(res);
  }

  /**
   * Add Id Note into Label
   * TODO Agregar id de Note al campo "notas" de Label
   * @param   string  idLabel
   * @param   string  idNote
   * @return  Promise
   */
  public async setIdNoteToLabel(label: Label): Promise<any> {
    const { _id } = label;

    const res = await this.axios.put("labels", String(_id), label);

    console.log(res);
  }
}
