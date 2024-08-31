import BackClickable from "components/general/BackClickable";
import { Dispatch, RefObject, SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";
import useModals from "hooks/UseModals";

interface ProfieImageEditModalProps {
  imgRef: RefObject<HTMLInputElement>;
  profileFrameRef: RefObject<HTMLDivElement>;
  setChangeToDefaultImage: (changeToDefaultImage: boolean) => void;
  onClose: () => void;
}

export default function ProfieImageEditModal(props: ProfieImageEditModalProps) {
  const {
    imgRef,
    profileFrameRef,
    setChangeToDefaultImage,
    onClose,
  } = props;
  const { closeModal } = useModals();
  
  const [modalPosition, SetModalPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);

  useEffect(() => {
    const updatePosition = () => {
      const element = profileFrameRef.current;
      if (element) {
        const { top, left, width } = element.getBoundingClientRect();
        SetModalPosition({ top: top, left: left + width + 13.4 });
      }
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition);
    };
  }, []);

  if (modalPosition) {
    const { top, left } = modalPosition;
    return (
      <BackClickable onClickBackground={onClose}
      style={`
        background: transparent;
      `}>
        <Container
          style={{
            top: top,
            left: left,
          }}
        >
          <EditOption
            onClick={() => {
              if (imgRef.current) imgRef.current.click();
              onClose();
            }}
          >
            앨범에서 사진 선택
          </EditOption>
          <EditOption
            onClick={() => {
              setChangeToDefaultImage(true);
              onClose();
            }}
          >
            기본 이미지 적용
          </EditOption>
        </Container>
      </BackClickable>
    );
  }
}

const Container = styled.div`
  position: fixed;
  width: 135.375px;
  background-color: white;
  border-radius: 8px;
  padding: 8px 0;
  box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.1);
`;

const EditOption = styled.button`
  background: none;
  width: 100%;
  border: none;
  padding: 6px 14px;
  font-size: 14px;
  line-height: 23px;
  letter-spacing: -0.3px;
  text-align: left;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;
