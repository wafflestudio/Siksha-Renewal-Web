"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { loginGoogle } from "utils/api/auth";
import useAuth from "hooks/UseAuth";
import useError from "hooks/useError";

export default function Auth() {
  const { onHttpError } = useError();
  const { login } = useAuth();

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
        login(accessToken);
        router.push("/");
      })
      .catch(onHttpError);
  }, []);

  return <></>;
}
