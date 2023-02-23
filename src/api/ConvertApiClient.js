import axios from "axios";

const baseURL = "https://api.exchangerate.host/";

export default class ConvertApiClient {
  constructor() {
    this.httpClient = axios.create({
      baseURL,
    });
  }
  // getSymbols
  async symbols() {
    return this.httpClient.get("symbols");
  }
  // getCurrency
  async convert(params) {
    return this.httpClient.get("convert", params);
  }
}
