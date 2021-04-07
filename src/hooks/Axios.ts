import axios, { AxiosResponse } from "axios";

export default class Axios {
  readonly URL_API = process.env.VUE_APP_BASE_URL_API;

  constructor() {
    axios.defaults.headers = {
      "Content-Type": "application/json"
    };
  }

  public async get(
    endpoint: string,
    params: object = {}
  ): Promise<AxiosResponse> {
    const res = await axios.get(`${this.URL_API}/${endpoint}`);

    return res;
  }
}
