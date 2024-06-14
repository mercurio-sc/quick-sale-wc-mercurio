import { AxiosError } from "axios";
import { useMutation } from "react-query";

import axiosInstance from "@wc/api/interceptor";
import { ErrorResponse } from "@wc/api/types/error.dto";
import { NotifyTransactionRequestDto } from "@wc/api/types/notify-transaction.request.dto";
import { EXCEPTIONS } from "@wc/constants/exceptions";
import useMainContext from "./use-main-context.hook";

export default function useNotifyTransaction() {
  const { modal } = useMainContext();

  const { onChangeModalContent, onOpen } = modal;

  const notifyTransaction = useMutation<
    void,
    AxiosError<ErrorResponse>,
    NotifyTransactionRequestDto
  >(
    (request) =>
      axiosInstance({
        method: "POST",
        url: `/${request.utid}/notify`,
        params: {
          method: request.notificationMethod,
        },
      }),
    {
      onSuccess: () => {
        onChangeModalContent({
          title: "Notificación enviada",
          message: "Se ha enviado la notificación al cliente",
          variant: "success",
        });
        onOpen();
      },
      onError: (error) => {
        onChangeModalContent({
          title: "Error",
          message:
            EXCEPTIONS[error.response?.data.exception.name as string] ||
            "Hubo un error al enviar la notificación",
          variant: "error",
        });
        onOpen();
      },
    }
  );

  return notifyTransaction;
}
