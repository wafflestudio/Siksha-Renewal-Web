import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Page404() {
  const redirectPath = /^\/posts\/.+/g;

  const router = useRouter();

  useEffect(() => {
    // Your condition that can validate the URL
    const pathName = window.location.pathname;

    if (pathName.match(redirectPath)) {
      router.push(pathName); // Redirect to the right page...
    } else {
      router.push("/");
    }
  }, []);

  return <></>;
}
