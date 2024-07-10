import { useEffect } from "react";
import { useRouter } from "next/router";
import { loginKakao } from "utils/api/auth";
import { useDispatchContext } from "hooks/ContextProvider";

export default function Auth() {
  const router = useRouter();
  const { setLoginStatus } = useDispatchContext();

  useEffect(() => {
    const params = new URL(document.location.toString()).searchParams;
    const code = params.get("code");

    if (!code) {
      router.push("/");
      return;
    }

    loginKakao(code)
      .then((accessToken) => {
        localStorage.setItem("access_token", accessToken);
        setLoginStatus(true);
        router.push("/");
      })
      .catch((res: any) => {
        console.error(res);
      });
  }, []);
  return <></>;
}
