import axios from "axios";
import { useEffect } from "react";

export default function Auth() {
  useEffect(() => {
    const params = new URL(document.location.toString()).searchParams;
    const code = params.get("code");
    console.log(code);
    const grantType = "authorization_code";
    const REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_RESTAPI;
    const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECTURI;
    axios
      .post(
        `https://kauth.kakao.com/oauth/token?grant_type=${grantType}&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${code}`,
        {},
        { headers: { "Content-type": "application/x-www-form-urlencoded;charset=utf-8" } },
      )
      .then((res: any) => {
        console.log(res);
        const { access_token } = res.data;
        axios
          .post(
            `https://siksha-api-dev.wafflestudio.com/auth/login/kakao`,
            {},
            { params: { "kakao-token": access_token } },
          )
          .then((res: any) => {
            console.log(res);
          })
          .catch((res: any) => {
            console.log(res);
          });
      })
      .catch((res: any) => {
        console.log(res);
      });
  }, []);
  return <>F</>;
}
