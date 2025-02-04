import useFilter from "hooks/useFilter";
import styled from "styled-components";

interface SliderProps {
  min: number;
  max: number;
  step: number;
}

const Slider = ({ min, max, step }: SliderProps) => {
  return <SliderBar type="range" min={min} max={max} color="gray" step={step} />;
};

const SliderBar = styled.input`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  outline: none;

  width: 256px;
  height: 4px;

  border-radius: 4px;
  background: var(--Color-Foundation-gray-200, #e5e6e9);
  accent-color: var(--Color-Foundation-orange-500, #ff9522);
`;

export default function RestaurantFilter() {
  const { filterList, changeFilterOption } = useFilter();
  const { length, priceMin, priceMax, ratingMin, isReview } = filterList;

  const setRatingMin = (rating: number) => changeFilterOption({ ratingMin: rating });
  const setIsReview = (review: boolean) => changeFilterOption({ isReview: review });

  return (
    <Container>
      <Header>
        <Title>메뉴 필터</Title>
        <RefreshBox>
          <RefreshIcon src={"img/refresh.svg"} />
          <RefreshText>초기화</RefreshText>
        </RefreshBox>
      </Header>
      <Filter>
        <SliderBox>
          <SliderContent>
            <PicketBox>
              <PicketText>1000m이내</PicketText>
              <PicketBottom src={"img/picket-bottom.svg"} />
            </PicketBox>
            <ContentBar>
              <FilterText>거리</FilterText>
              <Slider min={200} max={1050} step={50} />
            </ContentBar>
          </SliderContent>
          <SliderContent>
            <PicketBox>
              <PicketText>1000원~10000원</PicketText>
              <PicketBottom src={"img/picket-bottom.svg"} />
            </PicketBox>
            <ContentBar>
              <FilterText>가격</FilterText>
              <Slider min={0} max={15500} step={50} />
            </ContentBar>
          </SliderContent>
        </SliderBox>
        <ContentBar>
          <FilterText>영업시간</FilterText>
          <ButtonGroup>
            <FilterButton>전체</FilterButton>
            <FilterButton>영업 중</FilterButton>
          </ButtonGroup>
        </ContentBar>
        <ContentBar>
          <FilterText>리뷰 유무</FilterText>
          <ButtonGroup>
            <FilterButton active={!isReview} onClick={() => setIsReview(false)}>
              전체
            </FilterButton>
            <FilterButton active={isReview} onClick={() => setIsReview(true)}>
              리뷰 있음
            </FilterButton>
          </ButtonGroup>
        </ContentBar>
        <ContentBar>
          <FilterText>최소 평점</FilterText>
          <ButtonGroup>
            <FilterButton
              active={![3.5, 4, 4.5].includes(ratingMin)}
              onClick={() => setRatingMin(0)}
            >
              전체
            </FilterButton>
            <FilterButton active={ratingMin === 3.5} onClick={() => setRatingMin(3.5)}>
              3.5
            </FilterButton>
            <FilterButton active={ratingMin === 4} onClick={() => setRatingMin(4)}>
              4.0
            </FilterButton>
            <FilterButton active={ratingMin === 4.5} onClick={() => setRatingMin(4.5)}>
              4.5
            </FilterButton>
          </ButtonGroup>
        </ContentBar>
      </Filter>
      <DecideButton>필터 적용하기</DecideButton>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 16px;
  background-color: white;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

const Title = styled.h3`
  color: var(--Color-Foundation-gray-900, #262728);

  font-size: var(--Font-size-16, 16px);
  font-weight: var(--Font-weight-extrabold, 800);
  line-height: 140%; /* 22.4px */
`;

const RefreshBox = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const RefreshIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const RefreshText = styled.span`
  color: var(--Color-Foundation-gray-800, #4c4d50);
  font-size: var(--Font-size-13, 13px);
  font-weight: var(--Font-weight-bold, 700);
  line-height: 140%; /* 18.2px */
`;

const Filter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const SliderBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const PicketBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SliderContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  align-self: stretch;
  gap: 4px;
`;

const PicketText = styled.div`
  display: flex;
  padding: 2px 4px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 4px;
  background: var(--Color-Foundation-gray-100, #f2f3f4);
  color: var(--Color-Foundation-gray-800, #4c4d50);

  text-align: center;
  font-family: var(--Font-family-sans, NanumSquareOTF);
  font-size: var(--Font-size-11, 11px);
  font-weight: var(--Font-weight-bold, 700);
  line-height: 140%; /* 15.4px */
`;

const PicketBottom = styled.img`
  width: 6px;
  height: 5px;
  fill: var(--Color-Foundation-gray-100, #f2f3f4);
`;

const ContentBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const FilterText = styled.span`
  width: 54px;
  color: var(--Color-Foundation-gray-900, #262728);
  font-size: var(--Font-size-14, 14px);
  font-weight: var(--Font-weight-bold, 700);
  line-height: 150%; /* 21px */
`;

const ButtonGroup = styled.span`
  display: flex;
  width: 264px;
  height: 30px;
  padding: 4px;
  align-items: center;
  border-radius: 8px;
  background: var(--Color-Foundation-gray-100, #f2f3f4);
`;

const FilterButton = styled.button<{ active?: boolean }>`
  display: flex;
  height: 30px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1 0 0;
  border-radius: 4px;
  background: ${(props) =>
    props.active ? "var(--Color-Foundation-base-white, #FFF)" : "transparent"};

  color: var(--Color-Foundation-gray-900, #262728);
  text-align: center;
  /* text-12/ExtraBold */
  font-size: var(--Font-size-12, 12px);
  font-weight: var(--Font-weight-extrabold, 800);
  line-height: 140%; /* 16.8px */
  letter-spacing: var(--Font-letter-spacing-0, -0.3px);
`;

const DecideButton = styled.button`
  display: flex;
  height: 42px;
  padding: 0px 65px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-radius: 8px;
  background: var(--Color-Foundation-orange-500, #ff9522);

  color: var(--Color-Foundation-base-white, #fff);
  text-align: center;
  font-size: 14px;
  font-weight: 700;
  line-height: normal;
`;
