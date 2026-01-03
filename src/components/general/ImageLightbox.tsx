"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import useIsMobile from "hooks/UseIsMobile";
import CloseIcon from "assets/icons/close.svg";
import LeftArrowIcon from "assets/icons/left-arrow-lightbox.svg";
import RightArrowIcon from "assets/icons/right-arrow-lightbox.svg";

interface ImageLightboxProps {
  images: string[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function ImageLightbox({
  images,
  initialIndex,
  isOpen,
  onClose,
}: ImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const isMobile = useIsMobile();

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    if (isOpen) {
      // 스크롤 막기
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Overlay onClick={handleBackgroundClick}>
      {isMobile ? (
        <MobileHeader>
          <CloseButton onClick={onClose}>
            <CloseIcon />
          </CloseButton>
          <MobilePageIndicator>
            {currentIndex + 1} / {images.length}
          </MobilePageIndicator>
          <Spacer />
        </MobileHeader>
      ) : (
        <CloseButton onClick={onClose}>
          <CloseIcon />
        </CloseButton>
      )}

      <ContentWrapper onClick={(e) => e.stopPropagation()}>
        {!isMobile && (
          <NavigationButton 
            $position="left" 
            $isActive={currentIndex > 0}
            onClick={handlePrevious}
          >
            <LeftArrowIcon />
          </NavigationButton>
        )}

        <ImageContainer>
          <StyledImage
            src={images[currentIndex]}
            alt={`이미지 ${currentIndex + 1}`}
            fill
            style={{ objectFit: "contain" }}
            priority
          />
        </ImageContainer>

        {!isMobile && (
          <NavigationButton 
            $position="right" 
            $isActive={currentIndex < images.length - 1}
            onClick={handleNext}
          >
            <RightArrowIcon />
          </NavigationButton>
        )}

        {!isMobile && (
          <PageIndicator>
            {currentIndex + 1} / {images.length}
          </PageIndicator>
        )}
      </ContentWrapper>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #000000B2;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    background: #000;
  }
`;

const MobileHeader = styled.div`
  position: absolute;
  top: 14.5px;
  left: 30.84px;
  right: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 10001;
`;

const Spacer = styled.div`
  width: 44px;
  height: 44px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 58.94px;
  right: 58.94px;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 10001;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  flex-shrink: 0;


  & svg {
    width: 42.12px;
    height: 42.12px;
  }

  @media (max-width: 768px) {
    position: static;
    top: 20px;
    right: 20px;

    & svg {
      width: 12px;
      height: 12px;
    }
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 80vw;
  max-height: 80vh;

  @media (max-width: 768px) {
    max-width: 100vw;
    max-height: 100vh;
  }
`;

const StyledImage = styled(Image)`
  width: 100%;
  height: 100%;
`;

const NavigationButton = styled.button<{ 
  $position: "left" | "right"; 
  $isActive: boolean;
}>`
  position: absolute;
  ${(props) => (props.$position === "left" ? "left: 44px" : "right: 44px")};
  top: 50%;
  transform: translateY(-50%);
  width: 56px;
  height: 56px;
  border: none;
  cursor: ${(props) => (props.$isActive ? "pointer" : "default")};
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  transition: color 0.2s;

  color: ${(props) =>
    props.$isActive
      ? "var(--SemanticColor-Icon-WhiteIcon)"
      : "var(--SemanticColor-Icon-GrayIcon)"};
`;

const MobilePageIndicator = styled.div`

  font-family: var(--Font-family-sans, NanumSquare);
  font-weight: var(--Font-weight-extrabold, 700);
  font-size: var(--Font-size-16, 16px);
  line-height: 140%;
  letter-spacing: var(--Font-letter-spacing-0, -0.3px);

  color: var(--Color-Foundation-base-white);
  text-align: center;

`;

const PageIndicator = styled.div`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  padding: 8px 12px;
  border-radius: 29px;

  font-family: var(--Font-family-sans, NanumSquare);
  font-weight: var(--Font-weight-bold, 700);
  line-height: 140%;
  letter-spacing: var(--Font-letter-spacing-0, -0.3px);
  color: var(--SemanticColor-Text-Dim);
  background: var(--SemanticColor-Background-Toast);
  font-size: var(--Font-size-16, 16px);

`;

