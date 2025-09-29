import { useEffect } from "react";
import useAuth from "./UseAuth";
import { useDispatchContext, useStateContext } from "providers/ContextProvider";
import { getMyData } from "utils/api/auth";

export default function UseProfile() {
  const { userInfo } = useStateContext();
  const { setUserInfo } = useDispatchContext();
  const { getAccessToken, authStatus } = useAuth();

  // TODO: 안티패턴이므로 수정 필요
  // 전역적으로 수행되어야 하는 동작이 useProfile 내 useEffect의 callback function으로 들어가 있음
  // 서로 다른 컴포넌트에서 useProfile() 객체가 생성됨에 따라 중복 실행이 발생함
  useEffect(() => {
    if (authStatus === "loading") return;
    if (authStatus === "logout") {
      setUserInfo(null);
    } else {
      getAccessToken()
        .then((token) => getMyData(token))
        .then((profile) => setUserInfo(profile));
    }
  }, [authStatus, getAccessToken, setUserInfo]);

  const setProfile = (nickname: string, image?: string) => {
    if (userInfo !== null) setUserInfo({ ...userInfo, nickname, image: image ?? null });
  };

  const profileURL = userInfo?.image ?? "/img/default-profile.svg";

  return { userInfo, setProfile, profileURL };
}
