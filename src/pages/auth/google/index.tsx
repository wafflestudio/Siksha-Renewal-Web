import { useEffect } from "react";
import { useRouter } from "next/router";
import { loginGoogle } from "utils/api/auth";
import { useDispatchContext } from "hooks/ContextProvider";

export default function Auth() {
  const { setLoginStatus } = useDispatchContext();

  const router = useRouter();
  useEffect(() => {
    const params = new URL(document.location.toString()).searchParams;
    const code = params.get("code");

    if (!code) {
      router.push("/");
      return;
    }

    loginGoogle(code)
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
