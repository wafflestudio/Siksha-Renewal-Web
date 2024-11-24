# Apple login

## 개요

애플로그인의 경우 다른 소셜로그인과 oAuth 로그인과 다르게 주의해야할 부분이 여러개 있습니다. 특히 공식문서에도 언급되지 않은 부분들이 있기 때문에 개발중 문제될 수 있는 부분들에 대해 정리해두려 합니다.

- 공통되는 주의사항
  - apple 로그인을 code를 사용해 id token을 가져오려면 프론트엔드 단에서 encode된 jwt token을 secret(apple app id에서 제공되는 id, secret를 바탕으로 jwt를 인코딩해야함)으로 제공해야함
  - redirectURI는 localhost로 사용 불가능 하기때문에 vercel서버 등에 배포한 후 테스트해야함
- 방법1: windows.href 사용해 직접이동
  - 구글 로그인, 카카오 로그인과 마찬가지로 로그인시 직접 url을 제공해 이동 가능하며, 아래와 같이 url 사용
  - ```ts
    const appleUrl = `https://appleid.apple.com/auth/authorize?response_type=code id_token id_token&client_id=${clientId}&redirect_uri=${redirectUri}`;
    ```
  - nonce, scope는 주지않아도 되나, response_type은 `code id_token`로 설정해야함
    - code만 사용시 앞선이유로 사용이 어렵고, id_token만 작성시 로그인시도시 에러 발생
  - **사파리 사용시 apple passkey 이용해 로그인시 /login 라우트로 강제 이동 + id-token 미제공 문제로 인해 현재 사용 불가능**
  - 추후 로그인 구현 변경예정되어있는데, 이 때 이방식으로 수정하는게 좋아보임(문서화 안되있어서 직접 구글링 + 삽질로 해결해야함!)
- 방법2: js api 사용

  - [공식 문서](https://developer.apple.com/documentation/sign_in_with_apple/sign_in_with_apple_js/configuring_your_webpage_for_sign_in_with_apple)대로 구현해야 함
  - ```ts
    const clientId = process.env.NEXT_PUBLIC_APPLE_CLIENTID!;
    const redirectUri = process.env.NEXT_PUBLIC_APPLE_REDIRECTURI!;

    window.AppleID.auth.init({
      clientId: clientId,
      scope: "email",
      redirectURI: redirectUri,
      state: String(new Date().getTime()),
      usePopup: true,
    });

    window.AppleID.auth.signIn().then((response: any) => {
      const {
        authorization: { id_token },
      } = response;

      window.location.href = `/auth/apple/?id_token=${id_token}`;
    });
    ```

  - nonce는 없어도 되나, state의 경우 작성해줄 필요가 있음
  - usePopup: false의 경우 scope 설정에 관계없이 redirect uri에 post요청 들어가서 오류발생
    - 문서에는 scope설정에서 email이 아닌 다른값을 주면 된다 나와있는데, 실제로는 scope설정이 아닌 usePopup설정에 따라 결정됨
  - 로그인 성공시 state, id_token, code, user(=애플 유저 정보로 `{ "name": { "firstName": string, "lastName": string }, "email": string }` 형식) 데이터를 받을 수 있음
  - 오류 발생시 error, state값을 받아올 수 있음
  - 성공시 id_token을 받아와 apple auth page로 리다이렉트 시키면 되고, 이후부터는 다른 소셜로그인 방법에서 id_token을 백엔드 서버에 제공해 access_token을 받아오는 부분부터 똑같이 진행하면 됨
