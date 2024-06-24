import React, { useState } from "react";
import styled from "styled-components";
import APIendpoint from "../../constants/constants";
import axios from "axios";
import Image from "next/image";

export default function ReviewPostModal({
  isOpen,
  menu,
  onClose,
}: {
  isOpen: boolean;
  menu: {
    menuId: number;
    menuName: string;
  };
  onClose: () => void;
}) {
  const [score, setScore] = useState(3);
  const [comment, setComment] = useState("");

  const MAX_COMMENT_LENGTH = 150;

  const accessToken = localStorage.getItem("access_token");

  const onReviewSubmit = async () => {
    await axios
      .post(
        `${APIendpoint()}/reviews/`,
        {
          menu_id: menu.menuId,
          score,
          comment,
        },
        {
          headers: {
            "authorization-token": `Bearer ${accessToken}`,
          },
        },
      )
      .then((res) => {
        onClose();
      })
      .catch((err) => {
        console.log(err);
        window.alert(`리뷰 등록에 실패했습니다.`);
      });
  };

  if (!isOpen) return null;
  return (
    <Container>
      <ModalTitle>나의 평가 남기기</ModalTitle>
      <HLine />
      <ReviewTitle>
        &apos; <MenuNameText>{menu.menuName} </MenuNameText>&apos;{" "}
        <ReviewTitleText>는 어땠나요?</ReviewTitleText>
      </ReviewTitle>
      <SelectStarText>별점을 선택해 주세요.</SelectStarText>
      <StarsContainer>
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            src={i <= score ? "/img/star.svg" : "/img/star-empty.svg"}
            onClick={() => setScore(i)}
          />
        ))}
      </StarsContainer>
      <Score>{score}</Score>
      <CommentContainer>
        <div style={{ display: "flex" }}>
          <Image src="/img/comment.svg" alt="코멘트 이미지" width={18} height={18} />
          <CommentTitle>식단 한 줄 평을 함께 남겨보세요!</CommentTitle>
        </div>
        <div style={{ position: "relative" }}>
          <CommentTextArea
            value={comment}
            placeholder={"맛은 어땠나요?"}
            onChange={(e) => setComment(e.target.value.slice(0, MAX_COMMENT_LENGTH))}
          />
          <CommentLength>
            {comment.length} 자 / {MAX_COMMENT_LENGTH} 자
          </CommentLength>
        </div>
      </CommentContainer>
      {/* TODO: 리뷰 내 이미지 첨부 구현 */}
      <ModalFooter>
        <ReviewCancelButton
          onClick={() => {
            onClose();
          }}
        >
          취소
        </ReviewCancelButton>
        <ReviewPostButton
          onClick={() => {
            onReviewSubmit();
          }}
          disabled={comment.length === 0}
        >
          등록
        </ReviewPostButton>
      </ModalFooter>
    </Container>
  );
}

const Container = styled.div`
  box-sizing: border-box;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 38%;
  border-left: 1px solid #eeeeee;
  padding-left: 37px;
  padding-right: 36px;
  padding-top: 22px;
  padding-bottom: 22px;
  @media (max-width: 768px) {
    position: absolute;
    flex-grow: 1;
    width: 100vw;
    box-sizing: border-box;
  }
`;

const ModalTitle = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #ff9522;
  @media (max-width: 768px) {
    font-weight: 800;
  }
`;

const HLine = styled.div`
  width: 100%;
  height: 1px;
  background: #fe8c59;
  margin: 10px auto;
`;

const ReviewTitle = styled.div`
  display: flex;
  margin: 30px 0 22px 0;
  @media (max-width: 768px) {
    margin-bottom: 26px;
  }
`;

const MenuNameText = styled.div`
  color: #000;
  text-align: center;
  font-feature-settings: "clig" off, "liga" off;
  font-family: NanumSquareOTF;
  font-size: 20px;
  max-width: 140px;
  font-weight: 700;
  line-height: normal;
  text-align: center;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const ReviewTitleText = styled.span`
  color: #7a7a7a;
  font-feature-settings: "clig" off, "liga" off;
  font-family: NanumSquareOTF;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.3px;
`;

const SelectStarText = styled.span`
  display: none;
  margin-bottom: 16px;
  color: #707070;
  font-size: 14px;
  @media (max-width: 768px) {
    display: inherit;
  }
`;

const Star = styled.img`
  width: 43px;
  height: 40px;
  margin-right: 5px;
  cursor: pointer;
  @media (max-width: 768px) {
    width: 30px;
    height: 25px;
  }
`;

const StarsContainer = styled.div`
  display: flex;
  width: 242px;
  cursor: pointer;
  @media (max-width: 768px) {
    width: 152px;
  }
`;

const Score = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin-top: 10px;
  margin-bottom: 48px;
  color: #ff9522;
  @media (max-width: 768px) {
    margin-top: 7px;
    margin-bottom: 35px;
    color: #000000;
  }
`;

const CommentContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 0 17px;
  margin-bottom: 16px;
`;

const CommentTextArea = styled.textarea`
  box-sizing: border-box;
  width: 100%;
  height: 137px;
  border-radius: 8px;
  border: 1px solid #eeeeee;
  background-color: #fafafa;
  padding: 12px;
  margin-top: 10px;
  resize: none;
  font-family: inherit;
  font-size: 16px;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.3px;
  color: #333;
`;

const CommentTitle = styled.div`
  color: #707070;
  font-size: 14px;
  margin-left: 6px;
`;

const CommentLength = styled.span`
  color: #707070;
  font-size: 14px;
  right: 15px;
  bottom: 16px;
  z-index: 1;
  position: absolute;

  @media (max-width: 768px) {
    font-size: 11px;
    right: 13px;
    bottom: 12px;
  }
`;

const ImagesContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
`;

const AddImageButton = styled.div`
  box-sizing: border-box;
  width: 120px;
  height: 120px;
  flex: 0 0 auto;
  background-color: #ff9522;
  border-radius: 8px;
  padding: 35px 26px;
  margin: 0 5px;
  text-align: center;
  cursor: pointer;

  @media (max-width: 768px) {
    display: flex;
    width: 134px;
    height: 32px;
    border-radius: 50px;
    padding: 8px 25px;
  }
`;

const PhotoImg = styled.img`
  width: 28px;
  height: 28px;
`;

const AddImageText = styled.div`
  color: white;
  font-size: 14px;
  font-weight: 800;
  line-height: 16px;

  &:after {
    content: " +";
    @media (max-width: 768px) {
      display: none;
    }
  }
`;

const ModalFooter = styled.div`
  display: flex;
  width: 100%;
  padding-bottom: 30px;
  @media (max-width: 768px) {
    display: inherit;
  }
`;

const ReviewPostButton = styled.button`
  width: 50%;
  height: 46px;
  margin: 0 7px;
  border-radius: 8px;
  background-color: #ff9522;
  text-align: center;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;

  &:disabled {
    background-color: #adadad;
  }
`;

const ReviewCancelButton = styled.button`
  width: 50%;
  height: 46px;
  margin: 0 7px;
  border-radius: 8px;
  background-color: #eeeeee;
  text-align: center;
  color: #8e8e8e;
  border: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
`;
