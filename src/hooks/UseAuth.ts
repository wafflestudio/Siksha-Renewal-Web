import { useCallback, useEffect } from "react";
import { useDispatchContext, useStateContext } from "./ContextProvider";
import { useRouter } from "next/router";
import useModals from "./UseModals";

export default function useAuth() {
  const { authStatus } = useStateContext();
  const { setAuthStatus, setLoginStatus } = useDispatchContext();
  const { openLoginModal } = useModals();
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
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

      const accessToken = localStorage.getItem("access_token");

      if (!accessToken) {
        setAuthStatus("logout");
        setLoginStatus(false);
        reject(new Error("Access token not found"));
      } else resolve(accessToken);
    });
  };

  const signIn = (accessToken: string) => {
    localStorage.setItem("access_token", accessToken);
    setAuthStatus("login");
    setLoginStatus(true);
  };

  const signOut = () => {
    localStorage.removeItem("access_token");
    setAuthStatus("logout");
    setLoginStatus(false);
  };

  return { authStatus, authGuard, getAccessToken, signIn, signOut };
}
