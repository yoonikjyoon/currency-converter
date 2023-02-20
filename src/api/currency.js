import axios from "axios";

// const requestURL = process.env.CONVERT_CURRENCY_URL;
const requestURL = "https://api.exchangerate.host/convert";

const request = axios.create({
  baseURL: requestURL,
  params: {
    from: "USD",
    to: "KRW",
    amount: 1,
    places: 2,
  },
});

export async function getCurrency() {
  return request.get().then((res) => console.log(res.data));
}
