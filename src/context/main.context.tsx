import { createContext, ReactNode } from "react";

import useAuthentication from "@wc/hooks/use-authentication.hook";
import { CreateTransactionForm } from "@wc/types/quickSale.type";
import { useForm, UseFormReturn } from "react-hook-form";
import { DEFAULT_DOCUMENT_TYPE } from "@wc/constants/constants";
import useCreateTransaction from "@wc/hooks/use-create-transaction.hook";
import useModal from "@wc/hooks/use-modal.hook";

interface ContextValues {
  authentication: ReturnType<typeof useAuthentication>;
  form: UseFormReturn<CreateTransactionForm>;
  modal: ReturnType<typeof useModal>;
  onSubmit: (data: CreateTransactionForm) => void;
  onReset: () => void;
  createTransaction: ReturnType<typeof useCreateTransaction>;
}

export const Context = createContext<ContextValues>(null!);

export function ContextProvider({
  children,
  authentication,
}: {
  children: ReactNode;
  authentication: ReturnType<typeof useAuthentication>;
}) {
  const modal = useModal();

  const createTransaction = useCreateTransaction();

  const form = useForm<CreateTransactionForm>({
    mode: "onChange",
    defaultValues: {
      documentType: DEFAULT_DOCUMENT_TYPE,
    },
  });

  const onReset = () => {
    form.reset();
    createTransaction.reset();
  };

  async function onSubmit(data: CreateTransactionForm) {
    try {
      await createTransaction.mutateAsync({
        client: {
          document: {
            type: data.documentType,
            value: data.documentNumber,
          },
        },
        amount: +data.saleValue,
        description: data.description,
      });
    } catch (error) {
      modal.onChangeModalContent({
        title: "¡El cliente no tiene cupo!",
        message:
          "Puede solicitarlo fácil descargando nuestra app Sistecrédito o visitando alguno de nuestros almacenes aliados.",
        variant: "info",
      });
      modal.onOpen();
    }
  }

  return (
    <Context.Provider
      value={{
        authentication,
        createTransaction,
        form,
        modal,
        onSubmit,
        onReset,
      }}
    >
      {children}
    </Context.Provider>
  );
}
