import Axios from "@/hooks/Axios";
import { Label } from "@/interfaces/Label";

export default class LabelsService {
  axios = new Axios();

  /**
   * Get all labels
   * @returns  {Array} array of Label
   */
  public async getLabels(): Promise<Label[]> {
    const { data } = await this.axios.get("labels");

    return data;
  }

  /**
   * Get Label by _id
   * @param {string} id
   * @returns  {object}  object of Label
   */
  public async getLabelById(id: string): Promise<Label> {
    const { data } = await this.axios.get(`labels/${id}`);

    return data;
  }

  /**
   * Save label
   * @param   {Label} label
   * @returns  {boolean} status of request
   */
  public async saveLabel(label: Label): Promise<boolean> {
    const res = await this.axios.post("labels", label);

    console.log(res);

    return res.status === 200;
  }

  /**
   * Delete label
   * @param   {string}  id id of label
   * @returns  {boolean} status of request
   */
  public async deleteLabel(id: string): Promise<boolean> {
    const res = await this.axios.delete("labels", id);

    return res.status === 200;
  }

  /**
   * Add Id Note into Label
   * @param   {string<Label>}  idLabel
   * @returns  {boolean} status of request
   */
  public async setIdNoteToLabel(label: Label): Promise<boolean> {
    const { _id } = label;

    const res = await this.axios.put("labels", String(_id), label);

    return res.status === 200;
  }

  /**
   * Update label
   * @param   {Label}    label
   * @returns  {boolean} status of request
   */
  public async updateLabel(label: Label): Promise<boolean> {
    const { _id } = label;

    const res = await this.axios.put("labels", String(_id), label);

    return res.status === 200;
  }
}
