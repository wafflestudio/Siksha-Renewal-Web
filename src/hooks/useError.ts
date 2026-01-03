import { AxiosError } from "axios";
import { useCallback } from "react";
import useModals from "./UseModals";

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
