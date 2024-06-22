import { useEffect, useRef } from "react";

export type OnClickOutsideCallback = (event: MouseEvent) => void;

const useInterceptOutsideClick = <T extends HTMLElement>(callback: OnClickOutsideCallback): React.MutableRefObject<T | null> => {
  const htmlElementRef = useRef<T | null>(null);

  useEffect(() => {
    const onOutSideClick = (e: MouseEvent) => {
      if (htmlElementRef.current && !htmlElementRef.current.contains(e.target as Node)) {
        callback(e);
      }
    };

    document.addEventListener("mousedown", onOutSideClick);
    return () => {
      document.removeEventListener("mousedown", onOutSideClick);
    };
  }, [callback]);

  return htmlElementRef;
};

export default useInterceptOutsideClick;