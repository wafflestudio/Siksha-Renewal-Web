"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { loginKakao } from "utils/api/auth";
import useAuth from "hooks/UseAuth";
import useError from "hooks/useError";

export default function Auth() {
  const router = useRouter();
  const { login } = useAuth();
  const { onHttpError } = useError();

  useEffect(() => {
    const params = new URL(document.location.toString()).searchParams;
    const code = params.get("code");

    if (!code) {
      router.push("/");
      return;
    }

    loginKakao(code)
      .then((accessToken) => {
        login(accessToken);
        router.push("/");
      })
      .catch(onHttpError);
  }, []);
  return <></>;
}
