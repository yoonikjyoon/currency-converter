import { createContext, useContext } from "react";

export const ApiContext = createContext();

export function ApiProvider({ children }) {
  return <ApiContext.Provider>{children}</ApiContext.Provider>;
}
export function useApiContext() {
  return useContext(ApiContext);
}
