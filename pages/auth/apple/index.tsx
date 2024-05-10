import axios from "axios";
import { useEffect } from "react";
import { useRouter } from "next/router";
import APIendpoint from "../../../constants/constants";
import styled from "styled-components";

export default function Auth() {
  const router = useRouter();
  useEffect(() => {
    const params = new URL(document.location.toString()).searchParams;
    const code = params.get("code");
    const grantType = "authorization_code";
    const CLIENT_ID = process.env.NEXT_PUBLIC_APPLE_CLIENTID;
    const REST_SECRET_KEY = process.env.NEXT_PUBLIC_APPLE_SECRET;
    const REDIRECT_URI = process.env.NEXT_PUBLIC_APPLE_REDIRECTURI;

    axios
      .post(
        `https://appleid.apple.com/auth/token?grant_type=${grantType}&client_id=${CLIENT_ID}&client_secret=${REST_SECRET_KEY}&redirect_uri=${REDIRECT_URI}&code=${code}`,
        {},
        { headers: { "Content-type": "application/x-www-form-urlencoded;charset=utf-8" } },
      )
      .then((res: any) => {
        const { access_token } = res.data;
        return access_token;
      })
      .then((access_token: string) =>
        axios.post(
          `${APIendpoint()}/auth/login/google`,
          {},
          {
            headers: { "google-token": `Bearer ${access_token}` },
          },
        ),
      )
      .then((res: any) => {
        localStorage.setItem("access_token", res.data.access_token);
        router.push("/");
      })
      .catch((res: any) => {
        console.dir(res);
      });
  }, []);

  return <Container>google</Container>;
}

const Container = styled.div`
  text-align: center;
`;
