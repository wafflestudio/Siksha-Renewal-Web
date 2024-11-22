"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { loginKakao } from "utils/api/auth";
import useAuth from "hooks/UseAuth";

export default function Auth() {
  const router = useRouter();
  const { login } = useAuth();

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
      .catch((res: any) => {
        console.error(res);
      });
  }, []);
  return <></>;
}
