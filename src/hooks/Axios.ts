import axios, { AxiosResponse } from "axios";

import { NoteInterface } from "@/interfaces/NoteInterface";

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

  public async post(
    endpoint = "",
    body: NoteInterface
  ): Promise<AxiosResponse> {
    return await axios.post(`${this.URL_API}/${endpoint}`, body);
  }

  public async delete(endpoint: string, id: string): Promise<AxiosResponse> {
    return await axios.delete(`${this.URL_API}/${endpoint}/${id}`);
  }
}
