import axiosInstance from "@wc/api/interceptor";
import { CreateTransactionRequest } from "@wc/api/types/create-transaction.request.dto";
import { CreateTransactionResponse } from "@wc/api/types/create-transaction.response.dto";
import { useMutation } from "react-query";

export default function useCreateTransaction() {
  const createTransaction = useMutation<
    CreateTransactionResponse,
    void,
    CreateTransactionRequest
  >((request) =>
    axiosInstance<CreateTransactionResponse>({
      url: "/",
      method: "POST",
      data: request,
    }).then((res) => res.data)
  );

  return createTransaction;
}
