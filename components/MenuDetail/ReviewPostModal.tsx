import React, { useState } from "react";
import styled from "styled-components";
import APIendpoint from "../../constants/constants";
import axios from "axios";

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
        `${APIendpoint()}/reviews`,
        {
          menu_id: menu.menuId,
          score,
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
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
      <CloseButton src="/img/x-button.svg" onClick={onClose} />
      <div
        style={{
          display: "flex",
          marginBottom: "35px",
        }}
      >
        ' <MenuNameText>{menu.menuName} </MenuNameText>' <ReviewTitle>는 어땠나요?</ReviewTitle>
      </div>
      <span
        style={{
          color: "#707070",
          fontSize: "14px",
        }}
      >
        별점을 선택해 주세요.
      </span>
      <div
        style={{
          display: "flex",
          cursor: "pointer",
        }}
      >
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            src={i <= score ? "/img/star.svg" : "/img/star-empty.svg"}
            onClick={() => setScore(i)}
          />
        ))}
      </div>
      <div
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          marginTop: "9px",
          marginBottom: "45px",
        }}
      >
        {score}
      </div>
      <div
        style={{
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
          }}
        >
          <img src="/img/comment.svg" />
          <span
            style={{
              color: "#707070",
              fontSize: "14px",
              marginLeft: "6px",
            }}
          >
            식단 한 줄 평을 함께 남겨보세요!
          </span>
        </div>
        <div
          style={{
            position: "relative",
          }}
        >
          <TextArea
            value={comment}
            onChange={(e) => setComment(e.target.value.slice(0, MAX_COMMENT_LENGTH))}
          />
          <span
            style={{
              color: "#707070",
              fontSize: "14px",
              right: "60px",
              bottom: "35px",
              zIndex: 1,
              position: "absolute",
            }}
          >
            {comment.length} 자 / {MAX_COMMENT_LENGTH} 자
          </span>
        </div>
      </div>

      <ReviewPostButton
        onClick={() => {
          onReviewSubmit();
        }}
        disabled={comment.length === 0}
      >
        평가 등록
      </ReviewPostButton>
    </Container>
  );
}

const TextArea = styled.textarea`
  width: 90%;
  height: 115px;
  border-radius: 8px;
  border: 1px solid #eeeeee;
  background-color: #fafafa;
  padding: 12px;
  margin-top: 10px;
  margin-bottom: 20px;
  resize: none;
  font-size: 14px;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.3px;
  color: #333;
`;

const Star = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 5px;
  cursor: pointer;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40%;
  right: 0;
  position: absolute;
  border-left: 1px solid #eeeeee;
  padding-left: 50px;
  padding-right: 50px;
  padding-top: 50px;
  min-height: 100%;
`;

const CloseButton = styled.img`
  width: 26px;
  height: 26px;
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
`;

const MenuNameText = styled.div`
  color: #000;
  text-align: center;
  font-feature-settings: "clig" off, "liga" off;
  font-family: NanumSquareOTF;
  font-size: 20px;
  width: 140px;
  font-weight: 400;
  line-height: normal;
  text-align: center;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const ReviewTitle = styled.span`
  color: #7a7a7a;
  font-feature-settings: "clig" off, "liga" off;
  font-family: NanumSquareOTF;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.3px;
`;

const ReviewPostButton = styled.button`
  width: 343px;
  height: 56px;
  flex-shrink: 0;
  border-radius: 8px;
  background-color: #ff9522;
  text-align: center;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 17px;
  font-weight: 700;
  margin-top: 70px;
`;
