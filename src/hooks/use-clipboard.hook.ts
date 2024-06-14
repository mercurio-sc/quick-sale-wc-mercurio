import { useEffect, useState } from "react";

export default function useClipboard() {
  const [state, setState] = useState<"success" | "error">();

  useEffect(() => {
    if (state) {
      const timeout = setTimeout(() => {
        setState(undefined);
      }, 2000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [state]);

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setState("success");
    } catch {
      setState("error");
    }
  };

  return { copy, isSuccess: state === "success", isError: state === "error" };
}
