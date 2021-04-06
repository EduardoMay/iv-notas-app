import axios from "axios";

/**
 * test api
 * @return  Promise<any>
 */
export const testApi = async (): Promise<any> => {
  const url = process.env.VUE_APP_BASE_URL_API;

  const { data } = await axios.get(url);

  console.log(data);
};
