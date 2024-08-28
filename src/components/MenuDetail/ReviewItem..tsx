import React from "react";
import styled from "styled-components";
import Stars from "./Stars";
import { ReviewType } from "../../pages/menu/[menuId]";

export function ReviewItem({ review }: { review: ReviewType }) {
  return (
    <ReviewItemContainer>
      <ReviewInfo>
        <ReviewerInfo>
          <ReviwerProfile src={"/img/default-profile.svg"} />
          <div>
            <ReviewerIdText>ID {review.user_id}</ReviewerIdText>
            <Stars score={review.score || 0} />
          </div>
        </ReviewerInfo>
        <ReviewDate>{review.created_at.substring(0, 10)}</ReviewDate>
      </ReviewInfo>
      <ReviewContent>{review.comment}</ReviewContent>
      {review.etc && (
        <ReviewImageList>
          {review.etc.images.map((image) => (
            <ReviewImage key={image} src={image} />
          ))}
        </ReviewImageList>
      )}
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
  width: 43px;
  height: 43px;
  border-radius: 50%;
  object-fit: cover;
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
  color: #000;
  border-radius: 8px;
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.15);
  min-height: 100px;
  margin: 4px 3px 0 34px;
  padding: 14px 26px 0 26px;
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

const ReviewImageList = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  height: 192px;
  padding-left: 23px;
  padding-top: 12px;
  @media (max-width: 768px) {
    height: 102px;
  }
`;

const ReviewImage = styled.img`
  object-fit: cover;
  height: 192px;
  width: 192px;
  margin: 0 9px;
  border-radius: 8px;
  @media (max-width: 768px) {
    height: 102px;
    width: 102px;
  }
`;

export default ReviewItem;
