# Design - Layout

## 개요

복잡하고 파편화되어 있는 디자인을 정리하기 위해, 디자인 시스템을 정리하는 문서를 만들었습니다. 본 문서는 그 중 레이아웃에 대한 내용을 담았습니다.

## 1-Column Layout (구현 예정)

### 개요
- 단일 column으로 구성된 웹페이지에 쓰이는 레이아웃입니다.

### 적용 페이지/컴포넌트
- 커뮤니티 (`/community/*`)
- 마이 페이지 (`/account/*`)
- 모든 **모바일** 페이지

## 2-Column Layout
파일 위치: `/src/styles/layouts/TwoColumnLayout.tsx`

### 개요
- 2개의 column으로 구성된 웹페이지에 쓰이는 레이아웃입니다. 대부분 데스크탑에서의 화면을 구현할 때 사용합니다.

### 적용 페이지/컴포넌트
- 홈 (`/`)
- 리뷰 (`/menu/[menuId]`)
- 헤더 (`<Header>`)

### 반응형 디자인 세부사항
브라우저 창의 너비 감소 시, 아래와 같은 방식으로 디자인이 변화합니다.

**~1201px**
- 좌우 padding만을 감소시키다가, padding 값이 24px에 도달하면 우측 영역 너비 감소 시작
- 컨텐츠 영역 좌우 padding = 24px, 컨텐츠 영역 내부 간격 = 30px
- 좌측 영역 너비 = 378px, 우측 영역 너비 = **최대** 786px

**1200px ~ 901px**
- 우측 영역 너비만 감소
- 컨텐츠 영역 너비(padding 포함) = 브라우저 창 너비
- 컨텐츠 영역 좌우 padding = 24px, 컨텐츠 영역 내부 간격 = 30px
- 좌측 영역 너비 = 378px, 우측 영역 너비 = 가변적

**900 ~ 768px**
- 우측 영역 너비만 감소
- 컨텐츠 영역 너비(padding 포함) = 브라우저 창 너비
- 컨텐츠 영역 좌우 padding = **최소** 16px, 컨텐츠 영역 내부 간격 = 30px
- 좌측 영역 너비 = 360px, 우측 영역 너비 = 가변적(**445px**에서부터 감소 시작)

### 사용 예
`TwoColumnLayout.tsx`의 export 문은 아래와 같이 작성되었습니다.
```typescript
// src/styles/layouts/TwoColumnLayout.tsx
...
const TwoColumnLayout = { Container, Left, Right };

export default TwoColumnLayout;
```
- `Container`: 2개 column을 감싸는 component
- `Left`, `Right`: 각각 왼쪽, 오른쪽 column

따라서 다음과 같이 사용 가능합니다. attribute를 추가/편집하고 싶으신 경우 상속을 활용해주세요.
```typescript
// src/app/pages.tsx
...
import TwoColumnLayout from "styles/layouts/TwoColumnLayout";

export default function Home() {
  ...
  return (
    <>
      <DesktopContainer>
        <LeftSide />
        <RightSide />
      </DesktopContainer>
      ...
    </>
  );
}

const DesktopContainer = styled.(TwoColumnLayout.Container)`
  height: max(780px, 100vh - min(25vh, 271px));
`;
...
```

## Grid Layout (구현 예정)

### 적용 페이지/컴포넌트
- 사진 리뷰 (`/menu/[menuId]/photos`)