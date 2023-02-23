export default class ConvertApi {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  async getSymbols() {
    return this.apiClient.symbols().then((res) => {
      const symbols = res.data.symbols || {};
      return Object.values(symbols);
    });
  }
  async getCurrency(from, to, amount) {
    return this.apiClient
      .convert({
        params: {
          from,
          to,
          amount,
          places: 2,
        },
      })
      .then((res) => res.data);
  }
}
