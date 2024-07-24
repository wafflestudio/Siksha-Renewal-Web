import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Page404() {
  const redirectPath =
    /^\/(menu\/\d+|menu\/\d+\/photos|community\/boards\/[01]\/?|community\/boards\/[01]\/posts\/\d+)\/?$/g;

  const router = useRouter();

  useEffect(() => {
    const pathName = window.location.pathname;

    if (pathName.match(redirectPath)) {
      router.push(pathName);
    } else {
      router.push("/");
    }
  }, []);

  return <></>;
}
