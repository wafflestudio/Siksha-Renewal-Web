import { useCallback, useEffect } from "react";
import { useDispatchContext, useStateContext } from "providers/ContextProvider";
import { useRouter } from "next/navigation";
import useModals from "./UseModals";
import useLocalStorage from "./UseLocalStorage";

export default function useAuth() {
  const { authStatus } = useStateContext();
  const { setAuthStatus } = useDispatchContext();
  const { openLoginModal } = useModals();
  const router = useRouter();

  const {
    value: accessToken,
    set: setStorage,
    remove: removeStorage,
  } = useLocalStorage("access_token", undefined);

  // TODO: 안티패턴이므로 수정 필요
  // 전역적으로 수행되어야 하는 동작이 useAuth 내 useEffect의 callback function으로 들어가 있음
  // 서로 다른 컴포넌트에서 useAuth() 객체가 생성됨에 따라 중복 실행이 발생함
  useEffect(() => {
    if (accessToken === undefined) setAuthStatus("loading");
    else if (accessToken) setAuthStatus("login");
    else setAuthStatus("logout");
  }, [accessToken]);

  const authGuard = useCallback(() => {
    if (authStatus === "logout") {
      router.push(`/`);
      openLoginModal();
    }
  }, [authStatus]);

  const getAccessToken = (): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (accessToken) {
        resolve(accessToken);
        return;
      }

      if (authStatus !== "login") {
        reject(new Error("Login required"));
      }

      if (!accessToken) {
        setAuthStatus("logout");
        reject(new Error("Access token not found"));
      } else resolve(accessToken);
    });
  };

  const checkAccessToken = () => {
    if (authStatus !== "login") {
      return Promise.resolve(null);
    }
    return getAccessToken();
  };

  const login = (accessToken: string) => {
    setStorage(accessToken);
    setAuthStatus("login");
  };

  const logout = () => {
    removeStorage();
    setAuthStatus("logout");
  };

  return { authStatus, authGuard, getAccessToken, checkAccessToken, login, logout };
}
