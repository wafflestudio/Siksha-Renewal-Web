"use client";

import { RawReview } from "types";
import MyReviewItem from "./MyReviewItem";
import styled from "styled-components";
import { useState } from "react";

interface MyReviewGroupProps {
  restaurantName: string;
  reviews: RawReview[];
  isFirst: boolean;
}

export default function MyReviewGroup({ restaurantName, reviews, isFirst }) {
  const [isOpen, setIsOpen] = useState(isFirst);

  const handleAccordionButtonClick = () => {
    setIsOpen((prev) => !prev);
  };

  // 서버에서 etc를 object로 보내주지 않는 문제 임시 대응
  // TODO: 서버한테 etc를 object로 보내달라고 하기
  const parseEtc = (etc: any) => {
    if (etc) {
      if (typeof etc === "string") {
        try {
          etc = JSON.parse(etc);
        } catch (e) {
          console.error("Failed to parse etc:", e);
          etc = {};
        }
      }
    }
    return etc;
  };

  return (
    <>
      <Container $isOpen={isOpen}>
        <Header onClick={handleAccordionButtonClick}>
          <RestaurantName>{restaurantName}</RestaurantName>
          <AccordionButton src="/img/accordion-arrow.svg" $isOpen={isOpen} />
        </Header>
        <Body $isOpen={isOpen}>
          <HLine />
          <MyReviewContainer>
            {reviews.map((review) => {
              review.etc = parseEtc(review.etc);
              return <MyReviewItem key={review.id} review={review} />;
            })}
          </MyReviewContainer>
        </Body>
      </Container>
    </>
  );
}

const Container = styled.div<{ $isOpen: boolean }>`
  padding: ${(props) => (props.$isOpen ? "12px 8px 16px" : "12px 8px")};
  border-radius: 8px;
  border: 1px solid var(--Color-Foundation-gray-200, #e5e6e9);
  background: var(--SemanticColor-Background-Secondary, #fff);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 8px;
  cursor: pointer;
`;

const RestaurantName = styled.div`
  color: var(--Color-Foundation-base-black, #000);
  font-family: NanumSquare;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 140%; /* 16.725px */
`;

const AccordionButton = styled.img<{ $isOpen: boolean }>`
  width: 24px;
  height: 24px;
  transform: ${(props) => (props.$isOpen ? "rotate(0deg)" : "rotate(180deg)")};
  cursor: pointer;
`;

const Body = styled.div<{ $isOpen: boolean }>`
  display: ${(props) => (props.$isOpen ? "inherit" : "none")};
`;

const HLine = styled.hr`
  border: 0;
  height: 1.5px;
  background: var(--Color-Foundation-orange-500, #ff9522);
  margin: 8px 7.5px 12px;
`;

const MyReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  padding: 0 7px;
`;
