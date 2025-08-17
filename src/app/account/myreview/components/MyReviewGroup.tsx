import { RawReview } from "types";
import MyReviewItem from "./MyReviewItem";
import styled from "styled-components";

interface MyReviewGroupProps {
  restaurantName: string;
  reviews: RawReview[];
};

export default function MyReviewGroup({
  restaurantName,
  reviews,
}) {
  return (
    <>
      <Container>
        <Header>
          <RestaurantName>
            {restaurantName}
          </RestaurantName>
          <ToggleButton />
        </Header>
        <HLine />
        <MyReviewContainer>
          {reviews.map((review) => (
            <MyReviewItem key={review.id} review={review} />
          ))}
        </MyReviewContainer>
      </Container>
    </>
  );
}

const Container = styled.div``;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const RestaurantName = styled.div`
  color: var(--Color-Foundation-base-black, #000);
  font-family: NanumSquare;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 140%; /* 16.725px */
`;

const ToggleButton = styled.button``;

const HLine = styled.hr`
  stroke-width: 1.5px;
  stroke: var(--Color-Foundation-orange-500, #FF9522);
`;

const MyReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
`;