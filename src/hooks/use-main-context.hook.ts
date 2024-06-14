import { useContext } from "react";
import { Context } from "@wc/context/main.context";

export default function useMainContext() {
  return useContext(Context);
}
