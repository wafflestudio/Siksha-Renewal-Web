"use client"

import React, { useEffect, useId, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import useError from "hooks/useError";
import useMenu from "hooks/UseMenu";
import { useParams, useRouter } from "next/navigation";
import OneColumnLayout from "styles/layouts/OneColumnLayout";
import MobileSubHeader from "components/general/MobileSubHeader";
import Link from "next/link";
import { getParticle } from "utils/FormatUtil";

export type ReviewInputs = {
  score: number;
  comment: string;
  images: File[];
};

const emptyReviewInputs: ReviewInputs = {
  score: 3,
  comment: "",
  images: [],
};

export default function ReviewPost() {
  const router = useRouter();
  const { menuId } = useParams<{ menuId: string }>();
  
  const { menu, fetchMenu, fetchReviews, submitReview } = useMenu();
  const [inputs, setInputs] = useState<ReviewInputs>(emptyReviewInputs);
  const { onHttpError } = useError();

  const MAX_COMMENT_LENGTH = 150;

  useEffect(() => {
    if (!menu) {
      fetchMenu(Number(menuId));
    }
  }, [menu]);

  const handlePhotoAttach = (newPhoto: File | undefined) => {
    if (newPhoto) {
      setInputs({ ...inputs, images: [...inputs.images, newPhoto] });
    }
  };

  const handlePhotoDelete = (index: number) => {
    setInputs({ ...inputs, images: inputs.images.filter((_, i) => i !== index) });
  };

  const handleSubmit = async () => {
    if (!menu) {
      console.error("menu is not loaded");
      return;
    }

    const body = new FormData();
    body.append("menu_id", menuId);
    body.append("score", String(inputs.score));
    body.append("comment", inputs.comment);
    inputs.images.forEach((image) => {
      body.append("images", image);
    });

    return submitReview(body)
      .then((res) => {
        fetchReviews(Number(menuId));
      })
      .catch((err) => {
        const errorCode = err.response?.status ?? null;
        if (errorCode == 500) {
          window.alert(err.message);
        }
        onHttpError(err);
      });
  };

  return (
    <>
      <MobileSubHeader
        title="나의 평가 남기기"
        handleBack={() => router.back()}
      />
      <Container>
        <TitleWrapper onClick={() => router.back()}>
          <Image
            src={"/img/left-arrow.svg"}
            alt="뒤로 가기"
            width={20}
            height={20}
          />
          <Title>나의 평가 남기기</Title>
        </TitleWrapper>
        
        <Header>
          <ReviewTitle>
            &apos; <MenuNameText>{menu?.name_kr ?? ""} </MenuNameText>&apos;{" "}
            <ReviewTitleText>{getParticle(menu?.name_kr ?? "")} 어땠나요?</ReviewTitleText>
          </ReviewTitle>
          <SelectStarText>별점을 선택해 주세요.</SelectStarText>
          <StarsContainer>
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                src={i <= inputs.score ? "/img/general/star-on.svg" : "/img/general/star-off-28.svg"}
                onClick={() => setInputs({ ...inputs, score: i })}
                alt={i <= inputs.score ? "별점 채워짐" : "별점 비어짐"}
              />
            ))}
          </StarsContainer>
          <Score>{inputs.score}</Score>
        </Header>

        <CommentSection>
          <div style={{ display: "flex" }}>
            <Image src="/img/comment.svg" alt="코멘트 이미지" width={18} height={18} />
            <CommentTitle>식단 한 줄 평을 함께 남겨보세요!</CommentTitle>
          </div>
          <div style={{ position: "relative" }}>
            <CommentTextArea
              value={inputs.comment}
              placeholder={"맛은 어땠나요?"}
              onChange={(e) =>
                setInputs({ ...inputs, comment: e.target.value.slice(0, MAX_COMMENT_LENGTH) })
              }
            />
            <CommentLength>
              {inputs.comment.length} 자 / {MAX_COMMENT_LENGTH} 자
            </CommentLength>
          </div>
        </CommentSection>

        <PhotoSection>
          <PhotoViewer>
            {inputs.images.length < 5 && (
              <PhotoAttacher photosLength={inputs.images.length}>
                <AddImage>{inputs.images.length === 0 && "사진 추가"}</AddImage>
                <FileInput
                  type="file"
                  accept="image/*"
                  onChange={(e) => handlePhotoAttach(e.target?.files?.[0])}
                />
              </PhotoAttacher>
            )}
            {inputs.images.map((photoObj, i) => (
              <PhotoContainer key={i}>
                <Photo src={URL.createObjectURL(photoObj)} alt="리뷰 이미지" />
                <DeleteButton onClick={() => handlePhotoDelete(i)}></DeleteButton>
              </PhotoContainer>
            ))}
          </PhotoViewer>
          {inputs.images.length < 5 && (
            <MobilePhotoAttacher>
              <AddImage>사진 추가</AddImage>
              <FileInput
                type="file"
                accept="image/*"
                onChange={(e) => handlePhotoAttach(e.target?.files?.[0])}
              />
            </MobilePhotoAttacher>
          )}
        </PhotoSection>
        
        <Footer>
          <ReviewCancelButton
            onClick={() => {router.back()}}
          />
          <ReviewPostButton
            onClick={() => {handleSubmit()}}
            disabled={inputs.comment.length === 0}
          />
        </Footer>
      </Container>
    </>
  );
}

