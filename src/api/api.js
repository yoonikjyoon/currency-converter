import axios from "axios";

const requestURL = "https://api.exchangerate.host/";

// 국가 symbols
export async function getSymbols() {
  return axios.get(requestURL + "symbols").then((res) => {
    const symbols = res.data.symbols || {};
    return Object.values(symbols);
  });
}

// 환율
export async function getCurrency(fromCode, toCode, amount) {
  // console.log("-----");
  console.log("fromCd : ", fromCode, "toCode : ", toCode, "amount : ", amount);
  return axios
    .create({
      baseURL: requestURL + "convert",
      params: {
        from: fromCode,
        to: toCode,
        amount: amount,
        places: 2,
      },
    })
    .get()
    .then((res) => res.data);
}
