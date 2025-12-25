import { AxiosError } from "axios";
import useModals from "./UseModals";
import { useCallback } from "react";

export default function useError() {
  const { openErrorModal } = useModals();

  const onHttpError = useCallback(
    (error: AxiosError) => {
      const errorCode = error.response?.status ?? null;

      if (errorCode !== null && errorCode >= 400 && errorCode < 500) {
        openErrorModal(error, {
          isUserFail: true,
        });
      } else console.error(error);
    },
    [openErrorModal],
  );

  return { onHttpError };
}
