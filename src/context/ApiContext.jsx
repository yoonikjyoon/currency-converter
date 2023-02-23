import React, { useState } from "react";
import { createContext, useContext } from "react";
import ConvertApi from "../api/ConvertApi";
import ConvertApiClient from "../api/ConvertApiClient";
import { DEFAULT_FROM_VALUE, DEFAULT_TO_VALUE } from "../constants/env";

export const ApiContext = createContext();

const client = new ConvertApiClient();
const currency = new ConvertApi(client);

export function ApiProvider({ children }) {
  const [value, setValue] = useState({
    from: {
      code: DEFAULT_FROM_VALUE.code,
      description: DEFAULT_FROM_VALUE.description,
      amount: DEFAULT_FROM_VALUE.amount,
    },
    to: {
      code: DEFAULT_TO_VALUE.code,
      description: DEFAULT_TO_VALUE.description,
      amount: DEFAULT_TO_VALUE.amount,
    },
  });
  const setSymbol = (queryKey, code, description) => {
    queryKey === "from"
      ? setValue({ ...value, from: { ...value.from, code, description } })
      : setValue({ ...value, to: { ...value.to, code, description } });
  };
  const setAmount = (queryKey, amount) => {
    queryKey === "from"
      ? setValue({ ...value, from: { ...value.from, amount } })
      : setValue({ ...value, to: { ...value.to, amount } });
  };
  return (
    <ApiContext.Provider value={{ currency, value, setSymbol, setAmount }}>
      {children}
    </ApiContext.Provider>
  );
}
export function useApiContext() {
  return useContext(ApiContext);
}
