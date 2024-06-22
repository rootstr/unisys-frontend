import React, { forwardRef } from "react";
import clsx from "clsx";
import { VariantProps } from "class-variance-authority";
import { fieldVariants } from "./style-variants/field.style-variant";
import "./styles/field.style.css";

export type AvailableFields = "input" | "select" | "textarea";
export type FieldRef<T extends React.ElementType> = React.ComponentPropsWithRef<T>["ref"];
export type AsProp<T extends React.ElementType & AvailableFields> = {
  as?: T;
};
export type FieldProps<T extends React.ElementType & AvailableFields> =
  React.PropsWithChildren<AsProp<T>> &
  React.ComponentPropsWithoutRef<T> &
  { ref?: FieldRef<T> } & VariantProps<typeof fieldVariants>;

export type FieldComponent = <T extends (React.ElementType & AvailableFields) = "input">(
  { ...props }: FieldProps<T>
) => React.ReactNode;

const Field: FieldComponent = forwardRef(
  <T extends (React.ElementType & AvailableFields) = "input">(
    { className, variant, fontSize, as, rounded, ...props }: FieldProps<T>,
    ref: FieldRef<T>,
  ) => {
    const Component: AvailableFields = as || "input";
    return (
      <Component
        ref={ref}
        className={clsx(fieldVariants({ variant, className, fontSize, rounded }))}
        {...props}
      >
        {props.children}
      </Component>
    );
  },
);

export default Field;