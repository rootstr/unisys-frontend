import { cva } from "class-variance-authority"

export const buttonVariants = cva(
  "base-button",
  {
    variants: {
      variant: {
        primary: "base-button--primary",
        secondary: "base-button--secondary",
        outline: "base-button--outline",
        danger: "base-button--danger",
        none: ""
      },
      ring: {
        sm: "base-button--ring base-button--ring-sm",
        md: "base-button--ring base-button--ring-md",
        lg: "base-button--ring base-button--ring-lg",
      },
      ringOffset: {
        sm: "base-button--ring-offset-sm",
        md: "base-button--ring-offset-md",
        lg: "base-button--ring-offset-lg",
      },
      rounded: {
        sm: "base-button--rounded-sm",
        md: "base-button--rounded-md",
        lg: "base-button--rounded-lg",
        full: "base-button--rounded-full",
        none: ""
      },
      font: {
        normal: "base-button--font-normal",
        bold: " base-button--font-bold"
      },
      fontSize: {
        sm: "base-button--size-sm",
        base: "base-button--size-base",
        lg: "base-button--size-lg"
      }
    },
    defaultVariants: {
      variant: "primary",
      fontSize: "sm",
      rounded: "md",
      font: "normal"
    }
  }
)