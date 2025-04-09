# Convention

## 개요

프로젝트의 크기가 거대해지면서 컨벤션 관리가 필수적이게 되었습니다. 코드 작성시 지켜야할 규칙에 대해 정리해두려 합니다.

## CSS Convention

## File Convention

> 이 항목을 읽기 전, 먼저 Next.js 공식문서의 [Project structure and organization](https://nextjs.org/docs/app/getting-started/project-structure)를 읽는 것을 권장합니다.
### Overall Directory Structure
```
docs
public
|- font
|- img
|  |- general
|  `- ...
`- manifest
serverless
src
|- app
|- components
|- constants
|- hooks
|- providers
|- styles
|  `- layouts
|- types
`- utils
   `- api
```
---
### Top-level Directory
`docs`
- 프로젝트의 문서화 파일을 포함합니다. 컨벤션, 가이드라인, 참조 자료 등이 포함됩니다.

`public`
- 이미지, 폰트, manifest 파일과 같은 static asset을 저장합니다.
  - `font`: 폰트 파일 (예: `NanumSquare_acB.ttf`)
  - `img`: 웹사이트에 표시되는 이미지
    - `general`: 여러 페이지나 컴포넌트에서 사용되는 공통 이미지
    - 기타 하위 폴더는 특정 페이지나 컴포넌트에서 사용되는 이미지를 기준으로 구성됩니다.
  - `manifest`: 웹사이트의 아이콘 및 썸네일 (예: favicon, Open Graph 이미지)
  
`serverless`
- 동적 라우팅 및 기타 서버리스 기능을 위한 AWS Lambda 함수 코드를 포함합니다.

`src`
- 프로젝트의 주요 소스 코드가 포함된 폴더입니다. 애플리케이션 로직, 컴포넌트, 스타일, 유틸리티 등이 포함됩니다.
---
### `src` Directory Structure
`app`
- **페이지**, **레이아웃**, 특정 라우트와 관련된 **컴포넌트**를 포함합니다.
- `app` 폴더의 디렉토리 구조는 애플리케이션의 라우팅을 결정합니다. 자세한 내용은 [Next.js 문서](https://nextjs.org/docs/pages/building-your-application/routing/pages-and-layouts)를 참고하세요.
- **컴포넌트**의 배치 규칙은 아래 "파일 유형 및 규칙" 항목에서 상술하였습니다.

`components` *(deprecated)*
> *이 폴더는 `/app/components`로 대체되었습니다. 더 이상 이 폴더 아래에 추가로 컴포넌트를 배치하지 마세요.*
- 전역적으로 쓰이는 컴포넌트를 포함합니다.
  - `general`: 여러 페이지나 컴포넌트에서 사용되는 범용 컴포넌트
  - 그 외 폴더의 경우 아직 app 디렉토리로 마이그레이션되지 않은 컴포넌트들을 포함합니다.

`constants`
- Global Constant를 저장합니다. (예: API base URL, 식단 필터 설정 값 등)

`hooks`
- 재사용 가능한 로직을 관리하기 위한 [Custom Hook](https://react.dev/learn/reusing-logic-with-custom-hooks)을 포함합니다.

`providers`
- Global State를 관리하거나 관련 라이브러리를 가져오는 Context Provider를 포함합니다.

`styles`
- Global Style과 Layout Component를 포함합니다.
  - `layouts`: 애플리케이션 전반에서 사용되는 Layout Component

`types`
- 프로젝트 전반에서 사용되는 TypeScript interface와 타입 정의를 포함합니다.

`utils`
- 유틸리티 함수와 헬퍼 메서드를 포함합니다.
  - `api`: REST API 통신을 위한 함수들을 정리한 파일

---
### 파일 유형 및 규칙

**파일 유형**
1. **Component**: DOM 요소(div, p, img, head, meta 등)를 렌더링하는 `.tsx` 파일.
1. **Provider**: `CreateContext`를 통해 Global State를 관리하거나 라이브러리를 가져오는 `.tsx` 파일.
2. **Hook**: `use` 접두사를 가지며, 재사용 가능한 로직을 관리하는 `.ts` 파일.
3. **StyleSheet**: styled-components를 사용해 스타일링만 담당하는 `.tsx` 파일.
4. **Api**: REST API 통신을 위한 함수들을 포함하는 `.tsx` 파일.
5. **Type**: TypeScript 타입 정의만을 수행하는 `.ts` 파일.
6. **Util**: 기타 유틸리티 함수들을 포함하는 `.ts` 파일.

**배치 규칙**
- **Component**: `/app` 아래의 `component` 폴더들에 배치.
  > Component의 배치 규칙에 등장하는 모든 파일 경로들은 앞에 `/app` 이 생략되었습니다.
  1. 특정 page나 component에서만 사용되는 경우
    - 해당 page가 속한 폴더 내, 혹은 해당 component가 속한 `components` 폴더에 배치합니다.
    - 예: `/community/write/page.tsx` 에서만 사용하는 `BoardSelectDropdown.tsx` 는 `/community/write/components/BoardSelectDropdown.tsx`로 배치합니다.

  2. 두 곳 이상의 page/component에서 재사용되는 경우
    - 사용되는 page/component들의 최소 공통 조상이 되는 폴더 내 `components` 폴더에 배치합니다. 단, 최소 공통 조상이 `/`인 경우 `/components/general`에 배치합니다.
      - 예1: `Profile.tsx`가 `/community/[boardId]`와 `/community/[boardId]/posts/[postId]`에서 사용된다면, 최소 공통 조상이 **`/community/[boardId]`**이므로 `/community/[boardId]/components/Profile.tsx`로 배치합니다.
      - 예2: `Header.tsx`가 `/page.tsx`와 `/account/page.tsx`에서 사용된다면, 최소 공통 조상이 **`/`**이므로 `/components/general/Header.tsx`에 배치합니다.
      - 예3: `Navigation.tsx`가 `/menu/[menuId]/page.tsx`와 `/account/page.tsx`에서 사용된다면, 최소 공통 조상이 **`/`**이므로 `/components/general/Navigation.tsx`에 배치합니다.
  
- **Provider**: `/providers`에 배치.

- **Hook**: `/hooks`에 배치.

- **StyleSheet**: 스타일링이 필요한 파일과 동일한 경로에 배치.
  - 불가피한 경우가 아니라면 `/styles`에 배치하지 않습니다.

- **Api**: `/utils/api`에 배치.
  - `/api`에 배치하지 않는 것은 next.js api route와의 충돌 방지를 위함입니다.

- **Type**: `/types`에 배치.
  - 단, 특정 파일에서만 사용되는 경우 해당 파일과 동일한 경로에 배치 가능.

- **Util**: `/utils`에 배치.
  - 단, 특정 파일에서만 사용되는 경우 해당 파일과 동일한 경로에 배치 가능.
  
\+ `Public` 폴더의 **img** 파일 배치 규칙

1. 모든 페이지에서 사용되는 경우:
- `general` 폴더에 배치합니다.
- 예: `close.svg`가 모든 페이지에서 사용된다면 `/public/img/general/close.svg`에 배치

2. 특정 라우트에서만 사용되는 경우:
- 해당 라우트 이름의 폴더를 생성하여 배치합니다.
- 예: `account-default.svg`가 `/account`에서만 사용된다면 `/public/img/account/account-default.svg`에 배치

---
### Top-level files
```
.dockerfile
(.env)
.eslintrc
.gitignore
.prettierignore
.prettierrc
next-env.d.ts
next.config.js
package-lock.json
package.json
README.md
tsconfig.json
yarn.lock
```
- `.dockerfile`: Docker 컨테이너 설정 파일
- `.env`: 환경 변수 파일
- `.eslintrc`: ESLint 설정 파일
- `.gitignore`: Git에서 무시할 파일 및 폴더 목록 
- `.prettierignore`: Prettier에서 무시할 파일 및 폴더 목록
- `.prettierrc`: Prettire 설정 파일
- `next-env.d.ts`: Next.js의 Typescript 정의 파일
- `next.config.js`: Next.js 설정 파일
- `package-lock.json`: (npm) 의존성 버전 기록 파일
- `package.json`: 프로젝트 의존성과 스크립트
- `README.md`: 이 파일
- `tsconfig.json`: Typescript 설정 파일
- `yarn.lock`: (yarn) 의존성 버전 기록 파일

> 원칙상 npm과 yarn 중 하나의 패키지 매니저만을 사용해야 하므로, `package-lock.json`과 `yarn.lock` 중 하나의 파일만 존재해야 합니다. 따라서 두 파일이 공존하는 현재의 상태는 적절치 않고, 언젠가 하나로 통일해야 합니다.
---
## Code Convention

기본적인 내용은 prettier에 이미 적용되어 있기 때문에, 이를 제외한 부분에 대해서만 설명합니다.
