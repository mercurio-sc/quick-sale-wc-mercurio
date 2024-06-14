import { QueryClient, QueryClientProvider } from "react-query";

import useAuthentication from "@wc/hooks/use-authentication.hook";
import { ContextProvider } from "@wc/context/main.context";

import TransactionForm from "./transaction-form";

export default function App() {
  const authentication = useAuthentication();

  return (
    <>
      <QueryClientProvider client={new QueryClient()}>
        <ContextProvider authentication={authentication}>
          <TransactionForm />
        </ContextProvider>
      </QueryClientProvider>
      <link
        rel="stylesheet"
        href={`${import.meta.env.VITE_STATICS_STORAGE_HOST_URL}${
          import.meta.env.VITE_STATICS_STORAGE_ASSETS_PATH
        }/icons/css/fontawesome.css`}
      />
      <link
        rel="stylesheet"
        href={`${import.meta.env.VITE_STATICS_STORAGE_HOST_URL}${
          import.meta.env.VITE_STATICS_STORAGE_ASSETS_PATH
        }/icons/css/regular.css`}
      />
      <link
        rel="stylesheet"
        href={`${import.meta.env.VITE_STATICS_STORAGE_HOST_URL}${
          import.meta.env.VITE_STATICS_STORAGE_ASSETS_PATH
        }/icons/css/brands.css`}
      />
    </>
  );
}
