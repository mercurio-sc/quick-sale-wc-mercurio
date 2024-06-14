import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import { motion, Variants } from "framer-motion";
import ShareButton from "./share-button";
import { useMemo } from "react";
import useMainContext from "@wc/hooks/use-main-context.hook";
import CopyButton from "./copy-button";
import useNotifyTransaction from "@wc/hooks/use-notify-transaction.hook";

export default function TransactionCreatedCard() {
  const { createTransaction, modal, onReset } = useMainContext();
  const { mutateAsync, isLoading } = useNotifyTransaction();

  const handleNotifyTransaction = async () => {
    try {
      if (!createTransaction.data) return;

      await mutateAsync({
        utid: createTransaction.data.utid,
        notificationMethod: "email",
      });
    } catch {
      modal.onChangeModalContent({
        title: "Error",
        message: "Hubo un error al enviar la notificación",
        variant: "error",
      });
      modal.onOpen();
    }
  };

  const variants = useMemo(
    (): Variants => ({
      initial: { y: 30, opacity: 0 },
      animate: {
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.5,
          delay: 0,
          type: "spring",
          stiffness: 100,
        },
      },
    }),
    []
  );

  if (!createTransaction.data && !createTransaction.isSuccess) return null;

  return (
    <motion.div initial="initial" animate="animate" variants={variants}>
      <Card
        classNames={{
          base: "p-4",
        }}
      >
        <CardHeader>
          <h3 className="text-xl font-bold">¡Venta creada!</h3>
        </CardHeader>
        <CardBody className="space-y-6">
          <p>
            Hemos generado el enlace único que puedes copiar y compartir a tu
            cliente.
          </p>

          <div className="space-x-3 font-semibold text-primary">
            <a
              className="text-sm hover:underline"
              href={createTransaction.data.url_endpoint}
              target="_blank"
            >
              {createTransaction.data.url_endpoint}
            </a>

            <CopyButton text={createTransaction.data.url_endpoint} />
          </div>

          <div>
            <h4 className="mb-4 font-bold">Comparte el enlace</h4>

            <div className="flex items-center gap-12">
              <ShareButton
                icon="envelope"
                isLoading={isLoading}
                onClick={handleNotifyTransaction}
              >
                Enviar por correo
              </ShareButton>
            </div>
          </div>
        </CardBody>
        <CardFooter className="justify-end">
          <Button
            color="primary"
            radius="full"
            startContent={
              <span>
                <i className="fa-regular fa-plus"></i>
              </span>
            }
            onClick={onReset}
          >
            Nueva venta rápida
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
