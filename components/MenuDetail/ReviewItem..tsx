import React from "react";
import styled from "styled-components";
import Stars from "./Stars";
import { ReviewType } from "../../pages/menu/[id]";

export function ReviewItem({ review }: { review: ReviewType }) {
  return (
    <ReviewItemContainer>
      <ReviewInfo>
        <ReviewerInfo>
          <ReviwerProfile src={"/img/default-profile.svg"} width="36px" />
          <div>
            <ReviewerIdText>ID {review.user_id}</ReviewerIdText>
            <Stars score={review.score || 0} />
          </div>
        </ReviewerInfo>
        <ReviewDate>{review.created_at.substring(0, 10)}</ReviewDate>
      </ReviewInfo>
      <ReviewContent>{review.comment}</ReviewContent>
    </ReviewItemContainer>
  );
}

const ReviewItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 24px;
`;

const ReviwerProfile = styled.img`
  width: 36px;
  height: 36px;
  margin-right: 15px;
`;

const ReviewerInfo = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const ReviewInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

const ReviewContent = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: #4f4f4f;
  border-radius: 8px;
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.15);
  min-height: 100px;
  margin-top: 4px;
  padding-top: 14px;
  padding-left: 22px;
  padding-right: 22px;
  width: 100%;
  word-break: break-all;
`;

const ReviewerIdText = styled.div`
  font-size: 14px;
  font-weight: 700;
`;

const ReviewDate = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: #919191;
  width: 100px;
  text-align: right;
  vertical-align: bottom;
`;

export default ReviewItem;
