import { useEffect } from "react";
import { useRouter } from "next/router";
import { loginApple } from "utils/api/auth";
import useAuth_Legacy from "hooks/UseAuth_Legacy";

export default function Auth() {
  const router = useRouter();

  const { login } = useAuth_Legacy();

  useEffect(() => {
    const params = new URL(document.location.toString()).searchParams;
    const id_token = params.get("id_token");

    if (!id_token) {
      router.push("/");
      return;
    }

    loginApple(id_token)
      .then((accessToken) => {
        login(accessToken);
        router.push("/");
      })
      .catch((res: any) => {
        console.error(res);
      });
  }, []);

  return <></>;
}
