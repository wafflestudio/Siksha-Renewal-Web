"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { loginApple } from "utils/api/auth";
import useAuth from "hooks/UseAuth";
import useError from "hooks/useError";

export default function Auth() {
  const router = useRouter();
  const { login } = useAuth();
  const { onHttpError } = useError();

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
      .catch(onHttpError);
  }, []);

  return <></>;
}
