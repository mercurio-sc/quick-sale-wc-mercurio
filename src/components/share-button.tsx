import { tv } from "@nextui-org/react";
import { ButtonHTMLAttributes, forwardRef } from "react";

const shareButton = tv({
  base: "group flex items-center gap-2",
  variants: {
    isLoading: {
      true: "animate-pulse cursor-progress opacity-50",
      false: "cursor-pointer",
    },
  },
});

interface ShareButtonProps {
  icon: string;
  isLoading?: boolean;
}

const ShareButton = forwardRef<
  HTMLButtonElement,
  ShareButtonProps & ButtonHTMLAttributes<HTMLButtonElement>
>(({ icon, isLoading = false, ...props }, ref) => {
  return (
    <button
      {...props}
      ref={ref}
      className={shareButton({ isLoading })}
      disabled={isLoading}
    >
      <span className="flex size-10 flex-col items-center justify-center rounded-full bg-primary-50 text-lg text-primary transition-colors group-hover:bg-primary group-hover:text-primary-50">
        <i className={`fa-regular fa-${icon}`}></i>
      </span>

      <span className="text-sm font-semibold transition-colors group-hover:font-semibold">
        {typeof props.children === "string"
          ? props.children
          : props.children?.toString()}
      </span>
    </button>
  );
});

ShareButton.displayName = "ShareButton";

export default ShareButton;
