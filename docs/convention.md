# Convention

## 개요

프로젝트의 크기가 거대해지면서 컨벤션 관리가 필수적이게 되었습니다. 코드 작성시 지켜야할 규칙에 대해 정리해두려 합니다.

## CSS Convention

## File Convention

### 개요

- 파일의 폴더 구조를 어떻게 작성해야하는지를 설명하는 문서입니다.

### 규칙

- 타입스크립트 파일은 아래의 7개의 유형으로 정의

1. Component(컴포넌트): tsx파일 중 웹상에 element(div, p, img, head, meta 등)를 하나라도 렌더링하는 파일
2. Provider(프로바이더): 컴포넌트가 아닌 tsx 파일 중에서 CreateContext를 통해 Global state를 관리하거나, 다른 라이브러리를 import하는 역할을 가진 파일
3. Hook(훅): ts 파일 중에서 Use를 접두사로 가져 (Global)State를 관리하는 파일
4. StyleSheet(스타일시트): tsx파일 중에서 컴포넌트, Provider에 해당되지 않으면서 styled-component를 사용해 스타일링만을 담당하는 파일
5. Api: ts파일 중에서 axios를 통한 rest api 통신만을 다루는 함수들을 정리해둔 파일
6. Type(타입): ts파일 중에서 타입 정의만을 수행하는 파일
7. Util(유틸): 이외의 모든 파일

- 컴포넌트는 파일 전부를 app 디렉토리 내부에 넣을 것
  - 특정 페이지의 요소 일부를 분리시킨 파일로서 특정 route 한곳에서만 사용되는 파일의 경우, 해당 route에 components 폴더를 생성해서 사용
    - `/account/page.tsx`에서"만" `Profile.tsx`를 사용하는 경우 `Profile.tsx`의 경로는 `/account/components/Profile.tsx`가 되야 함
  - 두곳 이상에서 재사용되는 컴포넌트의 경우 첫번째 Segment를 기준으로 몇군데에서 사용되는가에 따라 결정
    - 한군데에서만 사용되는경우: `첫번째 segment이름/components/general` 폴더 사용
    - root(`/`)가 포함되어있거나 두군데 이상에서 사용되는경우: `/app/components/general` 폴더 사용
    - ex1: `Header.tsx`가 `/`, `/account` 두군데어서 사용되는 경우 -> root에 있는 컴포넌트에서 사용되고 있기 때문에 `Profile.tsx`의 경로는 `/app/components/general/Header.tsx`가 되야함
    - ex2: `Profile.tsx`가 `/community/[boardId]`, `/community/[boardId]/posts/[postId]` 두군데어서 사용되는 경우 -> 가장 첫번재 Segment를 기준으로 community 한군데만 사용하기 때문에 `Profile.tsx`의 경로는 `/app/community/components/general/Profile.tsx`가 되야함
    - ex3: `Navigation.tsx`가 `/menu`, `/account` 두군데어서 사용되는 경우 -> 가장 첫번재 Segment를 기준으로 menu, account 두곳에서 사용하기 때문에 `Navigation.tsx`의 경로는 `/app/components/general/Navigation.tsx`가 되야함
- 스타일시트는 해당 스타일 시트가 import되는 파일과 동일한 경로상에 위치시킬 것
  - 불가피한 경우가 아니라면 컴포넌트 내부에 스타일링 하는것을 권장
  - `/Account/page.tsx`에서 별도로 분리된 `AccountStyle.tsx`을 사용하는 경우, 파일의 경로는`/Account/AccountStyle.tsx`가 되야함
- 타입, 유틸의 경우 각각 `/types`, `/utils` 폴더를 이용하는 것을 원칙으로 하되, 특정 파일 하나에서만 일회성으로 사용되는 경우 해당 폴더에 넣는것을 허용
  - `/Auth/page.tsx`에서 `authType.ts`로 작명된 타입 정의파일을 사용하는 경우, 파일을 `/types/authType.ts`에 배치하는것을 원칙으로 하되, 해당 파일 이외의 장소에서 사용되지 않는경우 `/Auth/authType.ts`에 배치하는것도 허용
- Provider, Hook의 경우 각각 `/providers`, `hooks`에 작성
- api의 경우 `/utils/api`에 작성
  - next.js api route와의 충돌 방지를 위함
- public 폴더에 사용되는 파일들 중에서 img폴더의 경우는 컴포넌트와 같은 규칙으로 작성
  - `close.svg`가 모든 페이지에서 사용될 때, 해당 파일은 `/public/img/general/close.svg`에 위치
  - `account-default`.svg가 `/account` 에서만 사용될 때, 해당 파일은 `/public/img/account/account-default.svg`에 위치

## Code Convention

기본적인 내용은 prettier에 이미 적용되어 있기 때문에, 이를 제외한 부분에 대해서만 설명합니다.
