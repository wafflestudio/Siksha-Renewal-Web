import { useDispatchContext, useStateContext } from "./ContextProvider";
import useLocalStorage from "./UseLocalStorage";

/**
 *
 * @deprecated use useAuth instead
 */
export default function UseAccessToken() {
  const { loginStatus } = useStateContext();
  const { setLoginStatus } = useDispatchContext();

  const { value: accessToken } = useLocalStorage("access_token", null);

  const getAccessToken = (): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (loginStatus === false) {
        reject(new Error("Login required"));
      }

      if (!accessToken) {
        setLoginStatus(false);
        reject(new Error("Access token not found"));
      } else resolve(accessToken);
    });
  };

  const checkAccessToken = () => {
    if (loginStatus === false) {
      return Promise.resolve(null);
    }
    return getAccessToken();
  };

  return { getAccessToken, checkAccessToken };
}
