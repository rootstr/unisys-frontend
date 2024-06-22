import { VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { CgSpinnerAlt } from "react-icons/cg";
import { buttonVariants } from "./style-variants/button.style-variant";
import clsx from "clsx";
import "./styles/button.style.css";

export type ButtonProps = {
  isSubmitting?: boolean;
} & React.PropsWithRef<React.ButtonHTMLAttributes<HTMLButtonElement>> &
  VariantProps<typeof buttonVariants>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, fontSize, ring, ringOffset, rounded, font, variant, isSubmitting, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(buttonVariants({ variant, fontSize, ring, rounded, font, ringOffset, className }))}
        {...props}
      >
        {props.children}
        {isSubmitting ? <CgSpinnerAlt className={clsx("base-button__spin-icon")} /> : null}
      </button>
    );
  },
);

export default Button;