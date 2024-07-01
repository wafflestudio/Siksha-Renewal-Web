import axios from "axios";
import { useEffect } from "react";
import { useRouter } from "next/router";
import APIendpoint from "constants/constants";
import styled from "styled-components";

export default function Auth() {
  const router = useRouter();
  useEffect(() => {
    const params = new URL(document.location.toString()).searchParams;
    const code = params.get("code");
    const response_type = "id_token";
    const grantType = "authorization_code";
    const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENTID;
    const REST_SECRET_KEY = process.env.NEXT_PUBLIC_GOOGLE_SECRET;
    const REDIRECT_URI = process.env.NEXT_PUBLIC_GOOGLE_REDIRECTURI;

    axios
      .post(
        `https://oauth2.googleapis.com/token?response_type=${response_type}&grant_type=${grantType}&client_id=${CLIENT_ID}&client_secret=${REST_SECRET_KEY}&redirect_uri=${REDIRECT_URI}&code=${code}`,
        {},
        { headers: { "Content-type": "application/x-www-form-urlencoded;charset=utf-8" } },
      )
      .then((res: any) => {
        const { id_token } = res.data;
        return id_token;
      })
      .then((id_token: string) =>
        axios.post(
          `${APIendpoint()}/auth/login/google`,
          {},
          {
            headers: { "google-token": `Bearer ${id_token}` },
          },
        ),
      )
      .then((res: any) => {
        const { access_token } = res.data;
        localStorage.setItem("access_token", access_token);
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
