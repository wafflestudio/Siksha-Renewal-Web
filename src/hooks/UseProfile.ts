import { useEffect } from "react";
import useAuth from "./UseAuth";
import { useDispatchContext, useStateContext } from "./ContextProvider";
import { getMyData } from "utils/api/auth";

export default function UseProfile() {
  const { userInfo } = useStateContext();
  const { setUserInfo } = useDispatchContext();
  const { getAccessToken, authStatus } = useAuth();

  useEffect(() => {
    if (authStatus === "loading") return;
    if (authStatus === "logout") {
      setUserInfo(null);
    } else {
      getAccessToken().then((token) => {
        getMyData(token).then((profile) => {
          setUserInfo(profile);
        });
      });
    }
  }, [authStatus]);

  const setProfile = (nickname: string, image?: string) => {
    if (userInfo !== null) setUserInfo({ ...userInfo, nickname, image: image ?? null });
  };

  return { userInfo, setProfile };
}
