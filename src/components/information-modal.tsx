import { useMemo } from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from "@nextui-org/modal";
import { Button, tv } from "@nextui-org/react";

import useMainContext from "@wc/hooks/use-main-context.hook";

const informationModal = tv({
  base: "flex size-14 flex-col items-center justify-center rounded-full text-2xl",
  variants: {
    color: {
      success: "bg-success-50 text-success",
      error: "bg-danger-50 text-danger",
      info: "bg-primary-50 text-primary",
    },
  },
});

export default function InformationModal() {
  const { modal } = useMainContext();

  const { content, isOpen, onOpenChange } = modal;

  const icon = useMemo(() => {
    switch (content.variant) {
      case "success":
        return "fa-check";
      case "error":
        return "fa-exclamation";
      case "info":
        return "fa-info";
      default:
        return "fa-info";
    }
  }, [content.variant]);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader></ModalHeader>
            <ModalBody className="flex flex-col items-center">
              <span className={informationModal({ color: content.variant })}>
                <i className={`fa-regular ${icon}`}></i>
              </span>
              <h3 className="text-lg font-bold">{content.title}</h3>
              <p className="text-center text-sm">{content.message}</p>
            </ModalBody>
            <ModalFooter className="flex justify-center">
              <Button radius="full" color="secondary" onClick={onClose}>
                Cerrar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
