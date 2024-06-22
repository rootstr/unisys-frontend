import React, { useCallback, useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import Button, { ButtonProps } from "../buttons/Button";
import useInterceptOutsideClick from "@/base-hooks/useInterceptOutsideClick";
import clsx from "clsx";
import "./styles/dropdown-item.style.css";
import "./styles/dropdown-list.style.css";
import "./styles/dropdown-menu.style.css";

namespace DropdownMenuNS {
  type DropdownPlacements = "bottom" | "top";

  export type Props = {
    title?: string;
    dropButtonProps?: ButtonProps;
    innerListProps?: DropdownListNS.Props;
    autoClose?: boolean;
    right?: boolean;
    rotateIcon?: boolean;
    className?: string;
    children?: React.ReactNode;
  };

  export const Menu = ({
    title,
    dropButtonProps,
    innerListProps,
    autoClose,
    right,
    rotateIcon,
    className,
    children,
  }: Props) => {
    const [isDropdownVisible, setDropdownVisibility] = useState(false);
    const [dropdownPlacement, setDropdownPlacement] = useState<DropdownPlacements>("bottom");

    const dropdownButtonRef = useRef<HTMLButtonElement | null>(null);

    const interceptOutsideClickHandler = useCallback((e: MouseEvent) => {
      if (!dropdownButtonRef.current?.contains(e.target as Node) && autoClose) {
        setDropdownVisibility(false);
      }
    }, [autoClose]);

    const dropdownRef = useInterceptOutsideClick<HTMLDivElement>(interceptOutsideClickHandler);

    useEffect(() => {
      if (!isDropdownVisible) return;

      const calculatePlacement = () => {
        if (!dropdownButtonRef.current || !dropdownRef.current) return;

        const dropdownButtonRect = dropdownButtonRef.current.getBoundingClientRect();
        const dropdownRect = dropdownRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        const shouldPlaceTop = windowHeight - dropdownButtonRect.bottom < dropdownRect.height
          && dropdownButtonRect.bottom > dropdownRect.height;

        setDropdownPlacement(shouldPlaceTop ? "top" : "bottom");
      };

      const observer = new IntersectionObserver(calculatePlacement, {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      });

      if (dropdownRef.current) {
        observer.observe(dropdownRef.current);
      }

      return () => {
        if (dropdownRef.current) {
          observer.unobserve(dropdownRef.current);
        }
      };
    }, [isDropdownVisible]);


    const toggleDropdown = () => setDropdownVisibility((prev) => !prev);

    return (
      <div className="dropdown-menu">
        <Button
          aria-haspopup="menu"
          type="button"
          aria-label="Dropdown menu"
          aria-expanded={isDropdownVisible}
          ref={dropdownButtonRef}
          {...dropButtonProps}
          className={clsx("dropdown-menu__button", dropButtonProps?.className)}
          onClick={toggleDropdown}
        >
          {title}
          <IoIosArrowDown
            className={clsx("dropdown-menu__icon", {
              "dropdown-menu__icon--rotate": isDropdownVisible && rotateIcon,
            })}
          />
        </Button>
        <div
          ref={dropdownRef}
          className={clsx("dropdown-menu__list", {
            "dropdown-menu__list--hidden": !isDropdownVisible,
            "dropdown-menu__list--bottom dropdown-menu__list--transition": isDropdownVisible && dropdownPlacement === "bottom",
            "dropdown-menu__list--top dropdown-menu__list--transition": isDropdownVisible && dropdownPlacement === "top",
            "dropdown-menu__list--right": right,
          }, className)}
        >
          <DropdownListNS.List {...innerListProps} role="menu" aria-label="Dropdown Menu">
            {children}
          </DropdownListNS.List>
        </div>
      </div>
    );
  };
}

namespace DropdownListNS {
  export type Props = {
    className?: string;
  } & React.PropsWithChildren<React.HTMLAttributes<HTMLUListElement>>;

  export const List = ({
    className,
    children,
    ...props
  }: Props) => {
    return (
      <ul
        {...props}
        className={clsx(
          "dropdown-list",
          className,
        )}
      >
        {children}
      </ul>
    );
  };
}

namespace DropdownItemNS {
  export type Props = {
    className?: string;
  } & React.LiHTMLAttributes<HTMLLIElement>;

  export const Item = ({
    className,
    children,
    ...props
  }: Props) => {
    return (
      <li
        {...props}
        className={clsx(
          "dropdown-item",
          className
        )}
      >
        {children}
      </li>
    );
  };
}

export {
  DropdownMenuNS as DropdownMenu,
  DropdownItemNS as DropdownItem,
  DropdownListNS as DropdownList
};