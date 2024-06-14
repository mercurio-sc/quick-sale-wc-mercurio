import { Tooltip, Button } from "@nextui-org/react";
import useClipboard from "@wc/hooks/use-clipboard.hook";

interface CopyButtonProps {
  text: string;
}

export default function CopyButton(props: CopyButtonProps) {
  const { copy, isSuccess } = useClipboard();

  return (
    <Tooltip content="¡Copiado!" isOpen={isSuccess}>
      <Button
        variant="flat"
        color={isSuccess ? "success" : "primary"}
        radius="full"
        onClick={() => copy(props.text)}
        isIconOnly
      >
        <span className="text-lg">
          <i className={`fa-regular ${isSuccess ? "fa-check" : "fa-copy"}`}></i>
        </span>
      </Button>
    </Tooltip>
  );
}
