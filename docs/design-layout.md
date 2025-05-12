# Design - Layout

> 복잡하고 파편화되어 있는 디자인을 정리하기 위해, 디자인 시스템을 정리하는 문서를 만들었습니다. 본 문서는 그 중 레이아웃에 대한 내용을 담았습니다.

## 2-Column Layout
> 파일 위치: `/src/styles/layouts/TwoColumnLayout.tsx`

### 개요
- 2개의 column으로 구성된 웹페이지에 쓰이는 레이아웃입니다.
- 데스크톱 전용 레이아웃입니다.

### 적용 페이지/컴포넌트
- 홈 (`/`)
- 메뉴 상세 (`/menu/[menuId]`)
- 헤더 (`<Header>`)

### 반응형 디자인 세부 정책
브라우저 창의 너비 감소 시, 아래와 같은 방식으로 디자인이 변화합니다.

> - 좌우 padding만을 감소시키다가, padding 값이 24px에 도달하면 우측 영역 너비 감소 시작
> - 컨텐츠 영역 좌우 padding = **최소** 24px, 컨텐츠 영역 내부 간격 = 30px
> - 좌측 영역 너비 = 378px (고정), 우측 영역 너비 = **최대** 786px

### 구성 요소 및 사용 예
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
  ...
  height: 948px
  ...
  @media (max-width: 900px) {
    padding: 0 16px;
  }
  ...
`;
...
```
앞으로의 모든 Layout들도 동일하게 상속을 이용해 attribute를 편집해야 합니다.

---
## 1-Column Layout
> 파일 위치: `/src/styles/layouts/OneColumnLayout.tsx`

### 개요
- 단일 column으로 구성된 웹페이지에 쓰이는 레이아웃입니다.
- 데스크톱/모바일 겸용 레이아웃입니다.

### 적용 페이지/컴포넌트
- 리뷰 작성 (`/menu/[menuId]/reviews/write`)
- 커뮤니티 (`/community/*`)
- 마이 페이지 (`/account/*`)

### 반응형 디자인 세부사항

- 데스크톱에서는 최대 `582px`의 width를 가지며, 좌우 margin은 동일합니다.
- 모바일에서는 `100%`의 width를 갖습니다.

### 구성 요소
```typescript
// src/styles/layouts/OneColumnLayout.tsx
...
const OneColumnLayout = { Container };

export default OneColumnLayout;
```
- `Container`: 단일 column을 감싸는 container

---
## Mobile Layout
> 파일 위치: `/src/styles/layouts/MobileLayout.tsx`

### 개요
- 데스크톱 전용 페이지들의 모바일 UI를 구성하기 위한 레이아웃입니다.
- 모바일 전용 레이아웃입니다.

### 적용 페이지/컴포넌트
- 메뉴 상세 (`/menu/[menuId]`) \
(홈(`/`)에는 적용 예정입니다.)

### 구성 요소
```typescript
// src/styles/layouts/MobileLayout.tsx
...
const MobileLayout = { Container, Section };

export default MobileLayout;
```
- `Container`: 단일 Column을 감싸는 container
- `Section`: 단일 Column 내 영역을 구분하는 section 