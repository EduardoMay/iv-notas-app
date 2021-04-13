import axios, { AxiosResponse } from "axios";

import { Label } from "@/interfaces/Label";
import { Note } from "@/interfaces/Note";

export default class Axios {
  readonly URL_API = process.env.VUE_APP_BASE_URL_API;

  constructor() {
    axios.defaults.headers = {
      "Content-Type": "application/json"
    };
  }

  public async get(endpoint: string, params = {}): Promise<AxiosResponse> {
    return await axios.get(`${this.URL_API}/${endpoint}`, {
      params
    });
  }

  public async post(endpoint = "", body: Note | Label): Promise<AxiosResponse> {
    return await axios.post(`${this.URL_API}/${endpoint}`, body);
  }

  public async delete(endpoint: string, id: string): Promise<AxiosResponse> {
    return await axios.delete(`${this.URL_API}/${endpoint}/${id}`);
  }

  public async put(
    endpoint: string,
    id: string,
    data: Note | Label
  ): Promise<AxiosResponse> {
    return await axios.put(`${this.URL_API}/${endpoint}/${id}`, data);
  }
}
