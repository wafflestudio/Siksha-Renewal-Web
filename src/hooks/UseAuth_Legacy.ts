import { useCallback, useEffect } from "react";
import { useDispatchContext, useStateContext } from "providers/ContextProvider";
import { useRouter } from "next/router";
import useModals from "./UseModals";
import useLocalStorage from "./UseLocalStorage";

/**
 *
 * @deprecated
 */
export default function useAuth_Legacy() {
  const { authStatus } = useStateContext();
  const { setAuthStatus } = useDispatchContext();
  const { openLoginModal } = useModals();
  const router = useRouter();

  const {
    value: accessToken,
    set: setStorage,
    remove: removeStorage,
  } = useLocalStorage("access_token", undefined);

  useEffect(() => {
    if (accessToken === undefined) setAuthStatus("loading");
    else if (accessToken) setAuthStatus("login");
    else setAuthStatus("logout");
  }, [accessToken]);

  const authGuard = useCallback(() => {
    if (authStatus === "logout") {
      router.push(`/`).then(() => openLoginModal());
    }
  }, [authStatus]);

  const getAccessToken = (): Promise<string> => {
    return new Promise((resolve, reject) => {
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
