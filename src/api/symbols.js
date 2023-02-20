import axios from "axios";

const requestURL = "https://api.exchangerate.host/symbols";

export async function getSymbols() {
  return axios.get(requestURL).then((res) => console.log(res.data.symbols));
}
