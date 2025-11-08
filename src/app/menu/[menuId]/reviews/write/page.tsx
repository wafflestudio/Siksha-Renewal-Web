"use client";

import React, { useEffect, useId, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import useError from "hooks/useError";
import useMenu from "hooks/UseMenu";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import OneColumnLayout from "styles/layouts/OneColumnLayout";
import MobileSubHeader from "components/general/MobileSubHeader";
import Link from "next/link";
import { getParticle } from "utils/FormatUtil";
import useAuth from "hooks/UseAuth";
import useModals from "hooks/UseModals";
import ConfirmModal from "app/components/ConfirmModal";
import { MyReviewType } from "types";
import StarIcon from "assets/icons/star-filled.svg"
import CommentReviewIcon from "assets/icons/comment-review.svg";
import KeywordReviewForm from "../../components/KeywordReviewForm";
import PhotoDeleteIcon from "assets/icons/photo-delete.svg";
import useAuth from "hooks/UseAuth";

export type ReviewInputs = {
  score: number;
  comment: string;
  images: File[];
  taste: string;
  price: string;
  food_composition: string;
};

const emptyReviewInputs: ReviewInputs = {
  score: 3,
  comment: "",
  images: [],
  taste: "",
  price: "",
  food_composition: "",
};

export default function ReviewPost() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reviewId = searchParams.get("reviewId");
  const isEditMode = reviewId !== null;
  const { menuId } = useParams<{ menuId: string }>();

  const { menu, fetchMenu, fetchReviews, fetchReview, submitReview, editReview } = useMenu();
  const { openModal } = useModals();
  const [inputs, setInputs] = useState<ReviewInputs>(emptyReviewInputs);
  const { onHttpError } = useError();
  const { authStatus } = useAuth();

  const { getAccessToken } = useAuth();

  const MAX_COMMENT_LENGTH = 150;

  useEffect(() => {
    if (!isEditMode) return;

    fetchReview(Number(reviewId))
      .then((reviewData: MyReviewType) => {
        // 서버에서 etc를 object로 보내주지 않는 문제 임시 대응
        // TODO: 서버한테 etc를 object로 보내달라고 하기
        if (reviewData.etc) {
          if (typeof reviewData.etc === "string") {
            try {
              reviewData.etc = JSON.parse(reviewData.etc);
            } catch (e) {
              console.error("Failed to parse review etc field", e);
              reviewData.etc = {};
            }
          }
        }
        setInputs({
          score: reviewData.score ?? 3,
          comment: reviewData.comment,
          images: reviewData.etc?.images || [],
        });
      })
      .catch((e) => {
        onHttpError(e);
      });
  }, [reviewId, isEditMode]);

  useEffect(() => {
    if (!menu) {
      fetchMenu(Number(menuId));
    }
  }, [menu, authStatus, fetchMenu, menuId]);

  const handlePhotoAttach = (newPhoto: File | undefined) => {
    if (newPhoto) {
      setInputs({ ...inputs, images: [...inputs.images, newPhoto] });
    }
  };

  const handlePhotoDelete = (index: number) => {
    setInputs({ ...inputs, images: inputs.images.filter((_, i) => i !== index) });
  };

  const convertToBlob = async (image: string | File) => {
    if (typeof image === "string") {
      const response = await fetch(image);
      const blob = await response.blob();
      return blob;
    } else return image;
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
    // TODO: 키워드 리뷰 UI 추가 후 수정
    body.append("taste", "");
    body.append("price", "");
    body.append("food_composition", "");

    return Promise.all(inputs.images.map(convertToBlob))
      .then((blobs) => blobs.forEach((blob) => body.append("images", blob)))
      .then(() => {
        const actionFunction = isEditMode
          ? () => editReview(Number(reviewId), body)
          : () => submitReview(body);
        return actionFunction();
      })
      .then(() => {
        openModal(ConfirmModal, {
          type: isEditMode ? "edit" : "submit",
          onClose: () => {
            router.back();
            fetchReviews(Number(menuId));
          },
        });
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
      <MobileSubHeader title="나의 평가 남기기" handleBack={() => router.back()} />
      <Container>
        <TitleWrapper onClick={() => router.back()}>
          <Image src={"/img/left-arrow-mobile.svg"} alt="뒤로 가기" width={20} height={20} />
          <Title>나의 평가 남기기</Title>
        </TitleWrapper>

        <Header>
          <ReviewTitle>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              &apos; <MenuNameText>{menu?.name_kr ?? ""} </MenuNameText>&apos;{" "}
              <ReviewTitleText>{getParticle(menu?.name_kr ?? "")}</ReviewTitleText>
            </div>
            <ReviewTitleText>어땠나요?</ReviewTitleText>
          </ReviewTitle>
          <SelectStarText>별점을 선택해 주세요.</SelectStarText>
          <StarsContainer>
            {[1, 2, 3, 4, 5].map((i) => {
              if (i <= inputs.score) {
                return (
                  <StyledStarIcon
                    key={i}
                    $isfilled={true}
                    onClick={() => setInputs({ ...inputs, score: i })}
                    alt="별점 채워짐"
                  />
                );
              } else {
                return (
                  <StyledStarIcon
                    key={i}
                    $isfilled={false}
                    onClick={() => setInputs({ ...inputs, score: i })}
                    alt="별점 비어짐"
                  />
                );
              }
            })}
          </StarsContainer>
          <Score>{inputs.score}</Score>
        </Header>
        <KeywordReviewForm inputs={inputs} setInputs={setInputs} />
        <CommentSection>
          <div style={{ display: "flex", alignItems: "center" }}>
            <StyledCommentReviewIcon />
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
            {inputs.images.map((image, i) => (
              <PhotoContainer key={i}>
                <Photo
                  src={typeof image === "string" ? image : URL.createObjectURL(image)}
                  alt="리뷰 이미지"
                />
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
            onClick={() => {
              router.back();
            }}
          />
          {isEditMode ? (
            <ReviewEditButton
              onClick={() => {
                handleSubmit();
              }}
              disabled={inputs.comment.length === 0}
            />
          ) : (
            <ReviewPostButton
              onClick={() => {
                handleSubmit();
              }}
              disabled={inputs.comment.length === 0}
            />
          )}
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
  background: var(--SemanticColor-Background-Secondary, #232323);
  margin-bottom: 33px;
  margin-top: 22px;

  @media (max-width: 768px) {
    position: relative;
    width: 100vw;
    min-width: 0;
    box-sizing: border-box;
    padding-top: 44px;
    flex: 1;
    margin-top: 0px;
    margin-bottom: 0px;
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
  color: var(--Color-Foundation-orange-500, #ff9522);
  text-align: center;

  /* text-14/Bold */
  font-family: var(--Font-family-sans, NanumSquare);
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
  @media (max-width: 768px) {
    margin-bottom: 0;
  }
`;

const ReviewTitle = styled.div`
  display: flex;
  margin-top: 28px;

  color: var(--Color-Foundation-gray-900, #262728);
  text-align: center;

  /* text-20/Bold */
  font-family: var(--Font-family-sans, NanumSquare);
  font-size: var(--Font-size-20, 20px);
  font-style: normal;
  font-weight: var(--Font-weight-bold, 700);
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
  max-width: 500px;
  font-weight: var(--Font-weight-extrabold, 800);
`;

const ReviewTitleText = styled.span`
  font-weight: var(--Font-weight-extrabold, 800);
`;

const SelectStarText = styled.span`
  display: none;
  margin-bottom: 14px;

  color: var(--Color-Foundation-gray-700, #727478);
  text-align: center;

  /* text-14/Bold */
  font-family: var(--Font-family-sans, NanumSquare);
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

const StyledStarIcon = styled(StarIcon)<{ $isfilled: boolean }>`
  width: 28px;
  height: 28px;
  cursor: pointer;
  color: ${(props) =>
    props.$isfilled ? "var(--Color-Foundation-orange-500)" : "var(--SemanticColor-Icon-Like)"};
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
  margin-top: 12px;
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
  font-family: var(--Font-family-sans, NanumSquare);
  font-size: var(--Font-size-16, 16px);
  font-style: normal;
  font-weight: var(--Font-weight-bold, 700);
  line-height: 140%; /* 22.4px */
  letter-spacing: var(--Font-letter-spacing-0, -0.3px);

  @media (max-width: 768px) {
    margin-top: 7px;
    color: var(--Color-Foundation-base-black, #000);
    text-align: center;

    /* text-20/Bold */
    font-family: var(--Font-family-sans, NanumSquare);
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
  background: var(--SemanticColor-Background-Tertiary, #2d2d2d);
  border-radius: 6px;
  border: none;
  padding: 12px;
  resize: none;

  color: var(--Color-Foundation-gray-900);

  /* text-15/Regular */
  font-family: var(--Font-family-sans, NanumSquare);
  font-size: var(--Font-size-15, 15px);
  font-style: normal;
  font-weight: var(--Font-weight-regular, 400);
  line-height: 150%; /* 22.5px */

  ::placeholder {
    color: var(--Color-Foundation-gray-600, #989aa0);
  }

  @media (max-width: 768px) {
    margin-top: 7px;
  }
`;

const StyledCommentReviewIcon = styled(CommentReviewIcon)`
  color: var(--Color-Foundation-gray-700, #b7b7b7);
  @media (max-width: 768px) {
    width: 18px;
    height: 18px;
  }
`;

const CommentTitle = styled.div`
  color: var(--Color-Foundation-gray-800, #cbcbcc);

  /* text-16/Bold */
  font-family: var(--Font-family-sans, NanumSquare);
  font-size: var(--Font-size-16, 16px);
  font-style: normal;
  font-weight: var(--Font-weight-extrabold, 800);
  line-height: 140%; /* 22.4px */

  margin-left: 6px;

  @media (max-width: 768px) {
    font-weight: var(--Font-weight-bold, 700);
  }
`;

const CommentLength = styled.span`
  font-size: 14px;
  right: 15px;
  bottom: 16px;
  z-index: 1;
  position: absolute;

  color: var(--Color-Foundation-gray-700, #b7b7b7);

  /* text-13/Regular */
  font-family: var(--Font-family-sans, NanumSquare);
  font-size: var(--Font-size-13, 13px);
  font-style: normal;
  font-weight: var(--Font-weight-regular, 400);
  line-height: 140%; /* 18.2px */

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
    margin-top: 8px;
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
  border: 2px solid var(--SemanticColor-Border-Secondary, #404040);
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

  color: var(--Color-Foundation-gray-600, #989aa0);
  text-align: center;
  font-family: NanumSquare;
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

    color: var(--SemanticColor-Text-Button, #fff);
    text-align: center;
    font-feature-settings: "liga" off, "clig" off;
    font-family: NanumSquare;
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
  background-color: var(--Color-Foundation-orange-500);
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

const StyledDeleteIcon = styled(PhotoDeleteIcon)`
  cursor: pointer;
  position: absolute;
  width: 20px;
  height: 20px;
  top: -6px;
  right: -6px;
  color: var(--Color-Foundation-gray-700);
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
  color: var(--SementicColor-Text-Button, #fff);
  text-align: center;

  /* text-14/Bold */
  font-family: var(--Font-family-sans, NanumSquare);
  font-size: var(--Font-size-14, 14px);
  font-style: normal;
  font-weight: var(--Font-weight-bold, 700);
  line-height: 150%; /* 21px */

  background-color: var(--Color-Foundation-orange-500);
  justify-content: center;
  align-items: center;
  border: none;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;

  &::before {
    content: "평가 등록";
  }
  &:disabled {
    background-color: var(--Color-Foundation-gray-600);
  }
  @media (max-width: 768px) {
    width: 100%;
    &:before {
      content: "올리기";
    }
  }
`;

const ReviewEditButton = styled(ReviewPostButton)`
  &::before {
    content: "평가 수정";
  }
  @media (max-width: 768px) {
    width: 100%;
    &:before {
      content: "수정하기";
    }
  }
`;

const ReviewCancelButton = styled.button`
  width: 50%;
  height: 46px;
  border-radius: 8px;
  background-color: var(--SemanticColor-Background-Tertiary, #2d2d2d);
  color: var(--Color-Foundation-gray-600, #919191);
  text-align: center;

  font-family: var(--Font-family-sans, NanumSquare);
  font-size: var(--Font-size-14, 14px);
  font-style: normal;
  font-weight: var(--Font-weight-bold, 700);
  line-height: 150%; /* 21px */

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
