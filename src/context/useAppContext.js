import { createContext, useContext } from "react";

export const MainContext = createContext();

export default function useAppContext() {
  return useContext(MainContext);
}
