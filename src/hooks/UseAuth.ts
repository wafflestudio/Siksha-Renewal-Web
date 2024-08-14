import { useCallback, useEffect } from "react";
import { useDispatchContext, useStateContext } from "./ContextProvider";
import { useRouter } from "next/router";
import useModals from "./UseModals";
import useLocalStorage from "./UseLocalStorage";

export default function useAuth() {
  const { authStatus } = useStateContext();
  const { setAuthStatus, setLoginStatus } = useDispatchContext();
  const { openLoginModal } = useModals();
  const router = useRouter();

  const {
    value: accessToken,
    set: setStorage,
    remove: removeStorage,
  } = useLocalStorage("access_token", null);

  useEffect(() => {
    setAuthStatus(accessToken ? "login" : "logout");
    setLoginStatus(accessToken ? true : false);
  }, []);

  const authGuard = useCallback(() => {
    if (authStatus === "logout") {
      router.push(`/`);
      openLoginModal();
    }
  }, [authStatus]);

  const getAccessToken = (): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (authStatus !== "login") {
        reject(new Error("Login required"));
      }

      if (!accessToken) {
        setAuthStatus("logout");
        setLoginStatus(false);
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

  const signIn = (accessToken: string) => {
    setStorage(accessToken);
    setAuthStatus("login");
    setLoginStatus(true);
  };

  const signOut = () => {
    removeStorage();
    setAuthStatus("logout");
    setLoginStatus(false);
  };

  return { authStatus, authGuard, getAccessToken, checkAccessToken, signIn, signOut };
}