const Container = styled(OneColumnLayout.Container)`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px; 

  border-radius: 10px;
  background: var(--Color-Foundation-base-white, #FFF);

  @media (max-width: 768px) {
    position: relative;
    width: 100vw;
    min-width: 0;
    box-sizing: border-box;
    padding-top: 44px;
    flex: 1;
  }
`;

const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
  cursor: pointer;
  @media (max-width: 768px) {
    display: none;
  }
`;

const Title = styled.div`
  color: var(--Color-Foundation-orange-500, #FF9522);
  text-align: center;

  /* text-14/Bold */
  font-family: var(--Font-family-sans, NanumSquareOTF);
  font-size: var(--Font-size-14, 14px);
  font-style: normal;
  font-weight: var(--Font-weight-bold, 700);
  line-height: 150%; /* 21px */
  @media (max-width: 768px) {
    font-weight: 800;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 36px;
`;

const ReviewTitle = styled.div`
  display: flex;
  margin: 30px 0 22px 0;

  color: var(--Color-Foundation-gray-900, #262728);
  text-align: center;

  /* text-20/ExtraBold */
  font-family: var(--Font-family-sans, NanumSquareOTF);
  font-size: var(--Font-size-20, 20px);
  font-style: normal;
  font-weight: var(--Font-weight-extrabold, 800);
  line-height: 140%; /* 28px */

  @media (max-width: 768px) {
    margin-top: 0;
    margin-bottom: 26px;
  }
`;

const MenuNameText = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const ReviewTitleText = styled.span`
`;

const SelectStarText = styled.span`
  display: none;
  margin-bottom: 14px;

  color: var(--Color-Foundation-gray-700, #727478);
  text-align: center;

  /* text-14/Bold */
  font-family: var(--Font-family-sans, NanumSquareOTF);
  font-size: var(--Font-size-14, 14px);
  font-style: normal;
  font-weight: var(--Font-weight-bold, 700);
  line-height: 150%; /* 21px */

  @media (max-width: 768px) {
    display: inherit;
  }
`;

const Star = styled.img`
  width: 28px;
  height: 28px;
  cursor: pointer;
  @media (max-width: 768px) {
    width: 30px;
    height: 30px;
  }
`;

const StarsContainer = styled.div`
  display: flex;
  align-items: center;
  width: 140px;
  margin-bottom: 2px;
  cursor: pointer;
  @media (max-width: 768px) {
    width: 150px;
    margin-bottom: 7px;
  }
`;

const Score = styled.div`
  margin-top: 2px;

  color: var(--Color-Foundation-gray-700, #727478);
  text-align: center;

  /* text-16/Bold */
  font-family: var(--Font-family-sans, NanumSquareOTF);
  font-size: var(--Font-size-16, 16px);
  font-style: normal;
  font-weight: var(--Font-weight-bold, 700);
  line-height: 140%; /* 22.4px */
  letter-spacing: var(--Font-letter-spacing-0, -0.3px);

  @media (max-width: 768px) {
    margin-top: 7px;
    margin-bottom: 35px;
    color: var(--Color-Foundation-base-black, #000);
    text-align: center;

    /* text-20/Bold */
    font-family: var(--Font-family-sans, NanumSquareOTF);
    font-size: var(--Font-size-20, 20px);
    font-style: normal;
    font-weight: var(--Font-weight-bold, 700);
    line-height: 140%; /* 28px */
  }
`;

const CommentSection = styled.div`
  box-sizing: border-box;
  width: 100%;
`;

const CommentTextArea = styled.textarea`
  box-sizing: border-box;
  width: 100%;
  height: 137px;
  margin-top: 10px;
  background: var(--Color-Foundation-gray-100, #F2F3F4);
  border-radius: 6px;
  border: 1px solid #eeeeee;
  padding: 12px;
  resize: none;

  color: var(--Color-Foundation-gray-900, #262728);

  /* text-15/Regular */
  font-family: var(--Font-family-sans, NanumSquareOTF);
  font-size: var(--Font-size-15, 15px);
  font-style: normal;
  font-weight: var(--Font-weight-regular, 400);
  line-height: 150%; /* 22.5px */

  ::placeholder {
    color: var(--Color-Foundation-gray-600, #989AA0);
  }

  @media (max-width: 768px) {
    margin-top: 7px;
  }
`;

const CommentTitle = styled.div`
  color: var(--Color-Foundation-gray-800, #4C4D50);

  /* text-16/ExtraBold */
  font-family: var(--Font-family-sans, NanumSquareOTF);
  font-size: var(--Font-size-16, 16px);
  font-style: normal;
  font-weight: var(--Font-weight-extrabold, 800);
  line-height: 140%; /* 22.4px */

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

const PhotoSection = styled.div`
  width: 100%;
  box-sizing: border-box;
  margin-top: 12px;
  margin-bottom: 52px;
  @media (max-width: 768px) {
    margin-top: 16px;
    margin-bottom: 98px;
  }
`;

const PhotoViewer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, 100px);
  column-gap: 8px;
  overflow: visible;
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, 80px);
    column-gap: 11px;
    margin-bottom: 16px;
  }
`;

const PhotoContainer = styled.div`
  position: relative;
  height: 100px;
  width: 100px;
  @media (max-width: 768px) {
    height: 80px;
    width: 80px;
  }
`;

const PhotoAttacher = styled.label<{ photosLength: number }>`
  width: 96px;
  height: 96px;
  flex: 0 0 auto;
  background-repeat: no-repeat;
  background-position: center center;
  border-radius: 8px;
  border: 2px solid var(--Color-Foundation-gray-200, #E5E6E9);
  text-align: center;
  cursor: pointer;

  @media (max-width: 768px) {
    display: none;
  }
`;

const AddImage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;

  color: var(--Color-Foundation-gray-600, #989AA0);
  text-align: center;
  font-family: NanumSquareOTF;
  font-size: 13px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.3px;

  &:before {
    content: " ";
    display: block;
    width: 40px;
    height: 40px;
    background-size: 40px 40px;
    background-image: url("/img/plus-angled.svg");
    margin: 0 0 6px 0;
  }

  @media (max-width: 768px) {
    flex-direction: row;

    color: var(--Color-Foundation-base-white, #FFF);
    text-align: center;
    font-feature-settings: 'liga' off, 'clig' off;
    font-family: NanumSquareOTF;
    font-size: 14px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
    letter-spacing: -0.3px;

    &:before {
      width: 16px;
      height: 16px;
      background-size: 16px 16px;
      margin: 0 8px 0 0;
      background-image: url("/img/photo.svg");
    }
  }
`;

const MobilePhotoAttacher = styled.label`
  box-sizing: border-box;
  display: none;
  width: 134px;
  height: 32px;
  flex: 0 0 auto;
  background-color: #ff9522;
  border-radius: 50px;
  padding: 8px 25px;
  text-align: center;
  cursor: pointer;

  @media (max-width: 768px) {
    display: flex;
  }
`;

const FileInput = styled.input`
  display: none;
`;

const Photo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 8px;
  object-fit: cover;

  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
  }
`;

const DeleteButton = styled.button`
  position: absolute;
  width: 20px;
  height: 20px;
  top: -6px;
  right: -6px;
  padding: 0;
  background: transparent;
  border: none;
  outline: none;
  background-image: url("/img/photo-delete.svg");
  background-size: cover;
  cursor: pointer;

  @media (max-width: 768px) {
  }
`;

const Footer = styled.div`
  display: flex;
  width: 100%;
  box-sizing: border-box;
  gap: 8px;
  @media (max-width: 768px) {
    position: absolute;
    display: inherit;
    bottom: 0;
    padding: 0 24px 24px;
  }
`;

const ReviewPostButton = styled.button`
  display: flex;
  width: 50%;
  height: 46px;
  border-radius: 8px;
  color: black;
  background-color: #ff9522;
  justify-content: center;
  align-items: center;
  color: white;
  border: none;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;

  &:before {
    content: "평가 등록";
  }
  &:disabled {
    background-color: #adadad;
  }
  @media (max-width: 768px) {
    width: 100%;
    &:before {
      content: "올리기";
    }
  }
`;

const ReviewCancelButton = styled.button`
  width: 50%;
  height: 46px;
  border-radius: 8px;
  background-color: #eeeeee;
  text-align: center;
  color: #8e8e8e;
  border: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;

  &:before {
    content: "취소";
  }

  @media (max-width: 768px) {
    display: none;
  }
`;
