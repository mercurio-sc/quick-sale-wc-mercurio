import { useDisclosure } from "@nextui-org/react";
import { useCallback, useState } from "react";

interface ModalContent {
  title: string;
  message: string;
  variant: "success" | "error" | "info";
}

export default function useModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [content, setContent] = useState<ModalContent>({
    title: "",
    message: "",
    variant: "success",
  });

  const onChangeModalContent = useCallback(
    (modal: ModalContent) => setContent(modal),
    []
  );

  return {
    isOpen,
    onOpen,
    onOpenChange,
    content,
    onChangeModalContent,
  };
}
