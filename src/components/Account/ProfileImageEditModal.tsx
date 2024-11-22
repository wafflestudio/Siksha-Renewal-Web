import BackClickable from "components/general/BackClickable";
import { RefObject, useEffect, useState } from "react";
import styled from "styled-components";
import useModals from "hooks/UseModals";

interface ModalPosition {
  top: number;
  left: number;
}

interface ProfieImageEditModalProps {
  imgRef: RefObject<HTMLInputElement>;
  profileFrameRef: RefObject<HTMLDivElement>;
  setChangeToDefaultImage: (changeToDefaultImage: boolean) => void;
  onClose: () => void;
}

export default function ProfieImageEditModal(props: ProfieImageEditModalProps) {
  const { imgRef, profileFrameRef, setChangeToDefaultImage, onClose } = props;
  const { closeModal } = useModals();

  const [modalPosition, SetModalPosition] = useState<ModalPosition | null>(null);

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
      <BackClickable
        onClickBackground={onClose}
        style={`
        background: transparent;
        @media (max-width: 768px) {
          background: rgba(0, 0, 0, 0.3);
        }
      `}
      >
        <Container modalPosition={modalPosition}>
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
          <CancelWrapper onClick={onClose}>취소</CancelWrapper>
        </Container>
      </BackClickable>
    );
  }
}

const Container = styled.div<{ modalPosition: ModalPosition }>`
  position: fixed;
  top: ${(props) => `${props.modalPosition.top}px`};
  left: ${(props) => `${props.modalPosition.left}px`};
  width: 135.375px;
  background-color: white;
  border-radius: 8px;
  padding: 8px 0;
  box-shadow: 0px 0px 7px 0px rgba(80, 20, 20, 0.1);

  @media (max-width: 768px) {
    position: fixed;
    top: initial;
    bottom: 40px;
    left: 50%;
    width: calc(100% - 60px);
    transform: translateX(-50%);
    background: white;
    border-radius: 26px;
  }
`;

const EditOption = styled.button`
  background: none;
  width: 100%;
  border: none;
  padding: 6px 14px;
  font-size: 14px;
  line-height: 23px;
  text-align: left;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
    @media (max-width: 768px) {
      background: none;
    }
  }

  @media (max-width: 768px) {
    text-align: center;
    padding: 18px 0;
    border-bottom: 1px solid #e3e3e3;
    font-weight: 400;
    font-size: 16px;
  }
`;

const CancelWrapper = styled.div`
  display: none;
  text-align: center;
  padding: 18px 0;
  color: #ff9522;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;

  @media (max-width: 768px) {
    display: inherit;
  }
`;
