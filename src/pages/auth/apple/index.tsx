import { useEffect } from "react";
import { useRouter } from "next/router";
import { loginApple } from "utils/api/auth";
import { useDispatchContext } from "hooks/ContextProvider";

export default function Auth() {
  const router = useRouter();
  const { setLoginStatus } = useDispatchContext();

  useEffect(() => {
    const params = new URL(document.location.toString()).searchParams;
    const id_token = params.get("id_token");

    if (!id_token) {
      router.push("/login");
      return;
    }

    loginApple(id_token)
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
