import Image from "next/image";
import styled from "styled-components";

export default function MobileFilterBar() {
  return (
    <>
      <Container>
        <Image src="img/filter-icon.svg" alt="필터 아이콘" width={33.586} height={34} />
        <Button>
          <ButtonText>거리</ButtonText>
          <Image src="img/down-arrow-darkblue.svg" alt="아래 화살표" width={9.33} height={4} style={{"padding": "0 3.33px"}}/>
        </Button>
        <Button>
          <ButtonText>가격</ButtonText>
          <Image src="img/down-arrow-darkblue.svg" alt="아래 화살표" width={9.33} height={4} style={{"padding": "0 3.33px"}}/>
        </Button>
        <Button>
          {/* TODO: 해당 option의 값 세팅 여부로 체크 표시 여부 결정*/}
          <Image src="img/check-gray.svg" alt="체크 아이콘" width={16} height={16} />
          <ButtonText>영업 중</ButtonText>
        </Button>
        <Button>
          {/* TODO: 해당 option의 값 세팅 여부로 체크 표시 여부 결정*/}
          <Image src="img/check-gray.svg" alt="체크 아이콘" width={16} height={16} />
          <ButtonText>리뷰</ButtonText>
        </Button>
        <Button>
          <ButtonText>최소 평점</ButtonText>
          <Image src="img/down-arrow-darkblue.svg" alt="아래 화살표" width={9.33} height={4} style={{"padding": "0 3.33px"}}/>
        </Button>
        <Button>
          <ButtonText>카테고리</ButtonText>
          <Image src="img/down-arrow-darkblue.svg" alt="아래 화살표" width={9.33} height={4} style={{"padding": "0 3.33px"}}/>
        </Button>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-wrap: no-wrap;
  width: 100%;
  overflow-x: scroll;
  overflow-y: hidden;
  padding: 0 9px 17px 9px;
  box-sizing: border-box;
  gap: 5px;
`;

const Button = styled.button<{ isActive? : boolean }>`
  display: flex;
  flex: 0 0 auto;
  height: 34px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  gap: 2px;

  border-radius: 30px;
  border: 1px solid ${(props) => (props.isActive ? "var(--Color-Foundation-orange-500, #FF9522)" : "var(--Grey-2, #DFDFDF)")};
  background: ${(props) => (props.isActive ? "var(--Main-Active, #FFE8CE)" : "#FFF")};
`;

const ButtonText = styled.span`
  color: var(--Main-Balck, #000);
  leading-trim: both;
  text-edge: cap;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
`;
