import { useEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { loginApple } from "utils/api/auth";

export default function Auth() {
  const router = useRouter();
  useEffect(() => {
    const params = new URL(document.location.toString()).searchParams;
    const id_token = params.get("id_token");

    if (!id_token) {
      router.push("/login");
      return;
    }

    loginApple(id_token)
      .then((res: any) => {
        localStorage.setItem("access_token", res.data.access_token);
        router.push("/");
      })
      .catch((res: any) => {
        console.dir(res);
        console.log(res.response);
      });
  }, []);

  return <Container>apple</Container>;
}

const Container = styled.div`
  text-align: center;
`;
