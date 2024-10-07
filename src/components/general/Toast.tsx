import useToast from "hooks/UseToast";
import { useEffect } from "react";

export default function Toast() {
  const { openedToast, closeToast } = useToast();

  useEffect(() => {
    if (openedToast) {
      const timeOut = setTimeout(() => {
        closeToast();
      }, 3000);

      return () => {
        clearTimeout(timeOut);
      };
    }
  }, [openedToast]);

  return openedToast ? (
    <div>
      <h1>{openedToast.title}</h1>
      <p>{openedToast.message}</p>
    </div>
  ) : (
    <></>
  );
}
