import { useEffect } from "react";
import useAuth_Legacy from "./UseAuth_Legacy";
import { useDispatchContext, useStateContext } from "providers/ContextProvider";
import { getMyData } from "utils/api/auth";

/**
 *
 * @deprecated
 */
export default function UseProfile_Legacy() {
  const { userInfo } = useStateContext();
  const { setUserInfo } = useDispatchContext();
  const { getAccessToken, authStatus } = useAuth_Legacy();

  useEffect(() => {
    if (authStatus === "loading") return;
    if (authStatus === "logout") {
      setUserInfo(null);
    } else {
      getAccessToken()
        .then((token) => getMyData(token))
        .then((profile) => setUserInfo(profile));
    }
  }, [authStatus]);

  const setProfile = (nickname: string, image?: string) => {
    if (userInfo !== null) setUserInfo({ ...userInfo, nickname, image: image ?? null });
  };

  return { userInfo, setProfile };
}
