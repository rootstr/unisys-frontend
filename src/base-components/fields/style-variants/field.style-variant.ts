import { cva } from "class-variance-authority"

export const fieldVariants = cva(
  "base-field",
  {
    variants: {
      variant: {
        primary: "field-primary",
        secondary: "field-secondary",
      },
      rounded: {
        sm: "base-field--rounded-sm",
        md: "base-field--rounded-md",
        lg: "base-field--rounded-lg",
        full: "base-field--rounded-full",
        none: ""
      },
      fontSize: {
        sm: "base-field--size-sm",
        base: "base-field--size-base",
        lg: "base-field--size-lg"
      }
    },
    defaultVariants: {
      variant: "primary",
      fontSize: "sm",
      rounded: "md",
    }
  }
)