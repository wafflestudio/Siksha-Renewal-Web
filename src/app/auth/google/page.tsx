"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { loginGoogle } from "utils/api/auth";
import useAuth from "hooks/UseAuth";

export default function Auth() {
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
      .catch((res: any) => {
        console.error(res);
      });
  }, []);

  return <></>;
}
