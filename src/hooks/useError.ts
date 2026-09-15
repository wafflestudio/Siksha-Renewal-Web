import { AxiosError } from "axios";
import { useCallback } from "react";
import useModals from "./UseModals";

export default function useError() {
  const { openErrorModal } = useModals();

  const onHttpError = useCallback((error: AxiosError, options?: { preventNavigation?: boolean }) => {
    const errorCode = error.response?.status ?? null;

    if (errorCode !== null && errorCode >= 400 && errorCode < 500) {
      openErrorModal(error, {
        // 413은 서버가 본문 없이 응답하므로 직접 메시지를 지정
        message:
          errorCode === 413 ? "첨부한 사진의 용량이 너무 커서 업로드할 수 없습니다." : undefined,
        isUserFail: true,
        onClose: options?.preventNavigation ? () => {} : undefined,
      });
    } else console.error(error);
  }, [openErrorModal]);
  
  return { onHttpError };
}
