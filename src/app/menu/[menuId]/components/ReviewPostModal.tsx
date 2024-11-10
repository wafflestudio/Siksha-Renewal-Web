import React, { useId, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { getReviews, setReview } from "utils/api/reviews";
import useAuth from "hooks/UseAuth";

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

export default function ReviewPostModal({
  isOpen,
  menu,
  onSubmit,
  onClose,
}: {
  isOpen: boolean;
  menu: {
    menuId: number;
    menuName: string;
  };
  onSubmit: () => void;
  onClose: () => void;
}) {
  const id = useId();
  const [inputs, setInputs] = useState<ReviewInputs>(emptyReviewInputs);

  const MAX_COMMENT_LENGTH = 150;

  const { getAccessToken } = useAuth();

  const handlePhotoAttach = (newPhoto: File | undefined) => {
    if (newPhoto) {
      setInputs({ ...inputs, images: [...inputs.images, newPhoto] });
    }
  };
  const handlePhotoDelete = (index: number) => {
    setInputs({ ...inputs, images: inputs.images.filter((_, i) => i !== index) });
  };
  const handleSubmit = async () => {
    const body = new FormData();
    body.append("menu_id", String(menu.menuId));
    body.append("score", String(inputs.score));
    body.append("comment", inputs.comment);
    inputs.images.forEach((image) => {
      body.append("images", image);
    });

    return getAccessToken().then((accessToken) => {
      setReview(body, accessToken!)
        .then((res) => {
          onSubmit();
          onClose();
        })
        .catch((err) => {
          console.error(err);
          window.alert(`리뷰 등록에 실패했습니다.`);
        });
    });
  };

  if (!isOpen) return null;
  return (
    <Container>
      <ModalHeader>
        <ModalTitle>나의 평가 남기기</ModalTitle>
        <HLine />
      </ModalHeader>
      <ReviewTitle>
        &apos; <MenuNameText>{menu.menuName} </MenuNameText>&apos;{" "}
        <ReviewTitleText>는 어땠나요?</ReviewTitleText>
      </ReviewTitle>
      <SelectStarText>별점을 선택해 주세요.</SelectStarText>
      <StarsContainer>
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            src={i <= inputs.score ? "/img/general/star.svg" : "/img/star-empty.svg"}
            onClick={() => setInputs({ ...inputs, score: i })}
            alt={i <= inputs.score ? "별점 채워짐" : "별점 비어짐"}
          />
        ))}
      </StarsContainer>
      <Score>{inputs.score}</Score>
      <CommentContainer>
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
      </CommentContainer>
      <PhotoSection>
        <PhotoViewer>
          {inputs.images.map((photoObj, i) => (
            <PhotoContainer key={i}>
              <Photo src={URL.createObjectURL(photoObj)} alt="리뷰 이미지" />
              <DeleteButton onClick={() => handlePhotoDelete(i)}></DeleteButton>
            </PhotoContainer>
          ))}
          {inputs.images.length < 5 && (
            <PhotoAttacher photosLength={inputs.images.length}>
              {inputs.images.length === 0 && <AddImageText> 사진 추가 + </AddImageText>}
              <FileInput
                type="file"
                accept="image/*"
                onChange={(e) => handlePhotoAttach(e.target?.files?.[0])}
              />
            </PhotoAttacher>
          )}
        </PhotoViewer>
        {inputs.images.length < 5 && (
          <MobilePhotoAttacher>
            <AddImageText> 사진 추가 </AddImageText>
            <FileInput
              type="file"
              accept="image/*"
              onChange={(e) => handlePhotoAttach(e.target?.files?.[0])}
            />
          </MobilePhotoAttacher>
        )}
      </PhotoSection>
      `
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
            handleSubmit();
          }}
          disabled={inputs.comment.length === 0}
        >
          등록
        </ReviewPostButton>
      </ModalFooter>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  box-sizing: border-box;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 735px;
  border-left: 1px solid #eeeeee;
  padding-left: 37px;
  padding-right: 36px;
  padding-top: 22px;
  padding-bottom: 22px;
  @media (max-width: 768px) {
    position: absolute;
    width: 100vw;
    height: 100%;
    min-width: 0;
    box-sizing: border-box;
    padding-top: 44px;
  }
`;

const ModalHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 768px) {
    display: none;
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
    margin-top: 0;
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

const PhotoSection = styled.div`
  width: 100%;
  padding-left: 17px;
  box-sizing: border-box;
`;

const PhotoViewer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, 120px);
  column-gap: 13px;
  overflow: visible;
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, 80px);
  }
`;

const PhotoContainer = styled.div`
  position: relative;
  height: 80px;
  @media (max-width: 768px) {
    margin-bottom: 16px;
  }
`;

const PhotoAttacher = styled.label<{ photosLength: number }>`
  width: 120px;
  height: 120px;
  flex: 0 0 auto;
  background-color: ${(props) => (props.photosLength > 0 ? "#dfdfdf" : "#ff9522")};
  background-image: ${(props) => (props.photosLength > 0 ? "url('/img/plus-angled.svg')" : "")};
  background-repeat: no-repeat;
  background-position: center center;
  border-radius: 8px;
  margin-right: 13px;
  text-align: center;
  cursor: pointer;

  @media (max-width: 768px) {
    display: none;
  }
`;

const AddImageText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: white;
  font-size: 14px;
  font-weight: 800;
  line-height: 16px;

  &:before {
    content: " ";
    display: block;
    width: 28px;
    height: 28px;
    background-size: 28px 28px;
    background-image: url("/img/photo.svg");
    margin: 0 0 6px 0;
  }

  @media (max-width: 768px) {
    flex-direction: row;

    &:before {
      width: 16px;
      height: 16px;
      background-size: 16px 16px;
      margin: 0 8px 0 0;
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
  width: 120px;
  height: 120px;
  margin-right: 13px;
  border-radius: 8px;
  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
    margin-right: 8px;
  }
`;

const DeleteButton = styled.button`
  position: absolute;
  width: 24px;
  height: 24px;
  top: -8px;
  right: -5px;
  padding: 0;
  background: transparent;
  border: none;
  outline: none;
  background-image: url("/img/photo-delete.svg");
  cursor: pointer;

  @media (max-width: 768px) {
    width: 16px;
    height: 16px;
    background-image: url("/img/photo-delete-mobile.svg");
  }
`;

const ModalFooter = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  box-sizing: border-box;
  padding-left: 37px;
  padding-right: 36px;
  bottom: 30px;
  @media (max-width: 768px) {
    display: inherit;
  }
`;

const ReviewPostButton = styled.button`
  display: flex;
  width: 50%;
  height: 46px;
  margin: 0 7px;
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
    content: "평가";
    display: none;
    padding-right: 5px;
  }
  &:disabled {
    background-color: #adadad;
  }
  @media (max-width: 768px) {
    width: 100%;
    &:before {
      display: inherit;
    }
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

  @media (max-width: 768px) {
    display: none;
  }
`;
